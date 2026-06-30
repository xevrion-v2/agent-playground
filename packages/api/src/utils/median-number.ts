/**
 * Calculates the median of an array of numbers.
 * @param numbers - The array of numbers.
 * @param fallback - The fallback value if calculation fails (default: 0).
 * @returns The median number or fallback.
 */
export function medianNumber(numbers: unknown, fallback: number = 0): number {
  if (!Array.isArray(numbers) || numbers.length === 0) {
    return fallback;
  }

  const sorted = numbers
    .filter((n): n is number => typeof n === 'number' && isFinite(n))
    .sort((a, b) => a - b);

  if (sorted.length === 0) {
    return fallback;
  }

  const mid = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1] + sorted[mid]) / 2;
  }

  return sorted[mid];
}