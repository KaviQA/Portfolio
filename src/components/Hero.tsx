import { useRef } from 'react';
import { gsap, SplitText, useGSAP, NO_MOTION_PREF } from '../lib/gsap';
import { PetalCanvas } from './PetalCanvas';
import { Magnetic } from './Magnetic';
import { handleAnchor } from './Nav';

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(NO_MOTION_PREF, () => {
        // Headline rises out of masked lines; the rest of the hero follows.
        // Storytelling order: name, statement, proof, action.
        SplitText.create('[data-hero-headline]', {
          type: 'lines',
          mask: 'lines',
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 115,
              duration: 1.3,
              ease: 'power4.out',
              stagger: 0.09,
              delay: 0.35,
            }),
        });
        gsap.from('[data-hero-fade]', {
          y: 26,
          opacity: 0,
          duration: 1.1,
          ease: 'power4.out',
          stagger: 0.12,
          delay: 0.75,
        });
        gsap.from('[data-hero-canvas]', {
          opacity: 0,
          duration: 2,
          ease: 'power2.inOut',
        });
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100dvh] items-center overflow-hidden"
    >
      {/* atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-1/4 right-[-10%] h-[70vmax] w-[70vmax] rounded-full opacity-[0.13]"
        style={{
          background: 'radial-gradient(circle, #ffc067 0%, transparent 62%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-30%] left-[-15%] h-[55vmax] w-[55vmax] rounded-full opacity-[0.05]"
        style={{
          background: 'radial-gradient(circle, #66f4ff 0%, transparent 60%)',
        }}
      />
      <div data-hero-canvas className="absolute inset-0">
        <PetalCanvas className="h-full w-full" />
      </div>

      <div className="container-page relative pt-24 pb-20">
        <p
          data-hero-fade
          className="font-mono text-xs tracking-[0.22em] text-mist uppercase"
        >
          Kavi B · Quality Analyst
        </p>

        <h1
          data-hero-headline
          className="mt-6 max-w-[12ch] text-[clamp(3rem,9vw,7rem)] leading-[1.02] font-medium tracking-[-0.035em] text-snow"
        >
          I deliver quality that <em className="text-blossom italic">ships</em>.
        </h1>

        <p
          data-hero-fade
          className="mt-8 max-w-[44ch] text-lg leading-relaxed text-mist"
        >
          6+ years of Software Testing experience (Manual & Automation) across
          retail, supply-chain, e-commerce and education domains.
        </p>

        <div data-hero-fade className="mt-11 flex flex-wrap items-center gap-4">
          <Magnetic>
            <a
              href="#work"
              onClick={handleAnchor}
              className="inline-flex items-center rounded-full bg-blossom px-7 py-3.5 text-[15px] font-semibold text-ink transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
            >
              View work
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#contact"
              onClick={handleAnchor}
              className="inline-flex items-center rounded-full border border-line px-7 py-3.5 text-[15px] font-medium text-snow transition-colors duration-300 hover:border-blossom/50 hover:bg-blossom/10 active:scale-[0.98]"
            >
              Get in touch
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
