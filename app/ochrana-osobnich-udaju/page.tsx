export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-12 text-neutral-900">
      <div className="mx-auto max-w-4xl rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
        <div className="mb-4 inline-flex rounded-full border border-neutral-200 bg-neutral-50 px-4 py-1 text-sm text-neutral-600">
          Ochrana osobních údajů
        </div>

        <h1 className="text-3xl font-bold tracking-tight">
          Ochrana osobních údajů
        </h1>

        <div className="mt-8 space-y-8 text-sm leading-7 text-neutral-700">
          <section>
            <h2 className="text-lg font-semibold text-neutral-900">
              Jaká data zpracováváme
            </h2>
            <p className="mt-2">
              Při použití služby může dojít ke zpracování nahrané fotografie a
              technických údajů nezbytných pro vytvoření výsledku a zajištění
              fungování služby.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">
              Za jakým účelem
            </h2>
            <p className="mt-2">
              Nahrané fotografie jsou používány výhradně pro vytvoření upravené
              verze obrázku a pro technické zajištění služby opravfotku.cz.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">
              Doba uchování
            </h2>
            <p className="mt-2">
              Soubory by měly být uchovávány pouze po nezbytně nutnou dobu pro
              zpracování a doručení výsledku. Před ostrým spuštěním je vhodné
              doplnit přesnou dobu uchování podle skutečného provozu služby.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">
              Předávání třetím stranám
            </h2>
            <p className="mt-2">
              V závislosti na technickém řešení může být pro zpracování využit
              externí poskytovatel výpočetních nebo hostingových služeb. Před
              ostrým spuštěním je vhodné tuto část doplnit podle skutečně
              použitých nástrojů.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">Kontakt</h2>
            <p className="mt-2">
              V případě dotazů ke zpracování údajů nás můžete kontaktovat na:
              info@opravfotku.cz
            </p>
          </section>

          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 text-neutral-600">
            Tento text je základní pracovní verze a před ostrým spuštěním je
            vhodné jej doplnit podle skutečného provozu služby a právních
            požadavků.
          </div>
        </div>
      </div>
    </main>
  );
}