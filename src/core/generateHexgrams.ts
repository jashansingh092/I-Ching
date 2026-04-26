// core/generateHexagrams.ts

export type Line = 0 | 1; // 0 = yin, 1 = yang
export type Hexagram = Line[]; // length = 6

// 🔹 Generate all 64 hexagrams (binary 000000 → 111111)
export function generateHexagrams(): Hexagram[] {
  const result: Hexagram[] = [];

  for (let i = 0; i < 64; i++) {
    const binary = i.toString(2).padStart(6, "0");

    const lines = binary.split("").map((b) => Number(b) as Line);

    result.push(lines);
  }

  return result;
}