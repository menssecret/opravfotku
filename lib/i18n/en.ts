// lib/i18n/en.ts

import type { Dict } from "./cs";

export const en: Dict = {
  meta: {
    title: "Fix the photo",
    description:
      "Edit a photo with a single prompt. No layers, no rulers.",
  },
  header: {
    brand: "fixthephoto",
    heroLine1: "Fix",
    heroAccent: "the photo.",
    heroLine2: "Just say how.",
    tagline:
      "Upload an image, describe the change. No layers, no rulers. Just a prompt.",
  },
  upload: {
    dropTitle: "Drop a photo here",
    dropHint: "or click to choose. JPG, PNG, WebP. Max 10 MB.",
    swap: "Swap",
    stepBadge: "step {n}",
    notImage: "That doesn't look like an image.",
    tooLarge: "Image is larger than 10 MB.",
  },
  prompt: {
    headingFirst: "What shall we do?",
    headingNext: "Next edit?",
    placeholderFirst:
      "e.g. „Fix the overexposed sky and add warm light to faces.",
    placeholderNext:
      "e.g. „Increase contrast a bit and add a subtle vignette.",
    submit: "Send",
    submitting: "Working",
    sectionPro: "Professional",
    sectionForSituation: "For the situation",
    sectionStyles: "Stylistic edits",
    sectionContinue: "Continue with...",
    badgeForPeople: "for people",
    statusReady: "Ready",
    statusStep: "Working on step {n}",
    statusNoFile: "Upload a photo first",
    error: "Hmm.",
    fallbackError: "Something went wrong.",
    couldNotLoadResult: "Couldn't prepare the photo for further editing.",
  },
  result: {
    headingFirst: "Done.",
    headingStep: "Step {n} done.",
    continueBtn: "Edit further →",
    download: "Download",
    fromStart: "Start over",
    sliderHintMobile: "Drag the dot to compare.",
    sliderHintDesktop:
      "Drag the dot or click anywhere to compare. Use ← → to move by 5 %, Shift to move by 1 %.",
    beforeLabel: "Before",
    afterLabel: "After",
  },
  history: {
    countOne: "edit",
    countMany: "edits",
    label: "Last {n} {word}",
    clearAll: "Clear all",
    removeOne: "Remove from history",
    relTime: {
      now: "now",
      moment: "a moment ago",
      minutes: "{n} min ago",
      hours: "{n} h ago",
      day: "1 day ago",
      days: "{n} days ago",
    },
  },
  presets: {
    portrait: {
      name: "Professional portrait",
      desc: "editorial: lighting, skin, eyes, background",
    },
    situations: {
      vintagePortrait: {
        name: "Vintage portrait",
        desc: "restoration of old photos of people",
      },
      fashion: { name: "Fashion editorial", desc: "magazine high-end look" },
      landscape: { name: "Landscape", desc: "nature, mountains, scenery" },
      product: { name: "Product shot", desc: "e-commerce, marketing" },
      realEstate: { name: "Real estate", desc: "property, interior" },
      foodie: { name: "Foodie", desc: "food, restaurant" },
    },
    styles: {
      bw: { name: "Black & white", desc: "classic, high contrast" },
      vintageFilm: { name: "Vintage film", desc: "1970s" },
      cinematic: { name: "Cinematic", desc: "teal & orange" },
      oilPainting: { name: "Oil painting", desc: "brush strokes" },
      ghibli: { name: "Studio Ghibli", desc: "hand-painted" },
      restore: { name: "Restore", desc: "general photo restoration" },
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
    sectionPages: "Pages",
    sectionStack: "Built with",
    linkEditor: "Editor",
    linkKontakt: "Contact",
    linkPrivacy: "Privacy",
    tagline: "Photo editing with a single prompt. No layers, no rulers.",
    motto: "Made with intent, not with templates.",
    languageLabel: "Language",
  },
  kontakt: {
    title: "Contact",
    titleAccent: "Contact.",
    backToEditor: "← editor",
    description:
      "Questions, technical issues, suggestions, bug reports. Drop an email.",
    metaDescription:
      "Contact for questions about the service, technical issues, privacy.",
    emailLabel: "E-mail",
    responseLabel: "Response time",
    responseText:
      "This is a personal project, not a commercial service. I usually reply within a few days.",
    bugLabel: "Something not working?",
    bugText:
      "Please send a description of the problem, the prompt you used, and ideally a screenshot of the error message. It helps with faster diagnosis.",
  },
  privacy: {
    title: "Privacy",
    titleAccent: "policy.",
    backToEditor: "← editor",
    description:
      "What happens to a photo you upload. Brief, without the legal jargon.",
    metaDescription:
      "How we handle uploaded photos and personal data on the service.",
    sections: {
      whatHappens: {
        heading: "What happens when you upload a photo",
        body: [
          "Your uploaded photo leaves the browser, goes to the service's server (running on Vercel), and from there to AI provider Replicate, which runs the FLUX.1 Kontext Pro model and returns the edited version. The result is then shown in your browser.",
          "Photos are **not stored** on the opravfotku server. The server is stateless and discards the data once the result has been returned.",
        ],
      },
      thirdParties: {
        heading: "Third parties",
        intro: "These third parties are used to run the service:",
        items: [
          {
            name: "Replicate Inc. (USA)",
            detail:
              "Runs the AI model on your photo. According to its policy, Replicate retains input and output images for 1 hour for debugging purposes and then deletes them. More: replicate.com/privacy",
          },
          {
            name: "Vercel Inc. (USA)",
            detail:
              "Hosts the application and serves requests. Vercel processes only technical data (IP address for rate limiting, request logs). More: vercel.com/legal/privacy-policy",
          },
          {
            name: "Black Forest Labs",
            detail:
              "Creator of the FLUX.1 Kontext Pro model that performs the actual edit. The model runs on Replicate's infrastructure, not directly on BFL's.",
          },
        ],
        outro:
          "Transfer outside the EU (USA): the service processes data in the United States. Both Replicate and Vercel state compliance with GDPR data transfer mechanisms.",
      },
      browserStorage: {
        heading: "What's stored in your browser",
        body: [
          "The application keeps **the last 5 edited photos** locally in your browser (via IndexedDB) so you can quickly revisit them. This data **never leaves your device** and no one — including the operator — has access to it.",
          'You can clear it via the "Clear all" button in the history bar, or by clearing site data in your browser settings.',
        ],
      },
      rateLimit: {
        heading: "Rate limiting and IP address",
        body: [
          "The application temporarily remembers your IP address so a single user can't exhaust all compute resources. The limit is 10 edits per hour and 30 per day. IPs are kept only in the running server's memory, are not persisted, and self-erase after at most 24 hours.",
        ],
      },
      rights: {
        heading: "Your rights",
        body: [
          "As a data subject under GDPR, you have rights of access, rectification, erasure, restriction, objection, and portability. Since the operator itself doesn't store any photos or identifying data, these rights are exercised primarily in communication with Replicate and Vercel as data processors.",
          "Direct questions and requests to **info@opravfotku.cz**.",
        ],
      },
      whatsNotHere: {
        heading: "What's not here",
        body: [
          "No cookies for advertising or analytics. No tracking pixels. No sharing of data with ad networks. No accounts, no passwords.",
        ],
      },
    },
    footer:
      "This text describes the current technical implementation of the service. If you find anything that doesn't match your expectations or the reality, write to **info@opravfotku.cz**.",
  },
};
