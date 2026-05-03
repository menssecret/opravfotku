import { NextResponse } from "next/server";
import { editImageWithReplicate } from "@/lib/replicate";
import {
  checkRateLimit,
  formatRetryAfter,
  getClientIp,
} from "@/lib/rate-limit";

const MAX_BYTES = 10 * 1024 * 1024;
const ALLOWED_MIME = ["image/jpeg", "image/png", "image/webp"];
const MAX_PROMPT_LENGTH = 2000;

export const maxDuration = 90;

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const limit = checkRateLimit(ip);

  if (!limit.allowed) {
    const wait = formatRetryAfter(limit.resetAt);
    const message =
      limit.scope === "hour"
        ? `Příliš mnoho úprav za hodinu (max 10). Zkus to za ${wait}.`
        : `Vyčerpaný denní limit (max 30 úprav). Reset za ${wait}.`;

    return NextResponse.json(
      { error: message },
      {
        status: 429,
        headers: {
          "Retry-After": String(
            Math.max(1, Math.ceil((limit.resetAt - Date.now()) / 1000)),
          ),
          "X-RateLimit-Reset": String(limit.resetAt),
        },
      },
    );
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json(
      { error: "Tělo požadavku musí být multipart/form-data." },
      { status: 400 },
    );
  }

  const image = formData.get("image");
  const prompt = formData.get("prompt");

  if (!(image instanceof File)) {
    return NextResponse.json({ error: "Chybí obrázek." }, { status: 400 });
  }
  if (!ALLOWED_MIME.includes(image.type)) {
    return NextResponse.json(
      { error: "Podporované formáty: JPG, PNG, WebP." },
      { status: 415 },
    );
  }
  if (image.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "Obrázek je příliš velký (max 10 MB)." },
      { status: 413 },
    );
  }
  if (typeof prompt !== "string" || prompt.trim().length === 0) {
    return NextResponse.json({ error: "Chybí prompt." }, { status: 400 });
  }
  if (prompt.length > MAX_PROMPT_LENGTH) {
    return NextResponse.json(
      { error: `Prompt je delší než ${MAX_PROMPT_LENGTH} znaků.` },
      { status: 400 },
    );
  }

  const buffer = Buffer.from(await image.arrayBuffer());

  const result = await editImageWithReplicate({
    imageBytes: buffer,
    imageMimeType: image.type,
    prompt: prompt.trim(),
  });

  if (!result.ok) {
    return NextResponse.json(
      { error: result.error },
      { status: result.status },
    );
  }

  return new NextResponse(new Uint8Array(result.data), {
    status: 200,
    headers: {
      "Content-Type": result.mimeType,
      "Cache-Control": "no-store",
      "X-RateLimit-Remaining": String(limit.remaining),
    },
  });
}