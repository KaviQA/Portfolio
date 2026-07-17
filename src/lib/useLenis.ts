import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";

let lenis: Lenis | null = null;

/** Smooth-scroll to an in-page anchor, falling back to native scroll. */
export function scrollToAnchor(hash: string) {
  const target = document.querySelector(hash);
  if (!target) return;
  if (lenis) {
    lenis.scrollTo(target as HTMLElement, { offset: -72, duration: 1.4 });
  } else {
    (target as HTMLElement).scrollIntoView({ behavior: "smooth" });
  }
}

/**
 * Lenis smooth scroll driven by the GSAP ticker so ScrollTrigger and the
 * scroll position never disagree. Skipped entirely under reduced motion.
 */
export function useLenis() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    lenis = new Lenis({ lerp: 0.11 });
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis?.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis?.destroy();
      lenis = null;
    };
  }, []);
}
