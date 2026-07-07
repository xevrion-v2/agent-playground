export function range(start: number, end: number): number[] {
  const step = start <= end ? 1 : -1;
  const length = Math.abs(end - start) + 1;

  return Array.from({ length }, (_, index) => start + index * step);
}