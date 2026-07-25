import { useRef } from 'react';
import {
  GithubLogoIcon,
  LinkedinLogoIcon,
  EnvelopeSimpleIcon,
  PhoneIcon,
} from '@phosphor-icons/react';
import { useReveal } from '../lib/useReveal';
import { Magnetic } from './Magnetic';
import { identity } from '../data/resume';

const CONTACTS = [
  {
    label: 'GitHub',
    href: identity.github,
    Icon: GithubLogoIcon,
    external: true,
  },
  {
    label: 'LinkedIn',
    href: identity.linkedin,
    Icon: LinkedinLogoIcon,
    external: true,
  },
  {
    label: identity.email,
    href: `mailto:${identity.email}`,
    Icon: EnvelopeSimpleIcon,
    external: false,
  },
  {
    label: identity.phone,
    href: identity.phoneHref,
    Icon: PhoneIcon,
    external: false,
  },
];

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <footer
      ref={ref}
      id="contact"
      className="relative scroll-mt-24 overflow-hidden border-t border-line-soft"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-45%] left-1/2 h-[60vmax] w-[60vmax] -translate-x-1/2 rounded-full opacity-[0.09]"
        style={{
          background: 'radial-gradient(circle, #ffc067 0%, transparent 60%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-30%] right-[-10%] h-[42vmax] w-[42vmax] rounded-full opacity-[0.07]"
        style={{
          background: 'radial-gradient(circle, #b98bff 0%, transparent 62%)',
        }}
      />

      <div className="container-page relative py-28 text-center md:py-40">
        <p
          data-reveal
          className="inline-flex items-center gap-2.5 font-mono text-xs tracking-[0.18em] text-mist uppercase"
        >
          {/* the one semantic dot on the page: live availability */}
          <span className="relative inline-flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-leaf/60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-leaf" />
          </span>
          Open to QA Lead & Senior Test Engineer roles
        </p>

        <h2
          data-reveal
          className="mx-auto mt-8 max-w-[16ch] text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.05] font-medium tracking-[-0.03em] text-snow"
        >
          Building confidence through{' '}
          <em className="text-blossom italic">Quality & Automation</em>.
        </h2>

        <div data-reveal className="mt-12">
          <Magnetic>
            <a
              href={`mailto:${identity.email}`}
              className="inline-flex items-center rounded-full bg-blossom px-8 py-4 text-base font-semibold text-ink transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_36px_-6px_rgba(255,192,103,0.7)] active:scale-[0.98]"
            >
              Get in touch
            </a>
          </Magnetic>
        </div>

        <ul
          data-reveal
          className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
        >
          {CONTACTS.map(({ label, href, Icon, external }) => (
            <li key={label}>
              <a
                href={href}
                {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                className="group inline-flex items-center gap-2 text-sm text-mist transition-colors duration-300 hover:text-blossom"
              >
                <Icon
                  size={18}
                  weight="regular"
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-line-soft">
        <div className="container-page flex flex-wrap items-center justify-between gap-3 py-6 text-xs text-faint">
          <p>© 2026 Kavi B</p>
          <p>{identity.location}</p>
        </div>
      </div>
    </footer>
  );
}
