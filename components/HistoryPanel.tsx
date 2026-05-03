"use client";

import { useEffect, useState } from "react";
import { formatRelativeTime, type HistoryEntry } from "@/lib/history";
import type { Locale } from "@/lib/i18n/config";
import { tFormat, type Dict } from "@/lib/i18n/dictionaries";

type Props = {
  entries: HistoryEntry[];
  onSelect: (entry: HistoryEntry) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
  dict: Dict;
  locale: Locale;
};

export function HistoryPanel({
  entries,
  onSelect,
  onRemove,
  onClear,
  dict,
}: Props) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(t);
  }, []);

  if (entries.length === 0) return null;

  const word =
    entries.length === 1 ? dict.history.countOne : dict.history.countMany;

  return (
    <section className="mb-10 animate-fade-up" aria-label="History">
      <div className="mb-3 flex items-baseline justify-between">
        <p className="text-[10px] uppercase tracking-[0.28em] text-(--color-ink-faint)">
          {tFormat(dict.history.label, { n: entries.length, word })}
        </p>
        <button
          type="button"
          onClick={onClear}
          className="text-[10px] uppercase tracking-[0.28em] text-(--color-ink-faint) transition-colors hover:text-(--color-danger)"
        >
          {dict.history.clearAll}
        </button>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:thin]">
        {entries.map((entry) => (
          <article
            key={entry.id}
            className="group relative shrink-0"
            title={entry.prompt}
          >
            <button
              type="button"
              onClick={() => onSelect(entry)}
              className="block w-32 overflow-hidden rounded-(--radius-card) border border-(--color-line) bg-(--color-surface) text-left transition-colors hover:border-(--color-amber)"
            >
              <div className="aspect-square overflow-hidden bg-(--color-bg)">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={entry.thumbnailDataUrl}
                  alt={entry.prompt}
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              </div>
              <div className="px-2.5 py-2">
                <p className="line-clamp-2 text-[11px] leading-snug text-(--color-ink-dim)">
                  {entry.prompt}
                </p>
                <p className="mt-1 text-[10px] text-(--color-ink-faint)">
                  {formatRelativeTime(entry.timestamp, dict.history.relTime, now)}
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRemove(entry.id);
              }}
              aria-label={dict.history.removeOne}
              className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full border border-(--color-line-strong) bg-(--color-bg)/80 text-(--color-ink-dim) opacity-0 backdrop-blur transition-all hover:border-(--color-danger) hover:text-(--color-danger) group-hover:opacity-100 focus-visible:opacity-100"
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                aria-hidden
              >
                <path d="M2 2 L8 8 M8 2 L2 8" />
              </svg>
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}