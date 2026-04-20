"use client";

import { useRef, useState } from "react";

type ProcessStep =
  | "idle"
  | "uploading"
  | "analyzing"
  | "restoring"
  | "finalizing"
  | "done"
  | "error";

type Mode = "auto" | "restore" | "colorize" | "upscale";

const MODE_OPTIONS: {
  id: Mode;
  title: string;
  description: string;
}[] = [
  {
    id: "auto",
    title: "Automatická oprava",
    description: "AI zvolí nejlepší kombinaci úprav podle nahrané fotografie.",
  },
  {
    id: "restore",
    title: "Opravit poškození",
    description: "Odstranění škrábanců, prachu, fleků a drobných poškození.",
  },
  {
    id: "colorize",
    title: "Obarvit černobílou",
    description: "Doplnění přirozenějších barev u starých černobílých fotografií.",
  },
  {
    id: "upscale",
    title: "Zvýšit kvalitu",
    description: "Zlepšení ostrosti a příprava fotografie pro větší zobrazení.",
  },
];

const FAQ_ITEMS = [
  {
    question: "Jaké formáty fotografií podporujete?",
    answer: "Momentálně podporujeme JPG, PNG a WEBP.",
  },
  {
    question: "Musím se registrovat?",
    answer: "Ne. Stránka je navržená tak, aby bylo použití co nejjednodušší.",
  },
  {
    question: "Jak dlouho oprava trvá?",
    answer: "Obvykle jen krátkou chvíli. Doba závisí na velikosti fotografie a zvoleném režimu.",
  },
  {
    question: "Funguje stránka i na mobilu?",
    answer: "Ano. opravfotku.cz je navržená pro desktop i mobilní použití.",
  },
];

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [mode, setMode] = useState<Mode>("auto");
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [slider, setSlider] = useState(50);
  const [step, setStep] = useState<ProcessStep>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  function getStepText(currentStep: ProcessStep) {
    switch (currentStep) {
      case "uploading":
        return "Nahráváme fotografii...";
      case "analyzing":
        return "Analyzujeme fotografii...";
      case "restoring":
        return "AI upravuje výsledek...";
      case "finalizing":
        return "Dokončujeme výsledek...";
      case "done":
        return "Hotovo";
      case "error":
        return "Došlo k chybě";
      default:
        return "";
    }
  }

  function getStepProgress(currentStep: ProcessStep) {
    switch (currentStep) {
      case "uploading":
        return 20;
      case "analyzing":
        return 45;
      case "restoring":
        return 75;
      case "finalizing":
        return 95;
      case "done":
        return 100;
      case "error":
        return 100;
      default:
        return 0;
    }
  }

  async function handleUpload() {
    if (!file) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      if (!apiUrl) {
        throw new Error("Chybí NEXT_PUBLIC_API_URL");
      }

      setLoading(true);
      setErrorMessage(null);
      setOriginalUrl(null);
      setResultUrl(null);
      setSlider(50);
      setStep("uploading");

      const formData = new FormData();
      formData.append("file", file);
      formData.append("mode", mode);

      await new Promise((resolve) => setTimeout(resolve, 250));

      const uploadRes = await fetch(`${apiUrl}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        throw new Error(`Upload failed: ${uploadRes.status}`);
      }

      setStep("analyzing");
      await new Promise((resolve) => setTimeout(resolve, 350));

      const uploadData = await uploadRes.json();

      const statusRes = await fetch(`${apiUrl}/status/${uploadData.job_id}`);

      if (!statusRes.ok) {
        throw new Error(`Status failed: ${statusRes.status}`);
      }

      setStep("restoring");
      await new Promise((resolve) => setTimeout(resolve, 450));

      const statusData = await statusRes.json();

      if (statusData.status === "error") {
        throw new Error(statusData.error || "AI processing failed");
      }

      if (statusData.original) {
        setOriginalUrl(`${apiUrl}${statusData.original}`);
      }

      if (statusData.result) {
        setResultUrl(`${apiUrl}${statusData.result}`);
      }

      setStep("finalizing");
      await new Promise((resolve) => setTimeout(resolve, 250));

      setStep("done");
    } catch (error) {
      console.error("Upload error:", error);
      setStep("error");
      setErrorMessage("Nepodařilo se zpracovat fotografii. Zkus to prosím znovu.");
    } finally {
      setLoading(false);
    }
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0] || null;
    if (droppedFile) {
      setFile(droppedFile);
      setErrorMessage(null);
    }
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  const selectedMode = MODE_OPTIONS.find((item) => item.id === mode);

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mx-auto flex max-w-6xl items-center justify-between py-4">
          <div className="text-xl font-semibold tracking-tight">opravfotku.cz</div>
          <div className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-600">
            Online AI oprava fotografií
          </div>
        </header>

        <section className="mx-auto mt-10 grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="mb-4 inline-flex rounded-full border border-neutral-200 bg-white px-4 py-1 text-sm text-neutral-600">
              Oprava starých, poškozených i černobílých fotografií
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Opravte staré a poškozené fotografie během chvíle
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-600 sm:text-lg">
              Nahrajte fotografii a nechte AI vylepšit její vzhled. Stránka pomůže s
              opravou poškození, obarvením černobílých snímků i zvýšením kvality.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                <div className="text-sm font-semibold">Jednoduché použití</div>
                <div className="mt-1 text-sm text-neutral-500">
                  Nahraj, oprav, stáhni.
                </div>
              </div>
              <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                <div className="text-sm font-semibold">Desktop i mobil</div>
                <div className="mt-1 text-sm text-neutral-500">
                  Funguje pohodlně i v telefonu.
                </div>
              </div>
              <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                <div className="text-sm font-semibold">Rychlý výsledek</div>
                <div className="mt-1 text-sm text-neutral-500">
                  Výsledek uvidíte během krátké chvíle.
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => inputRef.current?.click()}
              className="cursor-pointer rounded-2xl border-2 border-dashed border-neutral-300 bg-neutral-50 p-10 text-center transition hover:border-neutral-500 hover:bg-neutral-100"
            >
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const selectedFile = e.target.files?.[0] || null;
                  setFile(selectedFile);
                  setErrorMessage(null);
                }}
                className="hidden"
              />

              <div className="text-5xl">📷</div>
              <h2 className="mt-4 text-xl font-semibold">Nahraj fotografii</h2>
              <p className="mt-2 text-neutral-600">
                Klikni sem nebo přetáhni soubor myší
              </p>
              <p className="mt-2 text-sm text-neutral-400">JPG, PNG, WEBP</p>
              <p className="mt-2 text-xs text-neutral-400">
                Maximální velikost souboru: 10 MB
              </p>
            </div>

            <div className="mt-5 text-center text-sm text-neutral-500">
              {file ? `Vybraný soubor: ${file.name}` : "Zatím není vybraná žádná fotka"}
            </div>

            <div className="mt-8">
              <h3 className="mb-3 text-left text-sm font-medium text-neutral-700">
                Vyber režim opravy
              </h3>

              <div className="grid gap-3 sm:grid-cols-2">
                {MODE_OPTIONS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setMode(item.id)}
                    className={`rounded-2xl border p-4 text-left transition ${
                      mode === item.id
                        ? "border-black bg-black text-white"
                        : "border-neutral-300 bg-white text-neutral-800 hover:border-neutral-500"
                    }`}
                  >
                    <div className="text-sm font-semibold">{item.title}</div>
                    <div
                      className={`mt-1 text-sm ${
                        mode === item.id ? "text-neutral-200" : "text-neutral-500"
                      }`}
                    >
                      {item.description}
                    </div>
                  </button>
                ))}
              </div>

              {selectedMode && (
                <div className="mt-4 rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-600">
                  Vybraný režim:{" "}
                  <span className="font-semibold text-neutral-900">
                    {selectedMode.title}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={handleUpload}
                disabled={!file || loading}
                className={`rounded-2xl px-6 py-3 text-sm font-medium text-white transition ${
                  !file || loading
                    ? "cursor-not-allowed bg-neutral-400"
                    : "bg-black hover:bg-neutral-800"
                }`}
              >
                {loading ? "Probíhá oprava..." : "Nahrát a opravit"}
              </button>
            </div>

            {(loading || step === "done" || step === "error") && (
              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between text-sm text-neutral-600">
                  <span>{getStepText(step)}</span>
                  <span>{getStepProgress(step)}%</span>
                </div>

                <div className="h-3 w-full overflow-hidden rounded-full bg-neutral-200">
                  <div
                    className="h-full rounded-full bg-black transition-all duration-300"
                    style={{ width: `${getStepProgress(step)}%` }}
                  />
                </div>
              </div>
            )}

            {errorMessage && (
              <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {errorMessage}
              </div>
            )}
          </div>
        </section>

        <section className="mx-auto mt-20 grid max-w-6xl gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="text-lg font-semibold">1. Nahrajte fotografii</div>
            <p className="mt-2 text-sm leading-6 text-neutral-600">
              Vyberte obrázek z počítače nebo mobilu a nahrajte jej přímo do aplikace.
            </p>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="text-lg font-semibold">2. Vyberte typ opravy</div>
            <p className="mt-2 text-sm leading-6 text-neutral-600">
              Zvolte automatickou opravu, odstranění poškození, obarvení nebo zvýšení kvality.
            </p>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="text-lg font-semibold">3. Stáhněte výsledek</div>
            <p className="mt-2 text-sm leading-6 text-neutral-600">
              Porovnejte původní a upravenou verzi a uložte si výsledek do zařízení.
            </p>
          </div>
        </section>

        {originalUrl && resultUrl && (
          <section className="mx-auto mt-20 w-full max-w-6xl rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-lg font-semibold">Porovnání před a po</h3>
              <a
                href={resultUrl}
                download
                className="inline-flex items-center justify-center rounded-2xl bg-black px-5 py-3 text-sm font-medium text-white hover:bg-neutral-800"
              >
                Stáhnout výsledek
              </a>
            </div>

            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={originalUrl}
                alt="Původní fotografie"
                className="block w-full object-contain"
              />

              <div
                className="absolute inset-y-0 left-0 overflow-hidden"
                style={{ width: `${slider}%` }}
              >
                <img
                  src={resultUrl}
                  alt="Opravená fotografie"
                  className="block h-full w-full object-cover"
                  style={{ width: "100%", minWidth: "100%" }}
                />
              </div>

              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow"
                style={{ left: `${slider}%`, transform: "translateX(-50%)" }}
              >
                <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white text-sm shadow">
                  ↔
                </div>
              </div>

              <div className="absolute left-4 top-4 rounded-full bg-black/70 px-3 py-1 text-xs text-white">
                Po
              </div>

              <div className="absolute right-4 top-4 rounded-full bg-black/70 px-3 py-1 text-xs text-white">
                Před
              </div>
            </div>

            <div className="mt-6">
              <input
                type="range"
                min="0"
                max="100"
                value={slider}
                onChange={(e) => setSlider(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </section>
        )}
        <section className="mx-auto mt-20 max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight">Ukázky výsledků</h2>
            <p className="mt-3 text-neutral-600">
              Příklady oprav starých a poškozených fotografií.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
    
            {/* KARTA 1 */}
            <div className="rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm">
              <div className="relative overflow-hidden rounded-xl">
                <img src="/demo/before1.jpg" className="w-full" />
                <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  Před
                </div>
              </div>

              <div className="mt-3 text-sm text-neutral-600">
                Odstranění škrábanců a prachu
              </div>
            </div>

            {/* KARTA 2 */}
            <div className="rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm">
              <div className="relative overflow-hidden rounded-xl">
                <img src="/demo/after1.jpg" className="w-full" />
                <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  Po
                </div>
              </div>

              <div className="mt-3 text-sm text-neutral-600">
                Vylepšená kvalita a ostrost
              </div>
            </div>

            {/* KARTA 3 */}
            <div className="rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm">
              <div className="relative overflow-hidden rounded-xl">
                <img src="/demo/color.jpg" className="w-full" />
                <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  Colorize
                </div>
              </div>

              <div className="mt-3 text-sm text-neutral-600">
                Obarvení černobílé fotografie
              </div>
            </div>

          </div>
        </section>
        <section className="mx-auto mt-20 max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight">Časté otázky</h2>
            <p className="mt-3 text-neutral-600">
              Vše důležité přehledně na jednom místě.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {FAQ_ITEMS.map((item) => (
              <div
                key={item.question}
                className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-base font-semibold">{item.question}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        <footer className="mx-auto mt-20 w-full max-w-6xl border-t border-neutral-200 pt-8 text-center text-sm text-neutral-500">
          <div className="font-medium text-neutral-700">opravfotku.cz</div>
          <p className="mt-2">
            Jednoduchá online AI oprava fotografií pro desktop i mobil.
          </p>
          <p className="mt-2">© 2026 opravfotku.cz</p>
          <p className="mt-2">Kontakt: info@opravfotku.cz</p>
          <p className="mt-2">Kontakt bude doplněn</p>
        </footer>
      </section>
    </main>
  );
}