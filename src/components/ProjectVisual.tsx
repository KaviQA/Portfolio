import type { Project } from "../data/resume";

/*
  Hand-drawn SVG art for each project card's side panel — one motif per
  project, all in the Pacific Gold palette (navy ground, sun-gold + sky-blue
  + aqua light sources). Portrait 5:7 viewBox, sliced to cover the panel.

  Palette: gold #ffc067 · sky #66c4ff · aqua #66f4ff · slate #7d99aa
*/

const GOLD = "#ffc067";
const SKY = "#66c4ff";
const AQUA = "#66f4ff";

const VB = "0 0 400 560";

/* Shared background + glow. `accent` tints the atmospheric wash. */
function Backdrop({ id, accent, cx = 200, cy = 200 }: { id: string; accent: string; cx?: number; cy?: number }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#16293a" />
          <stop offset="1" stopColor="#0a151f" />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx={cx / 400} cy={cy / 560} r="0.7">
          <stop offset="0" stopColor={accent} stopOpacity="0.3" />
          <stop offset="0.6" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <filter id={`${id}-blur`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect width="400" height="560" fill={`url(#${id}-bg)`} />
      <rect width="400" height="560" fill={`url(#${id}-glow)`} />
    </>
  );
}

/* 1 · AgentLens — a vertical reasoning timeline with tool-call branches. */
function Timeline() {
  const id = "tl";
  const spine = 148;
  const nodes = [
    { y: 96, c: GOLD },
    { y: 176, c: AQUA },
    { y: 256, c: GOLD },
    { y: 336, c: AQUA },
    { y: 416, c: GOLD },
    { y: 486, c: AQUA },
  ];
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <Backdrop id={id} accent={AQUA} cx={148} cy={260} />
      <line x1={spine} y1="72" x2={spine} y2="510" stroke={SKY} strokeOpacity="0.28" strokeWidth="2" />
      {/* travelling pulses */}
      {[130, 300, 450].map((y) => (
        <circle key={y} cx={spine} cy={y} r="3" fill={AQUA} opacity="0.9" />
      ))}
      {nodes.map((n, i) => (
        <g key={n.y} filter={`url(#${id}-blur)`}>
          <line x1={spine} y1={n.y} x2="252" y2={n.y - 6} stroke={n.c} strokeOpacity="0.35" strokeWidth="1.5" />
          <rect x="252" y={n.y - 16} width="80" height="22" rx="6" fill="#0f1e2d" stroke={n.c} strokeOpacity="0.5" />
          <line x1="262" y1={n.y - 5} x2="304" y2={n.y - 5} stroke={n.c} strokeOpacity="0.6" strokeWidth="2" />
          <circle cx={spine} cy={n.y} r="9" fill="#0a1622" stroke={n.c} strokeWidth="2.5" />
          <circle cx={spine} cy={n.y} r="3.5" fill={n.c} opacity={0.7 + i * 0.05} />
        </g>
      ))}
    </svg>
  );
}

/* 2 · FlowSphere — a node-based automation graph with wired connectors. */
function Nodes() {
  const id = "nd";
  const mods = [
    { x: 58, y: 92, c: GOLD },
    { x: 232, y: 150, c: SKY },
    { x: 84, y: 258, c: SKY },
    { x: 250, y: 300, c: GOLD },
    { x: 138, y: 410, c: SKY },
    { x: 258, y: 456, c: GOLD },
  ];
  const w = 78;
  const h = 26;
  const links: [number, number, number, number][] = [
    [136, 105, 232, 163],
    [136, 105, 84, 271],
    [310, 163, 250, 313],
    [162, 271, 250, 313],
    [162, 271, 216, 423],
    [328, 313, 258, 469],
    [216, 423, 258, 469],
  ];
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <Backdrop id={id} accent={GOLD} cx={200} cy={280} />
      {links.map(([x1, y1, x2, y2], i) => (
        <path
          key={i}
          d={`M ${x1} ${y1} C ${(x1 + x2) / 2} ${y1}, ${(x1 + x2) / 2} ${y2}, ${x2} ${y2}`}
          fill="none"
          stroke={SKY}
          strokeOpacity="0.4"
          strokeWidth="1.5"
        />
      ))}
      {/* data packets on links */}
      {links.map(([x1, y1, x2, y2], i) => (
        <circle key={`p${i}`} cx={(x1 + x2) / 2} cy={(y1 + y2) / 2} r="2.5" fill={i % 2 ? GOLD : AQUA} />
      ))}
      {mods.map((m) => (
        <g key={`${m.x}-${m.y}`} filter={`url(#${id}-blur)`}>
          <rect x={m.x} y={m.y} width={w} height={h} rx="8" fill="#0f1e2d" stroke={m.c} strokeOpacity="0.65" strokeWidth="1.8" />
          <circle cx={m.x} cy={m.y + h / 2} r="3" fill={m.c} />
          <circle cx={m.x + w} cy={m.y + h / 2} r="3" fill={m.c} />
          <line x1={m.x + 12} y1={m.y + h / 2} x2={m.x + w - 14} y2={m.y + h / 2} stroke={m.c} strokeOpacity="0.4" strokeWidth="2" />
        </g>
      ))}
    </svg>
  );
}

/* 3 · Loop — a glowing voice waveform dissolving into particles. */
function Wave() {
  const id = "wv";
  const mid = 300;
  const bars = Array.from({ length: 15 }, (_, i) => {
    const x = 40 + i * 24;
    const amp = [30, 54, 22, 70, 40, 88, 52, 104, 60, 82, 34, 66, 26, 48, 30][i];
    return { x, amp };
  });
  const wavePath = (a: number, phase: number) =>
    `M 20 ${mid} ` +
    Array.from({ length: 20 }, (_, i) => {
      const x = 20 + i * 19;
      const y = mid + Math.sin(i * 0.7 + phase) * a * (1 - Math.abs(i - 9.5) / 12);
      return `L ${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join(" ");
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <Backdrop id={id} accent={SKY} cx={200} cy={mid} />
      <defs>
        <linearGradient id={`${id}-line`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={AQUA} stopOpacity="0.2" />
          <stop offset="0.5" stopColor={GOLD} />
          <stop offset="1" stopColor={AQUA} stopOpacity="0.2" />
        </linearGradient>
      </defs>
      {/* equaliser bars */}
      {bars.map((b) => (
        <rect key={b.x} x={b.x} y={mid - b.amp} width="7" height={b.amp * 2} rx="3.5" fill={SKY} opacity="0.16" />
      ))}
      {/* waveform ribbons */}
      <g filter={`url(#${id}-blur)`}>
        <path d={wavePath(70, 0)} fill="none" stroke={`url(#${id}-line)`} strokeWidth="2.5" strokeLinecap="round" />
        <path d={wavePath(44, 1.6)} fill="none" stroke={AQUA} strokeOpacity="0.5" strokeWidth="1.6" strokeLinecap="round" />
      </g>
      {/* end particles */}
      {[[26, mid], [374, mid], [50, mid - 60], [352, mid + 54]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i < 2 ? 3 : 2} fill={i % 2 ? GOLD : AQUA} opacity="0.8" />
      ))}
    </svg>
  );
}

/* 4 · Study Mate AI — concentric retrieval rings around a bright core. */
function Rings() {
  const id = "rg";
  const cx = 200;
  const cy = 280;
  const radii = [34, 74, 114, 154, 196, 240];
  const dots = [
    { a: 0.6, r: 74, c: AQUA, big: false },
    { a: 2.1, r: 114, c: GOLD, big: true },
    { a: 3.6, r: 74, c: AQUA, big: false },
    { a: 4.4, r: 154, c: GOLD, big: true },
    { a: 5.5, r: 114, c: AQUA, big: false },
    { a: 1.2, r: 196, c: AQUA, big: false },
    { a: 3.0, r: 240, c: GOLD, big: true },
    { a: 5.0, r: 240, c: AQUA, big: false },
  ];
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <Backdrop id={id} accent={AQUA} cx={cx} cy={cy} />
      {radii.map((r, i) => (
        <circle key={r} cx={cx} cy={cy} r={r} fill="none" stroke={AQUA} strokeOpacity={0.4 - i * 0.05} strokeWidth="1.3" />
      ))}
      {dots.map((d, i) => (
        <circle
          key={i}
          cx={cx + Math.cos(d.a) * d.r}
          cy={cy + Math.sin(d.a) * d.r}
          r={d.big ? 4.5 : 2.4}
          fill={d.c}
          opacity={d.big ? 0.95 : 0.55}
          filter={d.big ? `url(#${id}-blur)` : undefined}
        />
      ))}
      <g filter={`url(#${id}-blur)`}>
        <circle cx={cx} cy={cy} r="17" fill="#0a1622" stroke={GOLD} strokeWidth="2.5" />
        <circle cx={cx} cy={cy} r="7" fill={GOLD} />
      </g>
    </svg>
  );
}

/* 5 · MCP Multi-Tool Agent — a hub orb orchestrating satellite tools. */
function Graph() {
  const id = "gr";
  const cx = 200;
  const cy = 280;
  const sats = [
    { x: 96, y: 132, c: SKY },
    { x: 306, y: 168, c: AQUA },
    { x: 88, y: 418, c: AQUA },
    { x: 312, y: 400, c: SKY },
  ];
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <Backdrop id={id} accent={GOLD} cx={cx} cy={cy} />
      {sats.map((s, i) => (
        <line key={`l${i}`} x1={cx} y1={cy} x2={s.x} y2={s.y} stroke={s.c} strokeOpacity="0.4" strokeWidth="1.5" />
      ))}
      {/* directional pulses travelling outward */}
      {sats.map((s, i) => (
        <circle key={`p${i}`} cx={cx + (s.x - cx) * 0.6} cy={cy + (s.y - cy) * 0.6} r="3" fill={s.c} />
      ))}
      {sats.map((s, i) => (
        <g key={`s${i}`} filter={`url(#${id}-blur)`}>
          <circle cx={s.x} cy={s.y} r="15" fill="#0f1e2d" stroke={s.c} strokeWidth="2" />
          <circle cx={s.x} cy={s.y} r="5" fill={s.c} opacity="0.7" />
        </g>
      ))}
      <g filter={`url(#${id}-blur)`}>
        <circle cx={cx} cy={cy} r="30" fill="#0a1622" stroke={GOLD} strokeWidth="2.5" />
        <circle cx={cx} cy={cy} r="13" fill={GOLD} opacity="0.85" />
      </g>
    </svg>
  );
}

/* 6 · KnowYourBite — an OCR scan beam sweeping a grid of data cells. */
function Scan() {
  const id = "sc";
  const cols = [56, 130, 204, 278, 320];
  const rows = [96, 148, 200, 252, 304, 356, 408, 460];
  const cw = 58;
  const ch = 30;
  const bandTop = 236;
  const bandBottom = 320;
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <Backdrop id={id} accent={SKY} cx={200} cy={280} />
      <defs>
        <linearGradient id={`${id}-beam`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={SKY} stopOpacity="0" />
          <stop offset="0.5" stopColor={SKY} stopOpacity="0.22" />
          <stop offset="1" stopColor={SKY} stopOpacity="0" />
        </linearGradient>
      </defs>
      {rows.map((y) =>
        cols.map((x) => {
          const lit = y + ch / 2 > bandTop && y + ch / 2 < bandBottom;
          return (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width={x === 320 ? 34 : cw}
              height={ch}
              rx="5"
              fill={lit ? "#0f1e2d" : "#0d1a26"}
              stroke={lit ? GOLD : SKY}
              strokeOpacity={lit ? 0.75 : 0.18}
              strokeWidth={lit ? 1.6 : 1}
            />
          );
        }),
      )}
      {/* scan beam */}
      <rect x="0" y={bandTop} width="400" height={bandBottom - bandTop} fill={`url(#${id}-beam)`} />
      <line x1="0" y1={(bandTop + bandBottom) / 2} x2="400" y2={(bandTop + bandBottom) / 2} stroke={AQUA} strokeWidth="2" filter={`url(#${id}-blur)`} />
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
  return <Art />;
}
