// lib/history.ts
//
// IndexedDB wrapper for last edits.

const DB_NAME = "opravfotku";
const DB_VERSION = 1;
const STORE = "history";
const MAX_ENTRIES = 5;

export interface HistoryEntry {
  id: string;
  timestamp: number;
  prompt: string;
  thumbnailDataUrl: string;
  blob: Blob;
  mimeType: string;
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        const store = db.createObjectStore(STORE, { keyPath: "id" });
        store.createIndex("timestamp", "timestamp");
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
    req.onblocked = () => reject(new Error("IndexedDB blocked"));
  });
}

export async function addHistoryEntry(input: {
  prompt: string;
  blob: Blob;
}): Promise<void> {
  const thumbnailDataUrl = await makeThumbnail(input.blob, 256);
  const entry: HistoryEntry = {
    id:
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    timestamp: Date.now(),
    prompt: input.prompt,
    thumbnailDataUrl,
    blob: input.blob,
    mimeType: input.blob.type || "image/jpeg",
  };

  const db = await openDb();

  await new Promise<void>((res, rej) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).add(entry);
    tx.oncomplete = () => res();
    tx.onerror = () => rej(tx.error);
  });

  const all = await listHistoryEntries();
  if (all.length > MAX_ENTRIES) {
    const toRemove = all.slice(MAX_ENTRIES);
    for (const e of toRemove) {
      await removeHistoryEntry(e.id);
    }
  }
}

export async function listHistoryEntries(): Promise<HistoryEntry[]> {
  const db = await openDb();
  return new Promise((res, rej) => {
    const tx = db.transaction(STORE, "readonly");
    const req = tx.objectStore(STORE).getAll();
    req.onsuccess = () => {
      const entries = req.result as HistoryEntry[];
      entries.sort((a, b) => b.timestamp - a.timestamp);
      res(entries);
    };
    req.onerror = () => rej(req.error);
  });
}

export async function removeHistoryEntry(id: string): Promise<void> {
  const db = await openDb();
  return new Promise((res, rej) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).delete(id);
    tx.oncomplete = () => res();
    tx.onerror = () => rej(tx.error);
  });
}

export async function clearHistory(): Promise<void> {
  const db = await openDb();
  return new Promise((res, rej) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).clear();
    tx.oncomplete = () => res();
    tx.onerror = () => rej(tx.error);
  });
}

async function makeThumbnail(blob: Blob, maxSize: number): Promise<string> {
  const url = URL.createObjectURL(blob);
  try {
    const img = await loadImage(url);
    const scale = Math.min(maxSize / img.width, maxSize / img.height, 1);
    const w = Math.max(1, Math.round(img.width * scale));
    const h = Math.max(1, Math.round(img.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas 2D context není dostupný.");
    ctx.drawImage(img, 0, 0, w, h);
    return canvas.toDataURL("image/jpeg", 0.7);
  } finally {
    URL.revokeObjectURL(url);
  }
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((res, rej) => {
    const img = new Image();
    img.onload = () => res(img);
    img.onerror = () => rej(new Error("Nepodařilo se načíst obrázek."));
    img.src = src;
  });
}

/**
 * Locale-aware relative time formatter.
 * Reads templates from a dictionary so each language can phrase it correctly.
 */
export function formatRelativeTime(
  ts: number,
  templates: {
    now: string;
    moment: string;
    minutes: string;
    hours: string;
    day: string;
    days: string;
  },
  now = Date.now(),
): string {
  const diff = Math.max(0, now - ts);
  const sec = Math.floor(diff / 1000);
  if (sec < 30) return templates.now;
  if (sec < 60) return templates.moment;
  const min = Math.floor(sec / 60);
  if (min < 60) return templates.minutes.replace("{n}", String(min));
  const hr = Math.floor(min / 60);
  if (hr < 24) return templates.hours.replace("{n}", String(hr));
  const days = Math.floor(hr / 24);
  if (days === 1) return templates.day;
  if (days < 7) return templates.days.replace("{n}", String(days));
  return new Date(ts).toLocaleDateString();
}
