import { create } from "zustand";

export type Line = 0 | 1;

interface HexagramState {
  lines: Line[];
  changing: boolean[];

  toggleLine: (index: number) => void;
  toggleChanging: (index: number) => void;
  randomize: () => void;
}

export const useHexagramStore = create<HexagramState>((set) => ({
  lines: [1, 1, 1, 0, 0, 0],
  changing: [false, false, false, false, false, false],

  toggleLine: (index) =>
    set((state) => {
      const newLines = [...state.lines];
      newLines[index] = newLines[index] === 1 ? 0 : 1;
      return { lines: newLines };
    }),

  toggleChanging: (index) =>
    set((state) => {
      const newChanging = [...state.changing];
      newChanging[index] = !newChanging[index];
      return { changing: newChanging };
    }),

  randomize: () =>
    set({
      lines: Array.from({ length: 6 }, () =>
        Math.random() > 0.5 ? 1 : 0
      ) as Line[],
      changing: Array.from({ length: 6 }, () =>
        Math.random() > 0.7
      ),
    }),
}));