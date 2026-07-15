export function chunkArray<T>(values: readonly T[], size: number): T[][] {
  if (size <= 0) {
    throw new RangeError("chunk size must be positive");
  }
  const chunks: T[][] = [];
  for (let index = 0; index < values.length; index += size) {
    chunks.push(values.slice(index, index + size));
  }
  return chunks;
}
