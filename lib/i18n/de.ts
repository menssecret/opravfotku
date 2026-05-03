// lib/i18n/de.ts

import type { Dict } from "./cs";

export const de: Dict = {
  meta: {
    title: "Foto reparieren",
    description:
      "Bearbeite ein Foto mit einem einzigen Prompt. Keine Ebenen, keine Lineale.",
  },
  header: {
    brand: "fotoreparieren",
    heroLine1: "Repariere",
    heroAccent: "das Foto.",
    heroLine2: "Sag einfach wie.",
    tagline:
      "Lade ein Bild hoch, beschreibe die Änderung. Keine Ebenen, keine Lineale. Nur ein Prompt.",
  },
  upload: {
    dropTitle: "Foto hierher ziehen",
    dropHint: "oder klicken zum Auswählen. JPG, PNG, WebP. Max 10 MB.",
    swap: "Tauschen",
    stepBadge: "Schritt {n}",
    notImage: "Das sieht nicht nach einem Bild aus.",
    tooLarge: "Bild ist größer als 10 MB.",
  },
  prompt: {
    headingFirst: "Was sollen wir tun?",
    headingNext: "Nächste Bearbeitung?",
    placeholderFirst:
      "z. B. „Korrigiere den überbelichteten Himmel und füge warmes Licht auf den Gesichtern hinzu.",
    placeholderNext:
      "z. B. „Etwas mehr Kontrast und eine subtile Vignette hinzufügen.",
    submit: "Senden",
    submitting: "Arbeitet",
    sectionPro: "Professionell",
    sectionForSituation: "Für die Situation",
    sectionStyles: "Stilbearbeitungen",
    sectionContinue: "Weiter mit...",
    badgeForPeople: "für Menschen",
    statusReady: "Bereit",
    statusStep: "Arbeitet an Schritt {n}",
    statusNoFile: "Zuerst ein Foto hochladen",
    error: "Hm.",
    fallbackError: "Etwas ist schief gelaufen.",
    couldNotLoadResult:
      "Konnte das Foto nicht für die weitere Bearbeitung vorbereiten.",
  },
  result: {
    headingFirst: "Fertig.",
    headingStep: "Schritt {n} fertig.",
    continueBtn: "Weiter bearbeiten →",
    download: "Herunterladen",
    fromStart: "Von vorn",
    sliderHintMobile: "Ziehe den Punkt zum Vergleichen.",
    sliderHintDesktop:
      "Ziehe den Punkt oder klicke irgendwo zum Vergleichen. ← → bewegen um 5 %, mit Shift um 1 %.",
    beforeLabel: "Vorher",
    afterLabel: "Nachher",
  },
  history: {
    countOne: "Bearbeitung",
    countMany: "Bearbeitungen",
    label: "Letzte {n} {word}",
    clearAll: "Alles löschen",
    removeOne: "Aus dem Verlauf entfernen",
    relTime: {
      now: "jetzt",
      moment: "gerade eben",
      minutes: "vor {n} Min",
      hours: "vor {n} Std",
      day: "vor 1 Tag",
      days: "vor {n} Tagen",
    },
  },
  presets: {
    portrait: {
      name: "Professionelles Porträt",
      desc: "editorial: Licht, Haut, Augen, Hintergrund",
    },
    situations: {
      vintagePortrait: {
        name: "Vintage-Porträt",
        desc: "Restaurierung alter Fotos von Personen",
      },
      fashion: {
        name: "Fashion Editorial",
        desc: "High-End-Magazin-Look",
      },
      landscape: { name: "Landschaft", desc: "Natur, Berge, Szenerie" },
      product: { name: "Produktfoto", desc: "E-Shop, Marketing" },
      realEstate: { name: "Immobilie", desc: "Objekt, Innenraum" },
      foodie: { name: "Foodie", desc: "Essen, Restaurant" },
    },
    styles: {
      bw: { name: "Schwarz-Weiß", desc: "Klassik, Kontrast" },
      vintageFilm: { name: "Vintage-Film", desc: "1970er" },
      cinematic: { name: "Cinematic", desc: "Teal & Orange" },
      oilPainting: { name: "Ölgemälde", desc: "Pinselstriche" },
      ghibli: { name: "Studio Ghibli", desc: "handgemalt" },
      restore: { name: "Restaurieren", desc: "allgemeine Fotorestaurierung" },
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
    sectionPages: "Seiten",
    sectionStack: "Gebaut mit",
    linkEditor: "Editor",
    linkKontakt: "Kontakt",
    linkPrivacy: "Datenschutz",
    tagline:
      "Fotobearbeitung mit einem einzigen Prompt. Keine Ebenen, keine Lineale.",
    motto: "Made with intent, not with templates.",
    languageLabel: "Sprache",
  },
};
