// import { useState } from "react";
// import { useEffect } from "react";
// import { generateHexagrams } from "../core/generateHexgrams";

// // --- DATA (compute ONCE)
// const hexagrams = generateHexagrams();
// // const total = hexagrams.length;

// // --- POSITIONING
// // function getCirclePosition(index: number, total: number, radius: number) {
// //   const angle = (index / total) * Math.PI * 2;

// //   return {
// //     x: 300 + Math.cos(angle) * radius,
// //     y: 300 + Math.sin(angle) * radius,
// //   };
// // }

// // --- PRECOMPUTE POSITIONS
// // const positions = hexagrams.map((_, i) => getCirclePosition(i, total, 220));

// // --- HAMMING
// function hammingDistance(a: number[], b: number[]) {
//   return a.reduce((acc, val, i) => acc + (val !== b[i] ? 1 : 0), 0);
// }

// export default function GraphView() {
//   const [hovered, setHovered] = useState<number | null>(null);
//   const [selected, setSelected] = useState<number | null>(null);
//   const [rotation, setRotation] = useState(0);
//   const [disableHover, setDisableHover] = useState(false);

//   const SIZE = 700;
//   const CENTER = SIZE / 2;

//   const RADIUS = 260;

//   function getBinaryPosition(i: number) {
//     // const angle = (i / 64) * Math.PI * 2;
//     const angle = (i / 64) * Math.PI * 2 - Math.PI / 2;

//     return {
//       x: CENTER + Math.cos(angle) * RADIUS,
//       y: CENTER + Math.sin(angle) * RADIUS,
//       angle, // store it
//     };
//   }

//   // const positions = hexagrams.map((_, i) => getBinaryPosition(i));
//   const positions = hexagrams.map((_, i) => getBinaryPosition(i));

//   // SINGLE SOURCE OF TRUTH
//   // const active = selected !== null ? selected : hovered;
//   const active = selected ?? hovered;

//   function isConnected(i: number, j: number) {
//     if (active === null) return false;

//     return (
//       (i === active || j === active) &&
//       hammingDistance(hexagrams[i], hexagrams[j]) === 1
//     );
//   }

//   const colors = [
//     "#60a5fa",
//     "#a78bfa",
//     "#34d399",
//     "#fbbf24",
//     "#f87171",
//     "#22d3ee",
//     "#c084fc",
//     "#f472b6",
//   ];

//   const [layout, setLayout] = useState<"binary" | "trigram">("binary");

//   // theta = (i * 2pi) / 64
//   // const angle = (i / 64) * Math.PI * 2;
//   // convert polar → cartesian:
//   // x = cx + rcos(theta)
//   // y = cy + rsin(theta)

//   //   [0, 1, 0, 0, 1, 1] - 6-bit binary vector.
//   // dataset is 64 hexagrams, each represented as a 6-bit binary vector (1 for solid line, 0 for broken line). Visualizing a 6-dimensional binary space.

//   // function getPosition(i: number) {
//   //   const angle = (i / 64) * Math.PI * 2;

//   //   if (layout === "binary") {
//   //     const radius = 260;

//   //     return {
//   //       x: CENTER + Math.cos(angle) * radius,
//   //       y: CENTER + Math.sin(angle) * radius,
//   //     };
//   //   }

//   //   // TRIGRAM MODE
//   //   const upper = Math.floor(i / 8);
//   //   const lower = i % 8;

//   //   const trigramAngle = (upper / 8) * Math.PI * 2;
//   //   const radius = 200 + lower * 14;

//   //   return {
//   //     x: CENTER + Math.cos(trigramAngle) * radius,
//   //     y: CENTER + Math.sin(trigramAngle) * radius,
//   //   };
//   // }

//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === "Escape") {
//         setSelected(null);
//         setHovered(null);

//         setDisableHover(true);

//         setTimeout(() => {
//           setDisableHover(false);
//         }, 100); // small delay
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);

//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, []);

//   return (
//     <div>
//       {/* ================= HEADER ================= */}

//       <div className="relative w-full  py-0">
//         {/* py-16 */}
//         {/* 🔥 FULL-WIDTH BACKGROUND */}
//         <div
//           className="absolute w-full inset-0 blur-3xl opacity-60 pointer-events-none"
//           style={{
//             background: `
//         radial-gradient(circle at 20% 40%, rgba(59,130,246,0.15), transparent 60%),
//         radial-gradient(circle at 80% 60%, rgba(99,102,241,0.15), transparent 60%)
//       `,
//             animation: "cloudMove 18s ease-in-out infinite",
//           }}
//         />
//         {/* CONTENT (THIS is what stays centered) */}
//         <div className="relative max-w-5xl mx-auto text-center px-6 pt-10">
//           <h1 className="text-5xl font-semibold tracking-tight mb-4">
//             Hexagram Network
//           </h1>

//           <p className="text-neutral-400 text-lg leading-relaxed">
//             Each hexagram exists not in isolation, but in relation to all
//             others. Transformation reveals a hidden topology — a network of
//             structured change, where every state is connected through potential
//             evolution.
//           </p>

//           {/* Tags */}
//           <div className="flex justify-center flex-wrap gap-2 mt-6">
//             <span className="px-3 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400">
//               Network Topology
//             </span>
//             <span className="px-3 py-1 text-xs rounded-full bg-purple-500/10 text-purple-400">
//               Transformation Paths
//             </span>
//             <span className="px-3 py-1 text-xs rounded-full bg-green-500/10 text-green-400">
//               Relational Logic
//             </span>
//             <span className="px-3 py-1 text-xs rounded-full bg-yellow-500/10 text-yellow-400">
//               I Ching
//             </span>
//           </div>

//           {/* Quote */}
//           <div className="mt-5">
//             <p className="text-lg text-neutral-200 italic font-medium max-w-3xl mx-auto">
//               “Fate leads the willing and drags the unwilling; all things unfold
//               according to an unbroken chain of causes.”
//             </p>
//             <p className="text-sm text-blue-400 mt-3 tracking-wide">— Seneca</p>
//           </div>
//         </div>
//         <div className="mt-8 h-px bg-gradient-to-r from-transparent via-neutral-700 to-transparent " />
//       </div>

//       {/* ================= GRAPH ================= */}
//       <div className="relative flex flex-col items-center mt-12">
//         {/* 🔄 LAYOUT TOGGLE */}
//         <div className="flex gap-3 mb-6">
//           <button
//             onClick={() => setLayout("binary")}
//             className={`px-4 py-1 rounded ${
//               layout === "binary"
//                 ? "bg-blue-500 text-white"
//                 : "bg-neutral-800 text-neutral-400"
//             }`}
//           >
//             Binary
//           </button>

//           <button
//             onClick={() => setLayout("trigram")}
//             className={`px-4 py-1 rounded ${
//               layout === "trigram"
//                 ? "bg-purple-500 text-white"
//                 : "bg-neutral-800 text-neutral-400"
//             }`}
//           >
//             Trigram
//           </button>
//         </div>

//         <div className="relative">
//           <svg
//             width={700}
//             height={700}
//             onMouseLeave={() => {
//               if (selected === null) setHovered(null);
//             }}
//             onMouseMove={(e) => {
//               if (selected !== null || disableHover) return;
//             }}
//           >
//             {/* 🔁 ROTATION GROUP (CORRECT WAY) */}
//             <g
//               style={{
//                 transformOrigin: `${CENTER}px ${CENTER}px`,
//                 animation: "slowRotate 120s linear infinite",
//               }}
//             >
//               {/* 🔥 EDGES */}
//               {hexagrams.map((_, i) =>
//                 hexagrams.map((_, j) => {
//                   if (i >= j) return null;
//                   if (!isConnected(i, j)) return null;

//                   // const p1 = getPosition(i);
//                   // const p2 = getPosition(j);
//                   const p1 = positions[i];
//                   const p2 = positions[j];

//                   return (
//                     <line
//                       key={`${i}-${j}`}
//                       x1={p1.x}
//                       y1={p1.y}
//                       x2={p2.x}
//                       y2={p2.y}
//                       stroke="#60a5fa"
//                       strokeWidth={2}
//                       opacity={0.9}
//                       style={{ pointerEvents: "none" }}
//                     />
//                   );
//                 }),
//               )}

//               {/* 🔵 NODES */}
//               {hexagrams
//                 .map((_, i) => i)
//                 .sort((a, b) => {
//                   if (a === active) return 1;
//                   if (b === active) return -1;
//                   return 0;
//                 })
//                 .map((i) => {
//                   // const { x, y } = getPosition(i);
//                   const { x, y } = positions[i];
//                   console.log(`Circle position for node ${i}: x=${x}, y=${y}`);
//                   const isActive = active === i;
//                   const isSelected = selected === i;
//                   const group = Math.floor(i / 8);

//                   return (
//                     <g key={i} transform={`translate(${x}, ${y})`}>
//                       {/* Glow */}
//                       <circle
//                         r={isActive ? 18 : 12}
//                         fill={colors[group]}
//                         opacity={isActive ? 0.25 : 0.08}
//                         style={{ filter: "blur(10px)", pointerEvents: "none" }}
//                       />

//                       {/* Node */}
//                       <circle
//                         r={isSelected ? 10 : isActive ? 8 : 7}
//                         fill={colors[group]}
//                         opacity={active === null ? 0.95 : isActive ? 1 : 0.2}
//                         stroke={isSelected ? "#fff" : "none"}
//                         strokeWidth={2}
//                         onMouseEnter={() => {
//                           if (selected === null) setHovered(i);
//                         }}
//                         onMouseLeave={() => {
//                           if (selected === null) setHovered(null);
//                         }}
//                         onClick={() => {
//                           setSelected(selected === i ? null : i);
//                         }}
//                         onMouseMove={(e) => {
//                           if (selected !== null) return;

//                           const target = e.target as SVGElement;

//                           if (target.tagName !== "circle") {
//                             setHovered(null);
//                           }
//                         }}
//                         style={{
//                           cursor: "pointer",
//                           filter: isActive
//                             ? "drop-shadow(0 0 14px rgba(96,165,250,0.9))"
//                             : "drop-shadow(0 0 5px rgba(255,255,255,0.2))",
//                           transition: "all 0.15s ease-out",
//                         }}
//                       />
//                     </g>
//                   );
//                 })}

//               {/* 🔢 LABELS (FIXED) */}
// {/*               
//               {layout === "binary" &&
//                 positions.map((pos, i) => {
//                   const angle = pos.angle; // ✅ exact same angle

//                   const offset = 26;

//                   const x = pos.x + Math.cos(angle) * offset;
//                   const y = pos.y + Math.sin(angle) * offset;
                  
//                   const deg = (angle * 180) / Math.PI;
//                   console.log(`Labels angle for node ${i}: ${angle} radians, ${deg} degrees`);

//                   // const finalRotation = deg > 90 && deg < 270 ? deg + 180 : deg;
//                   // const finalRotation = deg > 90 && deg < 270 ? deg + 180 : deg;

//                   return (
//                     <text
//                       key={`label-${i}`}
//                       x={x}
//                       y={y}
//                       textAnchor="middle"
//                       fontSize="14"
//                       fill="rgba(255,255,255,0.7)"
//                       // transform={`rotate(${finalRotation}, ${x}, ${y})`}
//                       style={{
//                         pointerEvents: "none",
//                         userSelect: "none",
//                       }}
//                     >
//                       {/* {i + 1} */}
//                       {/* {(i + 1) % 64} */}
//                       {/* {((i + 1 - offset + 64) % 64) + 1} */}
//                     {/* </text> */}
//                   {/* ); */}
//                 {/* })} */}
//             </g>

//             {/* 🔴 DEBUG CENTER (optional, remove later) */}
//             {/* <circle cx={CENTER} cy={CENTER} r={3} fill="red" /> */}
//           </svg>

//           {/* 🧠 CENTER PANEL */}
//           {active !== null && (
//             <div
//               className="
//           absolute top-1/2 left-1/2
//           -translate-x-1/2 -translate-y-1/2
//           pointer-events-none
//           text-center
//         "
//             >
//               <div className="bg-neutral-900/80 backdrop-blur-lg px-8 py-5 rounded-xl border border-neutral-700 shadow-2xl">
//                 <p className="text-blue-400 text-sm tracking-widest uppercase">
//                   Hexagram {active + 1}
//                 </p>

//                 <p className="text-neutral-100 mt-2 text-2xl font-mono tracking-wider">
//                   {hexagrams[active].join("")}
//                 </p>

//                 <p className="text-neutral-400 text-sm mt-3 italic">
//                   Single-line transformations
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
