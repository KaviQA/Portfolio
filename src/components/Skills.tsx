import { useRef } from "react";
import { useReveal } from "../lib/useReveal";
import { skillGroups } from "../data/resume";

/*
  Asymmetric toolbox: the automation layer, Kavi's differentiator, gets the
  featured tinted panel with a slow-spinning gradient border and drifting
  color orbs behind it; the supporting layers stay quiet typographic
  columns beside it so the one bold move still reads as a choice, not noise.
*/
export function Skills() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  const [featured, ...rest] = skillGroups;
  const dotColors = ["#ffc067", "#66c4ff", "#b98bff"];

  return (
    <section ref={ref} id="stack" className="scroll-mt-24 py-28 md:py-40">
      <style>
        {`
          @property --skills-angle {
            syntax: '<angle>';
            initial-value: 0deg;
            inherits: false;
          }
          @media (prefers-reduced-motion: no-preference) {
            @keyframes skills-spin { to { --skills-angle: 360deg; } }
            @keyframes skills-shimmer { to { background-position: 200% center; } }
            @keyframes skills-orb-a { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(18px,-14px) scale(1.08); } }
            @keyframes skills-orb-b { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-16px,16px) scale(1.1); } }
            .skills-border { animation: skills-spin 7s linear infinite; }
            .skills-shimmer { background-size: 200% auto; animation: skills-shimmer 5s linear infinite alternate; }
            .skills-orb-a { animation: skills-orb-a 9s ease-in-out infinite; }
            .skills-orb-b { animation: skills-orb-b 11s ease-in-out infinite; }
          }
        `}
      </style>

      <div className="container-page">
        <h2
          data-reveal
          className="skills-shimmer bg-gradient-to-r from-blossom via-sky-300 to-violet-300 bg-clip-text text-3xl font-medium tracking-tight text-transparent md:text-5xl"
        >
          Toolbox
        </h2>

        <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-12 md:gap-14">
          {/* Featured panel — spinning conic-gradient border, drifting orbs, glass fill */}
          <div data-reveal className="relative md:col-span-5">
            <div
              className="skills-border pointer-events-none absolute -inset-px rounded-3xl opacity-80"
              style={{
                background:
                  "conic-gradient(from var(--skills-angle, 0deg), #ffc067, #b98bff, #66c4ff, #ffc067)",
              }}
              aria-hidden
            />
            <div className="absolute inset-[1.5px] rounded-3xl bg-[#0c1826]" aria-hidden />

            {/* ambient color orbs, clipped inside the panel */}
            <div className="absolute inset-[1.5px] overflow-hidden rounded-3xl" aria-hidden>
              <div className="skills-orb-a absolute -left-10 -top-10 h-40 w-40 rounded-full bg-blossom/25 blur-3xl" />
              <div className="skills-orb-b absolute -bottom-14 -right-8 h-48 w-48 rounded-full bg-violet-400/20 blur-3xl" />
            </div>

            <div
              className="relative rounded-3xl p-8 md:p-10"
              style={{
                background:
                  "radial-gradient(circle at 20% 0%, rgb(255 192 103 / 0.14) 0%, transparent 55%), linear-gradient(170deg, #132434 0%, #0c1826 100%)",
              }}
            >
              <h3 className="text-xl font-medium tracking-tight text-snow">{featured.title}</h3>
              <p className="mt-1 text-sm text-faint italic">{featured.note}</p>
              <ul className="mt-8 space-y-3.5">
                {featured.items.map((item, i) => (
                  <li key={item} className="group flex items-center gap-3 text-lg text-petal transition-colors duration-300 hover:text-blossom">
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full transition-[width] duration-300 group-hover:w-4"
                      style={{ backgroundColor: dotColors[i % dotColors.length] }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-12 md:col-span-7">
            {rest.map((group) => (
              <div
                key={group.title}
                data-reveal-group="toolbox"
                className="group/col border-t border-line-soft pt-8 transition-colors duration-500 hover:border-blossom/40"
              >
                <div className="flex flex-wrap items-baseline gap-x-4">
                  <h3 className="text-lg font-medium tracking-tight text-snow">{group.title}</h3>
                  <p className="text-sm text-faint italic">{group.note}</p>
                </div>
                <p className="mt-5 max-w-[68ch] text-[17px] leading-[2.1]">
                  {group.items.map((item, i) => (
                    <span key={item}>
                      <span className="text-mist underline decoration-transparent decoration-2 underline-offset-4 transition-all duration-300 hover:text-blossom hover:decoration-blossom/60">
                        {item}
                      </span>
                      {i < group.items.length - 1 && <span className="mx-3 text-faint/50">/</span>}
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
