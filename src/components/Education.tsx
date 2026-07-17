import { useRef } from "react";
import { useReveal } from "../lib/useReveal";
import { education, languages } from "../data/resume";

export function Education() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} className="border-t border-line-soft py-24 md:py-32">
      <div className="container-page grid gap-14 md:grid-cols-12">
        <div className="md:col-span-7">
          <h2 data-reveal className="text-2xl font-medium tracking-tight text-snow md:text-3xl">
            Education
          </h2>
          <div className="mt-10 space-y-9">
            {education.map((e) => (
              <div key={e.school} data-reveal-group="education">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="text-lg font-medium text-snow">{e.school}</h3>
                  <p className="font-mono text-xs text-faint">{e.period}</p>
                </div>
                <p className="mt-1 max-w-[48ch] text-[15px] text-mist">{e.program}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-4 md:col-start-9">
          <h2 data-reveal className="text-2xl font-medium tracking-tight text-snow md:text-3xl">
            Languages
          </h2>
          <ul className="mt-10 space-y-4">
            {languages.map((lang) => (
              <li key={lang} data-reveal-group="languages" className="text-lg text-mist">
                {lang}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
