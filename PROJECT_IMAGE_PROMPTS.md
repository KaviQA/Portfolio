# Project Image Prompts — Pacific Gold theme

Full, ready-to-paste prompts to generate the 6 project-card images in Claude,
plus how to generate them and how to hand the result back.

- **Palette:** deep ocean-navy `#0A1622`, sun-gold `#FFC067`, sky-blue `#66C4FF`, aqua-cyan `#66F4FF`, slate `#7D99AA`
- **Slot:** right column of each project card — a **portrait** panel, rendered as `background: cover`
- **Generate at:** portrait **3:4** (e.g. 1024×1365). Keep the subject centered with edge breathing room.
- **Rule:** no text, no words, no logos, no UI screenshots. Abstract / atmospheric only.

---

## How to generate

1. Open a new chat in Claude (image generation) — one image per project.
2. Copy a **full prompt** below (the style is already baked in — paste as-is).
3. Generate, regenerate until happy. Repeat for all 6.
4. When all 6 are done, ask Claude to package them (see **"Output format"** at the bottom) into a single `dc.html`.
5. Give me `dc.html`. I'll extract the images, save them as assets, and wire them into `resume.ts` + `Projects.tsx`.

---

## The 6 full prompts

### 1 · AgentLens  → `id="agentlens"`
```
A vertical luminous timeline of glowing nodes cascading top to bottom, each node
connected by a thin thread of light, representing an AI agent's live reasoning
stream — thought, tool call, answer. Streams of particles flow downward like data
over a fibre. Gold and aqua pulses travel along the line.

Premium abstract tech render, deep ocean-navy background (#0A1622), glowing accents
in sun-gold (#FFC067), sky-blue (#66C4FF) and aqua-cyan (#66F4FF), subtle slate-blue
mist. Cinematic soft lighting, fine grain, elegant negative space, high-end studio
quality, minimalist, no text, no words, no logos, no UI, portrait 3:4 orientation.
```

### 2 · FlowSphere  → `id="flowsphere"`
```
A floating 3D node-graph of connected pill-shaped modules wired together into a
branching automation flow, glowing connector lines routing between them like a
circuit of light. A sense of data packets moving port to port. Sky-blue and gold
nodes suspended in dark space with soft depth-of-field.

Premium abstract tech render, deep ocean-navy background (#0A1622), glowing accents
in sun-gold (#FFC067), sky-blue (#66C4FF) and aqua-cyan (#66F4FF), subtle slate-blue
mist. Cinematic soft lighting, fine grain, elegant negative space, high-end studio
quality, minimalist, no text, no words, no logos, no UI, portrait 3:4 orientation.
```

### 3 · Loop  → `id="loop"`
```
An elegant glowing audio waveform / voice-frequency ribbon flowing horizontally,
made of thin luminous lines that rise and fall, dissolving into particles at the
edges — a captured spoken conversation turned into signal. Warm gold core fading to
aqua at the tips.

Premium abstract tech render, deep ocean-navy background (#0A1622), glowing accents
in sun-gold (#FFC067), sky-blue (#66C4FF) and aqua-cyan (#66F4FF), subtle slate-blue
mist. Cinematic soft lighting, fine grain, elegant negative space, high-end studio
quality, minimalist, no text, no words, no logos, no UI, portrait 3:4 orientation.
```

### 4 · Study Mate AI  → `id="studymate"`
```
Concentric glowing rings radiating outward from a bright central core, like semantic
search rippling through a knowledge base. Fine particle field between the rings, a
few brighter points lighting up as retrieved matches. Aqua and gold concentric glow
on deep navy.

Premium abstract tech render, deep ocean-navy background (#0A1622), glowing accents
in sun-gold (#FFC067), sky-blue (#66C4FF) and aqua-cyan (#66F4FF), subtle slate-blue
mist. Cinematic soft lighting, fine grain, elegant negative space, high-end studio
quality, minimalist, no text, no words, no logos, no UI, portrait 3:4 orientation.
```

### 5 · MCP Multi-Tool Agent  → `id="mcp-agent"`
```
A central glowing orb linked by radiating threads of light to four smaller satellite
nodes arranged around it — one agent orchestrating multiple connected tools.
Directional light pulses travel outward along each link. Gold hub, sky-blue and aqua
spokes, constellation-like on dark navy.

Premium abstract tech render, deep ocean-navy background (#0A1622), glowing accents
in sun-gold (#FFC067), sky-blue (#66C4FF) and aqua-cyan (#66F4FF), subtle slate-blue
mist. Cinematic soft lighting, fine grain, elegant negative space, high-end studio
quality, minimalist, no text, no words, no logos, no UI, portrait 3:4 orientation.
```

### 6 · KnowYourBite  → `id="knowyourbite"`
```
A bright horizontal scan-line sweeping across an abstract grid of glowing data cells,
like OCR reading a label — cells illuminating in gold and aqua as the beam passes. A
subtle sense of extracted structured data lifting off the surface. Sharp scanning-
light aesthetic on deep navy.

Premium abstract tech render, deep ocean-navy background (#0A1622), glowing accents
in sun-gold (#FFC067), sky-blue (#66C4FF) and aqua-cyan (#66F4FF), subtle slate-blue
mist. Cinematic soft lighting, fine grain, elegant negative space, high-end studio
quality, minimalist, no text, no words, no logos, no UI, portrait 3:4 orientation.
```

---

## Output format — ask Claude for this once all 6 exist

> Output a single self-contained **`dc.html`** file. Embed all 6 images **inline as
> base64 data URIs** (`<img src="data:image/png;base64,...">`) — no external file
> links. Put them in this exact order, each `<img>` carrying the matching `id`:
>
> 1. `id="agentlens"`
> 2. `id="flowsphere"`
> 3. `id="loop"`
> 4. `id="studymate"`
> 5. `id="mcp-agent"`
> 6. `id="knowyourbite"`
>
> All images portrait 3:4. No text inside the images.

Then hand `dc.html` to me.
