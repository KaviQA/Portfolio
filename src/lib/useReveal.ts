import type { RefObject } from "react";
import { gsap, useGSAP, NO_MOTION_PREF } from "./gsap";

const EASE_IN = "expo.out";
const EASE_POP = "back.out(1.6)";

/**
 * Animates every `[data-reveal]` descendant of `scope` as it enters the
 * viewport. v2 upgrades the plain "rise" into a fuller entrance — scale,
 * blur, and a touch of rotation — and lets any element opt into a slow,
 * continuous float once it has landed via `data-float`.
 *
 * Elements sharing a `data-reveal-group` value stagger together with a
 * springy `back.out` ease so the group feels like it's popping into place
 * rather than just fading up.
 *
 * Content stays visible when reduced motion is on — every tween here
 * animates FROM a hidden state, and the whole thing lives inside the
 * `NO_MOTION_PREF` matchMedia branch, so with reduced motion set nothing
 * ever leaves its final, fully-visible position.
 */
export function useReveal(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(NO_MOTION_PREF, () => {
        const singles = gsap.utils.toArray<HTMLElement>("[data-reveal]:not([data-reveal-group])");
        singles.forEach((el) => {
          gsap.from(el, {
            y: 46,
            scale: 0.94,
            opacity: 0,
            filter: "blur(10px)",
            duration: 1.15,
            ease: EASE_IN,
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
          els.forEach((el, i) => {
            const dir = i % 2 === 0 ? -1 : 1;
            gsap.from(el, {
              y: 40,
              opacity: 0,
              scale: 0.92,
              rotate: 2.5 * dir,
              filter: "blur(8px)",
              duration: 1,
              ease: EASE_POP,
              delay: i * 0.09,
              scrollTrigger: { trigger: els[0], start: "top 85%" },
            });
          });
        });

        // Elements that ask for it get a gentle infinite float once the
        // page has settled — a light "ambient life" pass, not a distraction.
        const floaters = gsap.utils.toArray<HTMLElement>("[data-float]");
        floaters.forEach((el, i) => {
          gsap.to(el, {
            y: "+=10",
            duration: 2.6 + (i % 3) * 0.4,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: 0.6 + i * 0.15,
          });
        });
      });
    },
    { scope },
  );
}