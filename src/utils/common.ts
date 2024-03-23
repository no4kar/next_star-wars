export function getNumbers(from: number, to: number): number[] {
  return Array.from({ length: (to - from + 1)}, (_, i) => (i + from));
}