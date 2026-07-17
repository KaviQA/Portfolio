import type { RefObject } from "react";
import { gsap, useGSAP, EASE, NO_MOTION_PREF } from "./gsap";

/**
 * Animates every `[data-reveal]` descendant of `scope` as it enters the
 * viewport: a soft rise with expo easing. Elements sharing a
 * `data-reveal-group` value stagger together. Content stays visible when
 * reduced motion is on (we only ever animate FROM a hidden state inside the
 * media query).
 */
export function useReveal(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(NO_MOTION_PREF, () => {
        const singles = gsap.utils.toArray<HTMLElement>("[data-reveal]:not([data-reveal-group])");
        singles.forEach((el) => {
          gsap.from(el, {
            y: 42,
            opacity: 0,
            duration: 1.1,
            ease: EASE,
            scrollTrigger: { trigger: el, start: "top 85%" },
          });
        });

        const grouped = gsap.utils.toArray<HTMLElement>("[data-reveal-group]");
        const groups = new Map<string, HTMLElement[]>();
        grouped.forEach((el) => {
          const key = el.dataset.revealGroup!;
          groups.set(key, [...(groups.get(key) ?? []), el]);
        });
        groups.forEach((els) => {
          gsap.from(els, {
            y: 36,
            opacity: 0,
            duration: 1,
            ease: EASE,
            stagger: 0.09,
            scrollTrigger: { trigger: els[0], start: "top 85%" },
          });
        });
      });
    },
    { scope },
  );
}
