export function getNumbers(from, to) {
  return Array.from({ length: (to - from + 1)}, (_, i) => (i + from));
}