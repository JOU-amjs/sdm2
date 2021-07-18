export type MatchedPosition = [number, number]|number;
export interface MatchedData {
  value: string,
  index: number,
  position: MatchedPosition[],
  lastIndex: number,
}
export function discontinuousMatch(strings: (string|MatchedData)[], matching: string, ignoreCase = true): MatchedData[];