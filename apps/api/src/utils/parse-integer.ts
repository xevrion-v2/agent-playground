export function parseInteger(value: string): number | undefined {
  const trimmed = value.trim();
  if (!/^-?\d+$/.test(trimmed)) {
    return undefined;
  }
  const parsed = Number.parseInt(trimmed, 10);
  return Number.isSafeInteger(parsed) ? parsed : undefined;
}
