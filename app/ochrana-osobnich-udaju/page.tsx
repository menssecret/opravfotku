export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-12 text-neutral-900">
      <div className="mx-auto max-w-4xl rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold tracking-tight">
          Ochrana osobních údajů
        </h1>

        <div className="mt-6 space-y-6 text-sm leading-7 text-neutral-700">
          <p>
            Tato stránka slouží jako základní informace o zpracování fotografií
            a souvisejících údajů při používání služby opravfotku.cz.
          </p>

          <section>
            <h2 className="text-lg font-semibold">Jaká data zpracováváme</h2>
            <p className="mt-2">
              Při použití služby může dojít ke zpracování nahrané fotografie a
              technických údajů nutných pro vytvoření výsledku.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">Za jakým účelem</h2>
            <p className="mt-2">
              Fotografie jsou používány výhradně za účelem vytvoření upravené
              verze obrázku a zajištění fungování služby.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">Doba uchování</h2>
            <p className="mt-2">
              Nahrané soubory by měly být uchovávány pouze po nezbytně nutnou
              dobu pro zpracování a doručení výsledku.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">Kontakt</h2>
            <p className="mt-2">
              V případě dotazů ke zpracování údajů nás můžete kontaktovat na:
              info@opravfotku.cz
            </p>
          </section>

          <p className="text-neutral-500">
            Tento text je základní pracovní verze a před ostrým spuštěním je
            vhodné jej doplnit podle skutečného provozu služby.
          </p>
        </div>
      </div>
    </main>
  );
}