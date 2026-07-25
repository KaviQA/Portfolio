import { useRef } from "react";
import { gsap, useGSAP, NO_MOTION_PREF } from "../lib/gsap";
import { useReveal } from "../lib/useReveal";
import { projects } from "../data/resume";
import { ProjectVisual } from "./ProjectVisual";

/*
  Sticky project stack: each card holds the viewport while the next slides
  over it; the outgoing card settles back and dims, like a page being
  covered. Under reduced motion the cards still stack via position: sticky,
  just without the scale choreography.

  v2: each card carries one of three accent colors (gold/sky/violet in
  rotation) that shows up as a soft glow along its top edge — a quiet way
  to keep six different projects from reading as one repeating template.
*/
const ACCENTS = [
  { glow: "rgba(255,192,103,0.35)", ring: "rgba(255,192,103,0.35)" },
  { glow: "rgba(102,196,255,0.3)", ring: "rgba(102,196,255,0.3)" },
  { glow: "rgba(185,139,255,0.3)", ring: "rgba(185,139,255,0.3)" },
];

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
          Projects
        </h2>
        <p data-reveal className="mt-5 max-w-[52ch] leading-relaxed text-mist">
          Here are a few highlights of my work, covering different domains and technical challenges I’ve been fortunate to solve.
        </p>
      </div>

      <div className="relative mt-10">
        {projects.map((project, i) => {
          const accent = ACCENTS[i % ACCENTS.length];
          return (
            <div key={project.name} data-stack-card className="sticky top-0 flex min-h-[100dvh] items-center">
              <div className="container-page">
                <article
                  data-card-inner
                  className="grid max-h-[86dvh] overflow-hidden rounded-3xl border border-line bg-ink-raised transition-shadow duration-500 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]"
                  style={{ boxShadow: `0 -1px 0 0 ${accent.ring}, 0 40px 90px -40px ${accent.glow}` }}
                >
                  <div className="p-8 md:p-14">
                    <p className="font-mono text-xs tracking-wide text-faint">{project.period}</p>
                    <h3 className="mt-4 text-3xl font-medium tracking-tight text-snow md:text-4xl">
                      {project.name}
                    </h3>
                    <p className="mt-4 max-w-[52ch] leading-relaxed text-mist">{project.tagline}</p>
                    <ul className="mt-8 space-y-4">
                      {project.points.map((point, pi) => (
                        <li key={pi} className="max-w-[56ch] text-sm leading-relaxed text-mist">
                          {point}
                        </li>
                      ))}
                    </ul>
                    <ul className="mt-9 flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-lg border border-line px-2.5 py-1 font-mono text-xs text-mist transition-colors duration-300 hover:border-line-soft hover:text-snow"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div aria-hidden="true" className="hidden min-h-[280px] overflow-hidden lg:block">
                    <ProjectVisual variant={project.visual} />
                  </div>
                </article>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
