import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ochrana osobních údajů",
  description:
    "Jak nakládáme s nahranými fotografiemi a osobními údaji ve službě opravfotku.",
};

// POZNÁMKA: Tento text popisuje, co aplikace skutečně dělá v aktuální
// implementaci (Next.js + Replicate + IndexedDB historie v prohlížeči).
// Není to právní text vypracovaný advokátem. Před vážnějším komerčním
// nasazením doporučuji konzultovat s právníkem nebo specialistou na GDPR.

export default function PrivacyPage() {
  return (
    <main className="relative z-10 mx-auto max-w-3xl px-6 pt-16 pb-16 sm:px-10 sm:pt-20 lg:px-16">
      <header className="mb-14">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.32em] text-(--color-ink-faint) transition-colors hover:text-(--color-amber)"
        >
          <span>← editor</span>
        </Link>
        <h1
          className="mt-7 font-(family-name:--font-display) text-4xl leading-[1.05] tracking-tight text-balance sm:text-5xl"
        >
          Ochrana <em className="text-(--color-amber)">osobních údajů.</em>
        </h1>
        <p className="mt-7 max-w-xl text-base leading-relaxed text-(--color-ink-dim)">
          Co se děje s fotkou, kterou nahraješ. Stručně, bez právnické vaty.
        </p>
      </header>

      <article className="space-y-10 text-(--color-ink-dim)">
        <Section heading="Co se ti při nahrání fotky stane">
          <p>
            Nahraná fotografie odejde z prohlížeče na server této služby
            (běžící na Vercelu) a odtud k AI poskytovateli Replicate, který
            spustí model FLUX.1 Kontext Pro a vrátí upravenou verzi. Výsledek
            se ti zobrazí v prohlížeči.
          </p>
          <p>
            Fotky se na serveru opravfotku <strong>neukládají</strong>.
            Server je stateless a po vrácení výsledku data zahodí.
          </p>
        </Section>

        <Section heading="Třetí strany">
          <p>
            Pro fungování služby se používají tyto třetí strany:
          </p>
          <ul className="mt-3 space-y-3 list-none">
            <Bullet
              name="Replicate Inc. (USA)"
              detail="Spouští AI model na fotografii. Replicate podle své politiky uchovává vstupní a výstupní obrázky po dobu 1 hodiny pro ladění a poté je maže. Více: replicate.com/privacy"
            />
            <Bullet
              name="Vercel Inc. (USA)"
              detail="Hostuje aplikaci a obsluhuje požadavky. Vercel zpracovává jen technické údaje (IP adresa pro rate limiting, request logy). Více: vercel.com/legal/privacy-policy"
            />
            <Bullet
              name="Black Forest Labs"
              detail="Tvůrce modelu FLUX.1 Kontext Pro, který vlastní úpravu provádí. Model běží v prostředí Replicate, ne přímo na infrastruktuře BFL."
            />
          </ul>
          <p className="mt-3">
            Předání mimo EU (USA): služba zpracovává data ve Spojených státech.
            Replicate i Vercel deklarují soulad s mechanismy přenosu dat podle
            GDPR.
          </p>
        </Section>

        <Section heading="Co se ukládá v tvém prohlížeči">
          <p>
            Aplikace si lokálně v prohlížeči (přes IndexedDB) uchovává{" "}
            <strong>posledních 5 upravených fotek</strong>, abys je mohl rychle
            zobrazit zpátky. Tahle data{" "}
            <strong>neopouští tvé zařízení</strong> a nemá k nim přístup nikdo
            včetně provozovatele.
          </p>
          <p>
            Smazat je můžeš tlačítkem „Smazat vše" v liště historie, nebo
            vymazáním dat stránky v nastavení prohlížeče.
          </p>
        </Section>

        <Section heading="Rate limiting a IP adresa">
          <p>
            Aplikace si dočasně pamatuje tvou IP adresu, aby jeden uživatel
            nemohl vyčerpat veškeré výpočetní zdroje. Limit je 10 úprav za
            hodinu a 30 za den. IP se drží jen v paměti běžícího serveru,
            neukládá se trvale, a po čase (max 24 h) se sama maže.
          </p>
        </Section>

        <Section heading="Tvá práva">
          <p>
            Jako subjekt údajů máš podle GDPR právo na přístup k údajům, opravu,
            výmaz, omezení zpracování, námitku a přenositelnost. Vzhledem k
            tomu, že provozovatel sám žádné fotografie ani identifikační údaje
            neukládá, prakticky se uplatní hlavně v komunikaci s Replicate a
            Vercel jako zpracovateli.
          </p>
          <p>
            Otázky a žádosti směřuj na{" "}
            <a
              href="mailto:info@opravfotku.cz"
              className="text-(--color-amber) underline-offset-4 hover:underline"
            >
              info@opravfotku.cz
            </a>
            .
          </p>
        </Section>

        <Section heading="Co tu není">
          <p>
            Žádné cookies pro reklamu ani analytiku. Žádné tracking pixely.
            Žádné sdílení dat s reklamními sítěmi. Žádné účty, žádná hesla.
          </p>
        </Section>

        <div className="rounded-(--radius-card) border border-(--color-line) bg-(--color-surface) p-5 text-sm">
          Tento text popisuje aktuální technické řešení služby. Pokud najdeš
          něco co nesedí s tvým očekáváním nebo s realitou, napiš na{" "}
          <a
            href="mailto:info@opravfotku.cz"
            className="text-(--color-amber) underline-offset-4 hover:underline"
          >
            info@opravfotku.cz
          </a>
          .
        </div>
      </article>
    </main>
  );
}

function Section({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-(family-name:--font-display) text-2xl italic text-(--color-ink)">
        {heading}
      </h2>
      <div className="mt-4 space-y-3 text-sm leading-relaxed">{children}</div>
    </section>
  );
}

function Bullet({ name, detail }: { name: string; detail: string }) {
  return (
    <li className="flex gap-3 border-l border-(--color-line) pl-4">
      <div>
        <div className="text-(--color-ink)">{name}</div>
        <div className="mt-1 text-xs text-(--color-ink-faint)">{detail}</div>
      </div>
    </li>
  );
}
