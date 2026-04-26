import { useHexagramStore } from "../store/useHexagramStore";
import {
  getHexagramInfo,
  getHexagramNumber,
  getTransformedHexagram,
} from "../core/hexagram";

import HexagramView from "../components/Hexagram/HexagramView";
import { TRIGRAM_DATA } from "../core/trigramData";

import { HEXAGRAM_DATA } from "../core/hexagramData";

import { useState } from "react";

export default function Hexagrams() {
  const { lines, changing, randomize } = useHexagramStore();

  // original
  const info = getHexagramInfo(lines);
  const number = getHexagramNumber(lines);

  // transformed
  const transformed = getTransformedHexagram(lines, changing);
  const transformedInfo = getHexagramInfo(transformed);
  const transformedNumber = getHexagramNumber(transformed);

  // trigram meaning
  const upper = TRIGRAM_DATA[info.upperName as keyof typeof TRIGRAM_DATA];
  const lower = TRIGRAM_DATA[info.lowerName as keyof typeof TRIGRAM_DATA];

  // Hexagram meaning
  const hexData = HEXAGRAM_DATA[number];
  const transformedData = HEXAGRAM_DATA[transformedNumber];

  const hasChange = changing.some(Boolean);

  // Tabs
  const TABS = ["Summary", "Structure", "Hexagram", "Lines", "Guide"] as const;
  type Tab = (typeof TABS)[number];
  const [activeTab, setActiveTab] = useState<Tab>("Summary");

  return (
    <div className="space-y-0 pb-0 flex-1">
      {/* ================= HEADER ================= */}
      {/* ================= HEADER ================= */}
      <div className="relative text-center max-w-3xl mx-auto py-0 rounded-xl">
        {/* BACKGROUND */}
        <div
          className="absolute inset-0 blur-3xl opacity-100 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 30% 40%, rgba(64, 125, 224, 0.12), transparent 60%), radial-gradient(circle at 70% 60%, rgba(99,102,241,0.12), transparent 60%)",
            animation: "cloudMove 22s ease-in-out infinite",
          }}
        />

        {/* CONTENT */}
        <div className="relative text-center max-w-3xl mx-auto py-10">
          <h1 className="text-5xl font-semibold tracking-tight mb-4">
            Hexagram Builder
          </h1>

          <p className="text-neutral-400 leading-relaxed text-lg">
            A symbolic system for exploring transformation through the
            interaction of Yin and Yang. Construct hexagrams, observe their
            evolution, and interpret the patterns of change.
          </p>

          <div className="flex justify-center flex-wrap gap-2 mt-6">
            <span className="px-3 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400">
              Binary Structure
            </span>
            <span className="px-3 py-1 text-xs rounded-full bg-purple-500/10 text-purple-400">
              Transformation
            </span>
            <span className="px-3 py-1 text-xs rounded-full bg-green-500/10 text-green-400">
              Symbolic Logic
            </span>
            <span className="px-3 py-1 text-xs rounded-full bg-yellow-500/10 text-yellow-400">
              I Ching
            </span>
          </div>

          <div className="mt-8 h-px bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />
        </div>
      </div>

      {/* HEXAGRAM GRID */}
      <div className="grid grid-cols-2 gap-10">
        {/* ORIGINAL */}
        <div className="relative group bg-neutral-900/40 border border-neutral-800 rounded-xl p-6 backdrop-blur transition hover:scale-[1.01]">
          {/* glow */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition 
                    bg-blue-500/5 blur-2xl rounded-xl pointer-events-none"
          />

          <h2 className="text-xs uppercase tracking-widest text-neutral-400 mb-4">
            Original
          </h2>

          <HexagramView changing={changing} />

          <div className="mt-6 space-y-2">
            <div>
              <p className="text-neutral-500 text-xs">Upper</p>
              <p className="text-lg">{info.upperName}</p>
            </div>

            <div>
              <p className="text-neutral-500 text-xs">Lower</p>
              <p className="text-lg">{info.lowerName}</p>
            </div>

            <p className="text-2xl font-semibold mt-4">#{number}</p>
          </div>
        </div>

        {/* TRANSFORMED */}
        <div className="relative group bg-neutral-900/40 border border-blue-500/20 rounded-xl p-6 backdrop-blur transition hover:scale-[1.01]">
          {/* glow */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition 
                    bg-blue-500/10 blur-2xl rounded-xl pointer-events-none"
          />

          <h2 className="text-xs uppercase tracking-widest text-blue-400 mb-4">
            Transformed
          </h2>

          <HexagramView lines={transformed} />

          <div className="mt-6 space-y-2">
            <div>
              <p className="text-neutral-500 text-xs">Upper</p>
              <p className="text-lg">{transformedInfo.upperName}</p>
            </div>

            <div>
              <p className="text-neutral-500 text-xs">Lower</p>
              <p className="text-lg">{transformedInfo.lowerName}</p>
            </div>

            <p className="text-2xl font-semibold mt-4 text-blue-400">
              #{transformedNumber}
            </p>
          </div>
        </div>
      </div>

      {/* ACTION BAR */}
      <div className="flex justify-center mb-12 mt-12">
        <button
          onClick={randomize}
          className="group px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 
               hover:from-blue-600 hover:to-indigo-700 transition text-white font-medium 
               shadow-lg shadow-blue-500/20 relative overflow-hidden"
        >
          <span className="relative z-10">Cast the Oracle</span>

          {/* subtle glow pulse */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition 
                    bg-blue-400/20 blur-xl"
          />
        </button>
      </div>

      {/* INTERPRETATION */}
      {/* TAB SELECTOR */}
      <div className="flex gap-2 border-b border-neutral-800 pb-2">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
        px-4 py-2 rounded-lg text-sm transition
        ${
          activeTab === tab
            ? "bg-neutral-800 text-white shadow-inner"
            : "text-neutral-400 hover:text-white hover:bg-neutral-900"
        }
      `}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      <div className="mt-8 bg-neutral-900/40 border border-neutral-800 rounded-xl p-8 min-h-[220px]">
        {/* ================= SUMMARY ================= */}
        {activeTab === "Summary" && (
          <div className="space-y-6">
            {/* MAIN CARD */}
            <div className="bg-neutral-900/40 border border-neutral-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Summary</h3>

              {/* Core Identity */}
              <div className="flex items-center gap-3 mb-4">
                <div className="px-3 py-1 rounded-lg bg-blue-500/10 text-blue-400 text-sm font-medium">
                  #{number}
                </div>
                <p className="text-lg text-white">
                  {info.upperName} over {info.lowerName}
                </p>
              </div>

              {/* Description */}
              <p className="text-neutral-300 leading-relaxed">
                This configuration expresses the interaction between{" "}
                <span className="text-white">{info.upperName}</span> (upper) and{" "}
                <span className="text-white">{info.lowerName}</span> (lower).
              </p>

              {/* Transformation */}
              <div className="mt-5 p-4 rounded-lg border border-blue-500/20 bg-blue-500/5">
                {changing.some(Boolean) ? (
                  <>
                    <p className="text-blue-400 font-medium">
                      Transformation Active
                    </p>

                    <p className="text-blue-300 mt-1 text-sm leading-relaxed">
                      {changing.filter(Boolean).length} changing line(s) shift
                      this state toward{" "}
                      <span className="font-medium text-white">
                        Hexagram #{transformedNumber}
                      </span>
                      .
                    </p>

                    {/* changing lines */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {changing.map((v, i) =>
                        v ? (
                          <span
                            key={i}
                            className="px-2 py-1 text-xs rounded-md bg-blue-500/20 text-blue-300"
                          >
                            Line {i + 1}
                          </span>
                        ) : null,
                      )}
                    </div>
                  </>
                ) : (
                  <p className="text-neutral-500 text-sm">
                    No changing lines — stable configuration.
                  </p>
                )}
              </div>

              {/* Meaning */}
              {HEXAGRAM_DATA[number]?.judgment && (
                <div className="mt-6">
                  <p className="text-sm text-neutral-500 mb-1">Meaning</p>
                  <p className="text-neutral-300 leading-relaxed">
                    {HEXAGRAM_DATA[number].judgment}
                  </p>
                </div>
              )}
            </div>

            {/* TRANSFORMED CARD */}
            {changing.some(Boolean) && (
              <div className="bg-neutral-900/40 border border-purple-500/20 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="px-3 py-1 rounded-lg bg-purple-500/10 text-purple-400 text-sm font-medium">
                    → #{transformedNumber}
                  </div>
                  <p className="text-lg text-white">
                    {transformedInfo.upperName} over {transformedInfo.lowerName}
                  </p>
                </div>

                <p className="text-neutral-300 text-sm leading-relaxed">
                  {HEXAGRAM_DATA[transformedNumber]?.judgment}
                </p>
              </div>
            )}
          </div>
        )}
        {/* ================= STRUCTURE ================= */}
        {activeTab === "Structure" && (
          <div className="space-y-6">
            <div className="bg-neutral-900/40 border border-neutral-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">
                Structural Composition
              </h3>

              <p className="text-neutral-400 leading-relaxed mb-6">
                A hexagram is not a symbol, but a system of interaction — the
                upper trigram represents the external condition, while the lower
                trigram represents the internal state.
              </p>

              <div className="grid grid-cols-2 gap-6">
                {/* Upper */}
                <div className="p-5 rounded-xl bg-blue-500/5 border border-blue-500/20">
                  <p className="text-xs text-blue-400 mb-2 uppercase tracking-widest">
                    Upper (Outer World)
                  </p>

                  <h4 className="text-lg text-white mb-2">{info.upperName}</h4>

                  <p className="text-neutral-300 text-sm leading-relaxed">
                    {
                      TRIGRAM_DATA[info.upperName as keyof typeof TRIGRAM_DATA]
                        ?.meaning
                    }
                  </p>

                  <p className="text-xs text-blue-300 mt-3">
                    {
                      TRIGRAM_DATA[info.upperName as keyof typeof TRIGRAM_DATA]
                        ?.element
                    }{" "}
                    •{" "}
                    {
                      TRIGRAM_DATA[info.upperName as keyof typeof TRIGRAM_DATA]
                        ?.nature
                    }
                  </p>
                </div>

                {/* Lower */}
                <div className="p-5 rounded-xl bg-purple-500/5 border border-purple-500/20">
                  <p className="text-xs text-purple-400 mb-2 uppercase tracking-widest">
                    Lower (Inner State)
                  </p>

                  <h4 className="text-lg text-white mb-2">{info.lowerName}</h4>

                  <p className="text-neutral-300 text-sm leading-relaxed">
                    {
                      TRIGRAM_DATA[info.upperName as keyof typeof TRIGRAM_DATA]
                        ?.meaning
                    }
                  </p>

                  <p className="text-xs text-purple-300 mt-3">
                    {
                      TRIGRAM_DATA[info.upperName as keyof typeof TRIGRAM_DATA]
                        ?.element
                    }{" "}
                    •{" "}
                    {
                      TRIGRAM_DATA[info.upperName as keyof typeof TRIGRAM_DATA]
                        ?.nature
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= HEXAGRAM ================= */}
        {activeTab === "Hexagram" && (
          <div className="space-y-6">
            <div className="bg-neutral-900/40 border border-neutral-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Hexagram #{number}</h3>

              <p className="text-neutral-400 leading-relaxed mb-4">
                A hexagram expresses a moment in the cycle of transformation —
                not a static truth, but a dynamic state between forces.
              </p>

              <p className="text-lg text-white mb-4">
                {HEXAGRAM_DATA[number]?.name}
              </p>

              <p className="text-neutral-300 leading-relaxed">
                {HEXAGRAM_DATA[number]?.judgment}
              </p>

              <div className="mt-6 p-4 rounded-lg bg-neutral-800/40 border border-neutral-700">
                <p className="text-sm text-neutral-400">Interpretation</p>

                <p className="text-neutral-300 mt-2 leading-relaxed">
                  This hexagram represents a state where opposing or
                  complementary forces are interacting in a way that defines the
                  present condition. Its meaning is not fixed, but depends on
                  how it transforms.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ================= LINES ================= */}
        {activeTab === "Lines" && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Lines</h3>

            <div className="space-y-3">
              {[0, 1, 2, 3, 4, 5].map((i) => {
                const isChanging = changing[i];
                const lineText =
                  HEXAGRAM_DATA[number]?.lines?.[i] ?? "No data available.";

                return (
                  <div
                    key={i}
                    className={`
              p-3 rounded-lg border text-sm transition
              ${
                isChanging && "shadow-[0_0_12px_rgba(96,165,250,0.5)]"
                  ? "bg-blue-500/10 border-blue-500/30 text-blue-300"
                  : "bg-neutral-900/40 border-neutral-800 text-neutral-400 opacity-70"
              }
            `}
                  >
                    <span className="font-medium">Line {i + 1}:</span>{" "}
                    {lineText}
                  </div>
                );
              })}
            </div>

            {/* subtle state note */}
            {!changing.some(Boolean) && (
              <p className="text-neutral-500 text-sm mt-4">
                No changing lines — this hexagram is stable.
              </p>
            )}
          </div>
        )}

        {/* ================= GUIDE ================= */}
        {activeTab === "Guide" && (
          <div className="space-y-6">
            <div className="bg-neutral-900/40 border border-neutral-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">
                How to Read This System
              </h3>

              <div className="space-y-4 text-neutral-300 leading-relaxed">
                <p>
                  The I Ching does not give answers — it reveals structure. What
                  you are seeing is not prediction, but pattern.
                </p>

                <p>
                  The lower trigram describes your internal state — intention,
                  perception, or foundation. The upper trigram describes the
                  external situation — environment, pressure, or context.
                </p>

                <p>
                  Changing lines are moments of instability. They indicate where
                  the current structure cannot sustain itself and must evolve.
                </p>

                <p className="text-blue-400">
                  Interpretation is not about certainty — it is about alignment
                  with the direction of change.
                </p>
              </div>
            </div>

            <div className="bg-neutral-900/40 border border-neutral-800 rounded-xl p-6">
              <h4 className="text-lg font-medium mb-3">Interaction</h4>

              <ul className="text-neutral-400 text-sm space-y-2">
                <li>• Click a line → toggle Yin / Yang</li>
                <li>• Shift + Click → mark as changing</li>
                <li>• Randomize → generate a new state</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
