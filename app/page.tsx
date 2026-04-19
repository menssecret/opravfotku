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
    description: "AI sama vybere nejlepší kombinaci oprav pro fotografii.",
  },
  {
    id: "restore",
    title: "Opravit poškození",
    description: "Zaměřeno na škrábance, fleky, prach a drobná poškození.",
  },
  {
    id: "colorize",
    title: "Obarvit černobílou",
    description: "Přidá přirozenější barvy starým černobílým fotografiím.",
  },
  {
    id: "upscale",
    title: "Zvýšit kvalitu",
    description: "Zlepší ostrost a připraví fotku pro větší zobrazení.",
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
      setLoading(true);
      setErrorMessage(null);
      setOriginalUrl(null);
      setResultUrl(null);
      setSlider(50);

      setStep("uploading");

      const formData = new FormData();
      formData.append("file", file);
      formData.append("mode", mode);

      await new Promise((resolve) => setTimeout(resolve, 300));

      const uploadRes = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        throw new Error(`Upload failed: ${uploadRes.status}`);
      }

      setStep("analyzing");
      await new Promise((resolve) => setTimeout(resolve, 400));

      const uploadData = await uploadRes.json();

      const statusRes = await fetch(
        `http://localhost:8000/status/${uploadData.job_id}`
      );

      if (!statusRes.ok) {
        throw new Error(`Status failed: ${statusRes.status}`);
      }

      setStep("restoring");
      await new Promise((resolve) => setTimeout(resolve, 500));

      const statusData = await statusRes.json();

      if (statusData.status === "error") {
        throw new Error(statusData.error || "AI processing failed");
      }

      if (statusData.original) {
        setOriginalUrl(`http://localhost:8000${statusData.original}`);
      }

      if (statusData.result) {
        setResultUrl(`http://localhost:8000${statusData.result}`);
      }

      setStep("finalizing");
      await new Promise((resolve) => setTimeout(resolve, 300));

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
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-4 py-10">
        <div className="mx-auto w-full max-w-3xl text-center">
          <div className="mb-4 inline-flex rounded-full border border-neutral-200 bg-white px-4 py-1 text-sm text-neutral-600">
            AI oprava starých a poškozených fotografií
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            opravfotku.cz
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base text-neutral-600 sm:text-lg">
            Obarvení černobílých fotografií, oprava škrábanců a poškození,
            zlepšení ostrosti a kvality. Jednoduše nahraj fotku a nech ji opravit.
          </p>
        </div>

        <div className="mx-auto mt-10 w-full max-w-3xl rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
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

        {originalUrl && resultUrl && (
          <div className="mx-auto mt-10 w-full max-w-5xl rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h3 className="text-lg font-semibold">Porovnání před a po</h3>
              <a
                href={resultUrl}
                download
                className="rounded-2xl bg-black px-5 py-3 text-sm font-medium text-white hover:bg-neutral-800"
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
          </div>
        )}
      </section>
    </main>
  );
}