"use client";

import { useLayoutEffect, useRef } from "react";

const KEY = "miniread:homeScroll";

export default function ScrollMemory() {
  const restored = useRef(false);

  // Save the offset only when leaving for an article, since that's the trip
  // we want to come back from.
  useLayoutEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented) return;
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }

      const a = (e.target as HTMLElement)?.closest?.("a");
      if (!a || a.target === "_blank") return;
      if (!a.getAttribute("href")?.startsWith("/article/")) return;

      sessionStorage.setItem(KEY, String(window.scrollY));
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Restore once, then clear the key so a normal visit still starts at the top.
  useLayoutEffect(() => {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return;
    sessionStorage.removeItem(KEY);

    const y = Number(raw);
    if (!y) return;

    let frame = 0;
    const tick = () => {
      window.scrollTo(0, y);

      // The server HTML may still be streaming, so the document can be too
      // short for y to stick yet. Retry until it holds or we give up.
      if (!restored.current && ++frame < 90 && window.scrollY < y - 4) {
        requestAnimationFrame(tick);
      } else {
        restored.current = true;
      }
    };

    tick();
  }, []);

  return null;
}