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
  kontakt: {
    title: "Kontakt",
    titleAccent: "Kontakt.",
    backToEditor: "← editor",
    description:
      "Fragen, technische Probleme, Vorschläge, Fehlerberichte. Schreib eine E-Mail.",
    metaDescription:
      "Kontakt für Fragen zum Service, technische Probleme, Datenschutz.",
    emailLabel: "E-Mail",
    responseLabel: "Antwortzeit",
    responseText:
      "Dies ist ein persönliches Projekt, kein kommerzieller Dienst. Ich antworte üblicherweise innerhalb weniger Tage.",
    bugLabel: "Etwas funktioniert nicht?",
    bugText:
      "Bitte sende eine Beschreibung des Problems, den verwendeten Prompt und idealerweise einen Screenshot der Fehlermeldung. Das hilft bei der schnelleren Diagnose.",
  },
  privacy: {
    title: "Daten",
    titleAccent: "schutz.",
    backToEditor: "← editor",
    description:
      "Was mit dem Foto passiert, das du hochlädst. Kurz, ohne Juristendeutsch.",
    metaDescription:
      "Wie wir mit hochgeladenen Fotos und persönlichen Daten umgehen.",
    sections: {
      whatHappens: {
        heading: "Was beim Upload eines Fotos passiert",
        body: [
          "Das hochgeladene Foto verlässt den Browser, geht zum Server dieses Dienstes (auf Vercel) und von dort zum KI-Anbieter Replicate, der das Modell FLUX.1 Kontext Pro startet und die bearbeitete Version zurückgibt. Das Ergebnis wird dann im Browser angezeigt.",
          "Fotos werden auf dem opravfotku-Server **nicht gespeichert**. Der Server ist stateless und verwirft die Daten, sobald das Ergebnis zurückgegeben wurde.",
        ],
      },
      thirdParties: {
        heading: "Dritte Parteien",
        intro: "Folgende Dritte werden für den Betrieb des Dienstes verwendet:",
        items: [
          {
            name: "Replicate Inc. (USA)",
            detail:
              "Führt das KI-Modell auf dem Foto aus. Laut seiner Richtlinie speichert Replicate Eingabe- und Ausgabebilder für 1 Stunde zu Debugging-Zwecken und löscht sie dann. Mehr: replicate.com/privacy",
          },
          {
            name: "Vercel Inc. (USA)",
            detail:
              "Hostet die Anwendung und bedient Anfragen. Vercel verarbeitet nur technische Daten (IP-Adresse für Rate Limiting, Anfrage-Logs). Mehr: vercel.com/legal/privacy-policy",
          },
          {
            name: "Black Forest Labs",
            detail:
              "Hersteller des Modells FLUX.1 Kontext Pro, das die eigentliche Bearbeitung durchführt. Das Modell läuft in Replicates Umgebung, nicht direkt bei BFL.",
          },
        ],
        outro:
          "Übermittlung außerhalb der EU (USA): Der Dienst verarbeitet Daten in den Vereinigten Staaten. Sowohl Replicate als auch Vercel erklären die Einhaltung der DSGVO-Datenübertragungsmechanismen.",
      },
      browserStorage: {
        heading: "Was in deinem Browser gespeichert wird",
        body: [
          "Die Anwendung speichert lokal in deinem Browser (über IndexedDB) **die letzten 5 bearbeiteten Fotos**, damit du sie schnell wieder aufrufen kannst. Diese Daten **verlassen dein Gerät nicht** und niemand — auch nicht der Betreiber — hat Zugriff darauf.",
          "Du kannst sie über die Schaltfläche „Alles löschen“ in der Verlaufsleiste löschen, oder indem du die Webseitendaten in den Browsereinstellungen löschst.",
        ],
      },
      rateLimit: {
        heading: "Rate Limiting und IP-Adresse",
        body: [
          "Die Anwendung merkt sich vorübergehend deine IP-Adresse, damit ein einzelner Benutzer nicht alle Rechenressourcen ausschöpfen kann. Das Limit beträgt 10 Bearbeitungen pro Stunde und 30 pro Tag. IPs werden nur im Speicher des laufenden Servers gehalten, nicht persistiert, und löschen sich nach maximal 24 Stunden selbst.",
        ],
      },
      rights: {
        heading: "Deine Rechte",
        body: [
          "Als betroffene Person nach DSGVO hast du die Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Widerspruch und Datenübertragbarkeit. Da der Betreiber selbst keine Fotos oder identifizierende Daten speichert, werden diese Rechte hauptsächlich in der Kommunikation mit Replicate und Vercel als Auftragsverarbeiter wahrgenommen.",
          "Fragen und Anträge richte an **info@opravfotku.cz**.",
        ],
      },
      whatsNotHere: {
        heading: "Was hier nicht ist",
        body: [
          "Keine Cookies für Werbung oder Analytik. Keine Tracking-Pixel. Keine Datenfreigabe an Werbenetzwerke. Keine Konten, keine Passwörter.",
        ],
      },
    },
    footer:
      "Dieser Text beschreibt die aktuelle technische Umsetzung des Dienstes. Wenn du etwas findest, das nicht deinen Erwartungen oder der Realität entspricht, schreibe an **info@opravfotku.cz**.",
  },
};
