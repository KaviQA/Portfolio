import { useRef } from "react";
import { gsap, useGSAP, NO_MOTION_PREF } from "../lib/gsap";
import { metrics } from "../data/resume";

/*
  Proof strip: the resume's headline numbers, straight after the claim the
  hero makes. Numbers count up once as the strip enters view; under reduced
  motion the final values are simply there, because they are rendered in
  the markup.
*/
export function Metrics() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(NO_MOTION_PREF, () => {
        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
          const value = Number(el.dataset.value);
          const prefix = el.dataset.prefix ?? "";
          const suffix = el.dataset.suffix ?? "";
          const state = { n: 0 };
          gsap.to(state, {
            n: value,
            duration: 1.8,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
            onUpdate() {
              el.textContent = `${prefix}${Math.round(state.n)}${suffix}`;
            },
          });
        });
        gsap.from("[data-metric]", {
          y: 30,
          opacity: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ref.current, start: "top 82%" },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} aria-label="Key results" className="border-y border-line-soft">
      <div className="container-page grid grid-cols-2 lg:grid-cols-4">
        {metrics.map((m, i) => (
          <div
            key={m.label}
            data-metric
            className={`py-12 pr-6 md:py-16 ${i > 0 ? "lg:border-l lg:border-line-soft lg:pl-10" : ""} ${
              i % 2 === 1 ? "border-l border-line-soft pl-6 lg:border-l" : ""
            }`}
          >
            <p
              data-count
              data-value={m.value}
              data-prefix={m.prefix}
              data-suffix={m.suffix}
              className="font-mono text-4xl font-medium tracking-tight text-blossom md:text-5xl"
            >
              {m.prefix}
              {m.value}
              {m.suffix}
            </p>
            <p className="mt-3 text-[15px] font-medium text-snow">{m.label}</p>
            <p className="mt-1 text-sm text-faint">{m.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
