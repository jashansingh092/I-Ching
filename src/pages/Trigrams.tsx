import { useState, useMemo, useRef, useEffect } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

export interface Trigram {
  id: number; // 0–7
  bits: number[]; // [top, mid, bot] each 0|1
  symbol: string;
  name: string; // Romanized
  chinese: string;
  english: string;
  element: string;
  attribute: string;
  direction: string;
  season: string;
  family: string;
  body: string;
  animal: string;
  color: string;
  quality: string;
  description: string;
}

export const TRIGRAMS: Trigram[] = [
  {
    id: 0,
    bits: [1, 1, 1],
    symbol: "☰",
    name: "Qián",
    chinese: "乾",
    english: "Heaven",
    element: "Sky",
    attribute: "Strength",
    direction: "NW",
    season: "Late autumn",
    family: "Father",
    body: "Head",
    animal: "Horse",
    color: "#f59e0b",
    quality: "Creative",
    description:
      "Pure Yang — the primal creative force. Unyielding, initiating, celestial. The first movement of existence out of potentiality.",
  },
  {
    id: 1,
    bits: [0, 0, 0],
    symbol: "☷",
    name: "Kūn",
    chinese: "坤",
    english: "Earth",
    element: "Soil",
    attribute: "Devotion",
    direction: "SW",
    season: "Late summer",
    family: "Mother",
    body: "Abdomen",
    animal: "Ox",
    color: "#8b5cf6",
    quality: "Receptive",
    description:
      "Pure Yin — the great receptive field. Yielding, nurturing, boundless. Receives the creative impulse and brings it to form.",
  },
  {
    id: 2,
    bits: [0, 0, 1],
    symbol: "☳",
    name: "Zhèn",
    chinese: "震",
    english: "Thunder",
    element: "Thunder",
    attribute: "Movement",
    direction: "E",
    season: "Spring",
    family: "First son",
    body: "Foot",
    animal: "Dragon",
    color: "#ef4444",
    quality: "Arousing",
    description:
      "Yang breaking through Yin from below. The shock of awakening. Movement initiates from stillness — the first son inherits one Yang from the Father.",
  },
  {
    id: 3,
    bits: [0, 1, 0],
    symbol: "☵",
    name: "Kǎn",
    chinese: "坎",
    english: "Water",
    element: "Water",
    attribute: "Danger",
    direction: "N",
    season: "Winter",
    family: "Second son",
    body: "Ear",
    animal: "Pig",
    color: "#3b82f6",
    quality: "Abysmal",
    description:
      "Yang enclosed between two Yin — the pit, the gorge. Danger and flowing adaptation. Truth hidden within apparent difficulty.",
  },
  {
    id: 4,
    bits: [0, 1, 1],
    symbol: "☶",
    name: "Gèn",
    chinese: "艮",
    english: "Mountain",
    element: "Mountain",
    attribute: "Stillness",
    direction: "NE",
    season: "Late winter",
    family: "Third son",
    body: "Hand",
    animal: "Dog",
    color: "#6b7280",
    quality: "Keeping still",
    description:
      "Yang on top, Yin below — the mountain at rest. Stopping at the right moment. The third son holds the last Yang before pure Yin.",
  },
  {
    id: 5,
    bits: [1, 1, 0],
    symbol: "☴",
    name: "Xùn",
    chinese: "巽",
    english: "Wind",
    element: "Wood/Wind",
    attribute: "Gentleness",
    direction: "SE",
    season: "Late spring",
    family: "First daughter",
    body: "Thigh",
    animal: "Fowl",
    color: "#10b981",
    quality: "Penetrating",
    description:
      "Yin below two Yang — penetrating from below. Gentle but persistent. The first daughter receives one Yin from the Mother.",
  },
  {
    id: 6,
    bits: [1, 0, 1],
    symbol: "☲",
    name: "Lí",
    chinese: "離",
    english: "Fire",
    element: "Fire",
    attribute: "Clarity",
    direction: "S",
    season: "Summer",
    family: "Second daughter",
    body: "Eye",
    animal: "Pheasant",
    color: "#f97316",
    quality: "Clinging",
    description:
      "Yin enclosed between two Yang — radiant light with an empty centre. Clarity that depends on attachment. The sun: brilliant but consuming.",
  },
  {
    id: 7,
    bits: [1, 1, 0],
    symbol: "☱",
    name: "Duì",
    chinese: "兌",
    english: "Lake",
    element: "Lake/Marsh",
    attribute: "Joy",
    direction: "W",
    season: "Autumn",
    family: "Third daughter",
    body: "Mouth",
    animal: "Sheep",
    color: "#06b6d4",
    quality: "Joyous",
    description:
      "Yin above two Yang — the open mouth of the lake, pleasure and expression. The youngest daughter. Joy and speech emerge from within strength.",
  },
];

// Generate all 64 hexagrams as {upper, lower} pairs
// Hexagram index = upper*8 + lower (King Wen order approximated by binary)
function generateHexagrams() {
  const out: { upper: number; lower: number; bits: number[] }[] = [];
  for (let i = 0; i < 64; i++) {
    const upper = Math.floor(i / 8);
    const lower = i % 8;
    const upperBits = TRIGRAMS[upper].bits;
    const lowerBits = TRIGRAMS[lower].bits;
    out.push({ upper, lower, bits: [...upperBits, ...lowerBits] });
  }
  return out;
}

const HEXAGRAMS = generateHexagrams();

// Hamming distance between two trigrams (bit arrays length 3)
function trigramHamming(a: Trigram, b: Trigram): number {
  return a.bits.reduce((d, v, i) => d + (v !== b.bits[i] ? 1 : 0), 0);
}

// Opposite: flip all bits
function opposite(t: Trigram): Trigram | undefined {
  const oppBits = t.bits.map((b) => b ^ 1);
  return TRIGRAMS.find((x) => x.bits.every((v, i) => v === oppBits[i]));
}

// Nuclear trigram (inner lines): bits[1,2] repeated → use positions 1&2 + 1
function nuclearOf(t: Trigram): Trigram | undefined {
  // nuclear = [bits[1], bits[2], bits[1]] — common interpretation
  const nBits = [t.bits[1], t.bits[2], t.bits[1]];
  return TRIGRAMS.find((x) => x.bits.every((v, i) => v === nBits[i]));
}

// Rotation/inversion: reverse the bits (top→bot swap)
function inverse(t: Trigram): Trigram | undefined {
  const inv = [...t.bits].reverse();
  return TRIGRAMS.find((x) => x.bits.every((v, i) => v === inv[i]));
}

// ─────────────────────────────────────────────────────────────────────────────
// TRIGRAM LINE VISUAL
// ─────────────────────────────────────────────────────────────────────────────
function TrigramLines({
  bits,
  color,
  size = "md",
  animated = false,
}: {
  bits: number[];
  color: string;
  size?: "sm" | "md" | "lg" | "xl";
  animated?: boolean;
}) {
  const cfg = {
    sm: { w: 28, gap: 3, h: 3, br: 1.5, gapW: 6 },
    md: { w: 44, gap: 5, h: 4, br: 2, gapW: 8 },
    lg: { w: 64, gap: 7, h: 5, br: 2.5, gapW: 12 },
    xl: { w: 90, gap: 10, h: 7, br: 3, gapW: 18 },
  }[size];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: cfg.gap,
        alignItems: "center",
      }}
    >
      {[...bits].reverse().map((b, i) =>
        b === 1 ? (
          // Yang: solid bar
          <div
            key={i}
            style={{
              width: cfg.w,
              height: cfg.h,
              borderRadius: cfg.br,
              background: color,
              boxShadow: animated ? `0 0 8px ${color}88` : undefined,
              transition: "all 0.35s ease",
            }}
          />
        ) : (
          // Yin: broken bar (two segments)
          <div
            key={i}
            style={{ display: "flex", gap: cfg.gapW, alignItems: "center" }}
          >
            {[0, 1].map((seg) => (
              <div
                key={seg}
                style={{
                  width: (cfg.w - cfg.gapW) / 2,
                  height: cfg.h,
                  borderRadius: cfg.br,
                  background: color,
                  opacity: 0.75,
                  transition: "all 0.35s ease",
                }}
              />
            ))}
          </div>
        ),
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB: EXPLORER — main interactive trigram grid + detail panel
// ─────────────────────────────────────────────────────────────────────────────
function ExplorerTab({
  selected,
  onSelect,
}: {
  selected: Trigram | null;
  onSelect: (t: Trigram) => void;
}) {
  const opp = selected ? opposite(selected) : undefined;
  const inv = selected ? inverse(selected) : undefined;
  const nuc = selected ? nuclearOf(selected) : undefined;

  const relLabel = (t: Trigram): string | null => {
    if (!selected) return null;
    if (t.id === selected.id) return null;
    if (opp?.id === t.id) return "Opposite";
    if (inv?.id === t.id) return "Inverse";
    if (nuc?.id === t.id) return "Nuclear";
    const hd = trigramHamming(selected, t);
    if (hd === 1) return "Hamming‑1";
    return null;
  };

  const relColor = (label: string | null): string => {
    if (!label) return "transparent";
    if (label === "Opposite") return "#ef4444";
    if (label === "Inverse") return "#a78bfa";
    if (label === "Nuclear") return "#f59e0b";
    return "#34d399"; // Hamming-1
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24 }}>
      {/* Left — 8-card grid */}
      <div>
        <p
          style={{
            fontSize: 13,
            color: "#64748b",
            lineHeight: 1.7,
            marginBottom: 20,
          }}
        >
          Click any trigram to explore its properties, transformational
          relations, and the hexagrams that contain it. Relationship indicators
          appear between trigrams when one is selected.
        </p>

        {/* Relation legend */}
        <div
          style={{
            display: "flex",
            gap: 12,
            marginBottom: 16,
            flexWrap: "wrap",
          }}
        >
          {[
            { label: "Opposite", color: "#ef4444", desc: "All 3 bits flipped" },
            { label: "Inverse", color: "#a78bfa", desc: "Bits reversed" },
            {
              label: "Nuclear",
              color: "#f59e0b",
              desc: "Inner-line transform",
            },
            { label: "Hamming‑1", color: "#34d399", desc: "1 bit differs" },
          ].map((r) => (
            <div
              key={r.label}
              style={{ display: "flex", alignItems: "center", gap: 5 }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: r.color,
                }}
              />
              <span style={{ fontSize: 10, color: "#64748b" }}>
                <span style={{ color: r.color, fontWeight: 600 }}>
                  {r.label}
                </span>{" "}
                — {r.desc}
              </span>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 10,
          }}
        >
          {TRIGRAMS.map((t) => {
            const isSel = selected?.id === t.id;
            const rel = selected && !isSel ? relLabel(t) : null;
            const rCol = relColor(rel);
            const dimmed = selected && !isSel && !rel;

            return (
              <button
                key={t.id}
                onClick={() => onSelect(t)}
                style={{
                  background: isSel
                    ? `${t.color}18`
                    : rel
                      ? `${rCol}0a`
                      : "rgba(255,255,255,0.02)",
                  border: `1.5px solid ${isSel ? t.color + "77" : rel ? rCol + "55" : "rgba(255,255,255,0.06)"}`,
                  borderRadius: 12,
                  padding: "16px 12px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  opacity: dimmed ? 0.3 : 1,
                  position: "relative",
                  textAlign: "center",
                }}
              >
                {/* Relation badge */}
                {rel && (
                  <div
                    style={{
                      position: "absolute",
                      top: -8,
                      left: "50%",
                      transform: "translateX(-50%)",
                      fontSize: 9,
                      fontWeight: 700,
                      background: rCol,
                      color: "#0a0f1a",
                      padding: "1px 6px",
                      borderRadius: 4,
                      letterSpacing: "0.04em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {rel}
                  </div>
                )}

                {/* Selected glow ring */}
                {isSel && (
                  <div
                    style={{
                      position: "absolute",
                      inset: -3,
                      borderRadius: 14,
                      border: `1px solid ${t.color}44`,
                      pointerEvents: "none",
                      animation: "pulseRing 2.4s ease-out infinite",
                    }}
                  />
                )}

                <div
                  style={{
                    fontSize: 28,
                    marginBottom: 8,
                    lineHeight: 1,
                    filter: isSel
                      ? `drop-shadow(0 0 8px ${t.color}99)`
                      : undefined,
                    transition: "filter 0.2s",
                  }}
                >
                  {t.symbol}
                </div>
                <div
                  style={{
                    marginBottom: 8,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <TrigramLines
                    bits={t.bits}
                    color={isSel ? t.color : rel ? rCol : "#475569"}
                    size="sm"
                    animated={isSel}
                  />
                </div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: isSel ? t.color : rel ? rCol : "#94a3b8",
                    marginBottom: 1,
                  }}
                >
                  {t.name}
                </div>
                <div style={{ fontSize: 10, color: "#475569" }}>
                  {t.english}
                </div>
                <div
                  style={{
                    fontFamily: "monospace",
                    fontSize: 9,
                    color: "#334155",
                    marginTop: 3,
                  }}
                >
                  {t.bits.join("")}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right — detail panel */}
      <div>
        {!selected ? (
          <div
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "#334155",
              textAlign: "center",
              gap: 12,
            }}
          >
            <div style={{ fontSize: 48, opacity: 0.3 }}>☯</div>
            <div style={{ fontSize: 13 }}>
              Select a trigram to explore its nature, relations, and contained
              hexagrams
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {/* Main card */}
            <div
              style={{
                background: `${selected.color}0e`,
                border: `1px solid ${selected.color}44`,
                borderRadius: 14,
                padding: "20px 20px",
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  marginBottom: 16,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 10,
                      color: "#475569",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      marginBottom: 3,
                    }}
                  >
                    {selected.quality} · {selected.attribute}
                  </div>
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: 700,
                      color: selected.color,
                    }}
                  >
                    {selected.symbol} {selected.name}
                  </div>
                  <div style={{ fontSize: 13, color: "#64748b" }}>
                    {selected.chinese} · {selected.english}
                  </div>
                </div>
                <TrigramLines
                  bits={selected.bits}
                  color={selected.color}
                  size="lg"
                  animated
                />
              </div>

              <p
                style={{
                  fontSize: 12,
                  color: "#94a3b8",
                  lineHeight: 1.7,
                  margin: "0 0 14px",
                }}
              >
                {selected.description}
              </p>

              {/* Properties grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 6,
                }}
              >
                {[
                  ["Element", selected.element],
                  ["Direction", selected.direction],
                  ["Season", selected.season],
                  ["Family", selected.family],
                  ["Body", selected.body],
                  ["Animal", selected.animal],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      borderRadius: 6,
                      padding: "6px 10px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 9,
                        color: "#475569",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        marginBottom: 1,
                      }}
                    >
                      {k}
                    </div>
                    <div style={{ fontSize: 12, color: "#e2e8f0" }}>{v}</div>
                  </div>
                ))}
              </div>

              {/* Binary */}
              <div
                style={{
                  marginTop: 12,
                  padding: "8px 10px",
                  background: "rgba(0,0,0,0.3)",
                  borderRadius: 6,
                  fontFamily: "monospace",
                  fontSize: 11,
                  color: "#475569",
                }}
              >
                Bits (top→bot):{" "}
                <span
                  style={{
                    color: selected.color,
                    fontWeight: 700,
                    letterSpacing: 3,
                  }}
                >
                  {selected.bits.join(" ")}
                </span>
                <span style={{ marginLeft: 12 }}>
                  Decimal: {parseInt(selected.bits.join(""), 2)}
                </span>
              </div>
            </div>

            {/* Relations card */}
            <div
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 12,
                padding: "14px 16px",
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  color: "#475569",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: 10,
                }}
              >
                Transformational Relations
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {[
                  {
                    label: "Opposite",
                    t: opp,
                    color: "#ef4444",
                    desc: "All bits flipped",
                    icon: "↔",
                  },
                  {
                    label: "Inverse",
                    t: inv,
                    color: "#a78bfa",
                    desc: "Bits reversed",
                    icon: "↕",
                  },
                  {
                    label: "Nuclear",
                    t: nuc,
                    color: "#f59e0b",
                    desc: "Inner lines",
                    icon: "⊙",
                  },
                ].map(({ label, t, color, desc, icon }) =>
                  t && t.id !== selected.id ? (
                    <div
                      key={label}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "7px 10px",
                        borderRadius: 8,
                        background: `${color}0a`,
                        border: `1px solid ${color}22`,
                        cursor: "pointer",
                      }}
                      onClick={() => onSelect(t)}
                    >
                      <div
                        style={{
                          fontSize: 14,
                          color,
                          width: 18,
                          textAlign: "center",
                        }}
                      >
                        {icon}
                      </div>
                      <TrigramLines bits={t.bits} color={color} size="sm" />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 11, fontWeight: 600, color }}>
                          {label}: {t.symbol} {t.name}
                        </div>
                        <div style={{ fontSize: 10, color: "#475569" }}>
                          {desc} · {t.english}
                        </div>
                      </div>
                    </div>
                  ) : null,
                )}
                {/* Hamming-1 neighbors */}
                <div style={{ marginTop: 2 }}>
                  <div
                    style={{ fontSize: 10, color: "#334155", marginBottom: 4 }}
                  >
                    Hamming‑1 neighbors (1 bit flip)
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    {TRIGRAMS.filter(
                      (t) =>
                        t.id !== selected.id &&
                        trigramHamming(selected, t) === 1,
                    ).map((t) => (
                      <button
                        key={t.id}
                        onClick={() => onSelect(t)}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 3,
                          padding: "6px 8px",
                          borderRadius: 7,
                          background: `${t.color}0a`,
                          border: `1px solid ${t.color}33`,
                          cursor: "pointer",
                        }}
                      >
                        <TrigramLines bits={t.bits} color={t.color} size="sm" />
                        <span style={{ fontSize: 9, color: t.color }}>
                          {t.name}
                        </span>
                      </button>
                    ))}
                    {TRIGRAMS.filter(
                      (t) =>
                        t.id !== selected.id &&
                        trigramHamming(selected, t) === 1,
                    ).length === 0 && (
                      <span style={{ fontSize: 11, color: "#334155" }}>
                        None at distance 1
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Hexagram count */}
            <div
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 10,
                padding: "10px 14px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ fontSize: 12, color: "#64748b" }}>
                Hexagrams containing {selected.name}
              </div>
              <div
                style={{
                  fontFamily: "monospace",
                  fontSize: 16,
                  fontWeight: 700,
                  color: selected.color,
                }}
              >
                {
                  HEXAGRAMS.filter(
                    (h) => h.upper === selected.id || h.lower === selected.id,
                  ).length
                }
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB: HEXAGRAM MAP — 8×8 grid showing which hexagrams contain selected trigram
// ─────────────────────────────────────────────────────────────────────────────
function HexagramMapTab({ selected }: { selected: Trigram | null }) {
  const [hoveredHex, setHoveredHex] = useState<{
    upper: number;
    lower: number;
    idx: number;
  } | null>(null);

  const getHighlight = (upper: number, lower: number) => {
    if (!selected) return "none";
    if (upper === selected.id && lower === selected.id) return "both";
    if (upper === selected.id) return "upper";
    if (lower === selected.id) return "lower";
    return "none";
  };

  const highlightColor = (hl: string, color: string) => {
    if (hl === "both") return color;
    if (hl === "upper") return color + "cc";
    if (hl === "lower") return color + "88";
    return "transparent";
  };

  const hexCount = selected
    ? HEXAGRAMS.filter(
        (h) => h.upper === selected.id || h.lower === selected.id,
      ).length
    : 64;

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <p
          style={{
            fontSize: 13,
            color: "#64748b",
            lineHeight: 1.7,
            marginBottom: 10,
          }}
        >
          The 8×8 matrix shows all 64 hexagrams organised by{" "}
          <strong style={{ color: "#e2e8f0" }}>lower trigram (columns)</strong>{" "}
          and <strong style={{ color: "#e2e8f0" }}>upper trigram (rows)</strong>
          .
          {selected ? (
            <>
              {" "}
              Hexagrams containing{" "}
              <span style={{ color: selected.color, fontWeight: 600 }}>
                {selected.symbol} {selected.name}
              </span>{" "}
              are highlighted —{" "}
              <span style={{ color: selected.color, fontWeight: 600 }}>
                {hexCount}
              </span>{" "}
              total (15 upper + 8 both).
            </>
          ) : (
            " Select a trigram in the Explorer tab to highlight its hexagrams."
          )}
        </p>

        {selected && (
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {[
              {
                label: "Upper trigram",
                color: selected.color + "cc",
                count: HEXAGRAMS.filter(
                  (h) => h.upper === selected.id && h.lower !== selected.id,
                ).length,
              },
              {
                label: "Lower trigram",
                color: selected.color + "88",
                count: HEXAGRAMS.filter(
                  (h) => h.lower === selected.id && h.upper !== selected.id,
                ).length,
              },
              {
                label: "Both trigrams",
                color: selected.color,
                count: HEXAGRAMS.filter(
                  (h) => h.upper === selected.id && h.lower === selected.id,
                ).length,
              },
            ].map((d) => (
              <div
                key={d.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 11,
                  color: "#64748b",
                }}
              >
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 2,
                    background: d.color,
                  }}
                />
                <span>
                  {d.label}:{" "}
                  <strong style={{ color: "#e2e8f0" }}>{d.count}</strong>
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Column headers */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "28px repeat(8, 1fr)",
          gap: 4,
          marginBottom: 4,
        }}
      >
        <div />
        {TRIGRAMS.map((t) => (
          <div
            key={t.id}
            style={{ textAlign: "center", fontSize: 9, color: "#475569" }}
          >
            <div style={{ fontSize: 14 }}>{t.symbol}</div>
            <div style={{ fontSize: 8 }}>{t.name.slice(0, 3)}</div>
          </div>
        ))}
      </div>

      {/* Matrix rows */}
      {TRIGRAMS.map((rowTrigram) => (
        <div
          key={rowTrigram.id}
          style={{
            display: "grid",
            gridTemplateColumns: "28px repeat(8, 1fr)",
            gap: 4,
            marginBottom: 4,
          }}
        >
          {/* Row header */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ fontSize: 12 }}>{rowTrigram.symbol}</div>
            <div style={{ fontSize: 7, color: "#475569" }}>
              {rowTrigram.name.slice(0, 3)}
            </div>
          </div>
          {TRIGRAMS.map((colTrigram) => {
            const hexIdx = rowTrigram.id * 8 + colTrigram.id;
            const hl = getHighlight(rowTrigram.id, colTrigram.id);
            const isHov = hoveredHex?.idx === hexIdx;
            const hlColor = selected
              ? highlightColor(hl, selected.color)
              : "transparent";
            const isHighlit = hl !== "none";

            return (
              <div
                key={colTrigram.id}
                onMouseEnter={() =>
                  setHoveredHex({
                    upper: rowTrigram.id,
                    lower: colTrigram.id,
                    idx: hexIdx,
                  })
                }
                onMouseLeave={() => setHoveredHex(null)}
                style={{
                  aspectRatio: "1",
                  borderRadius: 4,
                  background: isHighlit
                    ? `${hlColor}28`
                    : isHov
                      ? "rgba(255,255,255,0.06)"
                      : "rgba(255,255,255,0.02)",
                  border: `1px solid ${isHighlit ? hlColor : isHov ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.04)"}`,
                  cursor: "pointer",
                  transition: "all 0.15s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                {/* Hexagram lines (tiny) */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5,
                    alignItems: "center",
                  }}
                >
                  {[
                    ...TRIGRAMS[rowTrigram.id].bits,
                    ...TRIGRAMS[colTrigram.id].bits,
                  ]
                    .reverse()
                    .map((b, bi) =>
                      b === 1 ? (
                        <div
                          key={bi}
                          style={{
                            width: 12,
                            height: 1.5,
                            borderRadius: 1,
                            background: isHighlit ? hlColor : "#334155",
                          }}
                        />
                      ) : (
                        <div key={bi} style={{ display: "flex", gap: 2 }}>
                          <div
                            style={{
                              width: 4.5,
                              height: 1.5,
                              borderRadius: 1,
                              background: isHighlit ? hlColor : "#334155",
                              opacity: 0.7,
                            }}
                          />
                          <div
                            style={{
                              width: 4.5,
                              height: 1.5,
                              borderRadius: 1,
                              background: isHighlit ? hlColor : "#334155",
                              opacity: 0.7,
                            }}
                          />
                        </div>
                      ),
                    )}
                </div>
              </div>
            );
          })}
        </div>
      ))}

      {/* Tooltip */}
      {hoveredHex && (
        <div
          style={{
            marginTop: 12,
            padding: "10px 14px",
            background: "rgba(10,14,23,0.95)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 8,
            fontSize: 12,
            color: "#94a3b8",
            display: "flex",
            gap: 16,
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              alignItems: "center",
            }}
          >
            {[
              ...TRIGRAMS[hoveredHex.upper].bits,
              ...TRIGRAMS[hoveredHex.lower].bits,
            ]
              .reverse()
              .map((b, i) =>
                b === 1 ? (
                  <div
                    key={i}
                    style={{
                      width: 24,
                      height: 3,
                      borderRadius: 2,
                      background: "#e2e8f0",
                    }}
                  />
                ) : (
                  <div key={i} style={{ display: "flex", gap: 5 }}>
                    <div
                      style={{
                        width: 9,
                        height: 3,
                        borderRadius: 2,
                        background: "#e2e8f0",
                        opacity: 0.7,
                      }}
                    />
                    <div
                      style={{
                        width: 9,
                        height: 3,
                        borderRadius: 2,
                        background: "#e2e8f0",
                        opacity: 0.7,
                      }}
                    />
                  </div>
                ),
              )}
          </div>
          <div>
            <div style={{ color: "#e2e8f0", fontWeight: 600 }}>
              Hexagram #{hoveredHex.idx + 1}
            </div>
            <div style={{ color: "#64748b", fontSize: 11 }}>
              Upper: {TRIGRAMS[hoveredHex.upper].symbol}{" "}
              {TRIGRAMS[hoveredHex.upper].name} (
              {TRIGRAMS[hoveredHex.upper].english})
            </div>
            <div style={{ color: "#64748b", fontSize: 11 }}>
              Lower: {TRIGRAMS[hoveredHex.lower].symbol}{" "}
              {TRIGRAMS[hoveredHex.lower].name} (
              {TRIGRAMS[hoveredHex.lower].english})
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB: GRAPH — circular layout with relation lines
// ─────────────────────────────────────────────────────────────────────────────
function GraphTab({
  selected,
  onSelect,
}: {
  selected: Trigram | null;
  onSelect: (t: Trigram) => void;
}) {
  const [showOpposites, setShowOpposites] = useState(true);
  const [showHamming1, setShowHamming1] = useState(true);
  const [showInverse, setShowInverse] = useState(true);
  const [hovNode, setHovNode] = useState<number | null>(null);

  const W = 480,
    H = 480,
    CX = 240,
    CY = 240,
    R = 170;

  // 8 positions around a circle
  const pos = (id: number) => {
    const angle = (id / 8) * Math.PI * 2 - Math.PI / 2;
    return { x: CX + Math.cos(angle) * R, y: CY + Math.sin(angle) * R };
  };

  // Build edges
  const edges: { a: number; b: number; type: string; color: string }[] = [];
  const seen = new Set<string>();
  TRIGRAMS.forEach((t) => {
    if (showOpposites) {
      const opp = opposite(t);
      if (opp) {
        const key = [Math.min(t.id, opp.id), Math.max(t.id, opp.id)].join("-");
        if (!seen.has(key + "-opp")) {
          seen.add(key + "-opp");
          edges.push({
            a: t.id,
            b: opp.id,
            type: "opposite",
            color: "#ef4444",
          });
        }
      }
    }
    if (showInverse) {
      const inv = inverse(t);
      if (inv && inv.id !== t.id) {
        const key = [Math.min(t.id, inv.id), Math.max(t.id, inv.id)].join("-");
        if (!seen.has(key + "-inv")) {
          seen.add(key + "-inv");
          edges.push({ a: t.id, b: inv.id, type: "inverse", color: "#a78bfa" });
        }
      }
    }
    if (showHamming1) {
      TRIGRAMS.forEach((u) => {
        if (u.id <= t.id) return;
        if (trigramHamming(t, u) === 1) {
          edges.push({ a: t.id, b: u.id, type: "hamming1", color: "#34d399" });
        }
      });
    }
  });

  return (
    <div>
      <p
        style={{
          fontSize: 13,
          color: "#64748b",
          lineHeight: 1.7,
          marginBottom: 16,
        }}
      >
        Structural relationships between all eight trigrams. Edges connect
        trigrams by type of transformation. Click nodes to select. Toggle edge
        types below.
      </p>

      {/* Controls */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {[
          {
            label: "Opposites",
            state: showOpposites,
            setter: setShowOpposites,
            color: "#ef4444",
          },
          {
            label: "Inverses",
            state: showInverse,
            setter: setShowInverse,
            color: "#a78bfa",
          },
          {
            label: "Hamming‑1",
            state: showHamming1,
            setter: setShowHamming1,
            color: "#34d399",
          },
        ].map((ctrl) => (
          <button
            key={ctrl.label}
            onClick={() => ctrl.setter((s) => !s)}
            style={{
              padding: "5px 13px",
              borderRadius: 7,
              fontSize: 11,
              border: `1px solid ${ctrl.state ? ctrl.color + "55" : "rgba(255,255,255,0.08)"}`,
              background: ctrl.state ? `${ctrl.color}14` : "transparent",
              color: ctrl.state ? ctrl.color : "#64748b",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: ctrl.state ? ctrl.color : "#334155",
              }}
            />
            {ctrl.label}
          </button>
        ))}
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "480px 1fr", gap: 20 }}
      >
        {/* SVG graph */}
        <div
          style={{
            background: "rgba(255,255,255,0.015)",
            borderRadius: 14,
            border: "1px solid rgba(255,255,255,0.05)",
            overflow: "hidden",
          }}
        >
          <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
            {/* Subtle rings */}
            {[0.4, 0.7, 1.0].map((f, i) => (
              <circle
                key={i}
                cx={CX}
                cy={CY}
                r={R * f}
                fill="none"
                stroke="rgba(255,255,255,0.025)"
                strokeWidth={1}
                strokeDasharray="3 6"
              />
            ))}

            {/* Edges */}
            {edges.map((e, i) => {
              const pa = pos(e.a),
                pb = pos(e.b);
              const isRelated =
                selected && (e.a === selected.id || e.b === selected.id);
              const notRelated = selected && !isRelated;
              return (
                <line
                  key={i}
                  x1={pa.x}
                  y1={pa.y}
                  x2={pb.x}
                  y2={pb.y}
                  stroke={e.color}
                  strokeWidth={isRelated ? 2 : 1}
                  opacity={notRelated ? 0.08 : isRelated ? 0.8 : 0.25}
                  strokeDasharray={
                    e.type === "opposite"
                      ? undefined
                      : e.type === "inverse"
                        ? "6 3"
                        : "2 4"
                  }
                  style={{ transition: "opacity 0.2s, stroke-width 0.2s" }}
                />
              );
            })}

            {/* Nodes */}
            {TRIGRAMS.map((t) => {
              const { x, y } = pos(t.id);
              const isSel = selected?.id === t.id;
              const isHov = hovNode === t.id;
              const dimmed = selected && !isSel;

              return (
                <g
                  key={t.id}
                  transform={`translate(${x},${y})`}
                  style={{ cursor: "pointer" }}
                  onClick={() => onSelect(t)}
                  onMouseEnter={() => setHovNode(t.id)}
                  onMouseLeave={() => setHovNode(null)}
                >
                  {/* Glow */}
                  {(isSel || isHov) && (
                    <circle r={28} fill={t.color} opacity={0.12} />
                  )}
                  {/* Pulse */}
                  {isSel && (
                    <circle
                      r={22}
                      fill="none"
                      stroke={t.color}
                      strokeWidth={1}
                      opacity={0.3}
                      style={{ animation: "pulseRing 2s ease-out infinite" }}
                    />
                  )}
                  <circle
                    r={18}
                    fill={`${t.color}18`}
                    stroke={t.color}
                    strokeWidth={isSel ? 2 : 1}
                    opacity={dimmed ? 0.25 : 1}
                    style={{ transition: "all 0.2s" }}
                  />
                  <text
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={14}
                    fill={t.color}
                    opacity={dimmed ? 0.25 : 1}
                  >
                    {t.symbol}
                  </text>
                  {/* Label outside */}
                  <text
                    y={26}
                    textAnchor="middle"
                    fontSize={9}
                    fill={dimmed ? "#334155" : "#64748b"}
                    style={{ transition: "fill 0.2s" }}
                  >
                    {t.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Side info */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div
            style={{
              background: "rgba(255,255,255,0.02)",
              borderRadius: 10,
              padding: "14px 16px",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <div
              style={{
                fontSize: 10,
                color: "#475569",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: 10,
              }}
            >
              Edge legend
            </div>
            {[
              {
                color: "#ef4444",
                label: "Opposite",
                desc: "All 3 bits flipped (full inversion)",
                dash: "none",
              },
              {
                color: "#a78bfa",
                label: "Inverse",
                desc: "Bit order reversed (top↔bot)",
                dash: "6 3",
              },
              {
                color: "#34d399",
                label: "Hamming‑1",
                desc: "Exactly one bit differs",
                dash: "2 4",
              },
            ].map((e) => (
              <div
                key={e.label}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 8,
                  marginBottom: 8,
                }}
              >
                <svg
                  width={28}
                  height={12}
                  style={{ marginTop: 2, flexShrink: 0 }}
                >
                  <line
                    x1={2}
                    y1={6}
                    x2={26}
                    y2={6}
                    stroke={e.color}
                    strokeWidth={1.5}
                    strokeDasharray={e.dash === "none" ? undefined : e.dash}
                  />
                </svg>
                <div>
                  <div
                    style={{ fontSize: 11, fontWeight: 600, color: e.color }}
                  >
                    {e.label}
                  </div>
                  <div
                    style={{ fontSize: 10, color: "#475569", lineHeight: 1.4 }}
                  >
                    {e.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selected && (
            <div
              style={{
                background: `${selected.color}0a`,
                border: `1px solid ${selected.color}33`,
                borderRadius: 10,
                padding: "14px 16px",
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  color: "#475569",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: 8,
                }}
              >
                {selected.symbol} {selected.name} connections
              </div>
              {[
                { label: "Opposite", t: opposite(selected), color: "#ef4444" },
                { label: "Inverse", t: inverse(selected), color: "#a78bfa" },
              ]
                .filter((x) => x.t && x.t.id !== selected.id)
                .map(
                  ({ label, t, color }) =>
                    t && (
                      <div
                        key={label}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: 11,
                          color: "#64748b",
                          marginBottom: 4,
                        }}
                      >
                        <span style={{ color }}>{label}</span>
                        <span style={{ color: "#94a3b8" }}>
                          {t.symbol} {t.name}
                        </span>
                      </div>
                    ),
                )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 11,
                  color: "#64748b",
                  marginBottom: 4,
                }}
              >
                <span style={{ color: "#34d399" }}>Hamming‑1 neighbors</span>
                <span style={{ color: "#94a3b8" }}>
                  {TRIGRAMS.filter(
                    (t) =>
                      t.id !== selected.id && trigramHamming(selected, t) === 1,
                  )
                    .map((t) => t.name)
                    .join(", ") || "none"}
                </span>
              </div>
            </div>
          )}

          <div
            style={{
              background: "rgba(255,255,255,0.02)",
              borderRadius: 10,
              padding: "14px 16px",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <div
              style={{
                fontSize: 10,
                color: "#475569",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: 8,
              }}
            >
              Graph facts
            </div>
            {[
              { label: "Total edges", value: edges.length },
              { label: "Opposite pairs", value: 4 },
              {
                label: "Hamming‑1 pairs",
                value: TRIGRAMS.reduce(
                  (acc, t) =>
                    acc +
                    TRIGRAMS.filter(
                      (u) => u.id > t.id && trigramHamming(t, u) === 1,
                    ).length,
                  0,
                ),
              },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 11,
                  color: "#64748b",
                  marginBottom: 3,
                }}
              >
                <span>{s.label}</span>
                <span style={{ fontFamily: "monospace", color: "#94a3b8" }}>
                  {s.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB: BAGUA WHEEL — classical Earlier/Later Heaven arrangements
// ─────────────────────────────────────────────────────────────────────────────
function BaguaTab({
  selected,
  onSelect,
}: {
  selected: Trigram | null;
  onSelect: (t: Trigram) => void;
}) {
  const [arrangement, setArrangement] = useState<"earlier" | "later">(
    "earlier",
  );

  // Earlier Heaven (Fuxi) — binary order: Heaven, Lake, Fire, Thunder, Wind, Water, Mountain, Earth
  const EARLIER = [0, 7, 6, 2, 5, 3, 4, 1]; // trigram IDs arranged 0°, 45°, ... 315°
  // Later Heaven (King Wen) — compass: S=Fire, SW=Earth, W=Lake, NW=Heaven, N=Water, NE=Mountain, E=Thunder, SE=Wind
  const LATER = [6, 1, 7, 0, 3, 4, 2, 5];

  const order = arrangement === "earlier" ? EARLIER : LATER;

  const W = 340,
    H = 340,
    CX = 170,
    CY = 170,
    R = 120,
    RI = 55;
  const angle = (i: number) => (i / 8) * Math.PI * 2 - Math.PI / 2;

  const DIRECTIONS =
    arrangement === "earlier"
      ? ["S", "SE", "E", "NE", "N", "NW", "W", "SW"]
      : ["S", "SW", "W", "NW", "N", "NE", "E", "SE"];

  return (
    <div>
      <p
        style={{
          fontSize: 13,
          color: "#64748b",
          lineHeight: 1.7,
          marginBottom: 16,
        }}
      >
        The two classical Bāguà arrangements encode different ontologies.
        <strong style={{ color: "#e2e8f0" }}>
          {" "}
          Earlier Heaven (Fuxi 伏羲)
        </strong>{" "}
        represents the ideal, atemporal order where opposites face each other
        perfectly across the circle.
        <strong style={{ color: "#e2e8f0" }}>
          {" "}
          Later Heaven (King Wen 文王)
        </strong>{" "}
        represents the temporal, practical order governing earthly change and
        the seasons.
      </p>

      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        {(["earlier", "later"] as const).map((a) => (
          <button
            key={a}
            onClick={() => setArrangement(a)}
            style={{
              padding: "6px 16px",
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 500,
              cursor: "pointer",
              border: `1px solid ${arrangement === a ? "#60a5fa55" : "rgba(255,255,255,0.08)"}`,
              background:
                arrangement === a ? "rgba(96,165,250,0.12)" : "transparent",
              color: arrangement === a ? "#60a5fa" : "#64748b",
              transition: "all 0.2s",
            }}
          >
            {a === "earlier" ? "☰ Earlier Heaven" : "☯ Later Heaven"}
          </button>
        ))}
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 28 }}
      >
        <svg
          width={W}
          height={H}
          viewBox={`0 0 ${W} ${H}`}
          style={{ display: "block", margin: "0 auto" }}
        >
          {/* Rings */}
          <circle
            cx={CX}
            cy={CY}
            r={R + 22}
            fill="none"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth={1}
          />
          <circle
            cx={CX}
            cy={CY}
            r={RI}
            fill="none"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth={1}
          />

          {/* Opposite connection lines (Earlier Heaven) */}
          {arrangement === "earlier" &&
            [
              [0, 4],
              [1, 5],
              [2, 6],
              [3, 7],
            ].map(([a, b], i) => {
              const pa = {
                x: CX + Math.cos(angle(a)) * R,
                y: CY + Math.sin(angle(a)) * R,
              };
              const pb = {
                x: CX + Math.cos(angle(b)) * R,
                y: CY + Math.sin(angle(b)) * R,
              };
              const tA = TRIGRAMS[order[a]],
                tB = TRIGRAMS[order[b]];
              const isSel =
                selected && (tA.id === selected.id || tB.id === selected.id);
              return (
                <line
                  key={i}
                  x1={pa.x}
                  y1={pa.y}
                  x2={pb.x}
                  y2={pb.y}
                  stroke="#ef4444"
                  strokeWidth={isSel ? 1.5 : 0.8}
                  opacity={isSel ? 0.6 : 0.15}
                  strokeDasharray="4 3"
                  style={{ transition: "all 0.2s" }}
                />
              );
            })}

          {/* Direction labels */}
          {DIRECTIONS.map((dir, i) => {
            const a = angle(i);
            const lx = CX + Math.cos(a) * (R + 18);
            const ly = CY + Math.sin(a) * (R + 18);
            return (
              <text
                key={i}
                x={lx}
                y={ly}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={9}
                fill="#334155"
              >
                {dir}
              </text>
            );
          })}

          {/* Sector wedges */}
          {order.map((trigramId, i) => {
            const t = TRIGRAMS[trigramId];
            const isSel = selected?.id === t.id;
            const a1 = angle(i) - Math.PI / 8;
            const a2 = angle(i) + Math.PI / 8;
            const x1 = CX + Math.cos(a1) * (R + 8);
            const y1 = CY + Math.sin(a1) * (R + 8);
            const x2 = CX + Math.cos(a2) * (R + 8);
            const y2 = CY + Math.sin(a2) * (R + 8);
            const x3 = CX + Math.cos(a2) * RI;
            const y3 = CY + Math.sin(a2) * RI;
            const x4 = CX + Math.cos(a1) * RI;
            const y4 = CY + Math.sin(a1) * RI;
            return (
              <path
                key={i}
                d={`M ${x1} ${y1} A ${R + 8} ${R + 8} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${RI} ${RI} 0 0 0 ${x4} ${y4} Z`}
                fill={isSel ? `${t.color}30` : `${t.color}08`}
                stroke={isSel ? t.color : `${t.color}33`}
                strokeWidth={isSel ? 1.5 : 0.5}
                style={{ cursor: "pointer", transition: "all 0.2s" }}
                onClick={() => onSelect(t)}
              />
            );
          })}

          {/* Trigram nodes */}
          {order.map((trigramId, i) => {
            const t = TRIGRAMS[trigramId];
            const a = angle(i);
            const nx = CX + Math.cos(a) * ((R + RI) / 2);
            const ny = CY + Math.sin(a) * ((R + RI) / 2);
            const isSel = selected?.id === t.id;
            return (
              <g
                key={i}
                transform={`translate(${nx},${ny})`}
                style={{ cursor: "pointer" }}
                onClick={() => onSelect(t)}
              >
                {isSel && <circle r={22} fill={t.color} opacity={0.14} />}
                <text
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={isSel ? 18 : 15}
                  fill={t.color}
                  style={{
                    transition: "font-size 0.2s",
                    filter: isSel
                      ? `drop-shadow(0 0 6px ${t.color}99)`
                      : undefined,
                  }}
                >
                  {t.symbol}
                </text>
                <text
                  y={18}
                  textAnchor="middle"
                  fontSize={8}
                  fill={isSel ? t.color : "#475569"}
                >
                  {t.name}
                </text>
              </g>
            );
          })}

          {/* Centre */}
          <circle cx={CX} cy={CY} r={RI - 4} fill="rgba(10,14,23,0.8)" />
          <text
            x={CX}
            y={CY - 6}
            textAnchor="middle"
            fontSize={10}
            fill="#334155"
            fontWeight="600"
          >
            {arrangement === "earlier" ? "先天" : "後天"}
          </text>
          <text
            x={CX}
            y={CY + 8}
            textAnchor="middle"
            fontSize={8}
            fill="#475569"
          >
            {arrangement === "earlier" ? "Earlier" : "Later"}
          </text>
          <text
            x={CX}
            y={CY + 20}
            textAnchor="middle"
            fontSize={8}
            fill="#334155"
          >
            Heaven
          </text>
        </svg>

        {/* Info panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: 10,
              padding: "14px 16px",
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#e2e8f0",
                marginBottom: 6,
              }}
            >
              {arrangement === "earlier"
                ? "Earlier Heaven 先天八卦 (Fuxi)"
                : "Later Heaven 後天八卦 (King Wen)"}
            </div>
            <p
              style={{
                fontSize: 12,
                color: "#64748b",
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              {arrangement === "earlier"
                ? "Fuxi's arrangement places opposites directly across from each other: Heaven↔Earth, Fire↔Water, Thunder↔Wind, Mountain↔Lake. Each diametrically opposite pair sums to 7 in binary. This is the ideal, cosmological ordering — the structure of possibility."
                : "King Wen's arrangement maps trigrams to compass directions and governs seasonal, cyclical change. Fire in the south (summer), Water in the north (winter). This is the temporal ordering used in Feng Shui, divination, and the calendar. It encodes how nature actually moves."}
            </p>
          </div>

          {selected && (
            <div
              style={{
                background: `${selected.color}0a`,
                border: `1px solid ${selected.color}33`,
                borderRadius: 10,
                padding: "14px 16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 8,
                }}
              >
                <span style={{ fontSize: 20 }}>{selected.symbol}</span>
                <div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: selected.color,
                    }}
                  >
                    {selected.name}
                  </div>
                  <div style={{ fontSize: 10, color: "#64748b" }}>
                    Position {order.indexOf(selected.id) + 1} of 8
                  </div>
                </div>
              </div>
              <div style={{ fontSize: 11, color: "#64748b" }}>
                Direction:{" "}
                <span style={{ color: "#94a3b8" }}>
                  {DIRECTIONS[order.indexOf(selected.id)]}
                </span>
              </div>
              {arrangement === "earlier" && (
                <div style={{ fontSize: 11, color: "#64748b", marginTop: 3 }}>
                  Opposite across:{" "}
                  <span style={{ color: "#ef4444" }}>
                    {(() => {
                      const pos = order.indexOf(selected.id);
                      const oppPos = (pos + 4) % 8;
                      const oppT = TRIGRAMS[order[oppPos]];
                      return `${oppT.symbol} ${oppT.name}`;
                    })()}
                  </span>
                </div>
              )}
            </div>
          )}

          <div
            style={{
              background: "rgba(255,255,255,0.02)",
              borderRadius: 10,
              padding: "14px 16px",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <div
              style={{
                fontSize: 10,
                color: "#475569",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: 8,
              }}
            >
              Arrangement order
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {order.map((id, i) => {
                const t = TRIGRAMS[id];
                const isSel = selected?.id === t.id;
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      cursor: "pointer",
                      opacity: isSel ? 1 : 0.6,
                    }}
                    onClick={() => onSelect(t)}
                  >
                    <span
                      style={{
                        fontSize: 10,
                        color: "#334155",
                        width: 14,
                        textAlign: "right",
                      }}
                    >
                      {i + 1}
                    </span>
                    <span style={{ fontSize: 12, color: t.color }}>
                      {t.symbol}
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        color: isSel ? "#e2e8f0" : "#64748b",
                      }}
                    >
                      {t.name}
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        color: "#475569",
                        marginLeft: "auto",
                      }}
                    >
                      {DIRECTIONS[i]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB: COMPARE — side-by-side trigram comparison
// ─────────────────────────────────────────────────────────────────────────────
function CompareTab() {
  const [left, setLeft] = useState<number>(0); // trigram ids
  const [right, setRight] = useState<number>(1);

  const tL = TRIGRAMS[left];
  const tR = TRIGRAMS[right];
  const hd = trigramHamming(tL, tR);

  const PROPS = [
    ["Element", (t: Trigram) => t.element],
    ["Quality", (t: Trigram) => t.quality],
    ["Attribute", (t: Trigram) => t.attribute],
    ["Direction", (t: Trigram) => t.direction],
    ["Season", (t: Trigram) => t.season],
    ["Family", (t: Trigram) => t.family],
    ["Body part", (t: Trigram) => t.body],
    ["Animal", (t: Trigram) => t.animal],
  ] as [string, (t: Trigram) => string][];

  const hdColor =
    hd === 0
      ? "#64748b"
      : hd === 1
        ? "#34d399"
        : hd === 2
          ? "#fbbf24"
          : "#ef4444";

  return (
    <div>
      <p
        style={{
          fontSize: 13,
          color: "#64748b",
          lineHeight: 1.7,
          marginBottom: 20,
        }}
      >
        Compare any two trigrams side by side. Hamming distance shows how many
        bit flips separate them. Shared properties are highlighted; differing
        ones are contrasted.
      </p>

      {/* Trigram selectors */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 80px 1fr",
          gap: 12,
          marginBottom: 24,
          alignItems: "center",
        }}
      >
        {[
          { val: left, setter: setLeft },
          { val: right, setter: setRight },
        ].map((ctrl, ci) => {
          const t = TRIGRAMS[ctrl.val];
          return (
            <div key={ci}>
              <div
                style={{
                  fontSize: 10,
                  color: "#475569",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: 6,
                }}
              >
                {ci === 0 ? "Trigram A" : "Trigram B"}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {TRIGRAMS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => ctrl.setter(opt.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "6px 10px",
                      borderRadius: 7,
                      border: "1px solid",
                      borderColor:
                        ctrl.val === opt.id
                          ? `${opt.color}55`
                          : "rgba(255,255,255,0.05)",
                      background:
                        ctrl.val === opt.id
                          ? `${opt.color}12`
                          : "rgba(255,255,255,0.02)",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <TrigramLines
                      bits={opt.bits}
                      color={ctrl.val === opt.id ? opt.color : "#475569"}
                      size="sm"
                    />
                    <span
                      style={{
                        fontSize: 12,
                        color: ctrl.val === opt.id ? opt.color : "#64748b",
                      }}
                    >
                      {opt.symbol} {opt.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}

        {/* Centre — distance */}
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 10, color: "#475569", marginBottom: 8 }}>
            Distance
          </div>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              background: `${hdColor}18`,
              border: `2px solid ${hdColor}55`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 6px",
            }}
          >
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 22,
                fontWeight: 700,
                color: hdColor,
              }}
            >
              {hd}
            </span>
          </div>
          <div style={{ fontSize: 10, color: "#475569" }}>Hamming</div>
          <div style={{ fontSize: 10, color: hdColor, marginTop: 3 }}>
            {hd === 0
              ? "Same"
              : hd === 1
                ? "Adjacent"
                : hd === 2
                  ? "Two steps"
                  : hd === 3
                    ? "Opposite"
                    : `${hd} bits`}
          </div>
          {/* Bit diff visualization */}
          <div
            style={{
              marginTop: 12,
              display: "flex",
              flexDirection: "column",
              gap: 3,
              alignItems: "center",
            }}
          >
            {tL.bits.map((b, i) => {
              const diff = b !== tR.bits[i];
              return (
                <div
                  key={i}
                  style={{ display: "flex", gap: 4, alignItems: "center" }}
                >
                  <div
                    style={{
                      width: 12,
                      height: 3,
                      borderRadius: 1.5,
                      background: tL.color,
                      opacity: 0.8,
                    }}
                  />
                  <div
                    style={{
                      fontSize: 9,
                      color: diff ? "#ef4444" : "#334155",
                      width: 8,
                      textAlign: "center",
                    }}
                  >
                    {diff ? "≠" : "="}
                  </div>
                  <div
                    style={{
                      width: 12,
                      height: 3,
                      borderRadius: 1.5,
                      background: tR.color,
                      opacity: 0.8,
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Properties comparison */}
      <div
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.05)",
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 120px 1fr",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div
            style={{
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ fontSize: 20, color: tL.color }}>{tL.symbol}</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: tL.color }}>
              {tL.name}
            </span>
          </div>
          <div
            style={{
              padding: "12px",
              textAlign: "center",
              fontSize: 10,
              color: "#475569",
              alignSelf: "center",
            }}
          >
            Property
          </div>
          <div
            style={{
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              justifyContent: "flex-end",
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 600, color: tR.color }}>
              {tR.name}
            </span>
            <span style={{ fontSize: 20, color: tR.color }}>{tR.symbol}</span>
          </div>
        </div>
        {PROPS.map(([label, fn]) => {
          const vL = fn(tL),
            vR = fn(tR);
          const same = vL === vR;
          return (
            <div
              key={label}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 120px 1fr",
                borderBottom: "1px solid rgba(255,255,255,0.03)",
                background: same ? "rgba(52,211,153,0.03)" : undefined,
              }}
            >
              <div
                style={{
                  padding: "9px 16px",
                  fontSize: 12,
                  color: tL.color + "cc",
                  textAlign: "right",
                }}
              >
                {vL}
              </div>
              <div
                style={{
                  padding: "9px",
                  textAlign: "center",
                  fontSize: 10,
                  color: "#334155",
                }}
              >
                {label}
              </div>
              <div
                style={{
                  padding: "9px 16px",
                  fontSize: 12,
                  color: tR.color + "cc",
                }}
              >
                {vR}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────
type Tab = "explorer" | "hexmap" | "graph" | "bagua" | "compare";

export default function Trigrams() {
  const [activeTab, setActiveTab] = useState<Tab>("explorer");
  const [selected, setSelected] = useState<Trigram | null>(null);

  const TABS: { id: Tab; icon: string; label: string; desc: string }[] = [
    {
      id: "explorer",
      icon: "◈",
      label: "Explorer",
      desc: "Properties & relations",
    },
    { id: "hexmap", icon: "⊞", label: "Hex Map", desc: "64 hexagram matrix" },
    { id: "graph", icon: "⬡", label: "Graph", desc: "Relation network" },
    {
      id: "bagua",
      icon: "☯",
      label: "Bāguà Wheel",
      desc: "Classical arrangements",
    },
    { id: "compare", icon: "⟷", label: "Compare", desc: "Side-by-side" },
  ];

  return (
    <>
      {/* Main Top Header */}
      <div className="relative text-center max-w-3xl mx-auto py-0 rounded-xl">
        {/* BACKGROUND */}
        <div
          className="absolute inset-0 blur-3xl opacity-100 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 30% 40%, rgba(34,197,94,0.12), transparent 60%), radial-gradient(circle at 70% 60%, rgba(234,179,8,0.12), transparent 60%)",
            animation: "cloudMove 24s ease-in-out infinite",
          }}
        />

        {/* CONTENT */}
        <div className="relative text-center max-w-3xl mx-auto py-10">
          <h1 className="text-5xl font-semibold tracking-tight mb-4">
            The Eight Trigrams
          </h1>

          <p className="text-neutral-400 leading-relaxed text-lg">
            The fundamental patterns of Yin and Yang. Each trigram represents a
            primary force — a direction of energy, a mode of change — from which
            all hexagrams emerge. Together, they form the elemental grammar of
            transformation.
          </p>

          {/* Tags */}
          <div className="flex justify-center flex-wrap gap-2 mt-6">
            <span className="px-3 py-1 text-xs rounded-full bg-green-500/10 text-green-400">
              Foundations
            </span>
            <span className="px-3 py-1 text-xs rounded-full bg-yellow-500/10 text-yellow-400">
              Elements
            </span>
            <span className="px-3 py-1 text-xs rounded-full bg-emerald-500/10 text-emerald-400">
              Yin–Yang
            </span>
            <span className="px-3 py-1 text-xs rounded-full bg-amber-500/10 text-amber-400">
              I Ching
            </span>
          </div>

          {/* QUOTE */}
          <div className="mt-10">
            <p className="text-lg text-neutral-200 italic font-medium max-w-3xl mx-auto leading-relaxed">
              “Under heaven all can see beauty as beauty only because there is
              ugliness. All can know good as good only because there is evil.
              Being and non-being produce each other; difficult and easy
              complete each other.”
            </p>
            <p className="text-sm text-green-400 mt-3 tracking-wide">
              — Laozi, Tao Te Ching
            </p>
          </div>

          <div className="mt-8 h-px bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />
        </div>
      </div>
      {/* Main Top Header End */}
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {/* Selected trigram banner */}
        {selected && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "10px 16px",
              background: `${selected.color}0c`,
              border: `1px solid ${selected.color}33`,
              borderRadius: 10,
              marginBottom: 16,
              transition: "all 0.25s",
            }}
          >
            <TrigramLines
              bits={selected.bits}
              color={selected.color}
              size="md"
              animated
            />
            <div>
              <div
                style={{ fontSize: 13, fontWeight: 700, color: selected.color }}
              >
                {selected.symbol} {selected.name} · {selected.chinese} ·{" "}
                {selected.english}
              </div>
              <div style={{ fontSize: 11, color: "#64748b" }}>
                {selected.quality} · {selected.element} · {selected.family}
              </div>
            </div>
            <div
              style={{
                marginLeft: "auto",
                display: "flex",
                gap: 8,
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "monospace",
                  fontSize: 12,
                  color: selected.color + "99",
                  letterSpacing: 2,
                }}
              >
                {selected.bits.join("")}
              </div>
              <button
                onClick={() => setSelected(null)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#475569",
                  cursor: "pointer",
                  fontSize: 16,
                  padding: "0 4px",
                  lineHeight: 1,
                }}
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Tab bar */}
        <div
          style={{
            display: "flex",
            gap: 3,
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 12,
            padding: 4,
            marginBottom: 20,
          }}
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1,
                  padding: "8px 6px",
                  borderRadius: 9,
                  border: "none",
                  background: isActive
                    ? "rgba(255,255,255,0.06)"
                    : "transparent",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                <div
                  style={{
                    fontSize: 14,
                    color: isActive ? "#e2e8f0" : "#475569",
                    marginBottom: 1,
                    transition: "color 0.2s",
                  }}
                >
                  {tab.icon}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? "#e2e8f0" : "#475569",
                    transition: "color 0.2s",
                  }}
                >
                  {tab.label}
                </div>
                {isActive && (
                  <div style={{ fontSize: 9, color: "#475569", marginTop: 1 }}>
                    {tab.desc}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <div
          style={{
            background: "rgba(255,255,255,0.015)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 14,
            padding: "24px 24px 28px",
            minHeight: 500,
          }}
        >
          {activeTab === "explorer" && (
            <ExplorerTab selected={selected} onSelect={setSelected} />
          )}
          {activeTab === "hexmap" && <HexagramMapTab selected={selected} />}
          {activeTab === "graph" && (
            <GraphTab selected={selected} onSelect={setSelected} />
          )}
          {activeTab === "bagua" && (
            <BaguaTab selected={selected} onSelect={setSelected} />
          )}
          {activeTab === "compare" && <CompareTab />}
        </div>

        <p
          style={{
            textAlign: "center",
            fontSize: 11,
            color: "#1e293b",
            marginTop: 12,
          }}
        >
          8 Trigrams · 64 Hexagrams · 6-dimensional Boolean hypercube
        </p>

        <style>{`
        @keyframes pulseRing {
          0%   { r: 20; opacity: 0.4; }
          100% { r: 32; opacity: 0;   }
        }
      `}</style>
      </div>
    </>
  );
}
