import { useRef } from "react";
import { gsap, useGSAP, NO_MOTION_PREF } from "../lib/gsap";
import { useReveal } from "../lib/useReveal";
import { experience } from "../data/resume";

/*
  Two roles, told like chapters: the role meta stays pinned on the left
  while the work scrolls by on the right. A blossom filament grows down the
  rail as the reader moves through the years.
*/
export function Experience() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(NO_MOTION_PREF, () => {
        gsap.fromTo(
          "[data-rail-fill]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: "[data-rail]",
              start: "top 65%",
              end: "bottom 55%",
              scrub: 0.6,
            },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="experience" className="scroll-mt-24 py-28 md:py-40">
      <div className="container-page">
        <h2 data-reveal className="text-3xl font-medium tracking-tight text-snow md:text-5xl">
          Experience
        </h2>

        <div data-rail className="relative mt-16 md:mt-24">
          {/* rail */}
          <div aria-hidden="true" className="absolute top-0 bottom-0 left-0 hidden w-px bg-line-soft md:block">
            <div
              data-rail-fill
              className="h-full w-full origin-top bg-gradient-to-b from-blossom via-petal to-transparent"
            />
          </div>

          <div className="space-y-28 md:pl-16">
            {experience.map((role) => (
              <article key={role.company} className="grid gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
                <header className="md:sticky md:top-28 md:self-start">
                  <p data-reveal className="font-mono text-xs tracking-wide text-faint">
                    {role.period}
                  </p>
                  <h3 data-reveal className="mt-3 text-2xl font-medium tracking-tight text-snow md:text-3xl">
                    {role.company}
                  </h3>
                  <p data-reveal className="mt-1 text-[15px] font-medium text-blossom">
                    {role.title}
                  </p>
                  <p data-reveal className="mt-5 max-w-[38ch] leading-relaxed text-mist">
                    {role.summary}
                  </p>
                  <ul data-reveal className="mt-6 flex flex-wrap gap-2">
                    {role.chips.map((chip) => (
                      <li
                        key={chip}
                        className="rounded-lg border border-line px-2.5 py-1 font-mono text-xs text-petal"
                      >
                        {chip}
                      </li>
                    ))}
                  </ul>
                </header>

                <div className="space-y-7">
                  {role.points.map((point, i) => (
                    <p
                      key={i}
                      data-reveal-group={role.company}
                      className="max-w-[62ch] leading-relaxed text-mist [&>strong]:font-medium [&>strong]:text-snow"
                    >
                      {point}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
