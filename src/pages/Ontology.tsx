import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────
type Tab = "cosmos" | "entities" | "relations" | "hierarchy" | "references";

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const TRIGRAMS = [
  { name: "☰ Qián", english: "Heaven", nature: "Creative force, pure Yang", element: "Sky", attribute: "Strength", family: "Father", bits: "111", color: "#f59e0b" },
  { name: "☷ Kūn", english: "Earth",   nature: "Receptive force, pure Yin",  element: "Ground", attribute: "Devotion", family: "Mother", bits: "000", color: "#8b5cf6" },
  { name: "☳ Zhèn", english: "Thunder", nature: "Arousing, movement begins", element: "Thunder", attribute: "Movement", family: "First son", bits: "001", color: "#ef4444" },
  { name: "☵ Kǎn", english: "Water",   nature: "Abysmal, danger & flow",    element: "Water",   attribute: "Danger",   family: "Second son", bits: "010", color: "#3b82f6" },
  { name: "☶ Gèn", english: "Mountain", nature: "Keeping still, arrested",   element: "Mountain", attribute: "Stillness", family: "Third son", bits: "011", color: "#6b7280" },
  { name: "☴ Xùn", english: "Wind",    nature: "Gentle, penetrating",        element: "Wind/Wood", attribute: "Gentleness", family: "First daughter", bits: "110", color: "#10b981" },
  { name: "☲ Lí",  english: "Fire",    nature: "Clinging, radiance",          element: "Fire",    attribute: "Clarity",   family: "Second daughter", bits: "101", color: "#f97316" },
  { name: "☱ Duì", english: "Lake",    nature: "Joyous, satisfaction",        element: "Lake",    attribute: "Joy",       family: "Third daughter", bits: "110", color: "#06b6d4" },
];

const ONTOLOGICAL_ENTITIES = [
  {
    id: "taiji",
    label: "太極 Tàijí",
    english: "Supreme Ultimate",
    tier: 0,
    x: 380, y: 60,
    description: "The undifferentiated absolute — the primordial unity before duality. Neither being nor non-being; the source from which all change emerges. Not a static state but a dynamic field of pure potentiality.",
    type: "metaphysical",
    properties: ["Uncaused", "Self-generating", "Undivided", "Primordial"],
    ref: "Wilhelm, R. (1967). The I Ching or Book of Changes. Princeton University Press. Introduction.",
  },
  {
    id: "liangyi",
    label: "兩儀 Liǎngyí",
    english: "Two Modes / Yin & Yang",
    tier: 1,
    x: 180, y: 160,
    description: "The first ontological bifurcation. Yin (broken line ⚋) and Yang (solid line ⚊) are not opposites but complementary poles of a single dynamic. Neither exists without the other; they mutually define, generate, and transform into each other.",
    type: "principle",
    properties: ["Complementary", "Relative", "Cyclic", "Interdependent"],
    ref: "Shaughnessy, E. L. (1996). I Ching: The Classic of Changes. Ballantine Books.",
  },
  {
    id: "sixiang",
    label: "四象 Sìxiàng",
    english: "Four Images / Symbols",
    tier: 2,
    x: 380, y: 260,
    description: "Old Yin, Young Yin, Young Yang, Old Yang — the four phases of cyclical transformation. The 'old' lines are changing lines; they contain the seeds of their own transformation into the opposite, making divination dynamic rather than static.",
    type: "structure",
    properties: ["Transitional", "Temporal", "Phase-based", "Mutable"],
    ref: "Lynn, R. J. (1994). The Classic of Changes. Columbia University Press.",
  },
  {
    id: "bagua",
    label: "八卦 Bāguà",
    english: "Eight Trigrams",
    tier: 3,
    x: 580, y: 160,
    description: "Each trigram is a 3-bit binary structure encoding a fundamental natural force. The eight trigrams form a complete basis for categorizing phenomena. The two arrangements — Earlier Heaven (Fuxi) and Later Heaven (King Wen) — represent ideal and temporal orderings respectively.",
    type: "structure",
    properties: ["Triadic", "Binary-encoded", "Archetypal", "Combinatorial"],
    ref: "Shchutskii, J. K. (1979). Researches on the I Ching. Princeton University Press.",
  },
  {
    id: "hexagram",
    label: "六十四卦 Liùshísì Guà",
    english: "64 Hexagrams",
    tier: 4,
    x: 380, y: 360,
    description: "The complete ontological map: all 64 possible 6-bit combinations of Yin/Yang lines. Each hexagram is a composite of two trigrams (upper/lower), forming a situation — a unique configuration of forces in time. Hamming distance between hexagrams measures ontological proximity.",
    type: "instance",
    properties: ["6-dimensional", "Complete", "Situational", "Temporal"],
    ref: "Wilhelm, R. (1967). I Ching. Princeton University Press. 64 hexagram entries.",
  },
  {
    id: "line",
    label: "爻 Yáo",
    english: "Line / Yao",
    tier: 5,
    x: 180, y: 460,
    description: "The atomic ontological unit. Each line is either Yin (⚋, broken) or Yang (⚊, solid). Lines carry positional meaning (bottom=first, top=sixth) and may be 'moving' (changing). A changing line transforms the hexagram into a related hexagram, encoding the direction of change.",
    type: "atomic",
    properties: ["Binary", "Positional", "Mutable", "Directional"],
    ref: "Kunst, R. A. (1985). The Original Yijing. UC Berkeley Dissertation.",
  },
  {
    id: "change",
    label: "變 Biàn",
    english: "Change / Transformation",
    tier: 5,
    x: 580, y: 460,
    description: "Change is not incidental to the I Ching ontology — it IS the ontology. The Yìjīng means 'Classic of Changes'. All entities are defined by their transformational potential. The Hamming graph of hexagrams is literally the geometry of possible change.",
    type: "process",
    properties: ["Process-based", "Relational", "Inevitable", "Patterned"],
    ref: "Needham, J. (1956). Science and Civilisation in China, Vol. 2. Cambridge University Press.",
  },
];

const RELATIONS = [
  { from: "taiji", to: "liangyi", label: "generates", type: "generative" },
  { from: "taiji", to: "liangyi", label: "→ Yin/Yang bifurcation", type: "generative" },
  { from: "liangyi", to: "sixiang", label: "compose into", type: "compositional" },
  { from: "liangyi", to: "bagua", label: "triple to form", type: "compositional" },
  { from: "bagua", to: "hexagram", label: "pair to form", type: "compositional" },
  { from: "sixiang", to: "hexagram", label: "instantiate in", type: "instantiation" },
  { from: "hexagram", to: "line", label: "composed of 6", type: "partOf" },
  { from: "line", to: "change", label: "moving lines trigger", type: "causal" },
  { from: "change", to: "hexagram", label: "transforms", type: "causal" },
];

const REFERENCES = [
  {
    authors: "Wilhelm, R. & Baynes, C. F.",
    year: 1967,
    title: "The I Ching or Book of Changes",
    publisher: "Princeton University Press",
    note: "The canonical Western translation with Jungian foreword. The foundational text for Western ontological interpretations.",
    url: "https://press.princeton.edu/books/paperback/9780691099674/the-i-ching-or-book-of-changes",
    tags: ["Translation", "Canonical", "Jungian"],
  },
  {
    authors: "Shaughnessy, E. L.",
    year: 1996,
    title: "I Ching: The Classic of Changes",
    publisher: "Ballantine Books",
    note: "Scholarly translation of the Mawangdui silk manuscript (168 BCE), revealing the earliest known ordering of hexagrams.",
    url: "https://www.penguinrandomhouse.com/books/319042/i-ching-by-edward-l-shaughnessy/",
    tags: ["Mawangdui", "Manuscript", "Historical"],
  },
  {
    authors: "Lynn, R. J.",
    year: 1994,
    title: "The Classic of Changes: A New Translation of the I Ching",
    publisher: "Columbia University Press",
    note: "Translation of Wang Bi's (226–249 CE) commentary — the most philosophically systematic classical treatment of I Ching ontology.",
    url: "https://cup.columbia.edu/book/the-classic-of-changes/9780231082945",
    tags: ["Wang Bi", "Philosophy", "Commentary"],
  },
  {
    authors: "Needham, J.",
    year: 1956,
    title: "Science and Civilisation in China, Vol. 2: History of Scientific Thought",
    publisher: "Cambridge University Press",
    note: "Chapter on correlative thinking and the proto-binary structure of the I Ching. Connects hexagram combinatorics to Leibniz's binary arithmetic.",
    url: "https://www.cambridge.org/core/books/science-and-civilisation-in-china/",
    tags: ["Science", "Binary", "Leibniz"],
  },
  {
    authors: "Shchutskii, J. K.",
    year: 1979,
    title: "Researches on the I Ching",
    publisher: "Princeton University Press",
    note: "Rigorous structural analysis of hexagram relationships, transformation rules, and the underlying combinatorial ontology.",
    url: "https://press.princeton.edu/books/paperback/9780691099842/researches-on-the-i-ching",
    tags: ["Structural", "Mathematical", "Transformations"],
  },
  {
    authors: "Rutt, R.",
    year: 1996,
    title: "Zhouyi: The Book of Changes",
    publisher: "Routledge",
    note: "Historical-critical edition placing the Yijing in Shang/Zhou archaeological and ritual context. Challenges mythological interpretations.",
    url: "https://www.routledge.com/Zhouyi-A-New-Translation-with-Commentary-of-the-Book-of-Changes/Rutt/p/book/9780700704446",
    tags: ["Historical", "Archaeological", "Critical"],
  },
  {
    authors: "Smith, R. J.",
    year: 2012,
    title: "The I Ching: A Biography",
    publisher: "Princeton University Press",
    note: "Traces the global intellectual history of the I Ching from oracle bone divination to modern AI and chaos theory applications.",
    url: "https://press.princeton.edu/books/paperback/9780691145099/the-i-ching",
    tags: ["History", "Global", "Modern"],
  },
  {
    authors: "Leibniz, G. W.",
    year: 1703,
    title: "Explication de l'Arithmétique Binaire",
    publisher: "Mémoires de l'Académie Royale des Sciences",
    note: "Leibniz's letter recognizing that Fuxi's hexagram ordering encodes binary arithmetic — the first Western observation of the hexagrams' computational structure.",
    url: "https://www.leibniz-translations.com/binary.htm",
    tags: ["Binary", "Mathematics", "Historical"],
  },
];

// ─────────────────────────────────────────────
// MICRO COMPONENTS
// ─────────────────────────────────────────────

function Tag({ label, color = "#334155" }: { label: string; color?: string }) {
  return (
    <span style={{
      fontSize: 10,
      padding: "2px 7px",
      borderRadius: 4,
      background: `${color}22`,
      border: `1px solid ${color}44`,
      color,
      letterSpacing: "0.04em",
      fontWeight: 500,
    }}>
      {label}
    </span>
  );
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{
        fontSize: 10,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color: "#475569",
        marginBottom: 8,
        fontWeight: 600,
      }}>
        I Ching · Ontological Structure
      </div>
      <h2 style={{ margin: 0, fontSize: 22, fontWeight: 600, color: "#e2e8f0", lineHeight: 1.2 }}>
        {children}
      </h2>
    </div>
  );
}

// ─────────────────────────────────────────────
// TAB: COSMOS — animated cosmogony diagram
// ─────────────────────────────────────────────
function CosmosTab() {
  const [step, setStep] = useState(0);
  const [animating, setAnimating] = useState(false);

  const STEPS = [
    { label: "Wújí 無極", sub: "Limitless void — before being", color: "#1e293b", desc: "The Wújí (無極, Limitless) is the state before differentiation. Not emptiness, but pure potentiality — a field without form, cause, or boundary. The Tàijí emerges from the Wújí as the first movement of existence." },
    { label: "Tàijí 太極", sub: "Supreme Ultimate — primordial unity", color: "#fbbf24", desc: "The Tàijí (太極, Supreme Ultimate) is the undivided whole. It is both the source of duality and the unity that transcends it. Visualized as the Taijitu (yin-yang symbol) — not a static emblem but a dynamic process of mutual becoming." },
    { label: "Liǎngyí 兩儀", sub: "Two modes — Yin & Yang arise", color: "#60a5fa", desc: "From Tàijí arises Liǎngyí (兩儀, Two Modes): Yin (阴, broken ⚋) and Yang (阳, solid ⚊). These are not substances but relational qualities — nothing is absolutely Yin or Yang, only more Yin or Yang relative to something else." },
    { label: "Sìxiàng 四象", sub: "Four images — phases of change", color: "#34d399", desc: "The Sìxiàng (四象, Four Images) arise by doubling the two modes: Old Yang (太阳), Young Yin (少阴), Young Yang (少阳), Old Yin (太阴). 'Old' lines are changing lines — they contain their own negation and point toward transformation." },
    { label: "Bāguà 八卦", sub: "Eight trigrams — natural archetypes", color: "#a78bfa", desc: "The Bāguà (八卦, Eight Trigrams) each encode a 3-bit pattern representing a fundamental natural force: Heaven (111), Earth (000), Thunder (001), Water (010), Mountain (011), Wind (110), Fire (101), Lake (110). Two arrangements exist: Earlier Heaven (Fuxi, ideal/circular) and Later Heaven (King Wen, temporal/sequential)." },
    { label: "64 Guà 六十四卦", sub: "Sixty-four hexagrams — complete map", color: "#f472b6", desc: "The 64 hexagrams (六十四卦) form the complete ontological map of possible situations. Each pairs two trigrams (upper/lower). The 64 form a 6-dimensional hypercube (the Boolean lattice B₆) where adjacent hexagrams differ by exactly one Yin/Yang line — the geometry of minimal change." },
  ];

  const advance = () => {
    if (animating || step >= STEPS.length - 1) return;
    setAnimating(true);
    setTimeout(() => { setStep((s) => s + 1); setAnimating(false); }, 300);
  };
  const retreat = () => {
    if (animating || step <= 0) return;
    setAnimating(true);
    setTimeout(() => { setStep((s) => s - 1); setAnimating(false); }, 300);
  };

  const current = STEPS[step];

  return (
    <div>
      <SectionHeader>Cosmogonic Unfolding</SectionHeader>
      <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.7, marginBottom: 28, maxWidth: 600 }}>
        The I Ching presents a generative ontology — reality unfolds through successive differentiations from an undivided source. This is not creation ex nihilo but emanation: each level contains and generates the next.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {/* Left: SVG diagram */}
        <div style={{ position: "relative" }}>
          <svg width="100%" viewBox="0 0 340 420" style={{ display: "block" }}>
            {/* Background subtle grid */}
            {[1,2,3,4,5].map(i => (
              <circle key={i} cx={170} cy={210} r={i*36} fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth={1} />
            ))}

            {/* Connection lines */}
            {step >= 1 && <line x1={170} y1={50} x2={170} y2={90} stroke="#fbbf2466" strokeWidth={1.5} strokeDasharray="4 3" />}
            {step >= 2 && (
              <>
                <line x1={170} y1={130} x2={100} y2={178} stroke="#60a5fa66" strokeWidth={1.5} strokeDasharray="4 3" />
                <line x1={170} y1={130} x2={240} y2={178} stroke="#60a5fa66" strokeWidth={1.5} strokeDasharray="4 3" />
              </>
            )}
            {step >= 3 && (
              <>
                <line x1={100} y1={210} x2={65}  y2={258} stroke="#34d39966" strokeWidth={1} strokeDasharray="3 4" />
                <line x1={100} y1={210} x2={135} y2={258} stroke="#34d39966" strokeWidth={1} strokeDasharray="3 4" />
                <line x1={240} y1={210} x2={205} y2={258} stroke="#34d39966" strokeWidth={1} strokeDasharray="3 4" />
                <line x1={240} y1={210} x2={275} y2={258} stroke="#34d39966" strokeWidth={1} strokeDasharray="3 4" />
              </>
            )}
            {step >= 4 && (
              <>
                {[45,90,130,170,210,250,290,330].map((x, i) => (
                  <line key={i} x1={[65,65,135,135,205,205,275,275][i]} y1={290} x2={x < 200 ? x - 10 : x - 10} y2={338}
                    stroke="#a78bfa44" strokeWidth={0.8} strokeDasharray="2 5" />
                ))}
              </>
            )}

            {/* Layer 0: Wuji */}
            <g opacity={step >= 0 ? 1 : 0.1} style={{ transition: "opacity 0.4s" }}>
              <circle cx={170} cy={28} r={20} fill="rgba(15,23,42,0.8)" stroke="rgba(255,255,255,0.12)" strokeWidth={1} />
              <text x={170} y={32} textAnchor="middle" fontSize={9} fill="#475569">無極</text>
            </g>

            {/* Layer 1: Taiji */}
            {step >= 1 && (
              <g style={{ animation: "fadeIn 0.4s ease" }}>
                <circle cx={170} cy={110} r={22} fill="rgba(251,191,36,0.12)" stroke="#fbbf2466" strokeWidth={1.5} />
                <text x={170} y={108} textAnchor="middle" fontSize={8} fill="#fbbf24">☯</text>
                <text x={170} y={120} textAnchor="middle" fontSize={7} fill="#fbbf2499">太極</text>
              </g>
            )}

            {/* Layer 2: Yin/Yang */}
            {step >= 2 && (
              <g style={{ animation: "fadeIn 0.4s ease" }}>
                {[{ cx: 100, label: "⚋", sub: "Yin", color: "#8b5cf6" }, { cx: 240, label: "⚊", sub: "Yang", color: "#f59e0b" }].map((d) => (
                  <g key={d.sub}>
                    <circle cx={d.cx} cy={196} r={18} fill={`${d.color}18`} stroke={`${d.color}55`} strokeWidth={1.5} />
                    <text x={d.cx} y={194} textAnchor="middle" fontSize={11} fill={d.color}>{d.label}</text>
                    <text x={d.cx} y={207} textAnchor="middle" fontSize={7} fill={`${d.color}99`}>{d.sub}</text>
                  </g>
                ))}
              </g>
            )}

            {/* Layer 3: Si Xiang */}
            {step >= 3 && (
              <g style={{ animation: "fadeIn 0.4s ease" }}>
                {[
                  { cx: 65,  label: "⚋⚋", color: "#8b5cf6" },
                  { cx: 135, label: "⚊⚋", color: "#60a5fa" },
                  { cx: 205, label: "⚋⚊", color: "#34d399" },
                  { cx: 275, label: "⚊⚊", color: "#f59e0b" },
                ].map((d, i) => (
                  <g key={i}>
                    <circle cx={d.cx} cy={274} r={14} fill={`${d.color}15`} stroke={`${d.color}44`} strokeWidth={1} />
                    <text x={d.cx} y={278} textAnchor="middle" fontSize={8} fill={d.color}>{d.label}</text>
                  </g>
                ))}
              </g>
            )}

            {/* Layer 4: Bagua — 8 tiny circles */}
            {step >= 4 && (
              <g style={{ animation: "fadeIn 0.4s ease" }}>
                {[45,90,135,170,210,245,290,330].map((cx, i) => (
                  <g key={i}>
                    <circle cx={cx-10} cy={348} r={10} fill={`${TRIGRAMS[i].color}20`} stroke={`${TRIGRAMS[i].color}55`} strokeWidth={1} />
                    <text x={cx-10} y={352} textAnchor="middle" fontSize={8} fill={TRIGRAMS[i].color}>
                      {["☰","☷","☳","☵","☶","☴","☲","☱"][i]}
                    </text>
                  </g>
                ))}
              </g>
            )}

            {/* Layer 5: 64 hexagrams hinted */}
            {step >= 5 && (
              <g style={{ animation: "fadeIn 0.4s ease" }}>
                {Array.from({ length: 32 }).map((_, i) => (
                  <rect key={i}
                    x={10 + i * 10} y={408}
                    width={7} height={7} rx={1}
                    fill={TRIGRAMS[Math.floor(i / 8)].color}
                    opacity={0.3}
                  />
                ))}
                {Array.from({ length: 32 }).map((_, i) => (
                  <rect key={i + 32}
                    x={10 + i * 10} y={417}
                    width={7} height={7} rx={1}
                    fill={TRIGRAMS[Math.floor((i + 32) / 8)].color}
                    opacity={0.3}
                  />
                ))}
              </g>
            )}

            {/* Step labels on left */}
            {["Wújí","Tàijí","Liǎngyí","Sìxiàng","Bāguà","64 Guà"].slice(0, step + 1).map((label, i) => (
              <text key={i} x={2} y={[28, 110, 196, 274, 348, 412][i]} fontSize={7} fill="#334155" textAnchor="start">
                {label}
              </text>
            ))}
          </svg>
        </div>

        {/* Right: description + navigation */}
        <div>
          {/* Progress dots */}
          <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
            {STEPS.map((s, i) => (
              <button
                key={i}
                onClick={() => setStep(i)}
                style={{
                  width: i === step ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: i <= step ? s.color : "#1e293b",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  padding: 0,
                }}
              />
            ))}
          </div>

          {/* Current step card */}
          <div style={{
            background: `${current.color}0e`,
            border: `1px solid ${current.color}33`,
            borderRadius: 12,
            padding: "20px 22px",
            marginBottom: 16,
            transition: "all 0.3s",
          }}>
            <div style={{ fontSize: 10, color: "#475569", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>
              Layer {step} of 5
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, color: current.color, marginBottom: 4 }}>
              {current.label}
            </div>
            <div style={{ fontSize: 12, color: "#64748b", marginBottom: 12 }}>{current.sub}</div>
            <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.7, margin: 0 }}>
              {current.desc}
            </p>
          </div>

          {/* Navigation */}
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={retreat}
              disabled={step === 0}
              style={{
                flex: 1,
                padding: "9px 0",
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.08)",
                background: step === 0 ? "transparent" : "rgba(255,255,255,0.04)",
                color: step === 0 ? "#1e293b" : "#64748b",
                cursor: step === 0 ? "not-allowed" : "pointer",
                fontSize: 12,
                transition: "all 0.2s",
              }}
            >
              ← Previous
            </button>
            <button
              onClick={advance}
              disabled={step === STEPS.length - 1}
              style={{
                flex: 1,
                padding: "9px 0",
                borderRadius: 8,
                border: `1px solid ${current.color}44`,
                background: `${current.color}12`,
                color: current.color,
                cursor: step === STEPS.length - 1 ? "not-allowed" : "pointer",
                fontSize: 12,
                fontWeight: 500,
                transition: "all 0.2s",
              }}
            >
              Next →
            </button>
          </div>

          {/* Mini legend */}
          <div style={{ marginTop: 20, padding: "12px 14px", background: "rgba(255,255,255,0.02)", borderRadius: 8, border: "1px solid rgba(255,255,255,0.05)" }}>
            <div style={{ fontSize: 10, color: "#334155", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Key ontological principle
            </div>
            <p style={{ fontSize: 12, color: "#64748b", margin: 0, lineHeight: 1.6 }}>
              {step === 0 && "Non-being (無) is not absence but potentiality. Daoism holds that existence emerges from non-existence (有生於無, Dàodéjīng §40)."}
              {step === 1 && "The Tàijí is not a thing but a process — the self-organizing dynamic that generates duality while remaining undivided."}
              {step === 2 && "Yin and Yang are inherently relational: night is Yin relative to day, Yang relative to midnight. No absolute Yin/Yang exists."}
              {step === 3 && "The four images introduce temporality: 'old' (changing) and 'young' (stable) qualify the two modes, making time intrinsic to ontology."}
              {step === 4 && "The two Bagua arrangements encode different ontologies: Fuxi's (earlier heaven) is atemporal and ideal; King Wen's (later heaven) is temporal and practical."}
              {step === 5 && "The 64 hexagrams form Boolean lattice B₆ — a 6-dimensional hypercube. Leibniz recognized this binary structure in 1703, connecting it to his binary arithmetic."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// TAB: ENTITIES — interactive entity explorer
// ─────────────────────────────────────────────
function EntitiesTab() {
  const [selected, setSelected] = useState<string>("taiji");
  const entity = ONTOLOGICAL_ENTITIES.find((e) => e.id === selected)!;

  const typeColors: Record<string, string> = {
    metaphysical: "#fbbf24",
    principle: "#60a5fa",
    structure: "#a78bfa",
    instance: "#34d399",
    atomic: "#f472b6",
    process: "#f97316",
  };

  return (
    <div>
      <SectionHeader>Ontological Entities</SectionHeader>
      <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.7, marginBottom: 24, maxWidth: 600 }}>
        The I Ching ontology defines six distinct types of entities, ranging from the metaphysical source to atomic line-states. Each entity has a defined set of properties and participates in generative relations.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 20 }}>
        {/* Entity list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {ONTOLOGICAL_ENTITIES.map((e) => {
            const color = typeColors[e.type];
            const isSel = e.id === selected;
            return (
              <button
                key={e.id}
                onClick={() => setSelected(e.id)}
                style={{
                  textAlign: "left",
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: `1px solid ${isSel ? color + "55" : "rgba(255,255,255,0.05)"}`,
                  background: isSel ? `${color}10` : "rgba(255,255,255,0.02)",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: color, flexShrink: 0 }} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: isSel ? "#e2e8f0" : "#94a3b8" }}>
                    {e.label}
                  </span>
                </div>
                <div style={{ fontSize: 10, color: "#475569", paddingLeft: 12 }}>{e.english}</div>
              </button>
            );
          })}
        </div>

        {/* Entity detail */}
        <div>
          <div style={{
            background: `${typeColors[entity.type]}0a`,
            border: `1px solid ${typeColors[entity.type]}33`,
            borderRadius: 12,
            padding: "20px 24px",
            marginBottom: 16,
          }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
              <div>
                <div style={{ fontSize: 10, color: "#475569", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>
                  {entity.type}
                </div>
                <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: typeColors[entity.type] }}>
                  {entity.label}
                </h3>
                <div style={{ fontSize: 13, color: "#64748b", marginTop: 2 }}>{entity.english}</div>
              </div>
              <div style={{
                width: 48, height: 48, borderRadius: 10,
                background: `${typeColors[entity.type]}18`,
                border: `1px solid ${typeColors[entity.type]}33`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 10, color: typeColors[entity.type], fontWeight: 600,
                textAlign: "center", lineHeight: 1.3,
              }}>
                {entity.type.slice(0,4).toUpperCase()}
              </div>
            </div>

            <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.75, margin: "0 0 16px" }}>
              {entity.description}
            </p>

            {/* Properties */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 10, color: "#475569", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Properties
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {entity.properties.map((p) => (
                  <Tag key={p} label={p} color={typeColors[entity.type]} />
                ))}
              </div>
            </div>

            {/* Relations from this entity */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 10, color: "#475569", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Participates in
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {RELATIONS.filter((r) => r.from === entity.id || r.to === entity.id).slice(0, 3).map((r, i) => {
                  const other = r.from === entity.id ? r.to : r.from;
                  const otherEntity = ONTOLOGICAL_ENTITIES.find((e) => e.id === other);
                  const dir = r.from === entity.id ? "→" : "←";
                  return (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", gap: 6,
                      fontSize: 11, color: "#64748b",
                      padding: "4px 8px", borderRadius: 6,
                      background: "rgba(255,255,255,0.03)",
                    }}>
                      <span style={{ color: typeColors[entity.type] }}>{entity.label.split(" ")[0]}</span>
                      <span style={{ color: "#334155" }}>{dir} {r.label} {dir}</span>
                      <span style={{ color: otherEntity ? typeColors[otherEntity.type] : "#64748b" }}>
                        {otherEntity?.label.split(" ")[0]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Reference */}
            <div style={{ paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.05)", fontSize: 11, color: "#475569", fontStyle: "italic" }}>
              <span style={{ color: "#334155" }}>Ref: </span>{entity.ref}
            </div>
          </div>

          {/* Trigram viewer for bagua entity */}
          {entity.id === "bagua" && (
            <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 10, padding: "16px 18px", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ fontSize: 11, color: "#475569", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Eight trigrams
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
                {TRIGRAMS.map((t) => (
                  <div key={t.name} style={{
                    background: `${t.color}0f`,
                    border: `1px solid ${t.color}33`,
                    borderRadius: 8,
                    padding: "8px",
                    textAlign: "center",
                  }}>
                    <div style={{ fontSize: 18, marginBottom: 2 }}>{t.name.split(" ")[0]}</div>
                    <div style={{ fontSize: 10, color: t.color, fontWeight: 600 }}>{t.english}</div>
                    <div style={{ fontFamily: "monospace", fontSize: 9, color: "#475569", marginTop: 2 }}>{t.bits}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// TAB: RELATIONS — ontology graph SVG
// ─────────────────────────────────────────────
function RelationsTab() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [hoveredEdge, setHoveredEdge] = useState<number | null>(null);

  const typeColors: Record<string, string> = {
    metaphysical: "#fbbf24",
    principle: "#60a5fa",
    structure: "#a78bfa",
    instance: "#34d399",
    atomic: "#f472b6",
    process: "#f97316",
  };

  const edgeColors: Record<string, string> = {
    generative: "#fbbf24",
    compositional: "#60a5fa",
    instantiation: "#34d399",
    partOf: "#a78bfa",
    causal: "#f97316",
  };

  // Reposition entities for SVG layout
  const NODES: Record<string, { x: number; y: number }> = {
    taiji:    { x: 340, y: 60 },
    liangyi:  { x: 340, y: 150 },
    sixiang:  { x: 190, y: 240 },
    bagua:    { x: 490, y: 240 },
    hexagram: { x: 340, y: 340 },
    line:     { x: 170, y: 440 },
    change:   { x: 510, y: 440 },
  };

  const EDGE_LIST = [
    { from: "taiji", to: "liangyi", label: "generates", type: "generative" },
    { from: "liangyi", to: "sixiang", label: "double →", type: "compositional" },
    { from: "liangyi", to: "bagua", label: "triple →", type: "compositional" },
    { from: "sixiang", to: "hexagram", label: "instantiate", type: "instantiation" },
    { from: "bagua", to: "hexagram", label: "pair →", type: "compositional" },
    { from: "hexagram", to: "line", label: "has 6", type: "partOf" },
    { from: "line", to: "change", label: "triggers", type: "causal" },
    { from: "change", to: "hexagram", label: "transforms", type: "causal" },
  ];

  return (
    <div>
      <SectionHeader>Ontological Relations</SectionHeader>
      <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.7, marginBottom: 24, maxWidth: 620 }}>
        Entities in the I Ching ontology are connected through five types of relations: generative (one entity gives rise to another), compositional (entities combine to form higher-order structures), instantiation, part-of, and causal. Hover over nodes and edges.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 220px", gap: 20 }}>
        {/* SVG relation diagram */}
        <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.05)", overflow: "hidden" }}>
          <svg width="100%" viewBox="0 0 680 520" style={{ display: "block" }}>
            <defs>
              {Object.entries(edgeColors).map(([type, color]) => (
                <marker key={type} id={`arrow-${type}`} viewBox="0 0 10 10" refX={8} refY={5}
                  markerWidth={5} markerHeight={5} orient="auto-start-reverse">
                  <path d="M2 1L8 5L2 9" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                </marker>
              ))}
            </defs>

            {/* Edges */}
            {EDGE_LIST.map((edge, i) => {
              const from = NODES[edge.from];
              const to = NODES[edge.to];
              const color = edgeColors[edge.type];
              const isHov = hoveredEdge === i;
              // Midpoint for label
              const mx = (from.x + to.x) / 2;
              const my = (from.y + to.y) / 2;
              return (
                <g key={i} onMouseEnter={() => setHoveredEdge(i)} onMouseLeave={() => setHoveredEdge(null)} style={{ cursor: "pointer" }}>
                  <line
                    x1={from.x} y1={from.y + 16}
                    x2={to.x} y2={to.y - 16}
                    stroke={color}
                    strokeWidth={isHov ? 2.5 : 1.2}
                    opacity={hoveredEdge !== null && !isHov ? 0.2 : 0.7}
                    strokeDasharray={edge.type === "causal" ? "5 3" : undefined}
                    markerEnd={`url(#arrow-${edge.type})`}
                    style={{ transition: "all 0.2s" }}
                  />
                  {isHov && (
                    <text x={mx} y={my - 4} textAnchor="middle" fontSize={10} fill={color} fontWeight="600">
                      {edge.label}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Nodes */}
            {ONTOLOGICAL_ENTITIES.map((e) => {
              const pos = NODES[e.id];
              const color = typeColors[e.type];
              const isHov = hoveredNode === e.id;
              return (
                <g key={e.id}
                  transform={`translate(${pos.x}, ${pos.y})`}
                  onMouseEnter={() => setHoveredNode(e.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  style={{ cursor: "pointer" }}
                  onClick={() => {}}
                >
                  {isHov && <circle r={28} fill={color} opacity={0.12} />}
                  <circle r={18} fill={`${color}18`} stroke={color} strokeWidth={isHov ? 2 : 1.2} style={{ transition: "all 0.2s" }} />
                  <text textAnchor="middle" dominantBaseline="central" fontSize={8} fill={color} fontWeight="600">
                    {e.label.split(" ")[0]}
                  </text>
                  <text y={28} textAnchor="middle" fontSize={9} fill="#64748b">
                    {e.english.split("/")[0].trim()}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Legend + hovered info */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {/* Entity types */}
          <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 8, padding: "12px 14px", border: "1px solid rgba(255,255,255,0.05)" }}>
            <div style={{ fontSize: 10, color: "#475569", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>Entity types</div>
            {Object.entries(typeColors).map(([type, color]) => (
              <div key={type} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
                <span style={{ fontSize: 11, color: "#64748b", textTransform: "capitalize" }}>{type}</span>
              </div>
            ))}
          </div>

          {/* Relation types */}
          <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 8, padding: "12px 14px", border: "1px solid rgba(255,255,255,0.05)" }}>
            <div style={{ fontSize: 10, color: "#475569", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>Relation types</div>
            {Object.entries(edgeColors).map(([type, color]) => (
              <div key={type} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
                <div style={{ width: 14, height: 2, background: color, borderRadius: 1 }} />
                <span style={{ fontSize: 11, color: "#64748b", textTransform: "capitalize" }}>{type}</span>
              </div>
            ))}
          </div>

          {/* Hovered entity info */}
          {hoveredNode && (() => {
            const e = ONTOLOGICAL_ENTITIES.find((x) => x.id === hoveredNode)!;
            const color = typeColors[e.type];
            return (
              <div style={{ background: `${color}0e`, border: `1px solid ${color}33`, borderRadius: 8, padding: "12px 14px" }}>
                <div style={{ fontSize: 12, fontWeight: 600, color, marginBottom: 4 }}>{e.label}</div>
                <div style={{ fontSize: 11, color: "#64748b", lineHeight: 1.5 }}>{e.description.slice(0, 120)}…</div>
              </div>
            );
          })()}

          {hoveredEdge !== null && (() => {
            const edge = EDGE_LIST[hoveredEdge];
            const color = edgeColors[edge.type];
            return (
              <div style={{ background: `${color}0e`, border: `1px solid ${color}33`, borderRadius: 8, padding: "12px 14px" }}>
                <div style={{ fontSize: 11, fontWeight: 600, color, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>{edge.type}</div>
                <div style={{ fontSize: 12, color: "#94a3b8" }}>{edge.from} → {edge.label} → {edge.to}</div>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// TAB: HIERARCHY — trigram property matrix
// ─────────────────────────────────────────────
function HierarchyTab() {
  const [sortBy, setSortBy] = useState<"name" | "yang" | "family">("name");
  const [hoveredTrigram, setHoveredTrigram] = useState<number | null>(null);

  const sorted = [...TRIGRAMS].sort((a, b) => {
    if (sortBy === "yang") return b.bits.split("").filter((x) => x === "1").length - a.bits.split("").filter((x) => x === "1").length;
    if (sortBy === "family") return a.family.localeCompare(b.family);
    return a.english.localeCompare(b.english);
  });

  return (
    <div>
      <SectionHeader>Structural Hierarchy</SectionHeader>
      <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.7, marginBottom: 20, maxWidth: 600 }}>
        The eight trigrams are the primary structural layer between the line (atomic) and hexagram (composite) levels. Each encodes a 3-bit binary pattern, a natural element, a family role, and a transformational attribute.
      </p>

      {/* Sort controls */}
      <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
        <span style={{ fontSize: 11, color: "#475569", alignSelf: "center", marginRight: 4 }}>Sort by:</span>
        {(["name", "yang", "family"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setSortBy(s)}
            style={{
              padding: "4px 12px",
              borderRadius: 6,
              fontSize: 11,
              border: `1px solid ${sortBy === s ? "rgba(96,165,250,0.4)" : "rgba(255,255,255,0.08)"}`,
              background: sortBy === s ? "rgba(96,165,250,0.12)" : "transparent",
              color: sortBy === s ? "#60a5fa" : "#64748b",
              cursor: "pointer",
              textTransform: "capitalize",
            }}
          >
            {s === "yang" ? "Yang count" : s}
          </button>
        ))}
      </div>

      {/* Trigram cards grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 28 }}>
        {sorted.map((t, i) => {
          const yangCount = t.bits.split("").filter((x) => x === "1").length;
          const isHov = hoveredTrigram === i;
          return (
            <div
              key={t.name}
              onMouseEnter={() => setHoveredTrigram(i)}
              onMouseLeave={() => setHoveredTrigram(null)}
              style={{
                background: isHov ? `${t.color}12` : "rgba(255,255,255,0.02)",
                border: `1px solid ${isHov ? t.color + "44" : "rgba(255,255,255,0.06)"}`,
                borderRadius: 10,
                padding: "14px 12px",
                cursor: "default",
                transition: "all 0.2s",
              }}
            >
              <div style={{ fontSize: 26, marginBottom: 6, lineHeight: 1 }}>{t.name.split(" ")[0]}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: t.color, marginBottom: 2 }}>{t.english}</div>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: "#475569", marginBottom: 8 }}>{t.bits}</div>

              {/* Yang bar */}
              <div style={{ display: "flex", gap: 2, marginBottom: 8 }}>
                {t.bits.split("").map((b, bi) => (
                  <div key={bi} style={{
                    flex: 1, height: 4, borderRadius: 2,
                    background: b === "1" ? t.color : "#1e293b",
                    transition: "background 0.2s",
                  }} />
                ))}
              </div>

              <div style={{ fontSize: 10, color: "#475569", lineHeight: 1.5 }}>
                <div>{t.attribute}</div>
                <div>{t.family}</div>
                <div style={{ color: "#334155" }}>{yangCount} Yang, {3 - yangCount} Yin</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Binary structure explainer */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 10, padding: "16px 18px", border: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ fontSize: 11, color: "#60a5fa", fontWeight: 600, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Binary encoding
          </div>
          <p style={{ fontSize: 12, color: "#64748b", margin: 0, lineHeight: 1.65 }}>
            Each trigram is a 3-bit binary number where 1 = Yang (solid ⚊) and 0 = Yin (broken ⚋), read from bottom to top.
            Fuxi's arrangement orders them as Gray code (each adjacent pair differs by one bit), maximizing transformational proximity.
            Leibniz noted this in 1703 in his correspondence with Bouvet.
          </p>
        </div>
        <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 10, padding: "16px 18px", border: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ fontSize: 11, color: "#a78bfa", fontWeight: 600, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Hexagram composition
          </div>
          <p style={{ fontSize: 12, color: "#64748b", margin: 0, lineHeight: 1.65 }}>
            Each of the 64 hexagrams is an ordered pair (lower trigram, upper trigram). The lower trigram represents inner situation,
            the upper represents outer context. The 64 combinations form a complete basis for situational ontology — every state a system
            can occupy is represented.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// TAB: REFERENCES
// ─────────────────────────────────────────────
function ReferencesTab() {
  const [filter, setFilter] = useState<string | null>(null);
  const allTags = Array.from(new Set(REFERENCES.flatMap((r) => r.tags)));

  const filtered = filter ? REFERENCES.filter((r) => r.tags.includes(filter)) : REFERENCES;

  const tagColor = (tag: string) => {
    const map: Record<string, string> = {
      Translation: "#60a5fa", Canonical: "#fbbf24", Jungian: "#a78bfa",
      Mawangdui: "#34d399", Historical: "#f97316", Manuscript: "#06b6d4",
      "Wang Bi": "#f472b6", Philosophy: "#8b5cf6", Commentary: "#64748b",
      Science: "#10b981", Binary: "#fbbf24", Leibniz: "#f59e0b",
      Structural: "#60a5fa", Mathematical: "#34d399", Transformations: "#a78bfa",
      Archaeological: "#f97316", Critical: "#ef4444", History: "#06b6d4",
      Global: "#10b981", Modern: "#a78bfa", Mathematics: "#60a5fa",
    };
    return map[tag] ?? "#64748b";
  };

  return (
    <div>
      <SectionHeader>Scholarly References</SectionHeader>
      <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.7, marginBottom: 20, maxWidth: 600 }}>
        These works represent the primary scholarly literature informing this ontological analysis.
        Spanning philology, philosophy, history of science, and mathematics.
      </p>

      {/* Tag filter */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 20 }}>
        <button
          onClick={() => setFilter(null)}
          style={{
            padding: "3px 10px", borderRadius: 5, fontSize: 11,
            border: `1px solid ${!filter ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.06)"}`,
            background: !filter ? "rgba(255,255,255,0.08)" : "transparent",
            color: !filter ? "#e2e8f0" : "#64748b",
            cursor: "pointer",
          }}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setFilter(filter === tag ? null : tag)}
            style={{
              padding: "3px 10px", borderRadius: 5, fontSize: 11,
              border: `1px solid ${filter === tag ? tagColor(tag) + "55" : "rgba(255,255,255,0.06)"}`,
              background: filter === tag ? `${tagColor(tag)}18` : "transparent",
              color: filter === tag ? tagColor(tag) : "#64748b",
              cursor: "pointer",
            }}
          >
            {tag}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.map((ref, i) => (
          <div
            key={i}
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: 10,
              padding: "14px 18px",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)")}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
              <div>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0" }}>{ref.title}</span>
                <span style={{ fontSize: 11, color: "#475569", marginLeft: 8 }}>({ref.year})</span>
              </div>
              <a
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: 11, color: "#60a5fa", textDecoration: "none", flexShrink: 0, marginLeft: 12 }}
              >
                View →
              </a>
            </div>
            <div style={{ fontSize: 12, color: "#64748b", marginBottom: 6 }}>
              {ref.authors} · {ref.publisher}
            </div>
            <p style={{ fontSize: 12, color: "#94a3b8", margin: "0 0 8px", lineHeight: 1.6 }}>
              {ref.note}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {ref.tags.map((tag) => (
                <Tag key={tag} label={tag} color={tagColor(tag)} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
export default function Ontology() {
  const [activeTab, setActiveTab] = useState<Tab>("cosmos");

  const TABS: { id: Tab; label: string; icon: string; desc: string }[] = [
    { id: "cosmos",     label: "Cosmogony",  icon: "◎", desc: "Generative unfolding" },
    { id: "entities",   label: "Entities",   icon: "◈", desc: "Ontological types" },
    { id: "relations",  label: "Relations",  icon: "⟷", desc: "Relation graph" },
    { id: "hierarchy",  label: "Hierarchy",  icon: "≡", desc: "Trigram structure" },
    { id: "references", label: "References", icon: "§", desc: "Scholarly sources" },
  ];

  return (
    <>
    {/* Main Top Header Section */}
    <div className="relative text-center max-w-3xl mx-auto py-0 rounded-xl">
  {/* BACKGROUND */}
  <div
    className="absolute inset-0 blur-3xl opacity-100 pointer-events-none"
    style={{
      background:
        "radial-gradient(circle at 30% 40%, rgba(99,102,241,0.12), transparent 60%), radial-gradient(circle at 70% 60%, rgba(168,85,247,0.12), transparent 60%)",
      animation: "cloudMove 26s ease-in-out infinite",
    }}
  />

  {/* CONTENT */}
  <div className="relative text-center max-w-3xl mx-auto py-10">
    <h1 className="text-5xl font-semibold tracking-tight mb-4">
      Ontology of Change
    </h1>

    <p className="text-neutral-400 leading-relaxed text-lg">
      Beyond structure lies meaning. Each hexagram is not merely a configuration
      of lines, but a state of being — defined by polarity, relation, and
      transformation. This layer reveals how forms relate, invert, and evolve
      within a unified symbolic system.
    </p>

    {/* Tags */}
    <div className="flex justify-center flex-wrap gap-2 mt-6">
      <span className="px-3 py-1 text-xs rounded-full bg-indigo-500/10 text-indigo-400">
        Metaphysics
      </span>
      <span className="px-3 py-1 text-xs rounded-full bg-purple-500/10 text-purple-400">
        Polarity
      </span>
      <span className="px-3 py-1 text-xs rounded-full bg-green-500/10 text-green-400">
        Relations
      </span>
      <span className="px-3 py-1 text-xs rounded-full bg-yellow-500/10 text-yellow-400">
        I Ching
      </span>
    </div>

    {/* QUOTE */}
    <div className="mt-10">
      <p className="text-lg text-neutral-200 italic font-medium max-w-3xl mx-auto leading-relaxed">
        “The One is all things and yet no one of them; the source of all things is
        not all things, and yet it is all things in a transcendent sense, for all
        things flow from it as from a principle that remains in itself.”
      </p>
      <p className="text-sm text-indigo-400 mt-3 tracking-wide">
        — Plotinus, Enneads
      </p>
    </div>

    <div className="mt-8 h-px bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />
  </div>
</div>
    <div style={{ maxWidth: 860, margin: "0 auto" }}>

      {/* Animated ambient glow */}
      <div style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        pointerEvents: "none",
        zIndex: 0,
        background: `
          radial-gradient(ellipse at 15% 30%, rgba(251,191,36,0.04), transparent 50%),
          radial-gradient(ellipse at 85% 70%, rgba(96,165,250,0.04), transparent 50%)
        `,
      }} />

      {/* Page content */}
      <div style={{ position: "relative", zIndex: 1 }}>

        {/* Tab selector */}
        <div style={{
          display: "flex",
          gap: 4,
          marginBottom: 28,
          background: "rgba(255,255,255,0.02)",
          padding: "5px",
          borderRadius: 12,
          border: "1px solid rgba(255,255,255,0.06)",
        }}>
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1,
                  padding: "8px 6px",
                  borderRadius: 8,
                  border: "none",
                  background: isActive ? "rgba(255,255,255,0.06)" : "transparent",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                <div style={{ fontSize: 14, color: isActive ? "#e2e8f0" : "#475569", marginBottom: 1, transition: "color 0.2s" }}>
                  {tab.icon}
                </div>
                <div style={{ fontSize: 11, fontWeight: isActive ? 600 : 400, color: isActive ? "#e2e8f0" : "#475569", transition: "color 0.2s" }}>
                  {tab.label}
                </div>
                <div style={{ fontSize: 9, color: "#334155", marginTop: 1, display: isActive ? "block" : "none" }}>
                  {tab.desc}
                </div>
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <div style={{
          background: "rgba(255,255,255,0.015)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 16,
          padding: "28px 28px 32px",
          minHeight: 500,
        }}>
          {activeTab === "cosmos"     && <CosmosTab />}
          {activeTab === "entities"   && <EntitiesTab />}
          {activeTab === "relations"  && <RelationsTab />}
          {activeTab === "hierarchy"  && <HierarchyTab />}
          {activeTab === "references" && <ReferencesTab />}
        </div>

        {/* Footer note */}
        <div style={{ marginTop: 16, textAlign: "center", fontSize: 11, color: "#1e293b" }}>
          I Ching Ontology · Based on the Zhōuyì (周易) tradition · Scholarly sources cited in References tab
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
    </>
  );
}
