"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type KeyboardEvent,
} from "react";
import Image from "next/image";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { HistoryPanel } from "@/components/HistoryPanel";
import {
  addHistoryEntry,
  clearHistory,
  listHistoryEntries,
  removeHistoryEntry,
  type HistoryEntry,
} from "@/lib/history";

const MAX_PROMPT_LENGTH = 2000;

type StylePreset = {
  name: string;
  desc: string;
  prompt: string;
};

const PORTRAIT_PRESET: StylePreset = {
  name: "Profesionální portrét",
  desc: "editorial úprava: světlo, pleť, oči, pozadí",
  prompt:
    "Transform this portrait into a professional editorial photograph. Recover blown-out highlights in the bright background (window) while preserving a natural daylight feel. Balance exposure so the face is properly lit with subtle directional light and gentle shadowing for added depth. Refine skin tones to look natural and slightly warm but not washed out. Add subtle contrast and texture so the face has dimension, but preserve realistic skin texture without over-smoothing. Enhance the eyes: sharpen them slightly, add gentle catchlights, and improve micro-contrast around the eyes and brows so the gaze feels more alive. Improve overall sharpness and detail while keeping a soft, professional portrait look. Reduce the distracting background by slightly blurring and softening it so the face stands out, and tone down any bright vertical stripes in the background. Apply a clean, minimalist color grading in the style of magazine photography with balanced highlights, rich midtones, and gentle shadows. Do not change the composition, expression, or facial features.",
};

const SITUATION_PRESETS: StylePreset[] = [
  {
    name: "Vintage portrét",
    desc: "obnova starých fotek lidí",
    prompt:
      "Restore this vintage portrait photograph. Carefully repair scratches, dust, tears, and any visible damage while preserving the original character of the photo. Recover faded colors with natural-looking tones, neither oversaturated nor too pale. If the photo is black and white, keep it black and white but improve contrast and tonal range. Sharpen facial features subtly without making them look artificial. Maintain the original grain and texture of the era. Do not modernize the look, do not change facial expressions, clothing, or composition. The result should look like a well-preserved original, not a digital recreation.",
  },
  {
    name: "Fashion editorial",
    desc: "magazínový high-end look",
    prompt:
      "Transform into a high-end fashion editorial photograph in the style of Vogue or Harper's Bazaar. Apply sophisticated color grading with deep blacks, clean whites, and rich midtones. Enhance fabric textures and details on clothing. Refine skin tones to look polished but realistic, preserving natural skin texture. Add subtle directional lighting that emphasizes the silhouette and form. Boost contrast in a controlled, editorial way. Keep the background clean and slightly muted to draw attention to the subject. The final look should feel cinematic, expensive, and polished. Do not change the pose, composition, or facial features.",
  },
  {
    name: "Krajinka",
    desc: "příroda, krajina, hory",
    prompt:
      "Enhance this landscape photograph for a dramatic but natural look. Recover details in highlights (sky, clouds) and shadows. Boost the richness of natural colors: deeper greens, warmer earth tones, more vibrant skies, but keep everything realistic and not oversaturated. Improve atmospheric depth with subtle haze in distant areas if appropriate. Sharpen mid-distance details (trees, rocks, structures) without making them harsh. Apply a clean, slightly cool color grading reminiscent of high-quality outdoor photography. Add gentle clarity to bring out textures in foliage and terrain. Do not change the composition, time of day, or weather conditions visible in the scene.",
  },
  {
    name: "Produktová fotka",
    desc: "e-shop, marketing",
    prompt:
      "Transform into a clean, professional product photograph suitable for e-commerce. Make the product crisp and sharp with all details clearly visible. Brighten and even out the lighting so the product is well-lit from all sides without harsh shadows. Clean up the background, making it neutral and uncluttered (white, light gray, or a subtle gradient). Add a soft natural shadow under the product for grounding. Enhance the product's colors to be accurate and vibrant. Remove any distracting elements, dust, or imperfections from the product surface. Improve overall sharpness and contrast for a premium catalog look. Do not change the product itself, its angle, or its proportions.",
  },
  {
    name: "Real estate",
    desc: "nemovitosti, interiér",
    prompt:
      "Enhance this real estate photograph for a professional listing. Brighten interiors and balance exposure so both windows and indoor spaces are properly visible (recover blown-out window views without making the room look dark). Make the space feel bright, spacious, and inviting. Correct any color casts from artificial lighting toward neutral, clean tones. Straighten verticals subtly if walls appear to lean. Enhance the warmth of wood and texture of textiles. Make whites clean and crisp. Increase clarity in architectural details. Slightly boost saturation in plants and decorative elements for life, while keeping walls and ceilings neutral. The room should look magazine-ready but realistic. Do not change the layout, furniture, or composition.",
  },
  {
    name: "Foodie",
    desc: "jídlo, restaurace",
    prompt:
      "Transform this food photograph into an appetizing, restaurant-quality image. Enhance the natural colors of the ingredients: make greens fresher, reds richer, yellows warmer, but keep everything looking real and edible (no artificial saturation). Improve texture and sharpness of the food so details like steam, oil sheen, and grain structure are visible. Add subtle warm lighting that makes the food feel inviting. Slightly soften the background and surrounding elements to make the food the clear focal point. Enhance contrast so the food has dimension. Maintain natural shadows and highlights that suggest dimension and freshness. Do not change the food itself, its arrangement, or the composition.",
  },
];

const STYLE_PRESETS: StylePreset[] = [
  {
    name: "Černobílá",
    desc: "klasika, kontrast",
    prompt:
      "Convert to high-contrast black and white photography, preserve all details, deep blacks and clean whites",
  },
  {
    name: "Vintage film",
    desc: "70. léta",
    prompt:
      "Apply vintage 1970s film aesthetic: warm tones, faded shadows, subtle grain, slightly washed out highlights",
  },
  {
    name: "Cinematic",
    desc: "teal & orange",
    prompt:
      "Apply cinematic teal and orange color grading, dramatic lighting, subtle film grain, professional film look",
  },
  {
    name: "Olejomalba",
    desc: "tahy štětcem",
    prompt:
      "Transform into a classical oil painting with visible brushstrokes, rich colors, painterly canvas texture",
  },
  {
    name: "Studio Ghibli",
    desc: "ručně malovaná",
    prompt:
      "Transform into Studio Ghibli animated illustration style with soft watercolor textures, hand-painted feel, gentle pastel colors",
  },
  {
    name: "Restaurace",
    desc: "obnova obecné fotky",
    prompt:
      "Restore old photo: fix scratches and dust, recover faded colors, sharpen details, repair damage, preserve original character",
  },
];

const FOLLOWUP_PROMPTS = [
  "Increase contrast and saturation",
  "Add subtle film grain",
  "Crop tighter on the subject",
  "Soften the highlights",
  "Apply a warmer tone",
];

type Status = "idle" | "submitting" | "done" | "error";

export function PhotoEditor() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);

  const [prompt, setPrompt] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [iteration, setIteration] = useState(1);

  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    listHistoryEntries()
      .then(setHistory)
      .catch(() => {});
  }, []);

  useEffect(() => {
    return () => {
      if (currentUrl) URL.revokeObjectURL(currentUrl);
      if (resultUrl) URL.revokeObjectURL(resultUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setNewInput = useCallback(
    (file: File) => {
      if (currentUrl) URL.revokeObjectURL(currentUrl);
      if (resultUrl) URL.revokeObjectURL(resultUrl);
      setOriginalFile(file);
      setCurrentFile(file);
      setCurrentUrl(URL.createObjectURL(file));
      setResultUrl(null);
      setStatus("idle");
      setErrorMsg(null);
      setIteration(1);
      setPrompt("");
    },
    [currentUrl, resultUrl],
  );

  const acceptFile = useCallback(
    (f: File) => {
      if (!f.type.startsWith("image/")) {
        setErrorMsg("Tohle nevypadá jako obrázek.");
        return;
      }
      if (f.size > 10 * 1024 * 1024) {
        setErrorMsg("Obrázek je větší než 10 MB.");
        return;
      }
      setNewInput(f);
    },
    [setNewInput],
  );

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) acceptFile(f);
    e.target.value = "";
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f) acceptFile(f);
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
  }

  function reset() {
    if (currentUrl) URL.revokeObjectURL(currentUrl);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setOriginalFile(null);
    setCurrentFile(null);
    setCurrentUrl(null);
    setPrompt("");
    setStatus("idle");
    setResultUrl(null);
    setErrorMsg(null);
    setIteration(1);
  }

  function continueEditing() {
    if (!resultUrl || status === "submitting") return;

    fetch(resultUrl)
      .then((r) => r.blob())
      .then((blob) => {
        const filename = `iteration-${iteration + 1}.${
          blob.type === "image/png" ? "png" : "jpg"
        }`;
        const newFile = new File([blob], filename, { type: blob.type });

        if (currentUrl) URL.revokeObjectURL(currentUrl);

        setCurrentFile(newFile);
        setCurrentUrl(resultUrl);
        setResultUrl(null);
        setPrompt("");
        setStatus("idle");
        setErrorMsg(null);
        setIteration((i) => i + 1);
      })
      .catch(() => {
        setErrorMsg("Nepodařilo se připravit fotku k další úpravě.");
      });
  }

  function loadFromHistory(entry: HistoryEntry) {
    if (status === "submitting") return;
    const ext = entry.mimeType === "image/png" ? "png" : "jpg";
    const file = new File([entry.blob], `historie.${ext}`, {
      type: entry.mimeType,
    });
    setNewInput(file);
  }

  function handleRemoveFromHistory(id: string) {
    removeHistoryEntry(id)
      .then(() => listHistoryEntries())
      .then(setHistory)
      .catch(() => {});
  }

  function handleClearHistory() {
    clearHistory()
      .then(() => setHistory([]))
      .catch(() => {});
  }

  function applyPrompt(text: string) {
    setPrompt(text.slice(0, MAX_PROMPT_LENGTH));
  }

  function handlePromptKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      void handleSubmit();
    }
  }

  async function handleSubmit() {
    if (!currentFile || prompt.trim().length === 0 || status === "submitting") {
      return;
    }
    setStatus("submitting");
    setErrorMsg(null);
    if (resultUrl) {
      URL.revokeObjectURL(resultUrl);
      setResultUrl(null);
    }

    const submittedPrompt = prompt.trim();

    try {
      const fd = new FormData();
      fd.append("image", currentFile);
      fd.append("prompt", submittedPrompt);
      const res = await fetch("/api/edit-photo", {
        method: "POST",
        body: fd,
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? `Server vrátil ${res.status}.`);
      }
      const blob = await res.blob();
      setResultUrl(URL.createObjectURL(blob));
      setStatus("done");

      addHistoryEntry({ prompt: submittedPrompt, blob })
        .then(() => listHistoryEntries())
        .then(setHistory)
        .catch(() => {});
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Něco se pokazilo.");
    }
  }

  const canSubmit =
    currentFile !== null &&
    prompt.trim().length > 0 &&
    status !== "submitting";

  return (
    <main className="relative z-10 mx-auto max-w-6xl px-6 pt-16 pb-24 sm:px-10 sm:pt-20 lg:px-16">
      <header className="mb-14 sm:mb-20">
        <div className="flex items-center gap-3 animate-fade-up">
          <Image
            src="/logo.svg"
            alt="opravfotku"
            width={28}
            height={28}
            priority
            className="opacity-90"
          />
          <span className="text-[11px] uppercase tracking-[0.32em] text-(--color-amber)">
            opravfotku
          </span>
        </div>
        <h1
          className="mt-7 font-(family-name:--font-display) text-5xl leading-[0.95] tracking-tight text-balance sm:text-7xl lg:text-8xl animate-fade-up"
          style={{ animationDelay: "60ms" }}
        >
          Oprav <em className="text-(--color-amber)">fotku.</em>
          <br />
          <span className="text-(--color-ink-dim)">Stačí říct jak.</span>
        </h1>
        <p
          className="mt-7 max-w-md text-base leading-relaxed text-(--color-ink-dim) animate-fade-up"
          style={{ animationDelay: "120ms" }}
        >
          Nahraj snímek, napiš co s ním. Žádné vrstvy, žádná pravítka.
          Jen prompt.
        </p>
      </header>

      <HistoryPanel
        entries={history}
        onSelect={loadFromHistory}
        onRemove={handleRemoveFromHistory}
        onClear={handleClearHistory}
      />

      <section className="grid gap-6 lg:grid-cols-5">
        {/* UPLOAD / PREVIEW */}
        <div
          className="lg:col-span-3 animate-fade-up"
          style={{ animationDelay: "180ms" }}
        >
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => !currentUrl && inputRef.current?.click()}
            className={`group relative aspect-[4/3] overflow-hidden rounded-(--radius-card) border transition-colors ${
              isDragging
                ? "border-(--color-amber) bg-(--color-surface-2)"
                : "border-(--color-line) bg-(--color-surface)"
            } ${!currentUrl ? "cursor-pointer hover:border-(--color-line-strong)" : ""}`}
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleInputChange}
              className="hidden"
            />

            {currentUrl ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={currentUrl}
                  alt="Aktuální vstup"
                  className="absolute inset-0 h-full w-full object-contain"
                />
                <div className="absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-(--color-bg)/85 to-transparent p-4">
                  <div className="flex items-center gap-2">
                    <span className="font-(family-name:--font-display) text-sm italic text-(--color-ink-dim)">
                      {originalFile?.name}
                    </span>
                    {iteration > 1 && (
                      <span className="rounded-full border border-(--color-amber)/50 bg-(--color-amber)/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-(--color-amber)">
                        krok {iteration}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      reset();
                    }}
                    className="rounded-full border border-(--color-line-strong) bg-(--color-bg)/70 px-3 py-1 text-xs uppercase tracking-wider text-(--color-ink-dim) backdrop-blur transition-colors hover:border-(--color-amber) hover:text-(--color-amber)"
                  >
                    Vyměnit
                  </button>
                </div>
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-8 text-center">
                <UploadGlyph />
                <div>
                  <p className="font-(family-name:--font-display) text-2xl text-(--color-ink)">
                    Přetáhni fotku sem
                  </p>
                  <p className="mt-2 text-sm text-(--color-ink-faint)">
                    nebo klikni a vyber. JPG, PNG, WebP. Max 10 MB.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* PROMPT PANEL */}
        <div
          className="lg:col-span-2 animate-fade-up"
          style={{ animationDelay: "240ms" }}
        >
          <div className="flex h-full flex-col gap-5 rounded-(--radius-card) border border-(--color-line) bg-(--color-surface) p-6 sm:p-7">
            <div className="flex items-baseline justify-between">
              <label
                htmlFor="prompt"
                className="font-(family-name:--font-display) text-2xl italic"
              >
                {iteration === 1 ? "Co s tím uděláme?" : "Další úprava?"}
              </label>
              <span className="text-[10px] uppercase tracking-[0.28em] text-(--color-ink-faint)">
                {prompt.length}/{MAX_PROMPT_LENGTH}
              </span>
            </div>

            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) =>
                setPrompt(e.target.value.slice(0, MAX_PROMPT_LENGTH))
              }
              onKeyDown={handlePromptKeyDown}
              placeholder={
                iteration === 1
                  ? "e.g. „Fix the overexposed sky and add warm light to faces."
                  : "e.g. „Increase contrast a bit and add a subtle vignette."
              }
              className="min-h-[100px] flex-1 resize-none rounded-sm border border-(--color-line) bg-(--color-bg) px-4 py-3 text-base leading-relaxed text-(--color-ink) placeholder:text-(--color-ink-faint) focus:border-(--color-amber) focus:outline-none"
            />

            {iteration === 1 ? (
              <div className="space-y-5">
                <div className="space-y-2">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-(--color-ink-faint)">
                    Profesionální
                  </p>
                  <button
                    type="button"
                    onClick={() => applyPrompt(PORTRAIT_PRESET.prompt)}
                    title={PORTRAIT_PRESET.prompt}
                    className={`group/portrait flex w-full flex-col items-start gap-1 rounded-sm border px-4 py-3 text-left transition-colors ${
                      prompt === PORTRAIT_PRESET.prompt
                        ? "border-(--color-amber) bg-(--color-amber)/5"
                        : "border-(--color-line) bg-(--color-surface-2) hover:border-(--color-line-strong)"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-(family-name:--font-display) text-lg italic leading-tight ${
                          prompt === PORTRAIT_PRESET.prompt
                            ? "text-(--color-amber)"
                            : "text-(--color-ink) group-hover/portrait:text-(--color-amber)"
                        }`}
                      >
                        {PORTRAIT_PRESET.name}
                      </span>
                      <span className="rounded-full border border-(--color-amber)/40 bg-(--color-amber)/10 px-1.5 py-0.5 text-[9px] uppercase tracking-[0.2em] text-(--color-amber)">
                        pro lidi
                      </span>
                    </div>
                    <span className="text-[11px] text-(--color-ink-faint)">
                      {PORTRAIT_PRESET.desc}
                    </span>
                  </button>
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-(--color-ink-faint)">
                    Pro situaci
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {SITUATION_PRESETS.map((p) => {
                      const isActive = prompt === p.prompt;
                      return (
                        <button
                          key={p.name}
                          type="button"
                          onClick={() => applyPrompt(p.prompt)}
                          title={p.prompt}
                          className={`group/preset flex flex-col items-start gap-0.5 rounded-sm border px-3 py-2.5 text-left transition-colors ${
                            isActive
                              ? "border-(--color-amber) bg-(--color-amber)/5"
                              : "border-(--color-line) bg-(--color-surface-2) hover:border-(--color-line-strong)"
                          }`}
                        >
                          <span
                            className={`font-(family-name:--font-display) text-base italic leading-tight ${
                              isActive
                                ? "text-(--color-amber)"
                                : "text-(--color-ink) group-hover/preset:text-(--color-amber)"
                            }`}
                          >
                            {p.name}
                          </span>
                          <span className="text-[10px] text-(--color-ink-faint)">
                            {p.desc}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-(--color-ink-faint)">
                    Stylové úpravy
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {STYLE_PRESETS.map((p) => {
                      const isActive = prompt === p.prompt;
                      return (
                        <button
                          key={p.name}
                          type="button"
                          onClick={() => applyPrompt(p.prompt)}
                          title={p.prompt}
                          className={`group/preset flex flex-col items-start gap-0.5 rounded-sm border px-3 py-2.5 text-left transition-colors ${
                            isActive
                              ? "border-(--color-amber) bg-(--color-amber)/5"
                              : "border-(--color-line) bg-(--color-surface-2) hover:border-(--color-line-strong)"
                          }`}
                        >
                          <span
                            className={`font-(family-name:--font-display) text-base italic leading-tight ${
                              isActive
                                ? "text-(--color-amber)"
                                : "text-(--color-ink) group-hover/preset:text-(--color-amber)"
                            }`}
                          >
                            {p.name}
                          </span>
                          <span className="text-[10px] text-(--color-ink-faint)">
                            {p.desc}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-[10px] uppercase tracking-[0.28em] text-(--color-ink-faint)">
                  Pokračovat s...
                </p>
                <div className="flex flex-wrap gap-2">
                  {FOLLOWUP_PROMPTS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => applyPrompt(s)}
                      className="rounded-full border border-(--color-line) bg-(--color-surface-2) px-3 py-1.5 text-xs text-(--color-ink-dim) transition-colors hover:border-(--color-amber) hover:text-(--color-ink)"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-auto flex items-center justify-between gap-4 border-t border-(--color-line) pt-5">
              <span className="text-xs text-(--color-ink-faint)">
                {currentFile
                  ? iteration === 1
                    ? "Připraveno"
                    : `Pracuje se s krokem ${iteration}`
                  : "Nejdřív nahraj fotku"}
              </span>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!canSubmit}
                className="group relative inline-flex items-center gap-2 rounded-sm bg-(--color-amber) px-5 py-2.5 text-sm font-medium text-(--color-bg) transition-all hover:bg-(--color-amber-soft) disabled:cursor-not-allowed disabled:bg-(--color-surface-2) disabled:text-(--color-ink-faint)"
              >
                {status === "submitting" ? (
                  <>
                    <span className="animate-pulse-soft">Pracuje se</span>
                    <Dots />
                  </>
                ) : (
                  <>
                    <span>Odeslat</span>
                    <span className="text-(--color-bg)/60 group-disabled:text-(--color-ink-faint)">
                      ⌘↵
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {errorMsg && (
        <div
          role="alert"
          className="mt-6 flex items-start gap-3 rounded-sm border border-(--color-danger)/40 bg-(--color-danger)/10 px-4 py-3 text-sm text-(--color-danger) animate-fade-up"
        >
          <span className="font-(family-name:--font-display) italic">Hm.</span>
          <span>{errorMsg}</span>
        </div>
      )}

      {resultUrl && currentUrl && (
        <section
          className="mt-16 animate-fade-up"
          style={{ animationDelay: "60ms" }}
        >
          <div className="mb-5 flex items-baseline justify-between">
            <h2 className="font-(family-name:--font-display) text-3xl italic">
              {iteration === 1 ? "Hotovo." : `Krok ${iteration} hotov.`}
            </h2>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={continueEditing}
                className="rounded-sm bg-(--color-amber) px-4 py-2 text-xs font-medium uppercase tracking-wider text-(--color-bg) transition-colors hover:bg-(--color-amber-soft)"
              >
                Uprav dál →
              </button>
              <a
                href={resultUrl}
                download={`opravena-${originalFile?.name ?? "fotka"}`}
                className="rounded-sm border border-(--color-line-strong) px-4 py-2 text-xs uppercase tracking-wider text-(--color-ink-dim) transition-colors hover:border-(--color-amber) hover:text-(--color-amber)"
              >
                Stáhnout
              </a>
              <button
                type="button"
                onClick={reset}
                className="rounded-sm border border-(--color-line-strong) px-4 py-2 text-xs uppercase tracking-wider text-(--color-ink-dim) transition-colors hover:border-(--color-ink) hover:text-(--color-ink)"
              >
                Od začátku
              </button>
            </div>
          </div>

          <BeforeAfterSlider beforeUrl={currentUrl} afterUrl={resultUrl} />

          <p className="mt-3 text-center text-xs text-(--color-ink-faint)">
            Táhni za kolečko nebo klikni kamkoli pro porovnání. Klávesy ← →
            posouvají po 5 %, se Shift po 1 %.
          </p>
        </section>
      )}
    </main>
  );
}

function UploadGlyph() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      className="text-(--color-ink-dim)"
      aria-hidden
    >
      <rect x="6" y="10" width="36" height="28" rx="1" />
      <circle cx="16" cy="20" r="2.5" />
      <path d="M6 32 L18 22 L28 30 L36 24 L42 30" />
    </svg>
  );
}

function Dots() {
  return (
    <span className="inline-flex gap-0.5">
      <span
        className="h-1 w-1 animate-pulse-soft rounded-full bg-current"
        style={{ animationDelay: "0ms" }}
      />
      <span
        className="h-1 w-1 animate-pulse-soft rounded-full bg-current"
        style={{ animationDelay: "200ms" }}
      />
      <span
        className="h-1 w-1 animate-pulse-soft rounded-full bg-current"
        style={{ animationDelay: "400ms" }}
      />
    </span>
  );
}
