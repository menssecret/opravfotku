// lib/replicate.ts
//
// Tenký wrapper kolem Replicate API pro úpravu fotek.
// Model: black-forest-labs/flux-kontext-pro
//   - State-of-the-art image editing přes textový prompt
//   - V "Try for Free" kolekci, takže nové účty mají několik runů zdarma
//
// Docs: https://replicate.com/black-forest-labs/flux-kontext-pro/api
//       https://replicate.com/docs/topics/predictions/input-files

const MODEL = "black-forest-labs/flux-kontext-pro";
const ENDPOINT = `https://api.replicate.com/v1/models/${MODEL}/predictions`;

export type ReplicateResult =
  | { ok: true; mimeType: string; data: Buffer }
  | { ok: false; error: string; status: number };

export async function editImageWithReplicate(args: {
  imageBytes: Buffer;
  imageMimeType: string;
  prompt: string;
}): Promise<ReplicateResult> {
  const apiToken = process.env.REPLICATE_API_TOKEN;
  if (!apiToken) {
    return {
      ok: false,
      status: 500,
      error:
        "Chybí REPLICATE_API_TOKEN v prostředí. Přidej ho do .env.local.",
    };
  }

  // Replicate akceptuje base64 data URI přímo, žádný externí hosting netřeba.
  const dataUri = `data:${args.imageMimeType};base64,${args.imageBytes.toString(
    "base64",
  )}`;

  const body = {
    input: {
      prompt: args.prompt,
      input_image: dataUri,
      aspect_ratio: "match_input_image",
      output_format: "jpg",
      safety_tolerance: 2,
    },
  };

  let res: Response;
  try {
    res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
        // "Prefer: wait" → Replicate čeká až do 60 s na dokončení a vrátí
        // hotový výsledek synchronně místo polled prediction ID
        Prefer: "wait",
      },
      body: JSON.stringify(body),
    });
  } catch (err) {
    return {
      ok: false,
      status: 502,
      error:
        err instanceof Error
          ? `Síťová chyba: ${err.message}`
          : "Síťová chyba při volání Replicate.",
    };
  }

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    if (res.status === 401) {
      return {
        ok: false,
        status: 401,
        error: "Neplatný Replicate API token. Zkontroluj .env.local.",
      };
    }
    if (res.status === 402 || res.status === 429) {
      return {
        ok: false,
        status: 402,
        error:
          "Vyčerpaný free limit Replicate. Přidej platební kartu na replicate.com/account/billing nebo si vytvoř nový účet.",
      };
    }
    return {
      ok: false,
      status: res.status,
      error: `Replicate vrátil chybu ${res.status}. ${truncate(detail, 300)}`,
    };
  }

  const json = (await res.json()) as ReplicateResponse;

  // Bezpečnostní check, prediction selhal
  if (json.status === "failed" || json.error) {
    const errMsg =
      typeof json.error === "string" ? json.error : "Předpověď selhala.";
    // Replicate občas blokuje obsah safety filtrem
    if (errMsg.toLowerCase().includes("safety") || errMsg.toLowerCase().includes("nsfw")) {
      return {
        ok: false,
        status: 422,
        error:
          "Replicate zablokoval požadavek bezpečnostními filtry. Zkus prompt formulovat jinak.",
      };
    }
    return { ok: false, status: 422, error: errMsg };
  }

  // Pokud Replicate nestihl dokončit do 60 s, vrátí status "starting" nebo "processing"
  // a my bychom museli polovat. Pro Flux Kontext Pro je 60 s typicky dost.
  if (json.status !== "succeeded" || !json.output) {
    return {
      ok: false,
      status: 504,
      error:
        "Replicate nestihl dokončit zpracování do 60 s. Zkus to prosím znovu.",
    };
  }

  // output může být string (single image) nebo string[] (multiple)
  const outputUrl = Array.isArray(json.output) ? json.output[0] : json.output;
  if (typeof outputUrl !== "string") {
    return {
      ok: false,
      status: 502,
      error: "Replicate vrátil neočekávaný formát výstupu.",
    };
  }

  // Stáhneme upravený obrázek z Replicate CDN
  let imgRes: Response;
  try {
    imgRes = await fetch(outputUrl);
  } catch {
    return {
      ok: false,
      status: 502,
      error: "Nepodařilo se stáhnout výsledný obrázek z Replicate CDN.",
    };
  }

  if (!imgRes.ok) {
    return {
      ok: false,
      status: imgRes.status,
      error: `Nepodařilo se stáhnout výsledek (HTTP ${imgRes.status}).`,
    };
  }

  const buffer = Buffer.from(await imgRes.arrayBuffer());
  const mimeType = imgRes.headers.get("content-type") ?? "image/jpeg";

  return { ok: true, mimeType, data: buffer };
}

function truncate(s: string, max: number) {
  if (s.length <= max) return s;
  return s.slice(0, max) + "…";
}

// ──────────────────────────────────────────────────────────
// Typy odpovědi (jen to, co reálně potřebujeme)
// ──────────────────────────────────────────────────────────

type ReplicateResponse = {
  id?: string;
  status?: "starting" | "processing" | "succeeded" | "failed" | "canceled";
  output?: string | string[] | null;
  error?: string | null;
};
