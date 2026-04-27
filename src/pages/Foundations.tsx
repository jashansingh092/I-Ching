import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────

const TRIGRAMS = [
  {
    name: "Qian",
    chinese: "乾",
    bits: [1, 1, 1],
    element: "Heaven",
    quality: "Creative",
    symbol: "☰",
    color: "#f5c842",
    direction: "South",
    nature: "Strong, initiating, yang pure",
  },
  {
    name: "Dui",
    chinese: "兌",
    bits: [1, 1, 0],
    element: "Lake",
    quality: "Joyous",
    symbol: "☱",
    color: "#60a5fa",
    direction: "Southeast",
    nature: "Pleasure, open, reflective",
  },
  {
    name: "Li",
    chinese: "離",
    bits: [1, 0, 1],
    element: "Fire",
    quality: "Clinging",
    symbol: "☲",
    color: "#f87171",
    direction: "East",
    nature: "Bright, dependent, clarity",
  },
  {
    name: "Zhen",
    chinese: "震",
    bits: [1, 0, 0],
    element: "Thunder",
    quality: "Arousing",
    symbol: "☳",
    color: "#a78bfa",
    direction: "Northeast",
    nature: "Shock, movement, initiative",
  },
  {
    name: "Xun",
    chinese: "巽",
    bits: [0, 1, 1],
    element: "Wind",
    quality: "Gentle",
    symbol: "☴",
    color: "#34d399",
    direction: "Southwest",
    nature: "Penetrating, flexible, pervasive",
  },
  {
    name: "Kan",
    chinese: "坎",
    bits: [0, 1, 0],
    element: "Water",
    quality: "Abysmal",
    symbol: "☵",
    color: "#22d3ee",
    direction: "West",
    nature: "Danger, depth, flowing",
  },
  {
    name: "Gen",
    chinese: "艮",
    bits: [0, 0, 1],
    element: "Mountain",
    quality: "Keeping Still",
    symbol: "☶",
    color: "#94a3b8",
    direction: "Northwest",
    nature: "Stillness, boundary, endurance",
  },
  {
    name: "Kun",
    chinese: "坤",
    bits: [0, 0, 0],
    element: "Earth",
    quality: "Receptive",
    symbol: "☷",
    color: "#c9a84c",
    direction: "North",
    nature: "Yielding, nurturing, yin pure",
  },
];

const TIMELINE = [
  {
    year: "~2800 BCE",
    era: "Mythological",
    title: "Fu Xi & the Eight Trigrams",
    body: "The legendary emperor Fu Xi observed patterns in nature — the markings of a turtle shell, the stripes of a river horse — and from these derived the eight primary trigrams. This is the founding myth of I Ching.",
    color: "#c9a84c",
    icon: "🐢",
  },
  {
    year: "~1000 BCE",
    era: "Zhou Dynasty",
    title: "King Wen's Arrangement",
    body: "While imprisoned by the Shang tyrant, King Wen of Zhou meditated on the trigrams and arranged 64 hexagrams in their classical order. His son the Duke of Zhou added individual line commentaries, creating the core text.",
    color: "#a78bfa",
    icon: "📜",
  },
  {
    year: "~500 BCE",
    era: "Classical Period",
    title: "Confucius & the Ten Wings",
    body: "Confucius reportedly said: 'If some years were added to my life, I would give fifty to the study of the I Ching.' He and his school wrote the Shi Yi — ten philosophical commentaries that elevated I Ching from oracle to cosmological treatise.",
    color: "#60a5fa",
    icon: "⚡",
  },
  {
    year: "136 BCE",
    era: "Han Dynasty",
    title: "State Canon",
    body: "Emperor Wu of Han declared the I Ching the first and greatest of the Five Classics. It became the cornerstone of Chinese imperial education, philosophy, and governance for the next two millennia.",
    color: "#f87171",
    icon: "👑",
  },
  {
    year: "~1000 CE",
    era: "Song Dynasty",
    title: "Neo-Confucian Revival",
    body: "Shao Yong arranged hexagrams in a sequence identical to binary counting — seven centuries before Leibniz. His circular arrangement of the 64 hexagrams encodes a complete 6-bit Gray code in geometric form.",
    color: "#34d399",
    icon: "🔢",
  },
  {
    year: "1701 CE",
    era: "Enlightenment",
    title: "Leibniz Discovers the Binary",
    body: "Gottfried Wilhelm Leibniz received a copy of Shao Yong's hexagram arrangements and was astonished: the sequence was identical to his newly invented binary arithmetic. He wrote: 'This shows the value of this great man's work.'",
    color: "#22d3ee",
    icon: "⚙️",
  },
  {
    year: "1950 CE",
    era: "Modern West",
    title: "Wilhelm-Baynes Translation",
    body: "Richard Wilhelm's German translation (rendered into English by Cary Baynes, with a foreword by Carl Jung) became the defining Western edition. Jung's concept of synchronicity was deeply influenced by I Ching's non-causal logic.",
    color: "#f5c842",
    icon: "🌍",
  },
  {
    year: "Present",
    era: "Information Age",
    title: "Binary Cosmology Realized",
    body: "Modern information theory confirmed what ancient sages intuited: all information can be encoded in binary. The hexagram's 6-bit structure predates digital computing by three millennia. I Ching is studied in complexity theory, systems thinking, and cognitive science.",
    color: "#c084fc",
    icon: "💡",
  },
];

const DIVINATION_STEPS = [
  {
    step: 1,
    title: "Hold the Question",
    description:
      "Formulate a clear, sincere question. The I Ching responds to the quality of attention you bring. Vague questions receive vague guidance.",
    visual: "question",
  },
  {
    step: 2,
    title: "Cast the Lines",
    description:
      "Traditionally: 50 yarrow stalks divided and counted six times. Modern: three coins tossed six times. Each result gives a line — yin (broken) or yang (solid), possibly 'moving'.",
    visual: "coins",
  },
  {
    step: 3,
    title: "Build from Below",
    description:
      "Lines are built bottom-to-top. The first cast becomes the bottom line. After six casts, you have a complete hexagram — two trigrams stacked, upper and lower.",
    visual: "build",
  },
  {
    step: 4,
    title: "Identify the Hexagram",
    description:
      "Find the hexagram in the table (by upper and lower trigram). Read the Judgment (King Wen's text) and the Image (Duke of Zhou's commentary on the whole hexagram).",
    visual: "identify",
  },
  {
    step: 5,
    title: "Moving Lines",
    description:
      "If any lines are 'moving' (old yin → yang, or old yang → yin), flip them to generate a second hexagram. This shows the dynamic: where you are moving from and toward.",
    visual: "moving",
  },
  {
    step: 6,
    title: "Interpret",
    description:
      "The I Ching does not predict. It describes the quality of the moment and the inner conditions most aligned with it. The meaning emerges from your sincere reflection.",
    visual: "interpret",
  },
];

// ─────────────────────────────────────────────────────────────────
// CSS
// ─────────────────────────────────────────────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Crimson+Pro:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');

  .found-root {
    font-family: 'Crimson Pro', Georgia, serif;
    color: #e8e0d0;
    min-height: 100vh;
  }

  .found-display {
    font-family: 'Cinzel', 'Times New Roman', serif;
  }

  /* Tab bar */
  .tab-bar {
    display: flex;
    gap: 0;
    border-bottom: 1px solid rgba(201,168,76,0.15);
    overflow-x: auto;
    scrollbar-width: none;
  }
  .tab-bar::-webkit-scrollbar { display: none; }
  .tab-btn {
    padding: 14px 22px;
    font-family: 'Cinzel', serif;
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #6b6355;
    border: none;
    background: none;
    cursor: pointer;
    position: relative;
    white-space: nowrap;
    transition: color 0.25s;
  }
  .tab-btn:hover { color: #c9a84c; }
  .tab-btn.active {
    color: #f5d88a;
  }
  .tab-btn.active::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #c9a84c, transparent);
  }

  /* Animated entrance */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .fade-up { animation: fadeUp 0.5s ease-out forwards; }
  .fade-up-1 { animation: fadeUp 0.5s 0.05s ease-out both; }
  .fade-up-2 { animation: fadeUp 0.5s 0.12s ease-out both; }
  .fade-up-3 { animation: fadeUp 0.5s 0.20s ease-out both; }
  .fade-up-4 { animation: fadeUp 0.5s 0.28s ease-out both; }
  .fade-up-5 { animation: fadeUp 0.5s 0.36s ease-out both; }
  .fade-up-6 { animation: fadeUp 0.5s 0.44s ease-out both; }
  .fade-up-7 { animation: fadeUp 0.5s 0.52s ease-out both; }
  .fade-up-8 { animation: fadeUp 0.5s 0.60s ease-out both; }

  /* Yin-yang */
  @keyframes yinYangSpin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  .yin-yang-spin { animation: yinYangSpin 24s linear infinite; }

  /* Trigram line draw */
  @keyframes lineGrow {
    from { stroke-dashoffset: 60; }
    to   { stroke-dashoffset: 0; }
  }

  /* Pulse glow */
  @keyframes pulseGold {
    0%, 100% { box-shadow: 0 0 12px rgba(201,168,76,0.2); }
    50%       { box-shadow: 0 0 28px rgba(201,168,76,0.5); }
  }

  /* Flowing line */
  @keyframes flowLine {
    from { stroke-dashoffset: 20; }
    to   { stroke-dashoffset: 0; }
  }

  /* Timeline line grow */
  @keyframes tlLineGrow {
    from { height: 0; }
    to   { height: 100%; }
  }

  /* Bit flip */
  @keyframes bitFlip {
    0%   { transform: rotateY(0deg); }
    50%  { transform: rotateY(90deg); }
    100% { transform: rotateY(0deg); }
  }
  .bit-flip { animation: bitFlip 0.3s ease-in-out; }

  /* Coin toss */
  @keyframes coinSpin {
    0%   { transform: rotateX(0deg) scale(1); }
    40%  { transform: rotateX(720deg) scale(0.8); }
    100% { transform: rotateX(720deg) scale(1); }
  }

  /* Card hover */
  .trig-card {
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
    cursor: pointer;
  }
  .trig-card:hover {
    transform: translateY(-4px);
  }

  /* Scrollbar for timeline */
  .tl-scroll { scrollbar-width: thin; scrollbar-color: rgba(201,168,76,0.3) transparent; }
  .tl-scroll::-webkit-scrollbar { width: 4px; }
  .tl-scroll::-webkit-scrollbar-track { background: transparent; }
  .tl-scroll::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.3); border-radius: 2px; }

  /* Ba Gua node */
  .bagua-node {
    transition: transform 0.2s ease, filter 0.2s ease;
    cursor: pointer;
  }
  .bagua-node:hover {
    transform: scale(1.15);
    filter: drop-shadow(0 0 14px currentColor);
  }

  /* Step card */
  .step-card {
    transition: background 0.2s, border-color 0.2s, transform 0.2s;
    cursor: pointer;
  }
  .step-card:hover {
    transform: translateX(4px);
  }
  .step-card.step-active {
    border-color: rgba(201,168,76,0.5) !important;
    background: rgba(201,168,76,0.06) !important;
  }

  /* Hexagram line animation */
  @keyframes hexLineReveal {
    from { opacity: 0; transform: scaleX(0); }
    to   { opacity: 1; transform: scaleX(1); }
  }

  /* Grain overlay */
  .grain-overlay {
    position: fixed;
    inset: 0;
    pointer-events: none;
    opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 128px 128px;
    z-index: 0;
  }
`;

// ─────────────────────────────────────────────────────────────────
// SMALL UTILITIES
// ─────────────────────────────────────────────────────────────────

/** Draw I Ching trigram lines as SVG */
function TrigramLines({
  bits,
  color,
  size = 40,
  animated = false,
}: {
  bits: number[];
  color: string;
  size?: number;
  animated?: boolean;
}) {
  const lineH = size * 0.16;
  const gap = size * 0.12;
  const w = size * 0.85;
  const gapW = size * 0.18;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ overflow: "visible" }}
    >
      {[...bits].reverse().map((bit, i) => {
        const y = size * 0.1 + i * (lineH + gap + gap * 0.5);
        const delay = animated ? `${i * 0.08}s` : "0s";

        if (bit === 1) {
          // Solid yang line
          return (
            <rect
              key={i}
              x={(size - w) / 2}
              y={y}
              width={w}
              height={lineH}
              rx={lineH / 2}
              fill={color}
              style={
                animated
                  ? {
                      animation: `hexLineReveal 0.4s ${delay} ease-out both`,
                      transformOrigin: "left center",
                    }
                  : {}
              }
            />
          );
        } else {
          // Broken yin line (two segments)
          const segW = (w - gapW) / 2;
          return (
            <g key={i}>
              <rect
                x={(size - w) / 2}
                y={y}
                width={segW}
                height={lineH}
                rx={lineH / 2}
                fill={color}
                opacity={0.75}
                style={
                  animated
                    ? {
                        animation: `hexLineReveal 0.4s ${delay} ease-out both`,
                        transformOrigin: "left center",
                      }
                    : {}
                }
              />
              <rect
                x={(size - w) / 2 + segW + gapW}
                y={y}
                width={segW}
                height={lineH}
                rx={lineH / 2}
                fill={color}
                opacity={0.75}
                style={
                  animated
                    ? {
                        animation: `hexLineReveal 0.4s ${delay} ease-out both`,
                        transformOrigin: "left center",
                      }
                    : {}
                }
              />
            </g>
          );
        }
      })}
    </svg>
  );
}

/** Animated yin-yang SVG */
function YinYang({ size = 140 }: { size?: number }) {
  const r = size / 2;
  const sr = r / 2;
  const ssr = r / 6;

  return (
    <div className="relative group">
      {/* Glow background */}
      <div
        className="absolute inset-0 blur-2xl opacity-40 group-hover:opacity-70 transition"
        style={{
          background:
            "radial-gradient(circle, rgba(201,168,76,0.15), transparent 70%)",
        }}
      />

      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="relative transition-transform duration-500 group-hover:scale-105"
        style={{
          animation: "yinYangSpin 18s linear infinite",
        }}
      >
        {/* White (yang) */}
        <path
          d={`M${r},0 
              A${r},${r},0,0,1,${r},${size} 
              A${sr},${sr},0,0,1,${r},${r} 
              A${sr},${sr},0,0,0,${r},0 Z`}
          fill="url(#yinGrad)"
        />

        {/* Dark (yin) */}
        <path
          d={`M${r},0 
              A${r},${r},0,0,0,${r},${size} 
              A${sr},${sr},0,0,0,${r},${r} 
              A${sr},${sr},0,0,1,${r},0 Z`}
          fill="url(#yangGrad"
        />

        {/* Small dots */}
        {/*  #0d0d14 - Black | #e8e0d0 - White */}
        <circle cx={r} cy={sr} r={ssr} fill="#e8e0d0" />
        <circle cx={r} cy={r + sr} r={ssr} fill="#1a1a24" />

        {/* Outer ring */}
        <circle
          cx={r}
          cy={r}
          r={r - 1.5}
          fill="none"
          stroke="rgba(201,168,76,0.35)"
          strokeWidth={1.5}
        />

        {/* Gradients */}
        <defs>
          <radialGradient id="yangGrad">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e8e0d0" />
          </radialGradient>

          <radialGradient id="yinGrad">
            <stop offset="0%" stopColor="#1a1a24" />
            <stop offset="100%" stopColor="#0d0d14" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}

/** Single hexagram line (solid or broken) */
function HexLine({
  yang,
  color,
  width = 120,
  height = 8,
  animated = false,
  delay = 0,
}: {
  yang: boolean;
  color?: string;
  width?: number;
  height?: number;
  animated?: boolean;
  delay?: number;
}) {
  const c = color ?? "#e8e0d0";
  const gap = width * 0.15;
  const segW = (width - gap) / 2;
  const style = animated
    ? {
        animation: `hexLineReveal 0.35s ${delay}s ease-out both`,
        transformOrigin: "left center",
      }
    : {};

  return (
    <svg
      width={width}
      height={height + 2}
      viewBox={`0 0 ${width} ${height + 2}`}
      style={{ overflow: "visible" }}
    >
      {yang ? (
        <rect
          x={0}
          y={1}
          width={width}
          height={height}
          rx={height / 2}
          fill={c}
          style={style}
        />
      ) : (
        <>
          <rect
            x={0}
            y={1}
            width={segW}
            height={height}
            rx={height / 2}
            fill={c}
            opacity={0.7}
            style={style}
          />
          <rect
            x={segW + gap}
            y={1}
            width={segW}
            height={height}
            rx={height / 2}
            fill={c}
            opacity={0.7}
            style={style}
          />
        </>
      )}
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────
// TAB: OVERVIEW
// ─────────────────────────────────────────────────────────────────
function OverviewTab() {
  const FACTS = [
    { value: "~3000", unit: "years old", label: "Ancient wisdom tradition" },
    { value: "64", unit: "hexagrams", label: "2⁶ unique configurations" },
    { value: "6", unit: "lines each", label: "Binary structure per hexagram" },
    { value: "4096", unit: "line states", label: "Total possible readings" },
  ];

  return (
    <div className="fade-up" style={{ maxWidth: 860, margin: "0 auto" }}>
      {/* Hero */}
      <div
        style={{
          display: "flex",
          gap: 64,
          alignItems: "center",
          marginBottom: 56,
        }}
      >
        <div style={{ flex: 1 }}>
          <p
            className="found-display fade-up-1"
            style={{
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#c9a84c",
              marginBottom: 16,
            }}
          >
            The Book of Changes
          </p>
          <h2
            className="found-display fade-up-2"
            style={{
              fontSize: 36,
              fontWeight: 600,
              lineHeight: 1.25,
              marginBottom: 20,
              color: "#f5ead8",
            }}
          >
            What is the
            <br />I Ching?
          </h2>
          <p
            className="fade-up-3"
            style={{
              fontSize: 18,
              lineHeight: 1.8,
              color: "#b0a898",
              marginBottom: 16,
            }}
          >
            The I Ching (易經 — <em>Yì Jīng</em>, "Book of Changes") is one of
            humanity's oldest texts, a cosmological system, and a practical
            oracle — all woven into one structure of extraordinary mathematical
            elegance.
          </p>
          <p
            className="fade-up-4"
            style={{ fontSize: 18, lineHeight: 1.8, color: "#b0a898" }}
          >
            At its core, it encodes all of reality as combinations of two forces
            —<span style={{ color: "#f5ead8" }}> Yin</span> (receptive, broken
            line: 0) and
            <span style={{ color: "#f5ead8" }}> Yang</span> (creative, solid
            line: 1) — arranged in stacks of six, creating 64 binary patterns
            that map every possible state of change.
          </p>
        </div>
        <div
          className="fade-up-3"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <YinYang size={140} />
          <p
            style={{
              fontSize: 11,
              letterSpacing: "0.15em",
              color: "#6b6355",
              textTransform: "uppercase",
            }}
          >
            Yin · Yang
          </p>
        </div>
      </div>

      {/* Stat grid */}
      <div
        className="fade-up-4"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
          marginBottom: 56,
        }}
      >
        {FACTS.map((f, i) => (
          <div
            key={i}
            style={{
              background: "rgba(201,168,76,0.05)",
              border: "1px solid rgba(201,168,76,0.15)",
              borderRadius: 12,
              padding: "20px 16px",
              textAlign: "center",
            }}
          >
            <div
              className="found-display"
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: "#f5d88a",
                lineHeight: 1,
              }}
            >
              {f.value}
            </div>
            <div
              style={{
                fontSize: 12,
                color: "#c9a84c",
                marginTop: 4,
                letterSpacing: "0.05em",
              }}
            >
              {f.unit}
            </div>
            <div
              style={{
                fontSize: 13,
                color: "#6b6355",
                marginTop: 8,
                lineHeight: 1.4,
              }}
            >
              {f.label}
            </div>
          </div>
        ))}
      </div>

      {/* Three pillars */}
      <div
        className="fade-up-5"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
        }}
      >
        {[
          {
            icon: "⚖️",
            title: "A Cosmology",
            color: "#c9a84c",
            text: "The I Ching is a complete model of how reality operates: everything arises from the interplay of yin and yang, cycling through 64 archetypal situations that repeat at every scale — from the personal to the cosmic.",
          },
          {
            icon: "🔢",
            title: "A Binary System",
            color: "#60a5fa",
            text: "Three millennia before Leibniz, the I Ching encoded all information as 6-bit binary vectors. The 64 hexagrams are exactly the 64 numbers of a 6-dimensional binary space {0,1}⁶. Shao Yong's circular arrangement is a Gray code.",
          },
          {
            icon: "🔮",
            title: "An Oracle",
            color: "#a78bfa",
            text: "As a divination system, the I Ching doesn't predict the future — it describes the quality of the present moment and the inner attitude most aligned with it. Carl Jung called this principle 'synchronicity.'",
          },
        ].map((p, i) => (
          <div
            key={i}
            style={{
              background: "rgba(15,15,22,0.8)",
              border: `1px solid ${p.color}22`,
              borderRadius: 14,
              padding: "24px 20px",
            }}
          >
            <div style={{ fontSize: 28, marginBottom: 12 }}>{p.icon}</div>
            <h3
              className="found-display"
              style={{
                fontSize: 14,
                letterSpacing: "0.08em",
                color: p.color,
                marginBottom: 12,
              }}
            >
              {p.title}
            </h3>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: "#9a9082" }}>
              {p.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// TAB: HISTORY
// ─────────────────────────────────────────────────────────────────
function HistoryTab() {
  const [active, setActive] = useState(0);

  return (
    <div className="fade-up" style={{ maxWidth: 860, margin: "0 auto" }}>
      <p
        className="found-display"
        style={{
          fontSize: 11,
          letterSpacing: "0.2em",
          color: "#c9a84c",
          marginBottom: 8,
          textTransform: "uppercase",
        }}
      >
        A living tradition
      </p>
      <h2
        className="found-display"
        style={{
          fontSize: 28,
          fontWeight: 600,
          color: "#f5ead8",
          marginBottom: 40,
        }}
      >
        ~5000 Years of the Book of Changes
      </h2>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 40 }}
      >
        {/* Left: event list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {TIMELINE.map((ev, i) => (
            <button
              key={i}
              className={`step-card fade-up-${i + 1}`}
              onClick={() => setActive(i)}
              style={{
                background: active === i ? `${ev.color}08` : "transparent",
                border: `1px solid ${active === i ? ev.color + "40" : "transparent"}`,
                borderRadius: 10,
                padding: "12px 16px",
                textAlign: "left",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 12,
                transition: "all 0.2s",
              }}
            >
              <span style={{ fontSize: 20 }}>{ev.icon}</span>
              <div>
                <div
                  className="found-display"
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.12em",
                    color: active === i ? ev.color : "#6b6355",
                    textTransform: "uppercase",
                  }}
                >
                  {ev.year}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: active === i ? "#f5ead8" : "#8a8070",
                    marginTop: 2,
                  }}
                >
                  {ev.title}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Right: detail */}
        <div
          key={active}
          className="fade-up"
          style={{
            background: "rgba(15,15,22,0.9)",
            border: `1px solid ${TIMELINE[active].color}25`,
            borderRadius: 16,
            padding: 36,
            position: "sticky",
            top: 24,
            alignSelf: "start",
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 16 }}>
            {TIMELINE[active].icon}
          </div>
          <div
            className="found-display"
            style={{
              fontSize: 10,
              letterSpacing: "0.2em",
              color: TIMELINE[active].color,
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            {TIMELINE[active].era} · {TIMELINE[active].year}
          </div>
          <h3
            className="found-display"
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: "#f5ead8",
              marginBottom: 20,
            }}
          >
            {TIMELINE[active].title}
          </h3>
          <p style={{ fontSize: 17, lineHeight: 1.85, color: "#a09888" }}>
            {TIMELINE[active].body}
          </p>

          {/* Progress dots */}
          <div style={{ display: "flex", gap: 6, marginTop: 32 }}>
            {TIMELINE.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  width: i === active ? 20 : 6,
                  height: 6,
                  borderRadius: 3,
                  background:
                    i === active
                      ? TIMELINE[active].color
                      : "rgba(255,255,255,0.12)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.25s",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// TAB: YIN & YANG
// ─────────────────────────────────────────────────────────────────
function YinYangTab() {
  const [bits, setBits] = useState([1, 0, 1, 0, 1, 0]);
  const [flippingIdx, setFlippingIdx] = useState<number | null>(null);

  function toggleBit(i: number) {
    setFlippingIdx(i);
    setTimeout(() => {
      setBits((prev) => {
        const next = [...prev];
        next[i] = next[i] === 0 ? 1 : 0;
        return next;
      });
      setFlippingIdx(null);
    }, 150);
  }

  function randomize() {
    setBits(Array.from({ length: 6 }, () => Math.round(Math.random())));
  }

  const yangCount = bits.filter(Boolean).length;
  const yinCount = 6 - yangCount;

  return (
    <div className="fade-up" style={{ maxWidth: 860, margin: "0 auto" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 56,
          alignItems: "start",
        }}
      >
        {/* Left: explanation */}
        <div>
          <p
            className="found-display"
            style={{
              fontSize: 11,
              letterSpacing: "0.2em",
              color: "#c9a84c",
              marginBottom: 12,
              textTransform: "uppercase",
            }}
          >
            The Fundamental Duality
          </p>
          <h2
            className="found-display"
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: "#f5ead8",
              marginBottom: 24,
            }}
          >
            Yin & Yang as Binary
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              {
                bit: 1,
                name: "Yang ⚊",
                chinese: "陽",
                color: "#f5ead8",
                desc: "The solid, unbroken line. Active, creative, bright, masculine. In binary: 1. Represents the presence of force.",
                lineYang: true,
              },
              {
                bit: 0,
                name: "Yin ⚋",
                chinese: "陰",
                color: "#6b6355",
                desc: "The broken, open line. Receptive, yielding, dark, feminine. In binary: 0. Represents the space of possibility.",
                lineYang: false,
              },
            ].map((item) => (
              <div
                key={item.bit}
                style={{
                  background: "rgba(15,15,22,0.8)",
                  border: `1px solid ${item.color}20`,
                  borderRadius: 12,
                  padding: "20px 24px",
                  display: "flex",
                  gap: 20,
                  alignItems: "flex-start",
                }}
              >
                <div style={{ flexShrink: 0, paddingTop: 4 }}>
                  <HexLine
                    yang={item.lineYang}
                    color={item.color}
                    width={60}
                    height={6}
                  />
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      marginBottom: 8,
                    }}
                  >
                    <span
                      className="found-display"
                      style={{
                        fontSize: 13,
                        color: item.color,
                        letterSpacing: "0.05em",
                      }}
                    >
                      {item.name}
                    </span>
                    <span
                      style={{ fontSize: 18, color: item.color, opacity: 0.6 }}
                    >
                      {item.chinese}
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        fontFamily: "monospace",
                        background: `${item.color}15`,
                        color: item.color,
                        padding: "2px 8px",
                        borderRadius: 4,
                      }}
                    >
                      bit = {item.bit}
                    </span>
                  </div>
                  <p
                    style={{ fontSize: 15, lineHeight: 1.7, color: "#8a8070" }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 28,
              padding: "18px 20px",
              background: "rgba(201,168,76,0.05)",
              border: "1px solid rgba(201,168,76,0.15)",
              borderRadius: 10,
            }}
          >
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.8,
                color: "#9a9082",
                fontStyle: "italic",
              }}
            >
              "The interaction of these two principles gives rise to everything
              that exists. Yin and Yang are not opposites that negate each
              other, but complements that generate and sustain each other — like
              inhale and exhale."
            </p>
          </div>
        </div>

        {/* Right: interactive bit builder */}
        <div>
          <div
            style={{
              background: "rgba(15,15,22,0.9)",
              border: "1px solid rgba(201,168,76,0.15)",
              borderRadius: 16,
              padding: "28px 24px",
            }}
          >
            <div
              className="found-display"
              style={{
                fontSize: 11,
                letterSpacing: "0.15em",
                color: "#c9a84c",
                textTransform: "uppercase",
                marginBottom: 20,
              }}
            >
              Interactive Hexagram Builder
            </div>

            <p
              style={{
                fontSize: 14,
                color: "#6b6355",
                marginBottom: 24,
                lineHeight: 1.6,
              }}
            >
              Click any line to flip between Yin (0, broken) and Yang (1,
              solid). Lines are built bottom to top.
            </p>

            {/* The 6 lines, displayed top-to-bottom but labeled bottom-up */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                marginBottom: 24,
              }}
            >
              {[...bits].reverse().map((bit, displayIdx) => {
                const actualIdx = 5 - displayIdx;
                const lineNum = actualIdx + 1;
                const isYang = bit === 1;
                return (
                  <button
                    key={actualIdx}
                    onClick={() => toggleBit(actualIdx)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      padding: "4px 0",
                    }}
                  >
                    <span
                      className="found-display"
                      style={{
                        fontSize: 10,
                        letterSpacing: "0.1em",
                        color: "#4a4438",
                        width: 40,
                        textAlign: "right",
                        flexShrink: 0,
                      }}
                    >
                      Line {lineNum}
                    </span>
                    <div
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <div
                        style={{
                          flex: 1,
                          animation:
                            flippingIdx === actualIdx
                              ? "bitFlip 0.3s ease-in-out"
                              : "none",
                        }}
                      >
                        <HexLine
                          yang={isYang}
                          color={isYang ? "#f5ead8" : "#4a4438"}
                          width={140}
                          height={9}
                        />
                      </div>
                      <span
                        style={{
                          fontFamily: "monospace",
                          fontSize: 12,
                          color: isYang ? "#f5d88a" : "#4a4438",
                          width: 16,
                        }}
                      >
                        {bit}
                      </span>
                      <span
                        style={{
                          fontSize: 11,
                          color: isYang ? "#c9a84c" : "#3a3428",
                          width: 32,
                        }}
                      >
                        {isYang ? "⚊" : "⚋"}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Summary */}
            <div
              style={{
                background: "rgba(0,0,0,0.4)",
                borderRadius: 10,
                padding: "14px 16px",
                marginBottom: 16,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div
                  className="found-display"
                  style={{
                    fontSize: 10,
                    color: "#6b6355",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginBottom: 4,
                  }}
                >
                  Binary Vector
                </div>
                <div
                  style={{
                    fontFamily: "monospace",
                    fontSize: 22,
                    color: "#f5d88a",
                    letterSpacing: "0.2em",
                  }}
                >
                  [{bits.join(", ")}]
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 12, color: "#c9a84c" }}>
                  Yang:{" "}
                  <span style={{ color: "#f5ead8", fontFamily: "monospace" }}>
                    {yangCount}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: "#6b6355" }}>
                  Yin:{" "}
                  <span style={{ color: "#6b6355", fontFamily: "monospace" }}>
                    {yinCount}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={randomize}
              style={{
                width: "100%",
                padding: "10px 0",
                background: "rgba(201,168,76,0.1)",
                border: "1px solid rgba(201,168,76,0.25)",
                borderRadius: 8,
                color: "#c9a84c",
                fontFamily: "'Cinzel', serif",
                fontSize: 11,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(201,168,76,0.18)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "rgba(201,168,76,0.1)")
              }
            >
              ↺ Randomize
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// TAB: TRIGRAMS
// ─────────────────────────────────────────────────────────────────
// Drop-in replacement for TrigramsTab
// Fix: hover scaling is applied inside the SVG transform string, never via CSS,
// so it correctly pivots around the node's own center instead of the SVG origin.

function TrigramsTab() {
  const [selected, setSelected] = useState<number | null>(null);
  const [hovered,  setHovered]  = useState<number | null>(null);

  const trig = selected !== null ? TRIGRAMS[selected] : null;

  // BaGua positions (octagonal, starting at top, going clockwise)
  const bagua = TRIGRAMS.map((t, i) => {
    const angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
    return {
      ...t,
      cx: 200 + Math.cos(angle) * 148,
      cy: 200 + Math.sin(angle) * 148,
    };
  });

  return (
    <div className="fade-up" style={{ maxWidth: 900, margin: "0 auto" }}>
      <p
        className="found-display"
        style={{
          fontSize: 11,
          letterSpacing: "0.2em",
          color: "#c9a84c",
          marginBottom: 12,
          textTransform: "uppercase",
        }}
      >
        The Eight Primary Forms
      </p>
      <h2
        className="found-display"
        style={{ fontSize: 28, fontWeight: 600, color: "#f5ead8", marginBottom: 8 }}
      >
        Trigrams — Bā Guà (八卦)
      </h2>
      <p style={{ fontSize: 16, color: "#8a8070", marginBottom: 40, lineHeight: 1.7 }}>
        Three binary lines create 2³ = 8 trigrams. Each encodes an archetypal
        force in nature. Two trigrams stacked create a hexagram.
      </p>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }}
      >
        {/* ── BaGua SVG diagram ── */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <svg
            width={400}
            height={400}
            viewBox="0 0 400 400"
            // Prevent any inherited CSS transform from leaking in
            style={{ overflow: "visible", display: "block" }}
          >
            {/* Outer decorative rings */}
            <circle cx={200} cy={200} r={188} fill="none" stroke="rgba(201,168,76,0.08)" strokeWidth={1} />
            <circle cx={200} cy={200} r={172} fill="none" stroke="rgba(201,168,76,0.05)" strokeWidth={1} />

            {/* Spoke lines from center to each node */}
            {bagua.map((t, i) => (
              <line
                key={`spoke-${i}`}
                x1={200} y1={200}
                x2={t.cx} y2={t.cy}
                stroke={t.color}
                strokeWidth={0.6}
                opacity={selected === i ? 0.45 : hovered === i ? 0.25 : 0.08}
                style={{ transition: "opacity 0.2s" }}
              />
            ))}

            {/* Center yin-yang */}
            <g transform="translate(200,200)">
              <circle
                r={32}
                fill="rgba(10,10,16,0.92)"
                stroke="rgba(201,168,76,0.22)"
                strokeWidth={1}
              />
              <text
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={24}
                fill="rgba(201,168,76,0.6)"
                style={{ fontFamily: "serif", userSelect: "none" }}
              >
                ☯
              </text>
            </g>

            {/* Trigram nodes
                ─ Key fix: scale is applied INSIDE the transform string as the
                  second operation, so it pivots around (cx, cy), not (0, 0).
                  We never use CSS transform on these SVG groups.             */}
            {bagua.map((t, i) => {
              const isSelected = selected === i;
              const isHovered  = hovered === i;
              const scale      = isSelected ? 1.12 : isHovered ? 1.08 : 1;

              return (
                <g
                  key={`node-${i}`}
                  // translate to position, then scale around that center
                  transform={`translate(${t.cx},${t.cy}) scale(${scale})`}
                  onClick={() => setSelected(isSelected ? null : i)}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ cursor: "pointer" }}
                >
                  {/* Glow ring — only when selected or hovered */}
                  {(isSelected || isHovered) && (
                    <circle
                      r={44}
                      fill="none"
                      stroke={t.color}
                      strokeWidth={1}
                      opacity={isSelected ? 0.35 : 0.15}
                    />
                  )}

                  {/* Main circle */}
                  <circle
                    r={38}
                    fill={isSelected ? `${t.color}1a` : isHovered ? `${t.color}0e` : "rgba(10,10,16,0.88)"}
                    stroke={t.color}
                    strokeWidth={isSelected ? 1.8 : isHovered ? 1.2 : 0.8}
                    strokeOpacity={isSelected ? 0.85 : isHovered ? 0.55 : 0.28}
                    style={{ transition: "fill 0.18s, stroke-opacity 0.18s, stroke-width 0.18s" }}
                  />

                  {/* Trigram lines centred inside the circle */}
                  <g transform="translate(-14,-16)">
                    <TrigramLines bits={t.bits} color={t.color} size={28} />
                  </g>

                  {/* Name label */}
                  <text
                    textAnchor="middle"
                    y={20}
                    fontSize={10}
                    fill={t.color}
                    opacity={isSelected ? 1 : 0.75}
                    style={{
                      fontFamily: "'Cinzel', serif",
                      letterSpacing: "0.05em",
                      userSelect: "none",
                      transition: "opacity 0.18s",
                    }}
                  >
                    {t.name}
                  </text>
                </g>
              );
            })}
          </svg>

          <p style={{ fontSize: 12, color: "#4a4438", textAlign: "center", marginTop: 8 }}>
            Click any trigram to explore
          </p>
        </div>

        {/* ── Detail panel ── */}
        <div>
          {trig ? (
            <div
              key={selected}
              className="fade-up"
              style={{
                background: "rgba(10,10,16,0.95)",
                border: `1px solid ${trig.color}30`,
                borderRadius: 16,
                padding: "32px 28px",
              }}
            >
              {/* Header */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 20, marginBottom: 24 }}>
                <TrigramLines bits={trig.bits} color={trig.color} size={56} animated />
                <div>
                  <div style={{ fontSize: 32, lineHeight: 1 }}>{trig.symbol}</div>
                  <div className="found-display" style={{ fontSize: 20, color: trig.color, marginTop: 6 }}>
                    {trig.name}
                  </div>
                  <div style={{ fontSize: 18, color: `${trig.color}88`, letterSpacing: "0.1em" }}>
                    {trig.chinese}
                  </div>
                </div>
              </div>

              {/* Attribute grid */}
              <div
                style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}
              >
                {[
                  { label: "Element",   value: trig.element },
                  { label: "Quality",   value: trig.quality },
                  { label: "Direction", value: trig.direction },
                  { label: "Bits",      value: `[${trig.bits.join(", ")}]` },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      background: `${trig.color}08`,
                      border: `1px solid ${trig.color}15`,
                      borderRadius: 8,
                      padding: "10px 14px",
                    }}
                  >
                    <div
                      className="found-display"
                      style={{
                        fontSize: 9,
                        color: trig.color,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        marginBottom: 4,
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{
                        fontSize: 14,
                        color: "#e8e0d0",
                        fontFamily: item.label === "Bits" ? "monospace" : "inherit",
                      }}
                    >
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Nature description */}
              <p style={{ fontSize: 15, lineHeight: 1.8, color: "#8a8070", fontStyle: "italic" }}>
                {trig.nature}
              </p>

              {/* Line composition */}
              <div style={{ marginTop: 20, paddingTop: 20, borderTop: `1px solid ${trig.color}15` }}>
                <div
                  className="found-display"
                  style={{
                    fontSize: 9,
                    color: "#4a4438",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    marginBottom: 10,
                  }}
                >
                  Line Composition
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {[...trig.bits].reverse().map((bit, di) => {
                    const lineNum = 3 - di;
                    return (
                      <div key={di} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{ fontSize: 10, color: "#4a4438", width: 36, fontFamily: "monospace" }}>
                          L{lineNum}
                        </span>
                        <HexLine
                          yang={bit === 1}
                          color={bit === 1 ? trig.color : `${trig.color}50`}
                          width={80}
                          height={6}
                          animated
                          delay={di * 0.08}
                        />
                        <span style={{ fontSize: 11, color: bit === 1 ? trig.color : "#4a4438", fontFamily: "monospace" }}>
                          {bit} — {bit === 1 ? "Yang" : "Yin"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div
              style={{
                minHeight: 320,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "#4a4438",
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 12, opacity: 0.4 }}>☯</div>
              <p className="found-display" style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                Select a trigram
              </p>
              <p style={{ fontSize: 14, marginTop: 8 }}>to explore its meaning</p>
            </div>
          )}

          {/* 8-card quick-select grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 8,
              marginTop: 20,
            }}
          >
            {TRIGRAMS.map((t, i) => (
              <button
                key={i}
                onClick={() => setSelected(selected === i ? null : i)}
                style={{
                  background: selected === i ? `${t.color}15` : "rgba(15,15,22,0.7)",
                  border: `1px solid ${selected === i ? t.color + "50" : "rgba(255,255,255,0.05)"}`,
                  borderRadius: 10,
                  padding: "12px 8px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                  cursor: "pointer",
                  // Safe to use CSS transform here — these are plain HTML buttons, not SVG groups
                  transition: "transform 0.15s ease, background 0.15s, border-color 0.15s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = ""; }}
              >
                <TrigramLines bits={t.bits} color={t.color} size={28} />
                <span
                  className="found-display"
                  style={{
                    fontSize: 9,
                    color: t.color,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {t.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


// ─────────────────────────────────────────────────────────────────
// TAB: HEXAGRAMS
// ─────────────────────────────────────────────────────────────────
function HexagramsTab() {
  const [upper, setUpper] = useState(0);
  const [lower, setLower] = useState(7);
  const [key, setKey] = useState(0);

  const upperTrig = TRIGRAMS[upper];
  const lowerTrig = TRIGRAMS[lower];
  const combinedBits = [...upperTrig.bits, ...lowerTrig.bits];

  function handleSelect(which: "upper" | "lower", i: number) {
    if (which === "upper") setUpper(i);
    else setLower(i);
    setKey((k) => k + 1);
  }

  return (
    <div className="fade-up" style={{ maxWidth: 900, margin: "0 auto" }}>
      <p
        className="found-display"
        style={{
          fontSize: 11,
          letterSpacing: "0.2em",
          color: "#c9a84c",
          marginBottom: 12,
          textTransform: "uppercase",
        }}
      >
        Two Trigrams · Six Bits
      </p>
      <h2
        className="found-display"
        style={{
          fontSize: 28,
          fontWeight: 600,
          color: "#f5ead8",
          marginBottom: 8,
        }}
      >
        How Hexagrams Are Formed
      </h2>
      <p
        style={{
          fontSize: 16,
          color: "#8a8070",
          marginBottom: 40,
          lineHeight: 1.7,
        }}
      >
        Every hexagram is two trigrams stacked — an upper (heaven) and a lower
        (earth). This creates 8 × 8 = 64 unique six-bit configurations, each
        with its own name and meaning.
      </p>

      <div
        style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 48 }}
      >
        {/* Composer */}
        <div>
          <div
            style={{
              background: "rgba(10,10,16,0.9)",
              border: "1px solid rgba(201,168,76,0.15)",
              borderRadius: 16,
              padding: "32px 28px",
              marginBottom: 24,
            }}
          >
            <div
              className="found-display"
              style={{
                fontSize: 10,
                letterSpacing: "0.15em",
                color: "#c9a84c",
                textTransform: "uppercase",
                marginBottom: 20,
              }}
            >
              Hexagram Composer
            </div>

            {/* Upper trigram selector */}
            <div style={{ marginBottom: 24 }}>
              <div
                className="found-display"
                style={{
                  fontSize: 9,
                  color: "#4a4438",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: 10,
                }}
              >
                Upper Trigram (Heaven / Outer)
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {TRIGRAMS.map((t, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect("upper", i)}
                    style={{
                      background:
                        upper === i ? `${t.color}20` : "rgba(255,255,255,0.03)",
                      border: `1px solid ${upper === i ? t.color + "60" : "rgba(255,255,255,0.06)"}`,
                      borderRadius: 8,
                      padding: "6px 10px",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 3,
                      transition: "all 0.15s",
                    }}
                  >
                    <TrigramLines
                      bits={t.bits}
                      color={upper === i ? t.color : "#4a4438"}
                      size={20}
                    />
                    <span
                      style={{
                        fontSize: 8,
                        fontFamily: "'Cinzel', serif",
                        letterSpacing: "0.08em",
                        color: upper === i ? t.color : "#4a4438",
                        textTransform: "uppercase",
                      }}
                    >
                      {t.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Lower trigram selector */}
            <div>
              <div
                className="found-display"
                style={{
                  fontSize: 9,
                  color: "#4a4438",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: 10,
                }}
              >
                Lower Trigram (Earth / Inner)
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {TRIGRAMS.map((t, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect("lower", i)}
                    style={{
                      background:
                        lower === i ? `${t.color}20` : "rgba(255,255,255,0.03)",
                      border: `1px solid ${lower === i ? t.color + "60" : "rgba(255,255,255,0.06)"}`,
                      borderRadius: 8,
                      padding: "6px 10px",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 3,
                      transition: "all 0.15s",
                    }}
                  >
                    <TrigramLines
                      bits={t.bits}
                      color={lower === i ? t.color : "#4a4438"}
                      size={20}
                    />
                    <span
                      style={{
                        fontSize: 8,
                        fontFamily: "'Cinzel', serif",
                        letterSpacing: "0.08em",
                        color: lower === i ? t.color : "#4a4438",
                        textTransform: "uppercase",
                      }}
                    >
                      {t.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Anatomy diagram */}
          <div
            style={{
              background: "rgba(10,10,16,0.8)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 12,
              padding: "20px 24px",
            }}
          >
            <div
              className="found-display"
              style={{
                fontSize: 9,
                color: "#4a4438",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              Anatomy
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {combinedBits.reverse().map((bit, di) => {
                const actualLine = 6 - di;
                const isUpper = di < 3;
                const trigColor = isUpper ? upperTrig.color : lowerTrig.color;
                const label = isUpper
                  ? `Upper · ${upperTrig.name} · Line ${actualLine}`
                  : `Lower · ${lowerTrig.name} · Line ${actualLine}`;
                return (
                  <div
                    key={di}
                    style={{ display: "flex", alignItems: "center", gap: 12 }}
                  >
                    <span
                      style={{
                        fontSize: 9,
                        color: "#3a3428",
                        fontFamily: "monospace",
                        width: 28,
                        textAlign: "right",
                      }}
                    >
                      L{actualLine}
                    </span>
                    <HexLine
                      yang={bit === 1}
                      color={bit === 1 ? trigColor : `${trigColor}45`}
                      width={100}
                      height={7}
                      animated
                      delay={di * 0.06}
                    />
                    <span style={{ fontSize: 10, color: `${trigColor}80` }}>
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Result */}
        <div key={key} className="fade-up">
          <div
            style={{
              background: "rgba(10,10,16,0.95)",
              border: "1px solid rgba(201,168,76,0.2)",
              borderRadius: 16,
              padding: "32px 28px",
              textAlign: "center",
            }}
          >
            <div
              className="found-display"
              style={{
                fontSize: 9,
                color: "#c9a84c",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: 20,
              }}
            >
              Resulting Hexagram
            </div>

            {/* Hexagram visual */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  alignItems: "center",
                }}
              >
                {/* Upper group label */}
                <div
                  style={{
                    fontSize: 10,
                    color: upperTrig.color,
                    fontFamily: "'Cinzel', serif",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    opacity: 0.7,
                  }}
                >
                  ↑ {upperTrig.name} ({upperTrig.element})
                </div>
                {[...upperTrig.bits].reverse().map((bit, i) => (
                  <HexLine
                    key={`u-${i}`}
                    yang={bit === 1}
                    color={bit === 1 ? upperTrig.color : `${upperTrig.color}50`}
                    width={120}
                    height={10}
                    animated
                    delay={i * 0.07}
                  />
                ))}
                {/* Divider */}
                <div
                  style={{
                    width: 120,
                    height: 1,
                    background:
                      "linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)",
                    margin: "4px 0",
                  }}
                />
                {[...lowerTrig.bits].reverse().map((bit, i) => (
                  <HexLine
                    key={`l-${i}`}
                    yang={bit === 1}
                    color={bit === 1 ? lowerTrig.color : `${lowerTrig.color}50`}
                    width={120}
                    height={10}
                    animated
                    delay={(i + 3) * 0.07}
                  />
                ))}
                <div
                  style={{
                    fontSize: 10,
                    color: lowerTrig.color,
                    fontFamily: "'Cinzel', serif",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    opacity: 0.7,
                  }}
                >
                  ↓ {lowerTrig.name} ({lowerTrig.element})
                </div>
              </div>
            </div>

            {/* Binary vector */}
            <div
              style={{
                background: "rgba(0,0,0,0.5)",
                borderRadius: 10,
                padding: "14px 20px",
                marginBottom: 20,
              }}
            >
              <div
                className="found-display"
                style={{
                  fontSize: 9,
                  color: "#4a4438",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                6-Bit Vector
              </div>
              <div
                style={{ display: "flex", justifyContent: "center", gap: 6 }}
              >
                {[...upperTrig.bits, ...lowerTrig.bits].map((bit, i) => (
                  <div
                    key={i}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 6,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "monospace",
                      fontSize: 16,
                      fontWeight: 700,
                      background:
                        bit === 1
                          ? "rgba(245,216,138,0.12)"
                          : "rgba(255,255,255,0.04)",
                      border: `1px solid ${bit === 1 ? "rgba(245,216,138,0.3)" : "rgba(255,255,255,0.06)"}`,
                      color: bit === 1 ? "#f5d88a" : "#4a4438",
                    }}
                  >
                    {bit}
                  </div>
                ))}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 6,
                  marginTop: 4,
                }}
              >
                {[...upperTrig.bits, ...lowerTrig.bits].map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: 32,
                      textAlign: "center",
                      fontSize: 9,
                      color: "#3a3428",
                      fontFamily: "monospace",
                    }}
                  >
                    b{i}
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
              }}
            >
              {[
                {
                  label: "Upper",
                  value: `${upperTrig.name} · ${upperTrig.element}`,
                  color: upperTrig.color,
                },
                {
                  label: "Lower",
                  value: `${lowerTrig.name} · ${lowerTrig.element}`,
                  color: lowerTrig.color,
                },
                {
                  label: "Upper quality",
                  value: upperTrig.quality,
                  color: upperTrig.color,
                },
                {
                  label: "Lower quality",
                  value: lowerTrig.quality,
                  color: lowerTrig.color,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    background: `${item.color}08`,
                    border: `1px solid ${item.color}15`,
                    borderRadius: 8,
                    padding: "10px 12px",
                    textAlign: "left",
                  }}
                >
                  <div
                    className="found-display"
                    style={{
                      fontSize: 8,
                      color: item.color,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      marginBottom: 3,
                    }}
                  >
                    {item.label}
                  </div>
                  <div style={{ fontSize: 12, color: "#c9c0b0" }}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// TAB: DIVINATION
// ─────────────────────────────────────────────────────────────────
function DivinationTab() {
  const [activeStep, setActiveStep] = useState(0);
  const [coins, setCoins] = useState<number[]>([]);
  const [spinning, setSpinning] = useState(false);
  const [lines, setLines] = useState<{ value: number; moving: boolean }[]>([]);

  function throwCoins() {
    if (spinning || lines.length >= 6) return;
    setSpinning(true);
    setActiveStep(2);
    setTimeout(() => {
      const toss = [0, 1, 2].map(() => (Math.random() > 0.5 ? 3 : 2));
      setCoins(toss);
      const sum = toss.reduce((a, b) => a + b, 0);
      // 6 = old yin (moving), 7 = young yang, 8 = young yin, 9 = old yang (moving)
      const moving = sum === 6 || sum === 9;
      const yang = sum === 7 || sum === 9;
      setLines((prev) => [...prev, { value: yang ? 1 : 0, moving }]);
      setSpinning(false);
      if (lines.length === 5) setActiveStep(3);
    }, 600);
  }

  function reset() {
    setLines([]);
    setCoins([]);
    setActiveStep(1);
  }

  const step = DIVINATION_STEPS[activeStep];

  return (
    <div className="fade-up" style={{ maxWidth: 900, margin: "0 auto" }}>
      <p
        className="found-display"
        style={{
          fontSize: 11,
          letterSpacing: "0.2em",
          color: "#c9a84c",
          marginBottom: 12,
          textTransform: "uppercase",
        }}
      >
        The Oracle Method
      </p>
      <h2
        className="found-display"
        style={{
          fontSize: 28,
          fontWeight: 600,
          color: "#f5ead8",
          marginBottom: 8,
        }}
      >
        How Divination Works
      </h2>
      <p
        style={{
          fontSize: 16,
          color: "#8a8070",
          marginBottom: 40,
          lineHeight: 1.7,
        }}
      >
        The I Ching is consulted through a ritualized process of generating
        random lines. The randomness is not mere chance — it is the point of
        contact between the questioner's inner state and the pattern of the
        moment.
      </p>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 40 }}
      >
        {/* Steps */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {DIVINATION_STEPS.map((s, i) => (
            <button
              key={i}
              className={`step-card ${activeStep === i ? "step-active" : ""}`}
              onClick={() => setActiveStep(i)}
              style={{
                background:
                  activeStep === i
                    ? "rgba(201,168,76,0.06)"
                    : "rgba(15,15,22,0.6)",
                border: `1px solid ${activeStep === i ? "rgba(201,168,76,0.4)" : "rgba(255,255,255,0.04)"}`,
                borderRadius: 10,
                padding: "14px 16px",
                textAlign: "left",
                cursor: "pointer",
                display: "flex",
                gap: 14,
                alignItems: "flex-start",
                transition: "all 0.2s",
              }}
            >
              <div
                className="found-display"
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 10,
                  flexShrink: 0,
                  background:
                    activeStep === i
                      ? "rgba(201,168,76,0.2)"
                      : "rgba(255,255,255,0.04)",
                  color: activeStep === i ? "#f5d88a" : "#4a4438",
                  border: `1px solid ${activeStep === i ? "rgba(201,168,76,0.4)" : "rgba(255,255,255,0.06)"}`,
                }}
              >
                {s.step}
              </div>
              <div>
                <div
                  className="found-display"
                  style={{
                    fontSize: 12,
                    letterSpacing: "0.05em",
                    color: activeStep === i ? "#f5ead8" : "#6b6355",
                    marginBottom: 2,
                  }}
                >
                  {s.title}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Detail + interactive */}
        <div>
          <div
            key={activeStep}
            className="fade-up"
            style={{
              background: "rgba(10,10,16,0.95)",
              border: "1px solid rgba(201,168,76,0.12)",
              borderRadius: 16,
              padding: "28px 26px",
              marginBottom: 20,
            }}
          >
            <div
              className="found-display"
              style={{
                fontSize: 10,
                letterSpacing: "0.15em",
                color: "#c9a84c",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Step {step.step}
            </div>
            <h3
              className="found-display"
              style={{ fontSize: 18, color: "#f5ead8", marginBottom: 14 }}
            >
              {step.title}
            </h3>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: "#9a9082" }}>
              {step.description}
            </p>
          </div>

          {/* Coin toss simulation */}
          <div
            style={{
              background: "rgba(10,10,16,0.9)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 14,
              padding: "22px 22px",
            }}
          >
            <div
              className="found-display"
              style={{
                fontSize: 9,
                color: "#4a4438",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              Try it · Three-Coin Method
            </div>

            {/* Coins display */}
            <div
              style={{
                display: "flex",
                gap: 10,
                marginBottom: 16,
                justifyContent: "center",
              }}
            >
              {[0, 1, 2].map((ci) => {
                const val = coins[ci];
                const isHeads = val === 3;
                return (
                  <div
                    key={ci}
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: "50%",
                      border: `2px solid ${coins.length > 0 ? (isHeads ? "rgba(201,168,76,0.5)" : "rgba(255,255,255,0.1)") : "rgba(255,255,255,0.06)"}`,
                      background:
                        coins.length > 0
                          ? isHeads
                            ? "rgba(201,168,76,0.12)"
                            : "rgba(30,30,45,0.9)"
                          : "rgba(20,20,30,0.9)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 20,
                      animation: spinning ? `coinSpin 0.6s ease-out` : "none",
                      transition: "border-color 0.3s, background 0.3s",
                    }}
                  >
                    {coins.length > 0 ? (isHeads ? "☀" : "☽") : "○"}
                  </div>
                );
              })}
            </div>

            <p
              style={{
                fontSize: 12,
                color: "#4a4438",
                textAlign: "center",
                marginBottom: 14,
              }}
            >
              ☀ Heads = 3 (Yang) · ☽ Tails = 2 (Yin) · Sum determines line type
            </p>

            {/* Built lines */}
            {lines.length > 0 && (
              <div
                style={{
                  background: "rgba(0,0,0,0.3)",
                  borderRadius: 10,
                  padding: "14px 16px",
                  marginBottom: 14,
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                {[...lines].reverse().map((line, di) => {
                  const lineNum = lines.length - di;
                  return (
                    <div
                      key={di}
                      style={{ display: "flex", alignItems: "center", gap: 10 }}
                    >
                      <span
                        style={{
                          fontSize: 10,
                          color: "#3a3428",
                          fontFamily: "monospace",
                          width: 24,
                        }}
                      >
                        L{lineNum}
                      </span>
                      <HexLine
                        yang={line.value === 1}
                        color={
                          line.moving
                            ? "#c084fc"
                            : line.value === 1
                              ? "#f5ead8"
                              : "#4a4438"
                        }
                        width={100}
                        height={7}
                        animated
                      />
                      {line.moving && (
                        <span
                          style={{
                            fontSize: 10,
                            color: "#c084fc",
                            fontFamily: "monospace",
                          }}
                        >
                          ← moving
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={throwCoins}
                disabled={spinning || lines.length >= 6}
                style={{
                  flex: 1,
                  padding: "11px 0",
                  background:
                    lines.length >= 6
                      ? "rgba(255,255,255,0.04)"
                      : "rgba(201,168,76,0.12)",
                  border: `1px solid ${lines.length >= 6 ? "rgba(255,255,255,0.06)" : "rgba(201,168,76,0.3)"}`,
                  borderRadius: 8,
                  color: lines.length >= 6 ? "#3a3428" : "#c9a84c",
                  fontFamily: "'Cinzel', serif",
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  cursor: lines.length >= 6 ? "not-allowed" : "pointer",
                  transition: "all 0.2s",
                }}
              >
                {spinning
                  ? "Casting…"
                  : lines.length >= 6
                    ? "Complete"
                    : `Cast Line ${lines.length + 1}`}
              </button>
              {lines.length > 0 && (
                <button
                  onClick={reset}
                  style={{
                    padding: "11px 16px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 8,
                    color: "#6b6355",
                    fontFamily: "'Cinzel', serif",
                    fontSize: 10,
                    letterSpacing: "0.1em",
                    cursor: "pointer",
                  }}
                >
                  ↺
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// TAB: BINARY STRUCTURE
// ─────────────────────────────────────────────────────────────────
function BinaryTab() {
  const [hoveredHex, setHoveredHex] = useState<number | null>(null);

  // Generate all 64 in binary order
  const allHexagrams = Array.from({ length: 64 }, (_, i) =>
    Array.from({ length: 6 }, (_, b) => (i >> (5 - b)) & 1),
  );

  const hov = hoveredHex !== null ? allHexagrams[hoveredHex] : null;

  return (
    <div className="fade-up" style={{ maxWidth: 900, margin: "0 auto" }}>
      <p
        className="found-display"
        style={{
          fontSize: 11,
          letterSpacing: "0.2em",
          color: "#c9a84c",
          marginBottom: 12,
          textTransform: "uppercase",
        }}
      >
        The 6-Dimensional Binary Space
      </p>
      <h2
        className="found-display"
        style={{
          fontSize: 28,
          fontWeight: 600,
          color: "#f5ead8",
          marginBottom: 8,
        }}
      >
        All 64 Hexagrams as {"{0,1}⁶"}
      </h2>
      <p
        style={{
          fontSize: 16,
          color: "#8a8070",
          marginBottom: 32,
          lineHeight: 1.7,
        }}
      >
        Shao Yong (Song Dynasty, ~1060 CE) arranged the 64 hexagrams in a
        sequence identical to binary counting — 000000 to 111111. This predates
        Leibniz's binary arithmetic by six centuries. Hover any hexagram to
        inspect its bit vector.
      </p>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 36 }}
      >
        {/* 8×8 grid */}
        <div>
          <div
            className="found-display"
            style={{
              fontSize: 9,
              color: "#3a3428",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            8 × 8 matrix · binary order (000000 → 111111)
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(8, 1fr)",
              gap: 4,
            }}
          >
            {allHexagrams.map((bits, idx) => {
              const group = Math.floor(idx / 8);
              const groupColors = [
                "#60a5fa",
                "#a78bfa",
                "#34d399",
                "#fbbf24",
                "#f87171",
                "#22d3ee",
                "#c084fc",
                "#f472b6",
              ];
              const color = groupColors[group];
              const isHov = hoveredHex === idx;
              return (
                <button
                  key={idx}
                  onMouseEnter={() => setHoveredHex(idx)}
                  onMouseLeave={() => setHoveredHex(null)}
                  style={{
                    background: isHov ? `${color}20` : "rgba(15,15,22,0.7)",
                    border: `1px solid ${isHov ? color + "50" : "rgba(255,255,255,0.04)"}`,
                    borderRadius: 6,
                    padding: "6px 4px",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 4,
                    transition: "all 0.12s",
                    transform: isHov ? "scale(1.08)" : "scale(1)",
                  }}
                >
                  <TrigramLines
                    bits={bits.slice(0, 3)}
                    color={isHov ? color : `${color}60`}
                    size={22}
                  />
                  <div
                    style={{
                      width: "100%",
                      height: 1,
                      background: isHov
                        ? `${color}40`
                        : "rgba(255,255,255,0.06)",
                    }}
                  />
                  <TrigramLines
                    bits={bits.slice(3)}
                    color={isHov ? color : `${color}40`}
                    size={22}
                  />
                  <span
                    style={{
                      fontSize: 7,
                      fontFamily: "monospace",
                      color: isHov ? color : "#3a3428",
                      marginTop: 2,
                    }}
                  >
                    {idx + 1}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Hover detail */}
        <div style={{ position: "sticky", top: 24, alignSelf: "start" }}>
          {hoveredHex !== null && hov ? (
            <div
              key={hoveredHex}
              className="fade-up"
              style={{
                background: "rgba(10,10,16,0.97)",
                border: "1px solid rgba(201,168,76,0.2)",
                borderRadius: 14,
                padding: "24px 20px",
              }}
            >
              <div
                className="found-display"
                style={{
                  fontSize: 9,
                  color: "#c9a84c",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}
              >
                Hexagram {hoveredHex + 1}
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 7,
                    alignItems: "center",
                  }}
                >
                  {[...hov].reverse().map((bit, i) => (
                    <HexLine
                      key={i}
                      yang={bit === 1}
                      color={bit === 1 ? "#f5ead8" : "#3a3428"}
                      width={80}
                      height={8}
                      animated
                      delay={i * 0.04}
                    />
                  ))}
                </div>
              </div>

              <div
                style={{
                  background: "rgba(0,0,0,0.4)",
                  borderRadius: 8,
                  padding: "12px 14px",
                  marginBottom: 14,
                }}
              >
                <div
                  className="found-display"
                  style={{
                    fontSize: 8,
                    color: "#4a4438",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginBottom: 8,
                  }}
                >
                  Binary vector
                </div>
                <div
                  style={{ display: "flex", gap: 4, justifyContent: "center" }}
                >
                  {hov.map((bit, i) => (
                    <div
                      key={i}
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: 5,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "monospace",
                        fontSize: 14,
                        fontWeight: 700,
                        background:
                          bit === 1
                            ? "rgba(245,216,138,0.12)"
                            : "rgba(255,255,255,0.04)",
                        border: `1px solid ${bit === 1 ? "rgba(245,216,138,0.3)" : "rgba(255,255,255,0.06)"}`,
                        color: bit === 1 ? "#f5d88a" : "#3a3428",
                      }}
                    >
                      {bit}
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 8,
                }}
              >
                <div
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: 7,
                    padding: "8px 10px",
                  }}
                >
                  <div
                    className="found-display"
                    style={{
                      fontSize: 8,
                      color: "#4a4438",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      marginBottom: 3,
                    }}
                  >
                    Index
                  </div>
                  <div
                    style={{
                      fontFamily: "monospace",
                      fontSize: 13,
                      color: "#f5d88a",
                    }}
                  >
                    {hoveredHex}
                  </div>
                </div>
                <div
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: 7,
                    padding: "8px 10px",
                  }}
                >
                  <div
                    className="found-display"
                    style={{
                      fontSize: 8,
                      color: "#4a4438",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      marginBottom: 3,
                    }}
                  >
                    Yang lines
                  </div>
                  <div
                    style={{
                      fontFamily: "monospace",
                      fontSize: 13,
                      color: "#f5d88a",
                    }}
                  >
                    {hov.filter(Boolean).length} / 6
                  </div>
                </div>
                <div
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: 7,
                    padding: "8px 10px",
                  }}
                >
                  <div
                    className="found-display"
                    style={{
                      fontSize: 8,
                      color: "#4a4438",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      marginBottom: 3,
                    }}
                  >
                    Upper
                  </div>
                  <div style={{ fontSize: 12, color: "#c9a84c" }}>
                    {TRIGRAMS.find(
                      (t) => t.bits.join("") === hov.slice(0, 3).join(""),
                    )?.name ?? "—"}
                  </div>
                </div>
                <div
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: 7,
                    padding: "8px 10px",
                  }}
                >
                  <div
                    className="found-display"
                    style={{
                      fontSize: 8,
                      color: "#4a4438",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      marginBottom: 3,
                    }}
                  >
                    Lower
                  </div>
                  <div style={{ fontSize: 12, color: "#c9a84c" }}>
                    {TRIGRAMS.find(
                      (t) => t.bits.join("") === hov.slice(3).join(""),
                    )?.name ?? "—"}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              style={{
                background: "rgba(10,10,16,0.7)",
                border: "1px solid rgba(255,255,255,0.04)",
                borderRadius: 14,
                padding: "32px 20px",
                textAlign: "center",
                color: "#3a3428",
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 12, opacity: 0.4 }}>
                ☰
              </div>
              <p
                className="found-display"
                style={{
                  fontSize: 10,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                Hover a hexagram
              </p>
              <p style={{ fontSize: 13, marginTop: 6, color: "#3a3428" }}>
                to inspect its binary vector
              </p>
            </div>
          )}

          {/* Binary facts */}
          <div
            style={{
              marginTop: 16,
              background: "rgba(10,10,16,0.7)",
              border: "1px solid rgba(201,168,76,0.1)",
              borderRadius: 12,
              padding: "16px 16px",
            }}
          >
            <div
              className="found-display"
              style={{
                fontSize: 9,
                color: "#c9a84c",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Binary Structure
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { label: "Dimensions", value: "6 bits", desc: "one per line" },
                { label: "States", value: "2⁶ = 64", desc: "all hexagrams" },
                {
                  label: "Neighbors",
                  value: "6 each",
                  desc: "hamming distance 1",
                },
                {
                  label: "Diameter",
                  value: "6 steps",
                  desc: "max path length",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                  }}
                >
                  <span style={{ fontSize: 12, color: "#6b6355" }}>
                    {item.label}
                  </span>
                  <div style={{ textAlign: "right" }}>
                    <span
                      style={{
                        fontFamily: "monospace",
                        fontSize: 13,
                        color: "#f5d88a",
                      }}
                    >
                      {item.value}
                    </span>
                    <span
                      style={{ fontSize: 10, color: "#3a3428", marginLeft: 6 }}
                    >
                      {item.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// ROOT COMPONENT
// ─────────────────────────────────────────────────────────────────
type TabId =
  | "overview"
  | "history"
  | "yinyang"
  | "trigrams"
  | "hexagrams"
  | "binary"
  | "divination";

const TABS: { id: TabId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "history", label: "History" },
  { id: "yinyang", label: "Yin & Yang" },
  { id: "trigrams", label: "Trigrams" },
  { id: "hexagrams", label: "Hexagrams" },
  { id: "binary", label: "Binary" },
  { id: "divination", label: "Divination" },
];

export default function Foundations() {
  const [tab, setTab] = useState<TabId>("overview");
  const [tabKey, setTabKey] = useState(0);

  function switchTab(id: TabId) {
    setTab(id);
    setTabKey((k) => k + 1);
  }

  return (
    <>
      {/* Header Start */}
      <div className="relative text-center max-w-4xl mx-auto py-0 rounded-xl">
        {/* BACKGROUND */}
        <div
          className="absolute inset-0 blur-3xl opacity-100 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 30% 40%, rgba(180,150,80,0.10), transparent 60%), radial-gradient(circle at 70% 60%, rgba(30,58,138,0.15), transparent 65%)",
            animation: "cloudMove 28s ease-in-out infinite",
          }}
        />

        {/* CONTENT */}
        <div className="relative text-center max-w-3xl mx-auto py-10">
          <p className="text-xs tracking-[0.3em] text-amber-400/70 uppercase mb-3">
            Foundations
          </p>

          <h1 className="text-5xl font-semibold tracking-tight mb-5 leading-tight">
            Yin, Yang & the Book of Changes
          </h1>

          <p className="text-neutral-400 leading-relaxed text-lg">
            A symbolic system encoding transformation through binary structure.
            The I Ching represents reality as the interplay of opposites — a
            language of change expressed through patterns of Yin and Yang.
          </p>

          {/* Tags */}
          <div className="flex justify-center flex-wrap gap-2 mt-6">
            <span className="px-3 py-1 text-xs rounded-full bg-amber-500/10 text-amber-400">
              Cosmology
            </span>
            <span className="px-3 py-1 text-xs rounded-full bg-indigo-500/10 text-indigo-400">
              Duality
            </span>
            <span className="px-3 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400">
              Binary Logic
            </span>
            <span className="px-3 py-1 text-xs rounded-full bg-yellow-500/10 text-yellow-300">
              Ancient Text
            </span>
          </div>

          {/* QUOTE */}
          <div className="mt-10">
            <p className="text-lg text-neutral-200 italic font-medium max-w-3xl mx-auto leading-relaxed">
              “The intellect does not attain truth by likeness, but by the
              unfolding of what is enfolded within it.”
            </p>
            <p className="text-sm text-amber-400 mt-3 tracking-wide">
              — Nicholas of Cusa, De Docta Ignorantia
            </p>
          </div>

          {/* Divider */}
          <div className="mt-8 h-px bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />
        </div>
      </div>
      <div
        className="found-root"
        style={{
          background:
            "linear-gradient(180deg, #08080f 0%, #0a0a16 40%, #070710 100%)",
          minHeight: "100vh",
        }}
      >
        <style>{STYLES}</style>

        {/* Subtle radial ambience */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            pointerEvents: "none",
            background: `
            radial-gradient(ellipse 60% 40% at 20% 20%, rgba(201,168,76,0.04), transparent 60%),
            radial-gradient(ellipse 40% 60% at 80% 80%, rgba(96,165,250,0.03), transparent 60%)
          `,
            zIndex: 0,
          }}
        />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 1 }}>
          {/* ── HEADER (passed through as-is from the user's existing code) ── */}
          <div style={{ padding: "40px 40px 0" }}>
            <p
              className="found-display"
              style={{
                fontSize: 11,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#c9a84c",
                marginBottom: 12,
              }}
            >
              Foundations
            </p>
            <h1
              className="found-display"
              style={{
                fontSize: 42,
                fontWeight: 600,
                color: "#f5ead8",
                marginBottom: 16,
                lineHeight: 1.15,
              }}
            >
              Yin, Yang & the
              <br />
              Book of Changes
            </h1>
            <p
              style={{
                fontSize: 18,
                lineHeight: 1.8,
                color: "#7a7268",
                maxWidth: 620,
                marginBottom: 0,
              }}
            >
              The fundamental primitives from which all 64 hexagrams are
              constructed — a binary cosmology encoded three millennia before
              the digital age.
            </p>
          </div>

          {/* Divider */}
          <div
            style={{
              margin: "32px 0 0",
              height: 1,
              background:
                "linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.2) 30%, rgba(201,168,76,0.1) 70%, transparent 100%)",
            }}
          />

          {/* Main Top Header End */}

          {/* ── TAB BAR ── */}
          <div
            style={{
              padding: "0 40px",
              position: "sticky",
              top: 0,
              zIndex: 10,
              background: "rgba(8,8,15,0.92)",
              backdropFilter: "blur(12px)",
              borderBottom: "1px solid rgba(201,168,76,0.08)",
            }}
          >
            <div className="tab-bar">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  className={`tab-btn ${tab === t.id ? "active" : ""}`}
                  onClick={() => switchTab(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* ── TAB CONTENT ── */}
          <div
            key={tabKey}
            style={{
              padding: "44px 40px 80px",
              minHeight: "calc(100vh - 240px)",
            }}
          >
            {tab === "overview" && <OverviewTab />}
            {tab === "history" && <HistoryTab />}
            {tab === "yinyang" && <YinYangTab />}
            {tab === "trigrams" && <TrigramsTab />}
            {tab === "hexagrams" && <HexagramsTab />}
            {tab === "binary" && <BinaryTab />}
            {tab === "divination" && <DivinationTab />}
          </div>

          {/* Footer */}
          <div
            style={{
              padding: "20px 40px 40px",
              borderTop: "1px solid rgba(255,255,255,0.04)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              {TABS.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => switchTab(t.id)}
                  style={{
                    width: tab === t.id ? 20 : 5,
                    height: 5,
                    borderRadius: 3,
                    background:
                      tab === t.id ? "#c9a84c" : "rgba(255,255,255,0.1)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.25s",
                    padding: 0,
                  }}
                />
              ))}
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={() => {
                  const idx = TABS.findIndex((t) => t.id === tab);
                  if (idx > 0) switchTab(TABS[idx - 1].id);
                }}
                disabled={tab === TABS[0].id}
                style={{
                  padding: "8px 20px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 6,
                  color: tab === TABS[0].id ? "#2a2820" : "#6b6355",
                  fontFamily: "'Cinzel', serif",
                  fontSize: 10,
                  letterSpacing: "0.1em",
                  cursor: tab === TABS[0].id ? "not-allowed" : "pointer",
                }}
              >
                ← Prev
              </button>
              <button
                onClick={() => {
                  const idx = TABS.findIndex((t) => t.id === tab);
                  if (idx < TABS.length - 1) switchTab(TABS[idx + 1].id);
                }}
                disabled={tab === TABS[TABS.length - 1].id}
                style={{
                  padding: "8px 20px",
                  background:
                    tab === TABS[TABS.length - 1].id
                      ? "rgba(255,255,255,0.02)"
                      : "rgba(201,168,76,0.12)",
                  border: `1px solid ${tab === TABS[TABS.length - 1].id ? "rgba(255,255,255,0.04)" : "rgba(201,168,76,0.3)"}`,
                  borderRadius: 6,
                  color:
                    tab === TABS[TABS.length - 1].id ? "#2a2820" : "#c9a84c",
                  fontFamily: "'Cinzel', serif",
                  fontSize: 10,
                  letterSpacing: "0.1em",
                  cursor:
                    tab === TABS[TABS.length - 1].id
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
