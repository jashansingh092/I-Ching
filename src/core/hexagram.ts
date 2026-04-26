import type { Line } from "../store/useHexagramStore";
import { trigramToIndex, TRIGRAMS, type TrigramName } from "./trigrams";
import { HEXAGRAM_TABLE } from "./hexagramTable";

export function getHexagramInfo(lines: Line[]) {
  const lower = lines.slice(0, 3);
  const upper = lines.slice(3, 6);

  const lowerIndex = trigramToIndex(lower);
  const upperIndex = trigramToIndex(upper);

  return {
    lower,
    upper,
    lowerIndex,
    upperIndex,
    lowerName: TRIGRAMS[lowerIndex] as TrigramName,
    upperName: TRIGRAMS[upperIndex] as TrigramName,
  };
}

export function getHexagramNumber(lines: Line[]) {
  const { lowerIndex, upperIndex } = getHexagramInfo(lines);
  return HEXAGRAM_TABLE[upperIndex][lowerIndex];
}

export function getTransformedHexagram(lines: (0 | 1)[], changing: boolean[]) {
  return lines.map((line, i) =>
    changing[i] ? (line === 1 ? 0 : 1) : line,
  ) as (0 | 1)[];
}
