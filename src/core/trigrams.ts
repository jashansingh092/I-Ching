import type { Line } from "../store/useHexagramStore";

// 🔹 Strict trigram name type
export type TrigramName =
  | "Qian"
  | "Kun"
  | "Zhen"
  | "Xun"
  | "Kan"
  | "Li"
  | "Gen"
  | "Dui";

// 🔹 Ordered by binary index (0–7)
export const TRIGRAMS: TrigramName[] = [
  "Kun",   // 000
  "Gen",   // 001
  "Kan",   // 010
  "Xun",   // 011
  "Zhen",  // 100
  "Li",    // 101
  "Dui",   // 110
  "Qian",  // 111
];

// 🔹 Convert 3 lines → trigram index
export function trigramToIndex(lines: Line[]): number {
  return lines[0] * 1 + lines[1] * 2 + lines[2] * 4;
}

// 🔹 Full trigram data
export const TRIGRAM_DATA: Record<
  TrigramName,
  {
    element: string;
    nature: string;
    direction: string;
    meaning: string;
  }
> = {
  Qian: {
    element: "Heaven",
    nature: "Creative, strong, initiating",
    direction: "Upward / Expansive",
    meaning:
      "Pure yang energy. Represents force, leadership, creation, and decisive movement."
  },

  Kun: {
    element: "Earth",
    nature: "Receptive, yielding, supportive",
    direction: "Downward / Containing",
    meaning:
      "Pure yin energy. Represents openness, nourishment, and the ability to receive and sustain."
  },

  Zhen: {
    element: "Thunder",
    nature: "Arousing, sudden, activating",
    direction: "Outward / Initiating",
    meaning:
      "Shock and awakening. Represents sudden movement that disrupts inertia and begins change."
  },

  Xun: {
    element: "Wind / Wood",
    nature: "Penetrating, gentle, pervasive",
    direction: "Entering / Diffusing",
    meaning:
      "Subtle influence. Represents gradual penetration, adaptation, and quiet transformation."
  },

  Kan: {
    element: "Water",
    nature: "Dangerous, deep, flowing",
    direction: "Descending / Inward",
    meaning:
      "The abyss. Represents risk, depth, and the necessity of navigating uncertainty."
  },

  Li: {
    element: "Fire",
    nature: "Clinging, illuminating, dependent",
    direction: "Radiating / Outward",
    meaning:
      "Clarity and awareness. Represents illumination, insight, and dependence on what sustains it."
  },

  Gen: {
    element: "Mountain",
    nature: "Still, stopping, stabilizing",
    direction: "Upward / Contained",
    meaning:
      "Stillness. Represents boundaries, restraint, and the power of stopping at the right moment."
  },

  Dui: {
    element: "Lake",
    nature: "Joyful, open, expressive",
    direction: "Outward / Reflective",
    meaning:
      "Joy and communication. Represents openness, exchange, and emotional expression."
  },
};