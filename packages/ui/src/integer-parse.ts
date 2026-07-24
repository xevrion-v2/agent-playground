export function parseInteger(value: string): number | undefined {
  if (!/^-?\d+$/.test(value.trim())) return undefined;
  const parsed = parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : undefined;
}
