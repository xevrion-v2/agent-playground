export function median(numbers: number[]): number | null {
  if (!Array.isArray(numbers) || numbers.length === 0) return null;
  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 1) return sorted[mid];
  return (sorted[mid - 1] + sorted[mid]) / 2;
}

export function safeMedian(values: unknown[]): number | null {
  const numbers = values.filter((v): v is number => typeof v === 'number');
  return median(numbers);
}
