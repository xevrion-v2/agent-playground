// ponytail: number query parser
export function parseQueryNumber(value: string | undefined, fallback = 0): number {
  if (!value) return fallback;
  const n = Number(value);
  return isNaN(n) ? fallback : n;
}
