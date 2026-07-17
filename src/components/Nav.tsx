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
      <div className="container-page flex h-[68px] items-center justify-between">
        <a
          href="#top"
          onClick={handleAnchor}
          className="text-[15px] font-semibold tracking-tight text-snow"
          aria-label="Back to top"
        >
          David<span className="text-blossom"> Johnson</span>
        </a>

        <nav aria-label="Primary" className="flex items-center gap-7">
          <ul className="hidden items-center gap-7 md:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={handleAnchor}
                  className="text-sm text-mist transition-colors duration-300 hover:text-snow"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={identity.resumeFile}
            download
            className="rounded-full border border-line px-4 py-2 text-sm font-medium text-snow transition-all duration-300 hover:border-blossom/50 hover:bg-blossom/10 active:scale-[0.98]"
          >
            Resume
          </a>
        </nav>
      </div>
    </header>
  );
}
