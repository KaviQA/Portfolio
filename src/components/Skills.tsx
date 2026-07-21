import { useRef } from "react";
import { useReveal } from "../lib/useReveal";
import { skillGroups } from "../data/resume";

/*
  Asymmetric toolbox: the agents layer, David's differentiator, gets the
  featured tinted panel; the supporting layers read as quiet typographic
  columns beside it.
*/
export function Skills() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  const [featured, ...rest] = skillGroups;

  return (
    <section ref={ref} id="stack" className="scroll-mt-24 py-28 md:py-40">
      <div className="container-page">
        <h2 data-reveal className="text-3xl font-medium tracking-tight text-snow md:text-5xl">
          Toolbox
        </h2>

        <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-12 md:gap-14">
          <div
            data-reveal
            className="rounded-3xl border border-blossom/25 p-8 md:col-span-5 md:p-10"
            style={{
              background:
                "radial-gradient(circle at 20% 0%, rgb(255 192 103 / 0.12) 0%, transparent 55%), linear-gradient(170deg, #132434 0%, #0c1826 100%)",
            }}
          >
            <h3 className="text-xl font-medium tracking-tight text-snow">{featured.title}</h3>
            <p className="mt-1 text-sm text-faint italic">{featured.note}</p>
            <ul className="mt-8 space-y-3.5">
              {featured.items.map((item) => (
                <li key={item} className="text-lg text-petal transition-colors duration-300 hover:text-blossom">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-12 md:col-span-7">
            {rest.map((group) => (
              <div key={group.title} data-reveal-group="toolbox" className="border-t border-line-soft pt-8">
                <div className="flex flex-wrap items-baseline gap-x-4">
                  <h3 className="text-lg font-medium tracking-tight text-snow">{group.title}</h3>
                  <p className="text-sm text-faint italic">{group.note}</p>
                </div>
                <p className="mt-5 max-w-[68ch] text-[17px] leading-[2.1]">
                  {group.items.map((item, i) => (
                    <span key={item}>
                      <span className="text-mist transition-colors duration-300 hover:text-blossom">{item}</span>
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
