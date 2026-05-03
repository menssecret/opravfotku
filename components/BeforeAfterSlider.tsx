"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type TouchEvent as ReactTouchEvent,
} from "react";

type Props = {
  beforeUrl: string;
  afterUrl: string;
  beforeLabel?: string;
  afterLabel?: string;
};

export function BeforeAfterSlider({
  beforeUrl,
  afterUrl,
  beforeLabel = "Před",
  afterLabel = "Po",
}: Props) {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    function onMouseMove(e: globalThis.MouseEvent) {
      e.preventDefault();
      updateFromClientX(e.clientX);
    }
    function onTouchMove(e: globalThis.TouchEvent) {
      if (e.touches.length === 0) return;
      // Při aktivním dragu blokujeme scroll stránky
      e.preventDefault();
      updateFromClientX(e.touches[0].clientX);
    }
    function onUp() {
      setIsDragging(false);
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onUp);
    // passive: false ať můžeme volat preventDefault na iOS
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onUp);
    window.addEventListener("touchcancel", onUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onUp);
      window.removeEventListener("touchcancel", onUp);
    };
  }, [isDragging, updateFromClientX]);

  function handleMouseDown(e: ReactMouseEvent) {
    e.preventDefault();
    updateFromClientX(e.clientX);
    setIsDragging(true);
  }

  function handleTouchStart(e: ReactTouchEvent) {
    if (e.touches.length === 0) return;
    updateFromClientX(e.touches[0].clientX);
    setIsDragging(true);
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPosition((p) => Math.max(0, p - (e.shiftKey ? 1 : 5)));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPosition((p) => Math.min(100, p + (e.shiftKey ? 1 : 5)));
    } else if (e.key === "Home") {
      e.preventDefault();
      setPosition(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setPosition(100);
    }
  }

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="slider"
      aria-label="Porovnání před a po"
      aria-valuenow={Math.round(position)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="group relative grid w-full cursor-ew-resize touch-none select-none overflow-hidden rounded-(--radius-card) border border-(--color-amber)/40 bg-(--color-surface) focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-amber)"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={beforeUrl}
        alt={beforeLabel}
        draggable={false}
        className="pointer-events-none block h-auto w-full select-none"
        style={{ gridArea: "1 / 1" }}
      />

      <div
        className="pointer-events-none overflow-hidden"
        style={{
          gridArea: "1 / 1",
          clipPath: `inset(0 ${100 - position}% 0 0)`,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={afterUrl}
          alt={afterLabel}
          draggable={false}
          className="block h-auto w-full select-none"
        />
      </div>

      <span
        className="pointer-events-none absolute left-2 top-2 z-10 rounded-full bg-(--color-bg)/75 px-2 py-1 text-[10px] uppercase tracking-[0.28em] text-(--color-amber) backdrop-blur sm:left-3 sm:top-3 sm:px-2.5"
        style={{ opacity: position > 8 ? 1 : 0, transition: "opacity 150ms" }}
      >
        {afterLabel}
      </span>
      <span
        className="pointer-events-none absolute right-2 top-2 z-10 rounded-full bg-(--color-bg)/75 px-2 py-1 text-[10px] uppercase tracking-[0.28em] text-(--color-ink-dim) backdrop-blur sm:right-3 sm:top-3 sm:px-2.5"
        style={{ opacity: position < 92 ? 1 : 0, transition: "opacity 150ms" }}
      >
        {beforeLabel}
      </span>

      <div
        className="pointer-events-none absolute bottom-0 top-0 w-px bg-(--color-amber)"
        style={{ left: `${position}%` }}
      />

      {/* Větší handle na mobilu (52px) než na desktopu (44px) */}
      <div
        className="pointer-events-none absolute top-1/2 flex h-13 w-13 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-(--color-amber) bg-(--color-bg)/85 text-(--color-amber) shadow-[0_0_24px_rgba(217,119,87,0.25)] backdrop-blur transition-transform group-hover:scale-110 sm:h-11 sm:w-11"
        style={{
          left: `${position}%`,
          transform: `translate(-50%, -50%) ${isDragging ? "scale(1.1)" : ""}`,
          width: "var(--handle-size, 52px)",
          height: "var(--handle-size, 52px)",
        }}
      >
        <HandleGlyph />
      </div>

      <span className="pointer-events-none absolute bottom-3 left-1/2 hidden -translate-x-1/2 rounded-full bg-(--color-bg)/75 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-(--color-ink-faint) opacity-0 backdrop-blur transition-opacity group-focus-within:opacity-100 sm:block">
        ← →
      </span>
    </div>
  );
}

function HandleGlyph() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5.5 3 L2 7 L5.5 11" />
      <path d="M8.5 3 L12 7 L8.5 11" />
    </svg>
  );
}
