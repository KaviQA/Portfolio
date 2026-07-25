import { useRef, type MouseEvent } from "react";
import { gsap, ScrollTrigger, useGSAP } from "../lib/gsap";
import { scrollToAnchor } from "../lib/useLenis";
import { identity } from "../data/resume";

const LINKS = [
  { label: "Experience", href: "#experience" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
];

export function handleAnchor(e: MouseEvent<HTMLAnchorElement>) {
  const href = e.currentTarget.getAttribute("href");
  if (href?.startsWith("#")) {
    e.preventDefault();
    scrollToAnchor(href);
    history.replaceState(null, "", href);
  }
}

export function Nav() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: document.body,
        start: "top -72px",
        end: "max",
        toggleClass: { targets: ref.current!, className: "nav-scrolled" },
      });
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(ref.current, { yPercent: -100, duration: 1, ease: "power4.out", delay: 0.2 });
      });
    },
    { scope: ref },
  );

  return (
    <header
      ref={ref}
      className="fixed inset-x-0 top-0 z-40 border-b border-transparent transition-colors duration-500 [&.nav-scrolled]:border-line-soft [&.nav-scrolled]:bg-ink/75 [&.nav-scrolled]:backdrop-blur-xl"
    >
      <style>
        {`
          @media (prefers-reduced-motion: no-preference) {
            @keyframes nav-logo-shimmer { to { background-position: 200% center; } }
            .nav-logo-mark {
              background-image: linear-gradient(100deg, currentColor 30%, #ffe3b0 45%, currentColor 60%);
              background-size: 220% auto;
              -webkit-background-clip: text;
              background-clip: text;
              color: transparent;
              animation: nav-logo-shimmer 3.2s ease-in-out infinite;
            }
          }
        `}
      </style>

      <div className="container-page flex h-[68px] items-center justify-between">
        <a
          href="#top"
          onClick={handleAnchor}
          className="text-[20px] font-semibold tracking-tight text-snow"
          aria-label="Back to top"
        >
          Kavi<span className="nav-logo-mark text-blossom"> B</span>
        </a>

        <nav aria-label="Primary" className="flex items-center gap-7">
          <ul className="hidden items-center gap-7 md:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={handleAnchor}
                  className="group relative py-1 text-sm text-mist transition-colors duration-300 hover:text-snow"
                >
                  {l.label}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-gradient-to-r from-blossom via-sky-300 to-violet-300 transition-transform duration-300 ease-out group-hover:scale-x-100"
                  />
                </a>
              </li>
            ))}
          </ul>
          <a
            href={identity.resumeFile}
            download
            className="rounded-full border border-line px-4 py-2 text-sm font-medium text-snow transition-all duration-300 hover:border-blossom/50 hover:bg-blossom/10 hover:shadow-[0_0_24px_-6px_rgba(255,192,103,0.55)] active:scale-[0.98]"
          >
            Resume
          </a>
        </nav>
      </div>
    </header>
  );
}
