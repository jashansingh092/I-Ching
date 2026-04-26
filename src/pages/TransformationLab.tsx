import { useHexagramStore } from "../store/useHexagramStore";
import HexagramView from "../components/Hexagram/HexagramView";
import { getTransformedHexagram } from "../core/hexagram";
import { getHexagramNumber } from "../core/hexagram";
import { getHexagramInfo } from "../core/hexagram";
import { useState } from "react";
import { TRIGRAM_DATA } from "../core/trigramData";

import { HEXAGRAM_DATA } from "../core/hexagramData";

export default function TransformationLab() {
  const { lines, changing } = useHexagramStore();
  const transformed = getTransformedHexagram(lines, changing);

  const number = getHexagramNumber(lines);
  const transformedNumber = getHexagramNumber(transformed);

  const info = getHexagramInfo(lines);
  const transformedInfo = getHexagramInfo(transformed);

  // ================= CONCEPTUAL LAYER =================

  const count = changing.filter(Boolean).length;

  // Type of transformation
  const transformationType =
    count === 0
      ? "Static Equilibrium"
      : count === 1
        ? "Initiation"
        : count === 2
          ? "Emerging Tension"
          : count === 3
            ? "Critical Transition"
            : count === 4
              ? "Destabilization"
              : count === 5
                ? "Structural Overturning"
                : "Total Reversal";

  // Active lines (1–6)
  const activeLines = changing
    .map((c, i) => (c ? i + 1 : null))
    .filter(Boolean) as number[];

  // Structural zones
  const zones = {
    lower: activeLines.filter((l) => l <= 2),
    middle: activeLines.filter((l) => l === 3 || l === 4),
    upper: activeLines.filter((l) => l >= 5),
  };

  // Direction of change
  const direction =
    transformedNumber > number
      ? "Expansion"
      : transformedNumber < number
        ? "Contraction"
        : "Stasis";

  // States
  const [activeTab, setActiveTab] = useState<
    "Overview" | "Mechanics" | "Structure" | "Meaning" | "Guidance"
  >("Overview");

  return (
    <div>
      {/* ================= HEADER ================= */}
      {/* ================= HEADER ================= */}
      <div className="relative w-full mb-10 overflow-hidden">
        {/* 🌌 FULL-WIDTH BACKGROUND */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: `
        radial-gradient(circle at 20% 30%, rgba(59,130,246,0.15), transparent 60%),
        radial-gradient(circle at 80% 70%, rgba(139,92,246,0.15), transparent 60%)
      `,
            animation: "cloudMove 20s ease-in-out infinite",
          }}
        />

        {/* ✨ OPTIONAL: soft blur overlay for depth */}
        <div className="absolute inset-0 -z-10 blur-3xl opacity-50 pointer-events-none" />

        {/* 📦 CONTENT (centered, constrained) */}
        <div className="relative max-w-4xl mx-auto text-center py-10 px-6">
          <h1 className="text-5xl font-semibold tracking-tight mb-4 font-serif">
            Transformation Lab
          </h1>

          <p className="text-neutral-400 leading-relaxed text-lg">
            Observe how structure evolves through shifting lines. Change is not
            random — it unfolds through patterned transformation.
          </p>

          <div className="flex justify-center flex-wrap gap-2 mt-6">
            <span className="px-3 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400">
              Dynamic Systems
            </span>
            <span className="px-3 py-1 text-xs rounded-full bg-purple-500/10 text-purple-400">
              Line Mechanics
            </span>
            <span className="px-3 py-1 text-xs rounded-full bg-green-500/10 text-green-400">
              Yin–Yang Inversion
            </span>
            <span className="px-3 py-1 text-xs rounded-full bg-yellow-500/10 text-yellow-400">
              Emergent Change
            </span>
          </div>

          <div className="mt-8 max-w-xl mx-auto">
            <p className="text-sm italic text-bold-500">
              “The movement of the Tao consists in returning.”
            </p>
            <p className="text-xs text-bold mt-1s)">— Laozi</p>
          </div>

          <div className="mt-8 h-px bg-gradient-to-r from-transparent via-neutral-700 to-transparent " />
        </div>
      </div>

      {/* ================= Header End ================= */}

      {/* ================= TRANSFORMATION BRIDGE ================= */}
      <div className="grid grid-cols-3 gap-12 items-start mt-10">
        {/* ORIGINAL */}
        <div className="flex flex-col items-center gap-4 pt-12">
          <h3 className="text-xs uppercase tracking-widest text-neutral-500">
            Original
          </h3>

          <div className="transition-all duration-500 hover:scale-105">
            <HexagramView changing={changing} />
          </div>
        </div>

        {/* 🔥 CENTER (THE CORE EXPERIENCE) */}
        <div className="relative flex flex-col items-center justify-center gap-6 scale-110">
          {/* 🔥 ENERGY FIELD */}
          <div className="absolute -inset-10 bg-blue-500/10 blur-3xl opacity-40 animate-pulse pointer-events-none" />

          {/* 
    🔥 MAIN FLOW ARROW
    <div className="flex flex-col items-center">
      <div className="text-blue-400 text-4xl animate-bounce">↓</div>
      <div className="text-[10px] tracking-widest text-neutral-500 mt-1">
        TRANSFORMATION
      </div>
    </div> */}

          {/* Pulsating Dot */}
          <div className="flex flex-col items-center gap-2">
            {/* 🔥 Pulsing Dot */}
            <div className="relative flex items-center justify-center">
              {/* Outer pulse */}
              <span className="absolute h-4 w-4 rounded-full bg-blue-500/30 animate-ping" />

              {/* Core dot */}
              <span className="h-2.5 w-2.5 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.9)]" />
            </div>

            {/* Label */}
            <div className="text-[10px] tracking-widest text-neutral-500 uppercase">
              Transformation Active
            </div>

            {/* Optional dynamic message */}
            <div className="text-[11px] text-neutral-400 italic text-center max-w-[180px]">
              {(() => {
                const count = changing.filter(Boolean).length;

                if (count === 0) return "System stable — no active change.";
                if (count === 1) return "A single shift begins.";
                if (count === 2) return "Dual tension — change emerging.";
                if (count === 3) return "Balance disrupted.";
                if (count === 4) return "Instability rising.";
                return "System undergoing radical transformation.";
              })()}
            </div>
          </div>

          {/* 🔥 LINE-BY-LINE TRANSFORMATION */}
          <div className="flex flex-col gap-3">
            {lines.map((line, i) => {
              const isChanging = changing[i];
              const transformedLine = isChanging ? (line === 1 ? 0 : 1) : line;

              return (
                <div
                  key={i}
                  className="flex items-center gap-4 transition-all duration-500"
                >
                  {/* ORIGINAL */}
                  <div className="opacity-50">
                    {line === 1 ? (
                      <div className="h-2 w-20 bg-white rounded" />
                    ) : (
                      <div className="flex gap-1">
                        <div className="h-2 w-9 bg-white rounded" />
                        <div className="h-2 w-9 bg-white rounded" />
                      </div>
                    )}
                  </div>

                  {/* FLOW ARROW */}
                  <div
                    className={`
                text-xs transition-all duration-300
                ${isChanging ? "text-blue-400 scale-125" : "text-neutral-600"}
              `}
                  >
                    →
                  </div>

                  {/* TRANSFORMED */}
                  <div
                    className={`
                transition-all duration-500
                ${isChanging ? "scale-110 animate-pulse" : "opacity-50"}
              `}
                  >
                    {transformedLine === 1 ? (
                      <div
                        className={`
                    h-2 w-20 rounded transition-all duration-500
                    ${
                      isChanging
                        ? "bg-blue-400 shadow-[0_0_14px_rgba(96,165,250,0.9)]"
                        : "bg-white"
                    }
                  `}
                      />
                    ) : (
                      <div className="flex gap-1">
                        <div
                          className={`
                      h-2 w-9 rounded transition-all duration-500
                      ${isChanging ? "bg-blue-400" : "bg-white"}
                    `}
                        />
                        <div
                          className={`
                      h-2 w-9 rounded transition-all duration-500
                      ${isChanging ? "bg-blue-400" : "bg-white"}
                    `}
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ================= INTERPRETATION ================= */}
          <div className="flex flex-col items-center text-center mt-4 gap-2 max-w-xs">
            {/* TYPE */}
            <p className="text-sm text-blue-400 tracking-wide">
              {transformationType}
            </p>

            {/* ACTIVE LINES */}
            <p className="text-xs text-neutral-400">
              Active lines:{" "}
              {activeLines.length > 0 ? activeLines.join(", ") : "None"}
            </p>

            {/* STRUCTURE */}
            <p className="text-xs text-neutral-500 italic leading-relaxed">
              {zones.lower.length > 0 && "Change begins at the foundation. "}
              {zones.middle.length > 0 && "Interaction layer is unstable. "}
              {zones.upper.length > 0 && "Outcome layer is shifting."}
            </p>

            {/* DIRECTION */}
            <p className="text-xs text-neutral-400">Direction: {direction}</p>

            {/* SYNTHESIS */}
            <p className="text-sm text-neutral-300 leading-relaxed mt-2">
              Transition from{" "}
              <span className="text-white">
                {info.upperName} over {info.lowerName}
              </span>{" "}
              toward{" "}
              <span className="text-blue-400">
                {transformedInfo.upperName} over {transformedInfo.lowerName}
              </span>
              .
            </p>
          </div>

          {/* 🔥 INTENSITY / MEANING */}
          {(() => {
            const count = changing.filter(Boolean).length;

            return (
              <div className="text-center mt-2">
                <div className="text-xs text-neutral-400">
                  {count} changing line{count !== 1 && "s"}
                </div>

                <p className="text-[11px] text-neutral-500 italic mt-1 max-w-[200px]">
                  {count === 0 && "Structure is stable — no transformation."}
                  {count === 1 && "A single shift — subtle movement begins."}
                  {count === 2 && "Dual tension — change is emerging."}
                  {count === 3 && "Balance disrupted — transformation unfolds."}
                  {count === 4 && "Instability rises — strong evolution."}
                  {count >= 5 && "Radical shift — structure overturns."}
                </p>
              </div>
            );
          })()}
        </div>

        {/* TRANSFORMED */}
        <div className="flex flex-col items-center gap-4 pt-12">
          <h3 className="text-xs uppercase tracking-widest text-blue-400">
            Transformed
          </h3>

          <div className="transition-all duration-500 hover:scale-105">
            <HexagramView lines={transformed} />
          </div>
        </div>
      </div>

      <div className="mt-16 flex flex-wrap gap-2 animate-[fadeIn_0.4s_ease]">
        {["Overview", "Mechanics", "Structure", "Meaning", "Guidance"].map(
          (tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`
        px-4 py-2 rounded-lg text-sm transition-all
        ${
          activeTab === tab
            ? "bg-blue-500/20 text-blue-400 border border-blue-500/40"
            : "bg-neutral-900/40 text-neutral-400 border border-neutral-800 hover:text-white"
        }
      `}
            >
              {tab}
            </button>
          ),
        )}
      </div>
      {activeTab === "Overview" && (
        // <div className="mt-6 space-y-3 text-neutral-300 max-w-xl hover:scale-[1.02] transition-all duration-300">
        <div className="mt-6 space-y-3 text-neutral-300 max-w-xl">
          <p className="text-blue-400">{transformationType}</p>

          <p>
            This hexagram represents a transition from{" "}
            <span className="text-white">
              {info.upperName} over {info.lowerName}
            </span>{" "}
            toward{" "}
            <span className="text-blue-400">
              {transformedInfo.upperName} over {transformedInfo.lowerName}
            </span>
            .
          </p>

          <p className="text-neutral-500 text-sm">
            {changing.filter(Boolean).length === 0
              ? "No active lines — the system is stable."
              : `${changing.filter(Boolean).length} active lines drive transformation.`}
          </p>
        </div>
      )}

      {/* Mechanics */}
      {activeTab === "Mechanics" && (
        <div className="mt-10 flex flex-col items-center gap-10 animate-[fadeIn_0.4s_ease]">
          {/* ================= STATE ================= */}
          <div className="flex flex-col items-center gap-2">
            <div
              className={`
          w-3 h-3 rounded-full
          ${
            changing.some(Boolean)
              ? "bg-blue-400 animate-pulse shadow-[0_0_12px_rgba(96,165,250,0.9)]"
              : "bg-neutral-600"
          }
        `}
            />

            <p className="text-xs tracking-widest text-neutral-500">
              {changing.some(Boolean)
                ? "TRANSFORMATION ACTIVE"
                : "STATIC EQUILIBRIUM"}
            </p>

            <p className="text-xs text-neutral-400 italic">
              {changing.some(Boolean)
                ? "Instability introduces change."
                : "No opposing forces — system remains still."}
            </p>
          </div>

          {/* ================= CORE VISUAL ================= */}
          <div className="grid grid-cols-3 gap-16 items-center w-full max-w-4xl">
            {/* ORIGINAL */}
            <div className="flex flex-col items-center gap-3">
              <p className="text-xs text-neutral-500 uppercase">Original</p>
              <HexagramView changing={changing} />
            </div>

            {/* 🔥 TRANSFORMATION FLOW */}
            <div className="flex flex-col gap-3 items-center">
              {lines.map((line, i) => {
                const isChanging = changing[i];
                const transformedLine = isChanging
                  ? line === 1
                    ? 0
                    : 1
                  : line;

                return (
                  <div key={i} className="flex items-center gap-4">
                    {/* ORIGINAL */}
                    <div className="opacity-50">
                      {line === 1 ? (
                        <div className="h-2 w-20 bg-white rounded" />
                      ) : (
                        <div className="flex gap-1">
                          <div className="h-2 w-9 bg-white rounded" />
                          <div className="h-2 w-9 bg-white rounded" />
                        </div>
                      )}
                    </div>

                    {/* FLOW */}
                    <div
                      className={`
                  text-xs transition-all
                  ${isChanging ? "text-blue-400 scale-125" : "text-neutral-600"}
                `}
                    >
                      →
                    </div>

                    {/* TRANSFORMED */}
                    <div
                      className={`
                  transition-all duration-500
                  ${isChanging ? "scale-110" : "opacity-50"}
                `}
                    >
                      {transformedLine === 1 ? (
                        <div
                          className={`
                      h-2 w-20 rounded
                      ${
                        isChanging
                          ? "bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.9)]"
                          : "bg-white"
                      }
                    `}
                        />
                      ) : (
                        <div className="flex gap-1">
                          <div
                            className={`h-2 w-9 rounded ${
                              isChanging ? "bg-blue-400" : "bg-white"
                            }`}
                          />
                          <div
                            className={`h-2 w-9 rounded ${
                              isChanging ? "bg-blue-400" : "bg-white"
                            }`}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* TRANSFORMED */}
            <div className="flex flex-col items-center gap-3">
              <p className="text-xs text-blue-400 uppercase">Transformed</p>
              <HexagramView lines={transformed} />
            </div>
          </div>

          {/* ================= INTERPRETATION ================= */}
          <div className="text-center max-w-md">
            <div className="text-center max-w-lg space-y-3">
              {/* TYPE */}
              <p className="text-blue-400 text-sm font-medium">
                {changing.filter(Boolean).length === 0
                  ? "Equilibrium State"
                  : changing.filter(Boolean).length === 1
                    ? "Initiation Point"
                    : changing.filter(Boolean).length <= 3
                      ? "Localized Transformation"
                      : "Systemic Overturn"}
              </p>

              {/* DEPTH EXPLANATION */}
              <p className="text-neutral-400 text-sm leading-relaxed">
                {changing.filter(Boolean).length === 0 &&
                  "All lines remain stable. The system preserves its structure — no internal contradiction forces change."}

                {changing.filter(Boolean).length === 1 &&
                  "A single line shifts — this is a point disturbance. Change begins locally, not structurally."}

                {changing.filter(Boolean).length > 1 &&
                  changing.filter(Boolean).length <= 3 &&
                  "Multiple lines shift — the structure is under tension. Change propagates through internal imbalance."}

                {changing.filter(Boolean).length > 3 &&
                  "The majority of lines shift — the system is no longer stable. This is a full transformation of state."}
              </p>

              {/* DIRECTION */}
              <p className="text-xs text-neutral-500 italic">
                {changing.filter(Boolean).length === 0
                  ? "Direction: Static"
                  : "Direction: Transition from stability → reconfiguration"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Structure */}
      {activeTab === "Structure" && (
        <div className="mt-6 grid grid-cols-2 gap-6 max-w-2xl">
          <div className="p-4 bg-neutral-900/40 rounded-lg border border-neutral-800">
            <p className="text-xs text-neutral-500">Upper</p>
            <p className="text-lg text-white">{info.upperName}</p>
            <p className="text-sm text-neutral-400 mt-2">
              {TRIGRAM_DATA[info.upperName]?.meaning}
            </p>
          </div>

          <div className="p-4 bg-neutral-900/40 rounded-lg border border-neutral-800">
            <p className="text-xs text-neutral-500">Lower</p>
            <p className="text-lg text-white">{info.lowerName}</p>
            <p className="text-sm text-neutral-400 mt-2">
              {TRIGRAM_DATA[info.lowerName]?.meaning}
            </p>
          </div>
        </div>
      )}

      {/* Structure end */}

      {/* Meaning */}
      {activeTab === "Meaning" && (
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {/* ORIGINAL */}
          <div className="p-6 rounded-xl bg-neutral-900/40 border border-neutral-800 backdrop-blur relative overflow-hidden">
            {/* glow */}
            <div className="absolute -inset-10 bg-blue-500/10 blur-3xl opacity-30 pointer-events-none" />

            <p className="text-xs uppercase text-neutral-500 mb-2">Original</p>
            <h3 className="text-xl font-semibold text-white mb-2">
              {HEXAGRAM_DATA[number]?.name}
            </h3>

            <p className="text-neutral-300 leading-relaxed">
              {HEXAGRAM_DATA[number]?.meaning ??
                HEXAGRAM_DATA[number]?.judgment}
            </p>
          </div>

          {/* TRANSFORMED */}
          <div className="p-6 rounded-xl bg-neutral-900/40 border border-blue-500/30 backdrop-blur relative overflow-hidden">
            <div className="absolute -inset-10 bg-blue-500/20 blur-3xl opacity-30 pointer-events-none" />

            <p className="text-xs uppercase text-blue-400 mb-2">Transformed</p>
            <h3 className="text-xl font-semibold text-blue-400 mb-2">
              {HEXAGRAM_DATA[transformedNumber]?.name}
            </h3>

            <p className="text-neutral-300 leading-relaxed">
              {HEXAGRAM_DATA[transformedNumber]?.meaning ??
                HEXAGRAM_DATA[transformedNumber]?.judgment}
            </p>
          </div>
        </div>
      )}

      {/* Transition Card */}
      <div className="mt-6 p-6 rounded-xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20">
        <p className="text-xs uppercase text-neutral-400 mb-2">
          Transformation Insight
        </p>

        <p className="text-neutral-300 leading-relaxed">
          Movement from{" "}
          <span className="text-white font-medium">
            {info.upperName} over {info.lowerName}
          </span>{" "}
          toward{" "}
          <span className="text-blue-400 font-medium">
            {transformedInfo.upperName} over {transformedInfo.lowerName}
          </span>{" "}
          indicates a shift in structural balance.
        </p>
      </div>

      {/* Meaning End */}

      {/* Guidance */}
      {activeTab === "Guidance" && (
        <div className="mt-6 max-w-xl text-neutral-300 leading-relaxed">
          <p>
            Act in accordance with the direction of change. Avoid forcing
            outcomes; instead, align with the emerging structure.
          </p>

          <p className="text-neutral-500 text-sm mt-3">
            Interpretation depends on timing and context — this is a structural
            signal, not a fixed prediction.
          </p>
        </div>
      )}

      {/* Guidance End */}
    </div> /* main div end */
  );
}
