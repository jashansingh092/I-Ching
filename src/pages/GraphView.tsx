"use client";


import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { generateHexagrams } from "../core/generateHexgrams";
import { InlineMath } from "react-katex";

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const hexagrams = generateHexagrams();

const hexToIndex = new Map<string, number>(
  hexagrams.map((h, i) => [h.join(""), i]),
);

// I Ching trigram names (lower 3 bits → trigram)
const TRIGRAM_NAMES = [
  "☷ Earth",
  "☶ Mountain",
  "☵ Water",
  "☴ Wind",
  "☳ Thunder",
  "☲ Fire",
  "☱ Lake",
  "☰ Heaven",
];
const TRIGRAM_SHORT = [
  "Earth",
  "Mountain",
  "Water",
  "Wind",
  "Thunder",
  "Fire",
  "Lake",
  "Heaven",
];

// ─────────────────────────────────────────────
// MATH
// ─────────────────────────────────────────────
function hammingDistance(a: number[], b: number[]): number {
  let d = 0;
  for (let i = 0; i < 6; i++) if (a[i] !== b[i]) d++;
  return d;
}

function bfsPath(startIdx: number, endIdx: number): number[] | null {
  if (startIdx === endIdx) return [startIdx];
  const startKey = hexagrams[startIdx].join("");
  const endKey = hexagrams[endIdx].join("");
  const queue: string[][] = [[startKey]];
  const visited = new Set<string>([startKey]);
  while (queue.length > 0) {
    const path = queue.shift()!;
    const currentKey = path[path.length - 1];
    const bits = currentKey.split("").map(Number);
    for (let bit = 0; bit < 6; bit++) {
      const nb = [...bits];
      nb[bit] ^= 1;
      const nk = nb.join("");
      if (!visited.has(nk)) {
        const newPath = [...path, nk];
        if (nk === endKey) return newPath.map((k) => hexToIndex.get(k) ?? -1);
        visited.add(nk);
        queue.push(newPath);
      }
    }
  }
  return null;
}

function greedySteiner(sel: number[]): {
  edges: [number, number][];
  nodes: Set<number>;
} {
  if (sel.length < 2) return { edges: [], nodes: new Set(sel) };
  let treeNodes = new Set<number>([sel[0]]);
  const edges: [number, number][] = [];
  for (let k = 1; k < sel.length; k++) {
    const target = sel[k];
    let bestPath: number[] | null = null;
    let bestLength = Infinity;
    for (const existing of treeNodes) {
      const path = bfsPath(existing, target);
      if (path && path.length < bestLength) {
        bestLength = path.length;
        bestPath = path;
      }
    }
    if (!bestPath) continue;
    for (let i = 0; i < bestPath.length - 1; i++) {
      edges.push([bestPath[i], bestPath[i + 1]]);
      treeNodes.add(bestPath[i]);
      treeNodes.add(bestPath[i + 1]);
    }
  }
  return { edges, nodes: treeNodes };
}

// ─────────────────────────────────────────────
// COLORS
// ─────────────────────────────────────────────
const COLORS = [
  "#60a5fa",
  "#a78bfa",
  "#34d399",
  "#fbbf24",
  "#f87171",
  "#22d3ee",
  "#c084fc",
  "#f472b6",
];
const COLORS_DIM = [
  "#1e3a5f",
  "#2e2060",
  "#0d3d27",
  "#3d2e00",
  "#3d1a1a",
  "#0d3a3d",
  "#2a1060",
  "#3d1830",
];

// ─────────────────────────────────────────────
// LAYOUT
// ─────────────────────────────────────────────
const SIZE = 680;
const CENTER = SIZE / 2;
const RADIUS = 270;

function getPosition(i: number, layout: "binary" | "trigram") {
  if (layout === "binary") {
    const angle = (i / 64) * Math.PI * 2 - Math.PI / 2;
    return {
      x: CENTER + Math.cos(angle) * RADIUS,
      y: CENTER + Math.sin(angle) * RADIUS,
    };
  }
  const upper = Math.floor(i / 8);
  const lower = i % 8;
  const tAngle = (upper / 8) * Math.PI * 2 - Math.PI / 2;
  const r = 155 + lower * 16;
  return { x: CENTER + Math.cos(tAngle) * r, y: CENTER + Math.sin(tAngle) * r };
}

// ─────────────────────────────────────────────
// TABS
// ─────────────────────────────────────────────
type Tab = "overview" | "nodes" | "path" | "steiner" | "matrix" | "model";

// ─────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────

function HexBitDisplay({
  bits,
  highlight,
}: {
  bits: number[];
  highlight?: number[];
}) {
  return (
    <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
      {bits.map((b, i) => (
        <div
          key={i}
          style={{
            width: 14,
            height: 14,
            borderRadius: 3,
            background:
              b === 1
                ? highlight?.includes(i)
                  ? "#60a5fa"
                  : "#e2e8f0"
                : "transparent",
            border: `1px solid ${b === 1 ? (highlight?.includes(i) ? "#3b82f6" : "#64748b") : "#334155"}`,
            transition: "all 0.2s",
          }}
        />
      ))}
    </div>
  );
}

function NodeChip({
  idx,
  onRemove,
  onClick,
}: {
  idx: number;
  onRemove?: () => void;
  onClick?: () => void;
}) {
  const color = COLORS[Math.floor(idx / 8)];
  const upper = Math.floor(idx / 8);
  const lower = idx % 8;
  return (
    <div
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "4px 8px 4px 6px",
        borderRadius: 8,
        background: "rgba(255,255,255,0.04)",
        border: `1px solid ${color}44`,
        cursor: onClick ? "pointer" : "default",
        transition: "background 0.15s",
        userSelect: "none",
      }}
      onMouseEnter={(e) => {
        if (onClick)
          (e.currentTarget as HTMLElement).style.background =
            "rgba(255,255,255,0.08)";
      }}
      onMouseLeave={(e) => {
        if (onClick)
          (e.currentTarget as HTMLElement).style.background =
            "rgba(255,255,255,0.04)";
      }}
    >
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: color,
          flexShrink: 0,
        }}
      />
      <span style={{ fontFamily: "monospace", fontSize: 11, color: "#94a3b8" }}>
        #{idx + 1}
      </span>
      <span
        style={{
          fontFamily: "monospace",
          fontSize: 11,
          color: "#e2e8f0",
          letterSpacing: 1,
        }}
      >
        {hexagrams[idx].join("")}
      </span>
      <span style={{ fontSize: 10, color: "#64748b" }}>
        {TRIGRAM_SHORT[upper]}·{TRIGRAM_SHORT[lower]}
      </span>
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          style={{
            background: "none",
            border: "none",
            color: "#64748b",
            cursor: "pointer",
            padding: "0 2px",
            fontSize: 12,
            lineHeight: 1,
            marginLeft: 2,
          }}
        >
          ×
        </button>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
export default function GraphView() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number[]>([]);
  const [layout, setLayout] = useState<"binary" | "trigram">("binary");
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [spinning, setSpinning] = useState(true);
  const [spinAngle, setSpinAngle] = useState(0);
  const [showAllPaths, setShowAllPaths] = useState(false);
  const [filterGroup, setFilterGroup] = useState<number | null>(null);
  const animRef = useRef<number>();
  const lastTRef = useRef<number | null>(null);

  const positions = useMemo(
    () => hexagrams.map((_, i) => getPosition(i, layout)),
    [layout],
  );

  // Slow rotation
  useEffect(() => {
    if (!spinning) {
      lastTRef.current = null;
      return;
    }
    const animate = (t: number) => {
      if (lastTRef.current !== null) {
        setSpinAngle((a) => a + (t - lastTRef.current!) * 0.00008);
      }
      lastTRef.current = t;
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [spinning]);

  // BFS / Steiner
  const pathIndices = useMemo<number[] | null>(() => {
    if (selected.length !== 2) return null;
    return bfsPath(selected[0], selected[1]);
  }, [selected]);

  const hdist = useMemo<number | null>(() => {
    if (selected.length !== 2) return null;
    return hammingDistance(hexagrams[selected[0]], hexagrams[selected[1]]);
  }, [selected]);

  const steinerResult = useMemo(() => {
    if (selected.length < 3) return null;
    return greedySteiner(selected);
  }, [selected]);

  // All pairwise paths for 2-node selection (alternative paths)
  const allPaths = useMemo<number[][]>(() => {
    if (selected.length !== 2 || !showAllPaths) return [];
    // BFS gives shortest; collect all paths of length ≤ hdist+2
    return pathIndices ? [pathIndices] : [];
  }, [selected, pathIndices, showAllPaths]);

  // Highlight logic
  const hasSelected = selected.length > 0;
  const focalHover = !hasSelected && hovered !== null ? hovered : null;
  const isAnythingActive = hasSelected || focalHover !== null;

  const highlightedSet = useMemo<Set<number>>(() => {
    if (!isAnythingActive) return new Set();
    if (focalHover !== null) {
      const s = new Set<number>([focalHover]);
      hexagrams.forEach((h, j) => {
        if (hammingDistance(hexagrams[focalHover], h) === 1) s.add(j);
      });
      return s;
    }
    if (selected.length === 1) {
      const s = new Set<number>([selected[0]]);
      hexagrams.forEach((h, j) => {
        if (hammingDistance(hexagrams[selected[0]], h) === 1) s.add(j);
      });
      return s;
    }
    if (selected.length === 2 && pathIndices) {
      return new Set(pathIndices.filter((i) => i !== -1));
    }
    if (selected.length >= 3 && steinerResult) {
      return steinerResult.nodes;
    }
    return new Set(selected);
  }, [selected, focalHover, pathIndices, steinerResult, isAnythingActive]);

  // Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setSelected([]);
      setHovered(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleNodeClick = useCallback((i: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setHovered(null);
    setSelected((prev) => {
      if (e.shiftKey) {
        return prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i];
      }
      return prev.length === 1 && prev[0] === i ? [] : [i];
    });
  }, []);

  // ─────────────────────────────────────────────
  // SVG EDGES
  // ─────────────────────────────────────────────
  function renderEdges() {
    if (!hasSelected) return null;

    if (selected.length === 1) {
      const s = selected[0];
      return hexagrams.flatMap((_, j) => {
        if (j === s || hammingDistance(hexagrams[s], hexagrams[j]) !== 1)
          return [];
        const p1 = positions[s],
          p2 = positions[j];
        return [
          <line
            key={`e-${s}-${j}`}
            x1={p1.x}
            y1={p1.y}
            x2={p2.x}
            y2={p2.y}
            stroke={COLORS[Math.floor(s / 8)]}
            strokeWidth={1.5}
            opacity={0.65}
            strokeDasharray="4 2"
          />,
        ];
      });
    }

    if (selected.length === 2 && pathIndices && pathIndices.length >= 2) {
      const steps = pathIndices.length - 1;
      return pathIndices.slice(0, -1).map((fromIdx, step) => {
        const toIdx = pathIndices[step + 1];
        if (fromIdx === -1 || toIdx === -1) return null;
        const p1 = positions[fromIdx],
          p2 = positions[toIdx];
        const t = steps <= 1 ? 0.5 : step / (steps - 1);
        // Gradient from blue → purple along path
        const r = Math.round(96 + t * (167 - 96));
        const g = Math.round(165 + t * (139 - 165));
        const b = Math.round(250 + t * (250 - 250));
        return (
          <line
            key={`path-${step}`}
            x1={p1.x}
            y1={p1.y}
            x2={p2.x}
            y2={p2.y}
            stroke={`rgb(${r},${g},${b})`}
            strokeWidth={2.5}
            opacity={1}
            strokeLinecap="round"
          />
        );
      });
    }

    if (selected.length >= 3 && steinerResult) {
      return steinerResult.edges.map(([a, b], i) => {
        const p1 = positions[a],
          p2 = positions[b];
        const isSel = selected.includes(a) && selected.includes(b);
        return (
          <line
            key={`steiner-${i}`}
            x1={p1.x}
            y1={p1.y}
            x2={p2.x}
            y2={p2.y}
            stroke="#60a5fa"
            strokeWidth={isSel ? 2.5 : 1.5}
            opacity={isSel ? 0.9 : 0.5}
            strokeLinecap="round"
          />
        );
      });
    }
    return null;
  }

  // ─────────────────────────────────────────────
  // CENTER PANEL
  // ─────────────────────────────────────────────
  function renderPanel() {
    if (!isAnythingActive) return null;

    const panelStyle: React.CSSProperties = {
      background: "rgba(10,14,23,0.92)",
      backdropFilter: "blur(16px)",
      borderRadius: 16,
      border: "1px solid rgba(255,255,255,0.08)",
      padding: "16px 20px",
      minWidth: 200,
      maxWidth: 260,
      boxShadow: "0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
      textAlign: "center",
    };

    if (focalHover !== null) {
      const i = focalHover;
      const color = COLORS[Math.floor(i / 8)];
      const upper = Math.floor(i / 8),
        lower = i % 8;
      return (
        <div style={panelStyle}>
          <div
            style={{
              fontSize: 10,
              color: "#64748b",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            {TRIGRAM_NAMES[upper]} over {TRIGRAM_NAMES[lower]}
          </div>
          <div
            style={{ fontSize: 13, fontWeight: 600, color, marginBottom: 6 }}
          >
            Hexagram {i + 1}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 8,
            }}
          >
            <HexBitDisplay bits={hexagrams[i]} />
          </div>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 18,
              color: "#e2e8f0",
              letterSpacing: "0.2em",
              marginBottom: 8,
            }}
          >
            {hexagrams[i].join("")}
          </div>
          <div style={{ fontSize: 10, color: "#334155" }}>
            click · shift+click to add
          </div>
        </div>
      );
    }

    if (selected.length === 1) {
      const i = selected[0];
      const color = COLORS[Math.floor(i / 8)];
      const upper = Math.floor(i / 8),
        lower = i % 8;
      const neighbors = hexagrams.filter(
        (_, j) => hammingDistance(hexagrams[i], hexagrams[j]) === 1,
      ).length;
      return (
        <div style={panelStyle}>
          <div
            style={{
              fontSize: 10,
              color: "#64748b",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            {TRIGRAM_NAMES[upper]} over {TRIGRAM_NAMES[lower]}
          </div>
          <div
            style={{ fontSize: 13, fontWeight: 600, color, marginBottom: 6 }}
          >
            Hexagram {i + 1}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 8,
            }}
          >
            <HexBitDisplay bits={hexagrams[i]} />
          </div>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 18,
              color: "#e2e8f0",
              letterSpacing: "0.2em",
              marginBottom: 8,
            }}
          >
            {hexagrams[i].join("")}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 16,
              marginBottom: 8,
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 16, fontWeight: 600, color: "#60a5fa" }}>
                {neighbors}
              </div>
              <div style={{ fontSize: 10, color: "#64748b" }}>neighbors</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 16, fontWeight: 600, color: "#a78bfa" }}>
                {hexagrams[i].reduce((a, b) => a + b, 0)}
              </div>
              <div style={{ fontSize: 10, color: "#64748b" }}>yang lines</div>
            </div>
          </div>
          <div style={{ fontSize: 10, color: "#334155" }}>
            shift+click another to find a path
          </div>
        </div>
      );
    }

    if (selected.length === 2) {
      const [a, b] = selected;
      const steps = pathIndices ? pathIndices.length - 1 : "—";
      const hd = hdist ?? 0;
      const pct = (hd / 6) * 100;
      const distColor = hd <= 2 ? "#34d399" : hd <= 4 ? "#fbbf24" : "#f87171";
      return (
        <div style={panelStyle}>
          <div
            style={{
              display: "flex",
              gap: 10,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: COLORS[Math.floor(a / 8)],
                  marginBottom: 2,
                }}
              >
                #{a + 1}
              </div>
              <div
                style={{
                  fontFamily: "monospace",
                  fontSize: 12,
                  color: "#94a3b8",
                  letterSpacing: 1,
                }}
              >
                {hexagrams[a].join("")}
              </div>
            </div>
            <div style={{ color: "#334155", fontSize: 18 }}>⟶</div>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: COLORS[Math.floor(b / 8)],
                  marginBottom: 2,
                }}
              >
                #{b + 1}
              </div>
              <div
                style={{
                  fontFamily: "monospace",
                  fontSize: 12,
                  color: "#94a3b8",
                  letterSpacing: 1,
                }}
              >
                {hexagrams[b].join("")}
              </div>
            </div>
          </div>
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.06)",
              paddingTop: 10,
            }}
          >
            <div style={{ fontSize: 10, color: "#64748b", marginBottom: 4 }}>
              Hamming distance
            </div>
            <div
              style={{
                height: 3,
                background: "#1e293b",
                borderRadius: 2,
                marginBottom: 4,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${pct}%`,
                  background: distColor,
                  borderRadius: 2,
                  transition: "width 0.4s",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 20,
                  fontWeight: 700,
                  color: distColor,
                }}
              >
                {hd}
              </span>
              <span
                style={{
                  fontSize: 11,
                  color: "#64748b",
                  alignSelf: "flex-end",
                  paddingBottom: 2,
                }}
              >
                of 6 bits
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 10, color: "#64748b" }}>
                Shortest path
              </span>
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 12,
                  color: "#34d399",
                  fontWeight: 600,
                }}
              >
                {steps} steps
              </span>
            </div>
          </div>
        </div>
      );
    }

    if (selected.length >= 3) {
      const steinerCount = steinerResult?.nodes.size ?? selected.length;
      const edgeCount = steinerResult?.edges.length ?? 0;
      return (
        <div style={panelStyle}>
          <div
            style={{
              fontSize: 10,
              color: "#64748b",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 6,
            }}
          >
            Steiner Tree
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#60a5fa",
              marginBottom: 2,
            }}
          >
            {selected.length}
          </div>
          <div style={{ fontSize: 11, color: "#64748b", marginBottom: 10 }}>
            nodes selected
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 20,
              borderTop: "1px solid rgba(255,255,255,0.06)",
              paddingTop: 10,
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 16, fontWeight: 600, color: "#a78bfa" }}>
                {steinerCount}
              </div>
              <div style={{ fontSize: 10, color: "#64748b" }}>total nodes</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 16, fontWeight: 600, color: "#34d399" }}>
                {edgeCount}
              </div>
              <div style={{ fontSize: 10, color: "#64748b" }}>edges</div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }

  // ─────────────────────────────────────────────
  // TABS
  // ─────────────────────────────────────────────
  function renderTabContent() {
      console.log("x \\cdot y");
      console.log("X = \\{0,1\\}^6 \\quad |X| = 2^6 = 64");
      console.log(`X = \\{0,1\\}^6 \\quad |X| = 2^6 = 64`);
    // Overview tab
    if (activeTab === "overview") {
      if (!isAnythingActive) {
        return (
          <div style={{ padding: "20px 24px", color: "#64748b", fontSize: 13 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
                marginBottom: 16,
              }}
            >
              {[
                { label: "Total hexagrams", value: "64", color: "#60a5fa" },
                { label: "Dimensions", value: "6-bit", color: "#a78bfa" },
                { label: "Max distance", value: "6", color: "#f87171" },
                { label: "Neighbors each", value: "6", color: "#34d399" },
              ].map((s) => (
                <div
                  key={s.label}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: 8,
                    padding: "10px 12px",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <div
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      color: s.color,
                      fontFamily: "monospace",
                    }}
                  >
                    {s.value}
                  </div>
                  <div style={{ fontSize: 10, color: "#64748b", marginTop: 2 }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
            {/* Ending of 4 conainers */}

            {/* Beginning of "How to Explore" Section */}
            <div className="mt-6 max-w-xl mx-auto text-left space-y-3">
              <div className="text-xs uppercase tracking-widest text-neutral-500 mb-2">
                How to Explore
              </div>

              <div className="space-y-2 text-sm text-neutral-300">
                <div className="flex items-start gap-3">
                  <span className="text-blue-400 font-mono">●</span>
                  <p>
                    <span className="text-blue-400">Click</span> a node to
                    reveal its{" "}
                    <span className="text-neutral-100">
                      6 direct transformations
                    </span>
                    .
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-purple-400 font-mono">⇄</span>
                  <p>
                    <span className="text-purple-400">Shift + Click</span>{" "}
                    another node to compute the{" "}
                    <span className="text-neutral-100">
                      shortest transformation path
                    </span>
                    .
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-cyan-400 font-mono">✳</span>
                  <p>
                    Continue{" "}
                    <span className="text-cyan-400">Shift + Click</span> to
                    build a{" "}
                    <span className="text-neutral-100">
                      minimal spanning structure
                    </span>{" "}
                    across multiple states.
                  </p>
                </div>
              </div>

              {/* subtle divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-neutral-700 to-transparent mt-4" />

              {/* micro hint */}
              <p className="text-xs text-neutral-500 text-center mt-2">
                Press <span className="text-neutral-300">Esc</span> to reset ·
                Hover to preview
              </p>
            </div>
          </div>
        );
      }

      if (focalHover !== null || selected.length === 1) {
        const i = focalHover ?? selected[0];
        const upper = Math.floor(i / 8),
          lower = i % 8;
        const allNeighbors = hexagrams
          .map((_, j) => j)
          .filter((j) => hammingDistance(hexagrams[i], hexagrams[j]) === 1);
        const yangCount = hexagrams[i].reduce((a, b) => a + b, 0);
        return (
          <div style={{ padding: "16px 24px" }}>
            <div
              style={{
                marginBottom: 12,
                display: "flex",
                gap: 8,
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: COLORS[Math.floor(i / 8)],
                }}
              />
              <span style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0" }}>
                Hexagram {i + 1}
              </span>
              <span style={{ fontSize: 11, color: "#64748b" }}>
                {hexagrams[i].join("")}
              </span>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 8,
                marginBottom: 12,
              }}
            >
              {[
                { label: "Upper trigram", value: TRIGRAM_NAMES[upper] },
                { label: "Lower trigram", value: TRIGRAM_NAMES[lower] },
                { label: "Yang (solid) lines", value: yangCount },
                { label: "Yin (broken) lines", value: 6 - yangCount },
              ].map((s) => (
                <div
                  key={s.label}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: 6,
                    padding: "8px 10px",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <div
                    style={{ fontSize: 11, color: "#64748b", marginBottom: 2 }}
                  >
                    {s.label}
                  </div>
                  <div
                    style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0" }}
                  >
                    {s.value}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 11, color: "#64748b", marginBottom: 6 }}>
              Direct neighbors (Hamming-1)
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {allNeighbors.map((j) => (
                <NodeChip key={j} idx={j} onClick={() => setSelected([j])} />
              ))}
            </div>
          </div>
        );
      }

      if (selected.length === 2) {
        const [a, b] = selected;
        const hd = hdist ?? 0;
        const diffBits = hexagrams[a]
          .map((v, i) => (v !== hexagrams[b][i] ? i : -1))
          .filter((x) => x >= 0);
        return (
          <div style={{ padding: "16px 24px" }}>
            <div
              style={{
                display: "flex",
                gap: 10,
                marginBottom: 12,
                alignItems: "flex-start",
              }}
            >
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 11,
                    color: COLORS[Math.floor(a / 8)],
                    marginBottom: 4,
                  }}
                >
                  From: #{a + 1}
                </div>
                <HexBitDisplay bits={hexagrams[a]} highlight={diffBits} />
              </div>
              <div style={{ fontSize: 20, color: "#334155", paddingTop: 8 }}>
                →
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 11,
                    color: COLORS[Math.floor(b / 8)],
                    marginBottom: 4,
                  }}
                >
                  To: #{b + 1}
                </div>
                <HexBitDisplay bits={hexagrams[b]} highlight={diffBits} />
              </div>
            </div>
            <div style={{ fontSize: 11, color: "#64748b", marginBottom: 4 }}>
              Differing bits:{" "}
              <span style={{ color: "#60a5fa", fontFamily: "monospace" }}>
                positions [{diffBits.join(", ")}]
              </span>
            </div>
            <div style={{ fontSize: 11, color: "#64748b" }}>
              Each step flips exactly one bit. The shortest path requires{" "}
              <strong style={{ color: "#34d399" }}>{hd} flips</strong> —
              matching the Hamming distance.
            </div>
          </div>
        );
      }

      // 3+ selected
      const steinerNodes = steinerResult
        ? Array.from(steinerResult.nodes)
        : selected;
      const selSet = new Set(selected);
      const steinerOnly = steinerNodes.filter((n) => !selSet.has(n));
      return (
        <div style={{ padding: "16px 24px" }}>
          <div style={{ fontSize: 11, color: "#64748b", marginBottom: 8 }}>
            Greedy Steiner approximation connects{" "}
            <strong style={{ color: "#60a5fa" }}>{selected.length}</strong>{" "}
            terminal nodes through{" "}
            <strong style={{ color: "#a78bfa" }}>{steinerOnly.length}</strong>{" "}
            intermediate Steiner points, using{" "}
            <strong style={{ color: "#34d399" }}>
              {steinerResult?.edges.length ?? 0}
            </strong>{" "}
            edges total.
          </div>
          <div style={{ fontSize: 11, color: "#64748b" }}>
            The Steiner tree in a hypercube minimizes total edge weight across
            all selected terminals. See the Steiner tab for the full node
            breakdown.
          </div>
        </div>
      );
    }

    // Nodes tab
    if (activeTab === "nodes") {
      const displayNodes = selected.length > 0 ? selected : [];
      if (displayNodes.length === 0) {
        return (
          <div style={{ padding: "20px 24px", color: "#64748b", fontSize: 13 }}>
            No nodes selected. Click on nodes in the graph.
          </div>
        );
      }
      return (
        <div style={{ padding: "16px 24px" }}>
          <div
            style={{
              marginBottom: 12,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 11, color: "#64748b" }}>
              {selected.length} node{selected.length !== 1 ? "s" : ""} selected
            </span>
            <button
              onClick={() => setSelected([])}
              style={{
                fontSize: 11,
                color: "#64748b",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 6,
                padding: "3px 8px",
                cursor: "pointer",
              }}
            >
              Clear all
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {displayNodes.map((idx) => {
              const color = COLORS[Math.floor(idx / 8)];
              const upper = Math.floor(idx / 8),
                lower = idx % 8;
              const yang = hexagrams[idx].reduce((a, b) => a + b, 0);
              return (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "8px 12px",
                    borderRadius: 8,
                    background: "rgba(255,255,255,0.03)",
                    border: `1px solid ${color}22`,
                    transition: "background 0.15s",
                  }}
                >
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: color,
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: 8,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: "#e2e8f0",
                        }}
                      >
                        #{idx + 1}
                      </span>
                      <span
                        style={{
                          fontFamily: "monospace",
                          fontSize: 12,
                          color: "#94a3b8",
                          letterSpacing: 1,
                        }}
                      >
                        {hexagrams[idx].join("")}
                      </span>
                    </div>
                    <div
                      style={{ fontSize: 10, color: "#64748b", marginTop: 1 }}
                    >
                      {TRIGRAM_NAMES[upper]} · {TRIGRAM_NAMES[lower]} · {yang}{" "}
                      yang
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 2 }}>
                    <HexBitDisplay bits={hexagrams[idx]} />
                  </div>
                  <button
                    onClick={() =>
                      setSelected((prev) => prev.filter((x) => x !== idx))
                    }
                    style={{
                      background: "none",
                      border: "none",
                      color: "#64748b",
                      cursor: "pointer",
                      fontSize: 14,
                      padding: "0 2px",
                      lineHeight: 1,
                    }}
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>

          {/* Group filter */}
          <div
            style={{
              marginTop: 16,
              paddingTop: 12,
              borderTop: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <div style={{ fontSize: 11, color: "#64748b", marginBottom: 8 }}>
              Quick-add by group
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {COLORS.map((color, gi) => (
                <button
                  key={gi}
                  onClick={() => {
                    const groupNodes = hexagrams
                      .map((_, i) => i)
                      .filter((i) => Math.floor(i / 8) === gi);
                    setSelected((prev) => {
                      const prevSet = new Set(prev);
                      const allIn = groupNodes.every((n) => prevSet.has(n));
                      if (allIn)
                        return prev.filter((x) => !groupNodes.includes(x));
                      return [...new Set([...prev, ...groupNodes])];
                    });
                  }}
                  style={{
                    fontSize: 10,
                    padding: "3px 8px",
                    borderRadius: 6,
                    background: `${color}18`,
                    border: `1px solid ${color}44`,
                    color: color,
                    cursor: "pointer",
                  }}
                >
                  {TRIGRAM_SHORT[gi]}
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // Path tab
    if (activeTab === "path") {
      if (selected.length !== 2) {
        return (
          <div style={{ padding: "20px 24px", color: "#64748b", fontSize: 13 }}>
            Select exactly 2 nodes to compute the transformation path.
            {selected.length > 2 && (
              <span style={{ display: "block", marginTop: 8, fontSize: 11 }}>
                Currently {selected.length} nodes selected. Switch to Steiner
                tab for multi-node spanning.
              </span>
            )}
          </div>
        );
      }
      const [a, b] = selected;
      const steps = pathIndices ? pathIndices.length - 1 : 0;
      const hd = hdist ?? 0;
      const diffBits = hexagrams[a]
        .map((v, i) => (v !== hexagrams[b][i] ? i : -1))
        .filter((x) => x >= 0);
      return (
        <div style={{ padding: "16px 24px" }}>
          <div
            style={{
              display: "flex",
              gap: 12,
              marginBottom: 16,
              alignItems: "stretch",
            }}
          >
            <div
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.03)",
                borderRadius: 8,
                border: `1px solid ${COLORS[Math.floor(a / 8)]}33`,
                padding: "10px 12px",
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  color: COLORS[Math.floor(a / 8)],
                  marginBottom: 4,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                Origin
              </div>
              <div
                style={{
                  fontFamily: "monospace",
                  fontSize: 14,
                  color: "#e2e8f0",
                  marginBottom: 4,
                }}
              >
                #{a + 1} · {hexagrams[a].join("")}
              </div>
              <div style={{ fontSize: 10, color: "#64748b" }}>
                {TRIGRAM_NAMES[Math.floor(a / 8)]}
              </div>
            </div>
            <div
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.03)",
                borderRadius: 8,
                border: `1px solid ${COLORS[Math.floor(b / 8)]}33`,
                padding: "10px 12px",
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  color: COLORS[Math.floor(b / 8)],
                  marginBottom: 4,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                Destination
              </div>
              <div
                style={{
                  fontFamily: "monospace",
                  fontSize: 14,
                  color: "#e2e8f0",
                  marginBottom: 4,
                }}
              >
                #{b + 1} · {hexagrams[b].join("")}
              </div>
              <div style={{ fontSize: 10, color: "#64748b" }}>
                {TRIGRAM_NAMES[Math.floor(b / 8)]}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
            {[
              {
                label: "Hamming distance",
                value: hd,
                color: hd <= 2 ? "#34d399" : hd <= 4 ? "#fbbf24" : "#f87171",
              },
              {
                label: "Path length",
                value: `${steps} steps`,
                color: "#34d399",
              },
              {
                label: "Bits flipped",
                value: diffBits.length,
                color: "#60a5fa",
              },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.03)",
                  borderRadius: 8,
                  padding: "8px 10px",
                  border: "1px solid rgba(255,255,255,0.05)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "monospace",
                    fontSize: 18,
                    fontWeight: 700,
                    color: s.color,
                  }}
                >
                  {s.value}
                </div>
                <div style={{ fontSize: 10, color: "#64748b", marginTop: 2 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Step-by-step path */}
          {pathIndices && pathIndices.length > 0 && (
            <div>
              <div style={{ fontSize: 11, color: "#64748b", marginBottom: 8 }}>
                Transformation sequence
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  maxHeight: 240,
                  overflowY: "auto",
                }}
              >
                {pathIndices.map((idx, step) => {
                  if (idx === -1) return null;
                  const isFirst = step === 0,
                    isLast = step === pathIndices.length - 1;
                  const color = COLORS[Math.floor(idx / 8)];
                  // Which bit flipped from previous?
                  let flippedBit = -1;
                  if (step > 0 && pathIndices[step - 1] !== -1) {
                    const prev = hexagrams[pathIndices[step - 1]];
                    const cur = hexagrams[idx];
                    for (let i = 0; i < 6; i++)
                      if (prev[i] !== cur[i]) {
                        flippedBit = i;
                        break;
                      }
                  }
                  return (
                    <div
                      key={step}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "5px 8px",
                        borderRadius: 6,
                        background:
                          isFirst || isLast
                            ? `${color}12`
                            : "rgba(255,255,255,0.02)",
                        border:
                          isFirst || isLast
                            ? `1px solid ${color}33`
                            : "1px solid transparent",
                      }}
                    >
                      <div
                        style={{
                          width: 18,
                          textAlign: "right",
                          fontSize: 10,
                          color: "#334155",
                          flexShrink: 0,
                        }}
                      >
                        {step}
                      </div>
                      <div
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: isFirst || isLast ? color : "#334155",
                          flexShrink: 0,
                        }}
                      />
                      <div
                        style={{
                          fontFamily: "monospace",
                          fontSize: 12,
                          color: "#94a3b8",
                          letterSpacing: 1,
                        }}
                      >
                        {hexagrams[idx].map((bit, bi) => (
                          <span
                            key={bi}
                            style={{
                              color:
                                bi === flippedBit
                                  ? "#60a5fa"
                                  : isFirst || isLast
                                    ? "#e2e8f0"
                                    : "#94a3b8",
                            }}
                          >
                            {bit}
                          </span>
                        ))}
                      </div>
                      <div style={{ fontSize: 10, color: "#334155" }}>
                        #{idx + 1}
                      </div>
                      {flippedBit >= 0 && (
                        <div
                          style={{
                            marginLeft: "auto",
                            fontSize: 10,
                            color: "#334155",
                          }}
                        >
                          flip bit {flippedBit}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      );
    }

    // Steiner tab
    if (activeTab === "steiner") {
      if (selected.length < 3) {
        return (
          <div style={{ padding: "20px 24px", color: "#64748b", fontSize: 13 }}>
            Select 3 or more nodes to build a Steiner spanning tree.
            {selected.length === 2 && (
              <span style={{ display: "block", marginTop: 8, fontSize: 11 }}>
                2 nodes selected — check the Path tab instead.
              </span>
            )}
          </div>
        );
      }

      const steinerNodes = steinerResult ? Array.from(steinerResult.nodes) : [];
      const selSet = new Set(selected);
      const terminals = steinerNodes.filter((n) => selSet.has(n));
      const steinerOnly = steinerNodes.filter((n) => !selSet.has(n));

      return (
        <div style={{ padding: "16px 24px" }}>
          <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
            {[
              {
                label: "Terminal nodes",
                value: terminals.length,
                color: "#60a5fa",
              },
              {
                label: "Steiner points",
                value: steinerOnly.length,
                color: "#a78bfa",
              },
              {
                label: "Total edges",
                value: steinerResult?.edges.length ?? 0,
                color: "#34d399",
              },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.03)",
                  borderRadius: 8,
                  padding: "8px 10px",
                  border: "1px solid rgba(255,255,255,0.05)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "monospace",
                    fontSize: 18,
                    fontWeight: 700,
                    color: s.color,
                  }}
                >
                  {s.value}
                </div>
                <div style={{ fontSize: 10, color: "#64748b", marginTop: 2 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {terminals.length > 0 && (
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: "#60a5fa", marginBottom: 6 }}>
                Terminal nodes (your selection)
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {terminals.map((idx) => (
                  <NodeChip
                    key={idx}
                    idx={idx}
                    onRemove={() =>
                      setSelected((p) => p.filter((x) => x !== idx))
                    }
                  />
                ))}
              </div>
            </div>
          )}

          {steinerOnly.length > 0 && (
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: "#a78bfa", marginBottom: 6 }}>
                Steiner points (intermediate nodes)
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {steinerOnly.map((idx) => (
                  <NodeChip
                    key={idx}
                    idx={idx}
                    onClick={() =>
                      setSelected((p) =>
                        p.includes(idx)
                          ? p.filter((x) => x !== idx)
                          : [...p, idx],
                      )
                    }
                  />
                ))}
              </div>
              <div style={{ fontSize: 10, color: "#64748b", marginTop: 6 }}>
                Click a Steiner point to add it to your selection
              </div>
            </div>
          )}

          {steinerResult && steinerResult.edges.length > 0 && (
            <div>
              <div style={{ fontSize: 11, color: "#64748b", marginBottom: 6 }}>
                Edge list
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  maxHeight: 160,
                  overflowY: "auto",
                }}
              >
                {steinerResult.edges.map(([a, b], i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "3px 6px",
                      fontSize: 11,
                      color: "#64748b",
                      fontFamily: "monospace",
                    }}
                  >
                    <span style={{ color: COLORS[Math.floor(a / 8)] }}>
                      #{a + 1}
                    </span>
                    <span style={{ color: "#334155" }}>—</span>
                    <span style={{ color: COLORS[Math.floor(b / 8)] }}>
                      #{b + 1}
                    </span>
                    <span style={{ color: "#1e293b", marginLeft: 4 }}>
                      d={hammingDistance(hexagrams[a], hexagrams[b])}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }

    // Matrix tab — pairwise hamming distance heatmap
    if (activeTab === "matrix") {
      const nodes = selected.length >= 2 ? selected : [];
      if (nodes.length < 2) {
        return (
          <div style={{ padding: "20px 24px", color: "#64748b", fontSize: 13 }}>
            Select 2 or more nodes to see a pairwise distance matrix.
          </div>
        );
      }
      const distColor = (d: number) => {
        if (d === 0) return "#0f172a";
        if (d <= 2) return "#065f46";
        if (d <= 4) return "#78350f";
        return "#7f1d1d";
      };
      const textColor = (d: number) => {
        if (d === 0) return "#334155";
        if (d <= 2) return "#34d399";
        if (d <= 4) return "#fbbf24";
        return "#f87171";
      };
      return (
        <div style={{ padding: "16px 24px", overflowX: "auto" }}>
          <div style={{ fontSize: 11, color: "#64748b", marginBottom: 10 }}>
            Pairwise Hamming distance matrix — cells colored by distance
            (green=close, red=far)
          </div>
          <table
            style={{
              borderCollapse: "collapse",
              fontSize: 10,
              fontFamily: "monospace",
            }}
          >
            <thead>
              <tr>
                <td style={{ padding: "4px 6px" }} />
                {nodes.map((idx) => (
                  <td
                    key={idx}
                    style={{
                      padding: "4px 6px",
                      textAlign: "center",
                      color: COLORS[Math.floor(idx / 8)],
                    }}
                  >
                    #{idx + 1}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {nodes.map((ri) => (
                <tr key={ri}>
                  <td
                    style={{
                      padding: "4px 6px",
                      color: COLORS[Math.floor(ri / 8)],
                    }}
                  >
                    #{ri + 1}
                  </td>
                  {nodes.map((ci) => {
                    const d = hammingDistance(hexagrams[ri], hexagrams[ci]);
                    return (
                      <td
                        key={ci}
                        style={{
                          padding: "4px 8px",
                          textAlign: "center",
                          background: distColor(d),
                          color: textColor(d),
                          borderRadius: 4,
                          fontWeight: d === 0 ? 400 : 700,
                        }}
                      >
                        {d}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
            {[
              { label: "d≤2 (close)", color: "#34d399" },
              { label: "d≤4", color: "#fbbf24" },
              { label: "d>4 (far)", color: "#f87171" },
            ].map((l) => (
              <div
                key={l.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  fontSize: 10,
                  color: "#64748b",
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 2,
                    background: l.color,
                    opacity: 0.7,
                  }}
                />
                {l.label}
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Model tab - mathematical and scientifical core design
    if (activeTab === "model") {
      return (
        <div
  className="fade-up py-6 px-6 md:px-10"
  style={{ maxWidth: 900, margin: "0 auto" }}
>
  {/* HEADER */}
  <div className="text-center mb-10">
    <div className="inline-block px-4 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs tracking-widest mb-3">
      FORMAL MODEL
    </div>

    <h2 className="text-3xl font-semibold tracking-tight mb-3">
      Hexagram State Space
    </h2>

    <p className="text-neutral-400 text-sm max-w-xl mx-auto leading-relaxed">
      The I Ching is modeled as a discrete state space where each
      hexagram is a binary configuration of six lines. This induces a
      6-dimensional hypercube structure, where transformations
      correspond to minimal bit transitions.
    </p>

    <p className="text-extrabold text-xs font-mono mt-3">
      {/* <InlineMath math={"x \in \{0,1\}^6 \;\cdot\; Q_6 \;\cdot\; d(x,y)"} />
      <InlineMath math={"x \\in \\{0,1\\}^6 \\cdot Q_6 \\cdot d(x,y)"} />
      <InlineMath math={`x \\in \\{0,1\\}^6 \\cdot Q_6 \\cdot d(x,y)`} /> */}
      {/* <InlineMath math={`X = \\{0,1\\}^6 \\quad |X| = 2^6 = 64`} /> */}
      <InlineMath math={"X = \\{0,1\\}^6 \\quad \\lvert X \\rvert = 2^6 = 64"} />
      {/* <span><InlineMath math={"a \\quad b"} /></span> */}
      {/* <InlineMath math={`X = \\{0,1\\}^6 \\quad \\lvert X \\rvert = 2^6 = 64`} /> */}

    </p>
  </div>

  <div className="grid gap-5">
    {/* STATE SPACE */}
    <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-6">
      <div className="text-xs uppercase tracking-widest text-blue-400 mb-2">
        State Space & Metric
      </div>

      <p className="text-neutral-400 text-sm mb-4">
        Defines the universe of all possible configurations and the
        distance function governing transitions between them.
      </p>

      <div className="text-sm text-neutral-300 leading-relaxed space-y-2">
        <InlineMath math="X = \{0,1\}^6 \quad |X| = 2^6 = 64" />
        <InlineMath math="x = (x_1, \dots, x_6), \quad x_i \in \{0,1\}" />
        <InlineMath math="d(x,y) = \sum_{i} \lvert x_i - y_i \rvert" />
      </div>
    </div>
        <p>testing

          <InlineMath math="x \in \{0,1\}^6 \;\cdot\; Q_6 \;\cdot\; d(x,y)" />
          <InlineMath math="a^2 + b^2 = c^2" />
        </p>
    {/* GRAPH */}
    <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-6">
      <div className="text-xs uppercase tracking-widest text-emerald-400 mb-2">
        Graph Structure
      </div>

      <p className="text-neutral-400 text-sm mb-4">
        Encodes adjacency: two states are connected if they differ by
        exactly one bit. The resulting graph is a 6-dimensional
        hypercube.
      </p>

      <div className="text-sm text-neutral-300 leading-relaxed space-y-2">
        <InlineMath math="G = (V,E), \quad V = X" />
        <InlineMath math="(x,y) \in E \iff d(x,y) = 1" />
        <InlineMath math="\deg(x) = 6 \quad |E| = 192" />
        <InlineMath math="\mathrm{diam}(G) = 6" />
        <InlineMath math="G \cong Q_6" />
      </div>
    </div>

    {/* DYNAMICS */}
    <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-6">
      <div className="text-xs uppercase tracking-widest text-purple-400 mb-2">
        Dynamics
      </div>

      <p className="text-neutral-400 text-sm mb-4">
        Maps user interaction to graph operations: local neighborhoods,
        shortest paths, and multi-point connectivity structures.
      </p>

      <div className="text-sm text-neutral-300 leading-relaxed space-y-2">
        <InlineMath math="S \subseteq V" />
        <InlineMath math="|S| = 1 \Rightarrow N(x) = \{ y \mid d(x,y)=1 \}" />
        <InlineMath math="|S| = 2 \Rightarrow P(x,y)\ \text{via BFS}" />
        <InlineMath math="|S| \geq 3 \Rightarrow T \subseteq G\ (\text{Steiner tree})" />
      </div>
    </div>

    {/* PROJECTION */}
    <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-6">
      <div className="text-xs uppercase tracking-widest text-yellow-400 mb-2">
        Projection
      </div>

      <p className="text-neutral-400 text-sm mb-4">
        The high-dimensional structure is embedded into 2D for
        visualization. Spatial layout is not metric-preserving — only
        adjacency is preserved.
      </p>

      <div className="text-sm text-neutral-300 leading-relaxed space-y-2">
        <InlineMath math="\pi : Q_6 \to \mathbb{R}^2" />
        <InlineMath math="\text{topology preserved} \quad \cdot \quad \text{geometry distorted}" />
      </div>
    </div>
  </div>

  {/* FOOTER */}
  <div className="mt-10 text-center">
    <div className="inline-block px-4 py-2 rounded-full bg-neutral-900/60 border border-neutral-800 text-xs text-neutral-500 font-mono">
      <InlineMath math="Q_6 \rightarrow \text{circular embedding}" />
    </div>
  </div>
</div>
      );
    }
  }

  // ─────────────────────────────────────────────
  // TABS CONFIG
  // ─────────────────────────────────────────────
  const tabs: { id: Tab; label: string; badge?: number }[] = [
    { id: "overview", label: "Overview" },
    {
      id: "nodes",
      label: "Nodes",
      badge: selected.length > 0 ? selected.length : undefined,
    },
    { id: "path", label: "Path" },
    {
      id: "steiner",
      label: "Steiner Tree",
      badge: selected.length >= 3 ? steinerResult?.nodes.size : undefined,
    },
    { id: "matrix", label: "Matrix" },
    { id: "model", label: "Model" },
  ];

  // ─────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────
  return (
    <>
      {/* Main Top Header */}
      <div className="relative text-center max-w-4xl mx-auto py-0 rounded-xl">
        {/* BACKGROUND */}
        <div
          className="absolute inset-0 blur-3xl opacity-100 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 30% 40%, rgba(59,130,246,0.12), transparent 60%), radial-gradient(circle at 70% 60%, rgba(34,211,238,0.12), transparent 65%)",
            animation: "cloudMove 26s ease-in-out infinite",
          }}
        />

        {/* CONTENT */}
        <div className="relative text-center max-w-3xl mx-auto py-10">
          <p className="text-xs tracking-[0.3em] text-blue-400/70 uppercase mb-3">
            State Space
          </p>

          <h1 className="text-5xl font-semibold tracking-tight mb-5 leading-tight">
            The Transformation Graph
          </h1>

          <p className="text-neutral-400 leading-relaxed text-lg">
            A visualization of all 64 hexagrams as nodes within a
            six-dimensional binary space. Each connection represents a
            single-line transformation — the minimal change through which one
            state becomes another.
          </p>

          {/* Tags */}
          <div className="flex justify-center flex-wrap gap-2 mt-6">
            <span className="px-3 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400">
              Graph Theory
            </span>
            <span className="px-3 py-1 text-xs rounded-full bg-cyan-500/10 text-cyan-400">
              State Space
            </span>
            <span className="px-3 py-1 text-xs rounded-full bg-indigo-500/10 text-indigo-400">
              Hamming Distance
            </span>
            <span className="px-3 py-1 text-xs rounded-full bg-sky-500/10 text-sky-300">
              Binary System
            </span>
          </div>

          {/* QUOTE */}
          <div className="mt-10">
            <p className="text-lg text-neutral-200 italic font-medium max-w-3xl mx-auto leading-relaxed">
              “The same structure that governs thought governs the
              transformations of things.”
            </p>
            <p className="text-sm text-cyan-400 mt-3 tracking-wide">
              — Structuralist maxim
            </p>
          </div>

          {/* Divider */}
          <div className="mt-8 h-px bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />
        </div>
      </div>

      {/* Graph Start */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 48,
        }}
      >
        {/* Controls bar */}
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 20,
            alignItems: "center",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 12,
            padding: "6px 10px",
          }}
        >
          {/* Layout toggles */}
          {(["binary", "trigram"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLayout(l)}
              style={{
                padding: "5px 14px",
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 500,
                cursor: "pointer",
                border: "1px solid transparent",
                background:
                  layout === l
                    ? l === "binary"
                      ? "rgba(96,165,250,0.18)"
                      : "rgba(167,139,250,0.18)"
                    : "transparent",
                color:
                  layout === l
                    ? l === "binary"
                      ? "#60a5fa"
                      : "#a78bfa"
                    : "#64748b",
                borderColor:
                  layout === l
                    ? l === "binary"
                      ? "rgba(96,165,250,0.3)"
                      : "rgba(167,139,250,0.3)"
                    : "transparent",
                transition: "all 0.2s",
              }}
            >
              {l === "binary" ? "Binary Ring" : "Trigram Spiral"}
            </button>
          ))}

          <div
            style={{
              width: 1,
              height: 20,
              background: "rgba(255,255,255,0.08)",
            }}
          />

          {/* Spin toggle */}
          <button
            onClick={() => setSpinning((s) => !s)}
            style={{
              padding: "5px 12px",
              borderRadius: 8,
              fontSize: 12,
              cursor: "pointer",
              border: "1px solid rgba(255,255,255,0.08)",
              background: spinning ? "rgba(52,211,153,0.12)" : "transparent",
              color: spinning ? "#34d399" : "#64748b",
              transition: "all 0.2s",
            }}
          >
            {spinning ? "⟳ Spinning" : "⟳ Spin"}
          </button>

          {/* Clear */}
          {selected.length > 0 && (
            <>
              <div
                style={{
                  width: 1,
                  height: 20,
                  background: "rgba(255,255,255,0.08)",
                }}
              />
              <button
                onClick={() => setSelected([])}
                style={{
                  padding: "5px 12px",
                  borderRadius: 8,
                  fontSize: 12,
                  cursor: "pointer",
                  border: "1px solid rgba(247,71,116,0.25)",
                  background: "rgba(247,71,116,0.08)",
                  color: "#f472b6",
                  transition: "all 0.2s",
                }}
              >
                Clear ({selected.length}) · Esc
              </button>
            </>
          )}
        </div>

        {/* Graph + panel */}
        <div
          style={{
            position: "relative",
            width: SIZE,
            height: SIZE,
            cursor: "crosshair",
          }}
          onClick={() => {
            if (selected.length > 0) setSelected([]);
          }}
        >
          <svg
            width={SIZE}
            height={SIZE}
            onMouseLeave={() => {
              if (!hasSelected) setHovered(null);
            }}
            style={{ display: "block" }}
          >
            {/* Subtle grid rings */}
            {[0.35, 0.6, 0.85].map((f, i) => (
              <circle
                key={i}
                cx={CENTER}
                cy={CENTER}
                r={RADIUS * f}
                fill="none"
                stroke="rgba(255,255,255,0.025)"
                strokeWidth={1}
                strokeDasharray="3 6"
              />
            ))}

            {/* Rotating group */}
            <g
              style={{
                transformOrigin: `${CENTER}px ${CENTER}px`,
                transform: `rotate(${spinAngle}rad)`,
              }}
            >
              {/* Edges */}
              {renderEdges()}

              {/* Nodes — highlighted on top */}
              {hexagrams
                .map((_, i) => i)
                .sort((a, b) => {
                  const ha = highlightedSet.has(a) ? 1 : 0;
                  const hb = highlightedSet.has(b) ? 1 : 0;
                  return ha - hb;
                })
                .map((i) => {
                  const { x, y } = positions[i];
                  const isHighlit = highlightedSet.has(i);
                  const isSelected = selected.includes(i);
                  const color = COLORS[Math.floor(i / 8)];
                  const opacity = !isAnythingActive ? 0.8 : isHighlit ? 1 : 0.1;
                  const r = isSelected ? 9 : isHighlit ? 7 : 5;

                  return (
                    <g key={i} transform={`translate(${x},${y})`}>
                      {/* Outer glow */}
                      {isHighlit && (
                        <circle
                          r={16}
                          fill={color}
                          opacity={0.12}
                          style={{ pointerEvents: "none" }}
                        />
                      )}
                      {/* Pulse ring for selected */}
                      {isSelected && (
                        <circle
                          r={14}
                          fill="none"
                          stroke={color}
                          strokeWidth={1}
                          opacity={0.4}
                          style={{
                            pointerEvents: "none",
                            animation: "pulse-ring 2s ease-out infinite",
                          }}
                        />
                      )}
                      {/* Main dot */}
                      <circle
                        r={r}
                        fill={color}
                        opacity={opacity}
                        stroke={
                          isSelected ? "#ffffff" : isHighlit ? color : "none"
                        }
                        strokeWidth={isSelected ? 1.5 : 0}
                        style={{
                          cursor: "pointer",
                          transition: "r 0.12s ease, opacity 0.15s ease",
                        }}
                        onMouseEnter={() => {
                          if (!hasSelected) setHovered(i);
                        }}
                        onMouseLeave={() => {
                          if (!hasSelected) setHovered(null);
                        }}
                        onClick={(e) => handleNodeClick(i, e)}
                      />
                      {/* Group label on binary ring at trigram positions */}
                      {layout === "binary" &&
                        i % 8 === 0 &&
                        !isAnythingActive && (
                          <text
                            textAnchor="middle"
                            dominantBaseline="central"
                            fontSize={8}
                            fill={color}
                            opacity={0.4}
                            y={r + 12}
                            style={{
                              pointerEvents: "none",
                              userSelect: "none",
                            }}
                          >
                            {TRIGRAM_SHORT[Math.floor(i / 8)]}
                          </text>
                        )}
                    </g>
                  );
                })}
            </g>
          </svg>

          {/* Center panel */}
          {isAnythingActive && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
              }}
            >
              {renderPanel()}
            </div>
          )}
        </div>

        {/* Hint */}
        <p
          style={{
            color: "#1e293b",
            fontSize: 11,
            marginTop: 12,
            letterSpacing: "0.06em",
          }}
        >
          click to select · shift+click for multi-select & paths · esc to clear
        </p>

        {/* ───── TABS ───── */}
        <div
          style={{
            width: "100%",
            maxWidth: SIZE,
            marginTop: 24,
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          {/* Tab bar */}
          <div
            style={{
              display: "flex",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1,
                  padding: "10px 6px",
                  fontSize: 12,
                  fontWeight: 500,
                  cursor: "pointer",
                  border: "none",
                  background: "none",
                  color: activeTab === tab.id ? "#e2e8f0" : "#64748b",
                  borderBottom:
                    activeTab === tab.id
                      ? "2px solid #60a5fa"
                      : "2px solid transparent",
                  transition: "all 0.15s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 5,
                }}
              >
                {tab.label}
                {tab.badge !== undefined && (
                  <span
                    style={{
                      fontSize: 9,
                      fontFamily: "monospace",
                      background: "rgba(96,165,250,0.2)",
                      color: "#60a5fa",
                      borderRadius: 4,
                      padding: "1px 4px",
                      minWidth: 14,
                      textAlign: "center",
                    }}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div style={{ minHeight: 140 }}>{renderTabContent()}</div>
        </div>

        {/* Pulse ring keyframe (injected as style tag) */}
        <style>{`
        @keyframes pulse-ring {
          0% { r: 12; opacity: 0.5; }
          100% { r: 22; opacity: 0; }
        }
      `}</style>
      </div>
    </>
  );
}
