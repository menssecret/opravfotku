export default function KontaktPage() {
  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-12 text-neutral-900">
      <div className="mx-auto max-w-3xl rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
        <div className="mb-4 inline-flex rounded-full border border-neutral-200 bg-neutral-50 px-4 py-1 text-sm text-neutral-600">
          Kontakt
        </div>

        <h1 className="text-3xl font-bold tracking-tight">Kontakt</h1>

        <p className="mt-4 text-neutral-600">
          Máte dotaz ke službě opravfotku.cz, potřebujete pomoc nebo se chcete
          domluvit na spolupráci? Napište nám.
        </p>

        <div className="mt-8 grid gap-4">
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
            <div className="text-sm font-semibold text-neutral-900">E-mail</div>
            <div className="mt-2 text-sm text-neutral-600">
              info@opravfotku.cz
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
            <div className="text-sm font-semibold text-neutral-900">Web</div>
            <div className="mt-2 text-sm text-neutral-600">
              opravfotku.cz
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
            <div className="text-sm font-semibold text-neutral-900">
              Odezva na zprávy
            </div>
            <div className="mt-2 text-sm text-neutral-600">
              Odpověď na dotazy bude doplněna podle budoucího provozu služby.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}