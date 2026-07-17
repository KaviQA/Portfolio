import { useRef } from "react";
import { gsap, useGSAP, NO_MOTION_PREF } from "../lib/gsap";
import { useReveal } from "../lib/useReveal";
import { projects, type Project } from "../data/resume";

/*
  Sticky project stack: each card holds the viewport while the next slides
  over it; the outgoing card settles back and dims, like a page being
  covered. Under reduced motion the cards still stack via position: sticky,
  just without the scale choreography.
*/

const VISUALS: Record<Project["visual"], { style: React.CSSProperties; className?: string }> = {
  rings: {
    style: {
      background: [
        "radial-gradient(circle at 68% 42%, rgb(213 243 216 / 0.26) 0%, transparent 46%)",
        "repeating-radial-gradient(circle at 68% 42%, rgb(213 243 216 / 0.18) 0px, rgb(213 243 216 / 0.18) 1px, transparent 1px, transparent 52px)",
        "linear-gradient(160deg, #241722 0%, #1a0f16 100%)",
      ].join(", "),
    },
  },
  graph: {
    style: {
      background: [
        "radial-gradient(circle at 35% 55%, rgb(255 183 197 / 0.22) 0%, transparent 50%)",
        "radial-gradient(rgb(255 183 197 / 0.30) 1.2px, transparent 1.6px)",
        "linear-gradient(200deg, #261320 0%, #180d14 100%)",
      ].join(", "),
      backgroundSize: "auto, 30px 30px, auto",
    },
  },
  scan: {
    style: {
      background: [
        "radial-gradient(circle at 60% 30%, rgb(242 199 199 / 0.20) 0%, transparent 52%)",
        "repeating-linear-gradient(0deg, rgb(255 255 255 / 0.05) 0px, rgb(255 255 255 / 0.05) 1px, transparent 1px, transparent 9px)",
        "linear-gradient(180deg, #221420 0%, #170c12 100%)",
      ].join(", "),
    },
  },
};

export function Projects() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(NO_MOTION_PREF, () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-stack-card]");
        cards.forEach((card, i) => {
          if (i === cards.length - 1) return;
          gsap.to(card.querySelector("[data-card-inner]"), {
            scale: 0.93,
            opacity: 0.4,
            ease: "none",
            scrollTrigger: {
              trigger: cards[i + 1],
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          });
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="work" className="scroll-mt-24 pt-28 md:pt-40">
      <div className="container-page">
        <h2 data-reveal className="text-3xl font-medium tracking-tight text-snow md:text-5xl">
          Selected work
        </h2>
        <p data-reveal className="mt-5 max-w-[52ch] leading-relaxed text-mist">
          Three builds, owned end to end: retrieval, orchestration, backend, and deploy.
        </p>
      </div>

      <div className="relative mt-10">
        {projects.map((project) => (
          <div key={project.name} data-stack-card className="sticky top-0 flex min-h-[100dvh] items-center">
            <div className="container-page">
              <article
                data-card-inner
                className="grid max-h-[86dvh] overflow-hidden rounded-3xl border border-line bg-ink-raised lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]"
              >
                <div className="p-8 md:p-14">
                  <p className="font-mono text-xs tracking-wide text-faint">{project.period}</p>
                  <h3 className="mt-4 text-3xl font-medium tracking-tight text-snow md:text-4xl">
                    {project.name}
                  </h3>
                  <p className="mt-4 max-w-[52ch] leading-relaxed text-mist">{project.tagline}</p>
                  <ul className="mt-8 space-y-4">
                    {project.points.map((point, i) => (
                      <li key={i} className="max-w-[56ch] text-sm leading-relaxed text-mist">
                        {point}
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-9 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-lg border border-line px-2.5 py-1 font-mono text-xs text-mist"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  aria-hidden="true"
                  className="hidden min-h-[280px] lg:block"
                  style={VISUALS[project.visual].style}
                />
              </article>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
