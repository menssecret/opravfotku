// lib/i18n/cs.ts

export const cs = {
  meta: {
    title: "Oprav fotku",
    description:
      "Uprav fotku pomocí jednoho promptu. Bez vrstev, bez pravítek.",
  },
  header: {
    brand: "opravfotku",
    heroLine1: "Oprav",
    heroAccent: "fotku.",
    heroLine2: "Stačí říct jak.",
    tagline:
      "Nahraj snímek, napiš co s ním. Žádné vrstvy, žádná pravítka. Jen prompt.",
  },
  upload: {
    dropTitle: "Přetáhni fotku sem",
    dropHint: "nebo klikni a vyber. JPG, PNG, WebP. Max 10 MB.",
    swap: "Vyměnit",
    stepBadge: "krok {n}",
    notImage: "Tohle nevypadá jako obrázek.",
    tooLarge: "Obrázek je větší než 10 MB.",
  },
  prompt: {
    headingFirst: "Co s tím uděláme?",
    headingNext: "Další úprava?",
    placeholderFirst:
      "e.g. „Fix the overexposed sky and add warm light to faces.",
    placeholderNext:
      "e.g. „Increase contrast a bit and add a subtle vignette.",
    submit: "Odeslat",
    submitting: "Pracuje se",
    sectionPro: "Profesionální",
    sectionForSituation: "Pro situaci",
    sectionStyles: "Stylové úpravy",
    sectionContinue: "Pokračovat s...",
    badgeForPeople: "pro lidi",
    statusReady: "Připraveno",
    statusStep: "Pracuje se s krokem {n}",
    statusNoFile: "Nejdřív nahraj fotku",
    error: "Hm.",
    fallbackError: "Něco se pokazilo.",
    couldNotLoadResult: "Nepodařilo se připravit fotku k další úpravě.",
  },
  result: {
    headingFirst: "Hotovo.",
    headingStep: "Krok {n} hotov.",
    continueBtn: "Uprav dál →",
    download: "Stáhnout",
    fromStart: "Od začátku",
    sliderHintMobile: "Táhni za kolečko pro porovnání.",
    sliderHintDesktop:
      "Táhni za kolečko nebo klikni kamkoli pro porovnání. Klávesy ← → posouvají po 5 %, se Shift po 1 %.",
    beforeLabel: "Před",
    afterLabel: "Po",
  },
  history: {
    countOne: "úprava",
    countMany: "úprav",
    label: "Posledních {n} {word}",
    clearAll: "Smazat vše",
    removeOne: "Smazat z historie",
    relTime: {
      now: "teď",
      moment: "před chvílí",
      minutes: "před {n} min",
      hours: "před {n} h",
      day: "před 1 dnem",
      days: "před {n} dny",
    },
  },
  presets: {
    portrait: {
      name: "Profesionální portrét",
      desc: "editorial úprava: světlo, pleť, oči, pozadí",
    },
    situations: {
      vintagePortrait: {
        name: "Vintage portrét",
        desc: "obnova starých fotek lidí",
      },
      fashion: { name: "Fashion editorial", desc: "magazínový high-end look" },
      landscape: { name: "Krajinka", desc: "příroda, krajina, hory" },
      product: { name: "Produktová fotka", desc: "e-shop, marketing" },
      realEstate: { name: "Real estate", desc: "nemovitosti, interiér" },
      foodie: { name: "Foodie", desc: "jídlo, restaurace" },
    },
    styles: {
      bw: { name: "Černobílá", desc: "klasika, kontrast" },
      vintageFilm: { name: "Vintage film", desc: "70. léta" },
      cinematic: { name: "Cinematic", desc: "teal & orange" },
      oilPainting: { name: "Olejomalba", desc: "tahy štětcem" },
      ghibli: { name: "Studio Ghibli", desc: "ručně malovaná" },
      restore: { name: "Restaurace", desc: "obnova obecné fotky" },
    },
    followups: [
      "Increase contrast and saturation",
      "Add subtle film grain",
      "Crop tighter on the subject",
      "Soften the highlights",
      "Apply a warmer tone",
    ],
  },
  footer: {
    sectionPages: "Stránky",
    sectionStack: "Postaveno na",
    linkEditor: "Editor",
    linkKontakt: "Kontakt",
    linkPrivacy: "Ochrana osobních údajů",
    tagline: "Úprava fotek pomocí jednoho promptu. Bez vrstev, bez pravítek.",
    motto: "Made with intent, not with templates.",
    languageLabel: "Jazyk",
  },
  kontakt: {
    title: "Kontakt",
    titleAccent: "Kontakt.",
    backToEditor: "← editor",
    description:
      "Dotazy, technické problémy, návrhy, hlášení chyb. Napiš na e-mail.",
    metaDescription:
      "Dotazy ke službě opravfotku, technické dotazy, ochrana osobních údajů.",
    emailLabel: "E-mail",
    responseLabel: "Odezva",
    responseText:
      "Tohle je osobní projekt, ne komerční služba. Odpovídám zpravidla do několika dní.",
    bugLabel: "Něco nefunguje?",
    bugText:
      "Pošli prosím popis problému, použitý prompt, a ideálně screenshot chybové hlášky. Pomůže to s rychlejší diagnostikou.",
  },
  privacy: {
    title: "Ochrana",
    titleAccent: "osobních údajů.",
    backToEditor: "← editor",
    description:
      "Co se děje s fotkou, kterou nahraješ. Stručně, bez právnické vaty.",
    metaDescription:
      "Jak nakládáme s nahranými fotografiemi a osobními údaji ve službě opravfotku.",
    sections: {
      whatHappens: {
        heading: "Co se ti při nahrání fotky stane",
        body: [
          "Nahraná fotografie odejde z prohlížeče na server této služby (běžící na Vercelu) a odtud k AI poskytovateli Replicate, který spustí model FLUX.1 Kontext Pro a vrátí upravenou verzi. Výsledek se ti zobrazí v prohlížeči.",
          "Fotky se na serveru opravfotku **neukládají**. Server je stateless a po vrácení výsledku data zahodí.",
        ],
      },
      thirdParties: {
        heading: "Třetí strany",
        intro: "Pro fungování služby se používají tyto třetí strany:",
        items: [
          {
            name: "Replicate Inc. (USA)",
            detail:
              "Spouští AI model na fotografii. Replicate podle své politiky uchovává vstupní a výstupní obrázky po dobu 1 hodiny pro ladění a poté je maže. Více: replicate.com/privacy",
          },
          {
            name: "Vercel Inc. (USA)",
            detail:
              "Hostuje aplikaci a obsluhuje požadavky. Vercel zpracovává jen technické údaje (IP adresa pro rate limiting, request logy). Více: vercel.com/legal/privacy-policy",
          },
          {
            name: "Black Forest Labs",
            detail:
              "Tvůrce modelu FLUX.1 Kontext Pro, který vlastní úpravu provádí. Model běží v prostředí Replicate, ne přímo na infrastruktuře BFL.",
          },
        ],
        outro:
          "Předání mimo EU (USA): služba zpracovává data ve Spojených státech. Replicate i Vercel deklarují soulad s mechanismy přenosu dat podle GDPR.",
      },
      browserStorage: {
        heading: "Co se ukládá v tvém prohlížeči",
        body: [
          "Aplikace si lokálně v prohlížeči (přes IndexedDB) uchovává **posledních 5 upravených fotek**, abys je mohl rychle zobrazit zpátky. Tahle data **neopouští tvé zařízení** a nemá k nim přístup nikdo včetně provozovatele.",
          "Smazat je můžeš tlačítkem „Smazat vše“ v liště historie, nebo vymazáním dat stránky v nastavení prohlížeče.",
        ],
      },
      rateLimit: {
        heading: "Rate limiting a IP adresa",
        body: [
          "Aplikace si dočasně pamatuje tvou IP adresu, aby jeden uživatel nemohl vyčerpat veškeré výpočetní zdroje. Limit je 10 úprav za hodinu a 30 za den. IP se drží jen v paměti běžícího serveru, neukládá se trvale, a po čase (max 24 h) se sama maže.",
        ],
      },
      rights: {
        heading: "Tvá práva",
        body: [
          "Jako subjekt údajů máš podle GDPR právo na přístup k údajům, opravu, výmaz, omezení zpracování, námitku a přenositelnost. Vzhledem k tomu, že provozovatel sám žádné fotografie ani identifikační údaje neukládá, prakticky se uplatní hlavně v komunikaci s Replicate a Vercel jako zpracovateli.",
          "Otázky a žádosti směřuj na **info@opravfotku.cz**.",
        ],
      },
      whatsNotHere: {
        heading: "Co tu není",
        body: [
          "Žádné cookies pro reklamu ani analytiku. Žádné tracking pixely. Žádné sdílení dat s reklamními sítěmi. Žádné účty, žádná hesla.",
        ],
      },
    },
    footer:
      "Tento text popisuje aktuální technické řešení služby. Pokud najdeš něco co nesedí s tvým očekáváním nebo s realitou, napiš na **info@opravfotku.cz**.",
  },
};

export type Dict = typeof cs;
