export default function KontaktPage() {
  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-12 text-neutral-900">
      <div className="mx-auto max-w-3xl rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold tracking-tight">Kontakt</h1>
        <p className="mt-4 text-neutral-600">
          Máte dotaz k fungování služby opravfotku.cz nebo potřebujete pomoc?
        </p>

        <div className="mt-8 space-y-4 text-sm leading-7 text-neutral-700">
          <p>
            <strong>E-mail:</strong> info@opravfotku.cz
          </p>
          <p>
            <strong>Web:</strong> opravfotku.cz
          </p>
          <p>
            Odpověď na dotazy bude doplněna podle budoucího provozu služby.
          </p>
        </div>
      </div>
    </main>
  );
}