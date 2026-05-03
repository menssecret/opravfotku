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
};

export type Dict = typeof cs;
