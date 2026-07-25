"use client";

import { useEffect, useRef } from "react";
import type { Project } from "../data/resume";

/*
  Hand-drawn SVG art for each project card's side panel — one motif per
  project, each one an actual QA concept rather than decoration: a
  regression pipeline lighting up module by module, a cross-browser test
  matrix, a defect lifecycle, an API assertion chart, a test pyramid, a
  database validation scan. Portrait 5:7 viewBox, sliced to cover the panel.

  Palette: gold #ffc067 · sky #66c4ff · aqua #66f4ff · violet #b98bff
           pass #7ee787 · fail #ff8577 · slate #7d99aa

  Motion is CSS (@keyframes) or SMIL (<animate>/<animateMotion>), scoped
  per-instance via the `id` prefix so multiple cards never collide, and
  gated behind prefers-reduced-motion (CSS via media query, SMIL via the
  pauseAnimations() call in the exported wrapper below).
*/

const GOLD = "#ffc067";
const SKY = "#66c4ff";
const AQUA = "#66f4ff";
const VIOLET = "#b98bff";
const PASS = "#7ee787";
const FAIL = "#ff8577";
const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const VB = "0 0 400 560";

/* Shared background + glow + per-instance keyframes + gentle scene drift. */
function Backdrop({
  id,
  accent,
  accent2 = VIOLET,
  cx = 200,
  cy = 200,
}: {
  id: string;
  accent: string;
  accent2?: string;
  cx?: number;
  cy?: number;
}) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#182a3d" />
          <stop offset="0.55" stopColor="#0f2032" />
          <stop offset="1" stopColor="#080f18" />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx={cx / 400} cy={cy / 560} r="0.75">
          <stop offset="0" stopColor={accent} stopOpacity="0.36">
            <animate attributeName="stop-opacity" values="0.24;0.42;0.24" dur="6s" repeatCount="indefinite" />
          </stop>
          <stop offset="0.55" stopColor={accent2} stopOpacity="0.08" />
          <stop offset="1" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <filter id={`${id}-blur`} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4.5" result="b" />
          <feColorMatrix in="b" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1.15 0" result="b2" />
          <feMerge>
            <feMergeNode in="b2" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <style>
          {`
            @media (prefers-reduced-motion: no-preference) {
              @keyframes ${id}-drift { 0%,100% { transform: rotate(-1deg) scale(1.01); } 50% { transform: rotate(1deg) scale(1.03); } }
              .${id}-scene { transform-origin: ${cx}px ${cy}px; animation: ${id}-drift 14s ease-in-out infinite; }
              @keyframes ${id}-pulse { 0%,100% { opacity: 0.55; } 50% { opacity: 1; } }
              .${id}-pulse { animation: ${id}-pulse 2.6s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
            }
          `}
        </style>
      </defs>
      <rect width="400" height="560" fill={`url(#${id}-bg)`} />
      <rect width="400" height="560" fill={`url(#${id}-glow)`} />
    </>
  );
}

/* A checkmark that draws itself in, then sits as a small pass badge. */
function CheckBadge({ x, y, r = 10, delay = "0s", color = PASS }: { x: number; y: number; r?: number; delay?: string; color?: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r} fill="#0a1622" stroke={color} strokeOpacity="0.7" strokeWidth="1.6" />
      <path
        d={`M ${-r * 0.45} 0 L ${-r * 0.1} ${r * 0.4} L ${r * 0.5} ${-r * 0.4}`}
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="20"
        strokeDashoffset="20"
      >
        <animate attributeName="stroke-dashoffset" from="20" to="0" dur="0.6s" begin={delay} fill="freeze" />
      </path>
    </g>
  );
}

function Label({
  x,
  y,
  children,
  color = "#c9d6e2",
  size = 11,
  anchor = "start",
}: {
  x: number;
  y: number;
  children: string;
  color?: string;
  size?: number;
  anchor?: string;
}) {
  return (
    <text x={x} y={y} fontFamily={MONO} fontSize={size} letterSpacing="0.06em" fill={color} textAnchor={anchor as "start" | "middle" | "end"}>
      {children}
    </text>
  );
}

/* 1 · StreamCollab — regression pipeline running module by module. */
function Timeline() {
  const id = "tl";
  const spine = 132;
  const stages = [
    { y: 110, label: "ONBOARD", c: GOLD },
    { y: 220, label: "ITEMS", c: SKY },
    { y: 330, label: "CONTRACT", c: VIOLET },
    { y: 440, label: "INVOICE", c: GOLD },
  ];
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <Backdrop id={id} accent={AQUA} accent2={VIOLET} cx={132} cy={260} />
      <g className={`${id}-scene`}>
        <line x1={spine} y1="70" x2={spine} y2="480" stroke={SKY} strokeOpacity="0.25" strokeWidth="2" />
        {[0, 1, 2].map((i) => (
          <circle key={i} r="3" fill={AQUA} opacity="0.9">
            <animateMotion dur={`${6 + i * 1.4}s`} repeatCount="indefinite" path={`M ${spine} 80 L ${spine} 470`} begin={`${i * 1.8}s`} />
          </circle>
        ))}
        {stages.map((s, i) => (
          <g key={s.y} filter={`url(#${id}-blur)`}>
            <line x1={spine} y1={s.y} x2="228" y2={s.y - 8} stroke={s.c} strokeOpacity="0.4" strokeWidth="1.4" />
            <rect x="228" y={s.y - 24} width="118" height="34" rx="7" fill="#0f1e2d" stroke={s.c} strokeOpacity="0.5" />
            <Label x={240} y={s.y - 3} color="#e8eef4">{s.label}</Label>
            <circle className={`${id}-pulse`} cx={spine} cy={s.y} r="8" fill="none" stroke={s.c} strokeWidth="2" style={{ animationDelay: `${i * 0.3}s` }} />
            <CheckBadge x={spine} y={s.y} r={7} delay={`${0.8 + i * 0.9}s`} color={PASS} />
          </g>
        ))}
        <g filter={`url(#${id}-blur)`}>
          <Label x={spine} y={500} color="#7d99aa" anchor="middle" size={10}>
            PLAYWRIGHT · TYPESCRIPT
          </Label>
        </g>
      </g>
    </svg>
  );
}

/* 2 · Learn & Play — one test case fanned out across a cross-browser matrix. */
function Nodes() {
  const id = "nd";
  const cx = 158;
  const cy = 150;
  const browsers = [
    { x: 62, y: 300, c: GOLD, letter: "C", name: "CHROME" },
    { x: 300, y: 260, c: "#ff8a5c", letter: "F", name: "FIREFOX" },
    { x: 90, y: 430, c: SKY, letter: "S", name: "SAFARI" },
    { x: 290, y: 440, c: VIOLET, letter: "E", name: "EDGE" },
  ];
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <Backdrop id={id} accent={GOLD} accent2={VIOLET} cx={cx} cy={280} />
      <g className={`${id}-scene`}>
        {browsers.map((b, i) => {
          const pathId = `${id}-spoke-${i}`;
          return (
            <g key={i}>
              <path id={pathId} d={`M ${cx} ${cy} L ${b.x} ${b.y}`} stroke={b.c} strokeOpacity="0.35" strokeWidth="1.4" fill="none" />
              <circle r="2.6" fill={b.c}>
                <animateMotion dur={`${3 + i * 0.5}s`} repeatCount="indefinite" begin={`${i * 0.35}s`}>
                  <mpath href={`#${pathId}`} />
                </animateMotion>
              </circle>
            </g>
          );
        })}
        {browsers.map((b, i) => (
          <g key={`b${i}`} filter={`url(#${id}-blur)`}>
            <circle cx={b.x} cy={b.y} r="22" fill="#0f1e2d" stroke={b.c} strokeWidth="2" />
            <text x={b.x} y={b.y + 6} fontFamily={MONO} fontSize="16" fontWeight={600} fill={b.c} textAnchor="middle">
              {b.letter}
            </text>
            <Label x={b.x} y={b.y + 38} color="#8ea2b3" size={9} anchor="middle">
              {b.name}
            </Label>
            <CheckBadge x={b.x + 17} y={b.y - 17} r={7} delay={`${0.6 + i * 0.5}s`} color={PASS} />
          </g>
        ))}
        <g filter={`url(#${id}-blur)`}>
          <rect x={cx - 46} y={cy - 20} width="92" height="40" rx="9" fill="#0a1622" stroke={GOLD} strokeWidth="2" />
          <Label x={cx} y={cy - 2} color="#e8eef4" size={10} anchor="middle">TEST CASE</Label>
          <Label x={cx} y={cy + 12} color="#8ea2b3" size={8} anchor="middle">UAT · REGRESSION</Label>
        </g>
      </g>
    </svg>
  );
}

/* 3 · Invypro — test pyramid: unit / integration / e2e, POM at the core. */
function Rings() {
  const id = "rg";
  const cx = 200;
  const cy = 300;
  const layers = [
    { r: 236, label: "E2E · SELENIUM", c: AQUA },
    { r: 168, label: "INTEGRATION · CUCUMBER", c: SKY },
    { r: 100, label: "UNIT", c: VIOLET },
  ];
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <Backdrop id={id} accent={AQUA} accent2={VIOLET} cx={cx} cy={cy} />
      <g className={`${id}-scene`} style={{ transformOrigin: `${cx}px ${cy}px` }}>
        {layers.map((l, i) => (
          <g key={l.r}>
            <circle cx={cx} cy={cy} r={l.r} fill="none" stroke={l.c} strokeOpacity={0.32 - i * 0.03} strokeWidth="1.3" />
            <Label x={cx - l.r + 10} y={cy - 6} color={l.c} size={9}>{l.label}</Label>
          </g>
        ))}
        {[0.3, 2.4, 4.2].map((a, i) => (
          <g key={i} style={{ transformOrigin: `${cx}px ${cy}px` }}>
            <animateTransform attributeName="transform" type="rotate" from={`0 ${cx} ${cy}`} to={`360 ${cx} ${cy}`} dur={`${20 + i * 4}s`} repeatCount="indefinite" />
            <g filter={`url(#${id}-blur)`}>
              <circle cx={cx + Math.cos(a) * 168} cy={cy + Math.sin(a) * 168} r="6" fill={GOLD} opacity="0.9" />
            </g>
          </g>
        ))}
        <g filter={`url(#${id}-blur)`}>
          <circle cx={cx} cy={cy} r="34" fill="#0a1622" stroke={GOLD} strokeWidth="2.5" />
          <Label x={cx} y={cy - 2} color="#e8eef4" size={11} anchor="middle">POM</Label>
          <Label x={cx} y={cy + 12} color="#8ea2b3" size={8} anchor="middle">JENKINS CI</Label>
        </g>
      </g>
    </svg>
  );
}

/* 4 · API assertion chart — response times against an SLA line. */
function Wave() {
  const id = "wv";
  const baseline = 420;
  const bars = [
    { x: 48, h: 70, ok: true },
    { x: 90, h: 120, ok: true },
    { x: 132, h: 58, ok: true },
    { x: 174, h: 168, ok: false },
    { x: 216, h: 96, ok: true },
    { x: 258, h: 64, ok: true },
    { x: 300, h: 140, ok: false },
    { x: 342, h: 80, ok: true },
  ];
  const threshold = baseline - 150;
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <Backdrop id={id} accent={SKY} accent2={VIOLET} cx={200} cy={280} />
      <g className={`${id}-scene`}>
        <line x1="30" y1={threshold} x2="380" y2={threshold} stroke={GOLD} strokeOpacity="0.45" strokeDasharray="5 6" strokeWidth="1.4" />
        <Label x={34} y={threshold - 8} color={GOLD} size={9}>SLA · 300ms</Label>
        {bars.map((b, i) => (
          <g key={b.x} filter={`url(#${id}-blur)`}>
            <rect x={b.x} y={baseline - b.h} width="22" height={b.h} rx="4" fill={b.ok ? SKY : FAIL} opacity="0.55">
              <animate attributeName="height" values={`${b.h};${b.h * 1.08};${b.h}`} dur={`${1.6 + (i % 4) * 0.2}s`} repeatCount="indefinite" />
              <animate attributeName="y" values={`${baseline - b.h};${baseline - b.h * 1.08};${baseline - b.h}`} dur={`${1.6 + (i % 4) * 0.2}s`} repeatCount="indefinite" />
            </rect>
            <CheckBadge x={b.x + 11} y={baseline - b.h - 14} r={7} delay={`${0.5 + i * 0.3}s`} color={b.ok ? PASS : FAIL} />
          </g>
        ))}
        <g filter={`url(#${id}-blur)`}>
          <rect x="150" y="72" width="100" height="30" rx="8" fill="#0a1622" stroke={PASS} strokeOpacity="0.6" />
          <Label x={200} y={92} color={PASS} size={11} anchor="middle">200 · POSTMAN</Label>
        </g>
      </g>
    </svg>
  );
}

/* 5 · Defect lifecycle — a JIRA hub triaging tickets through states. */
function Graph() {
  const id = "gr";
  const cx = 200;
  const cy = 260;
  const states = [
    { x: 92, y: 128, c: FAIL, label: "OPEN" },
    { x: 308, y: 158, c: GOLD, label: "IN PROGRESS" },
    { x: 86, y: 400, c: SKY, label: "FIXED" },
    { x: 314, y: 392, c: PASS, label: "CLOSED" },
  ];
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <Backdrop id={id} accent={GOLD} accent2={VIOLET} cx={cx} cy={cy} />
      <g className={`${id}-scene`}>
        {states.map((s, i) => {
          const pathId = `${id}-spoke-${i}`;
          return (
            <g key={`l${i}`}>
              <path id={pathId} d={`M ${cx} ${cy} L ${s.x} ${s.y}`} stroke={s.c} strokeOpacity="0.4" strokeWidth="1.5" fill="none" />
              <circle r="3" fill={s.c}>
                <animateMotion dur={`${2.8 + i * 0.5}s`} repeatCount="indefinite" begin={`${i * 0.3}s`}>
                  <mpath href={`#${pathId}`} />
                </animateMotion>
              </circle>
            </g>
          );
        })}
        {states.map((s, i) => (
          <g key={`s${i}`} filter={`url(#${id}-blur)`}>
            <circle className={`${id}-pulse`} cx={s.x} cy={s.y} r="15" fill="#0f1e2d" stroke={s.c} strokeWidth="2" style={{ animationDelay: `${i * 0.25}s` }} />
            <circle cx={s.x} cy={s.y} r="5" fill={s.c} opacity="0.75" />
            <Label x={s.x} y={s.y + 30} color={s.c} size={9} anchor="middle">{s.label}</Label>
          </g>
        ))}
        <g filter={`url(#${id}-blur)`}>
          <circle cx={cx} cy={cy} r="30" fill="#0a1622" stroke={GOLD} strokeWidth="2.5" />
          <Label x={cx} y={cy + 4} color="#e8eef4" size={11} anchor="middle">JIRA</Label>
        </g>
      </g>
    </svg>
  );
}

/* 6 · Database validation scan — rows getting checked row by row. */
function Scan() {
  const id = "sc";
  const cols = [56, 130, 204, 278];
  const rows = [110, 156, 202, 248, 294, 340, 386, 432];
  const cw = 62;
  const ch = 32;
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <Backdrop id={id} accent={SKY} accent2={VIOLET} cx={200} cy={280} />
      <defs>
        <linearGradient id={`${id}-beam`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={SKY} stopOpacity="0" />
          <stop offset="0.5" stopColor={PASS} stopOpacity="0.22" />
          <stop offset="1" stopColor={SKY} stopOpacity="0" />
        </linearGradient>
      </defs>
      <Label x={56} y={86} color="#8ea2b3" size={10}>POSTGRESQL · ORACLE</Label>
      {rows.map((y) =>
        cols.map((x) => (
          <rect key={`${x}-${y}`} x={x} y={y} width={cw} height={ch} rx="5" fill="#0d1a26" stroke={SKY} strokeOpacity="0.16" strokeWidth="1" />
        )),
      )}
      {rows.map((y, ri) => (
        <CheckBadge key={ri} x={cols[3] + cw + 20} y={y + ch / 2} r={7} delay={`${0.4 + ri * 0.55}s`} color={PASS} />
      ))}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0 0; 0 322; 0 0" keyTimes="0; 0.5; 1" dur="6s" repeatCount="indefinite" />
        <rect x="0" y="94" width="400" height="70" fill={`url(#${id}-beam)`} />
        <line x1="0" y1="129" x2="400" y2="129" stroke={PASS} strokeWidth="2" filter={`url(#${id}-blur)`} />
      </g>
    </svg>
  );
}

const MAP: Record<Project["visual"], () => React.ReactElement> = {
  timeline: Timeline,
  nodes: Nodes,
  wave: Wave,
  rings: Rings,
  graph: Graph,
  scan: Scan,
};

export function ProjectVisual({ variant }: { variant: Project["visual"] }) {
  const Art = MAP[variant];
  const wrapRef = useRef<HTMLDivElement>(null);

  // prefers-reduced-motion stops CSS @keyframes automatically, but SVG's
  // native <animate>/<animateMotion>/<animateTransform> elements keep
  // running regardless — so we pause every <svg> in this wrapper by hand.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mq.matches) return;
    const svgs = wrapRef.current?.querySelectorAll("svg");
    svgs?.forEach((svg) => (svg as unknown as SVGSVGElement).pauseAnimations?.());
  }, [variant]);

  return (
    <div ref={wrapRef} className="h-full w-full">
      <Art />
    </div>
  );
}
