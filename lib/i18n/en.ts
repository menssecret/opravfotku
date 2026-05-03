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
};
