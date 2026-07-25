import { useEffect, useRef } from "react";

/*
  Generative hero visual: cherry-blossom petals drift down the ink field.
  Near the pointer they wire themselves into a briefly-visible graph, petals
  becoming nodes. The blossom is the network; the network is the blossom.

  Rendering is plain Canvas 2D, driven outside React entirely. The loop
  pauses when the tab is hidden or the hero leaves the viewport, and reduced
  motion collapses to a single static frame with no links.

  v2: added a violet strand to the palette (matches the Skills/ProjectVisual
  accent so the whole site reads as one family), and a soft glow on the
  pointer constellation so it feels like it's lighting up rather than just
  drawing lines.
*/

interface Petal {
  x: number;
  y: number;
  size: number;
  angle: number;
  spin: number;
  fall: number;
  swayPhase: number;
  swayAmp: number;
  depth: number;
  alpha: number;
  color: string;
}

const COLORS = [
  "255, 192, 103", // sun-gold
  "102, 196, 255", // sky-blue
  "255, 255, 255", // white
  "185, 139, 255", // violet
  "102, 244, 255", // aqua (rare)
];
const COLOR_WEIGHTS = [0.4, 0.26, 0.16, 0.12, 0.06];

function pickColor() {
  const r = Math.random();
  let acc = 0;
  for (let i = 0; i < COLORS.length; i++) {
    acc += COLOR_WEIGHTS[i];
    if (r < acc) return COLORS[i];
  }
  return COLORS[0];
}

function makePetal(w: number, h: number, anywhere: boolean): Petal {
  const depth = 0.45 + Math.random() * 0.55;
  return {
    x: Math.random() * w,
    y: anywhere ? Math.random() * h : -20 - Math.random() * h * 0.2,
    size: (5 + Math.random() * 7) * depth,
    angle: Math.random() * Math.PI * 2,
    spin: (Math.random() - 0.5) * 0.012,
    fall: (0.16 + Math.random() * 0.3) * depth,
    swayPhase: Math.random() * Math.PI * 2,
    swayAmp: 0.3 + Math.random() * 0.7,
    depth,
    alpha: 0.25 + Math.random() * 0.5 * depth,
    color: pickColor(),
  };
}

function drawPetal(ctx: CanvasRenderingContext2D, p: Petal) {
  const s = p.size;
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.angle);
  ctx.beginPath();
  // sakura petal: rounded body with a notched tip
  ctx.moveTo(0, -s);
  ctx.bezierCurveTo(s * 0.9, -s * 0.7, s * 0.75, s * 0.55, 0, s);
  ctx.bezierCurveTo(-s * 0.75, s * 0.55, -s * 0.9, -s * 0.7, 0, -s);
  ctx.closePath();
  ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
  ctx.fill();
  ctx.restore();
}

export function PetalCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let w = 0;
    let h = 0;
    let petals: Petal[] = [];
    let raf = 0;
    let running = false;
    let inView = true;
    let t = 0;

    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999, active: false };
    const LINK_R = 190;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const target = Math.round(Math.min(Math.max((w * h) / 30000, 26), 72));
      petals = Array.from({ length: target }, () => makePetal(w, h, true));
      if (reduced) renderFrame();
    };

    const renderFrame = () => {
      ctx.clearRect(0, 0, w, h);

      // pointer easing
      pointer.x += (pointer.tx - pointer.x) * 0.08;
      pointer.y += (pointer.ty - pointer.y) * 0.08;

      // constellation links near the pointer
      if (!reduced && pointer.active) {
        const near = petals.filter((p) => {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          return dx * dx + dy * dy < LINK_R * LINK_R;
        });

        ctx.save();
        ctx.shadowColor = "rgba(255, 192, 103, 0.55)";
        ctx.shadowBlur = 6;
        for (let i = 0; i < near.length; i++) {
          for (let j = i + 1; j < near.length; j++) {
            const a = near[i];
            const b = near[j];
            const da = 1 - Math.hypot(a.x - pointer.x, a.y - pointer.y) / LINK_R;
            const db = 1 - Math.hypot(b.x - pointer.x, b.y - pointer.y) / LINK_R;
            const alpha = da * db * 0.4;
            if (alpha < 0.02) continue;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(185, 139, 255, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
        // node glow on linked petals
        for (const p of near) {
          const d = 1 - Math.hypot(p.x - pointer.x, p.y - pointer.y) / LINK_R;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.6 + d * 1.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${d * 0.6})`;
          ctx.fill();
        }
        ctx.restore();
      }

      for (const p of petals) drawPetal(ctx, p);
    };

    const step = () => {
      t += 1;
      for (const p of petals) {
        p.y += p.fall;
        p.x += Math.sin(t * 0.004 + p.swayPhase) * p.swayAmp * 0.22 + 0.04 * p.depth;
        p.angle += p.spin;
        if (p.y > h + 24) Object.assign(p, makePetal(w, h, false));
        if (p.x > w + 24) p.x = -20;
      }
      renderFrame();
      raf = requestAnimationFrame(step);
    };

    const start = () => {
      if (running || reduced || document.hidden || !inView) return;
      running = true;
      raf = requestAnimationFrame(step);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = e.clientX - rect.left;
      pointer.ty = e.clientY - rect.top;
      if (!pointer.active) {
        pointer.x = pointer.tx;
        pointer.y = pointer.ty;
      }
      pointer.active = true;
    };
    const onPointerLeave = () => {
      pointer.active = false;
      pointer.tx = -9999;
      pointer.ty = -9999;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) start();
        else stop();
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);

    if (reduced) renderFrame();
    else start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
