export function parseCorsOrigins(value: string | undefined): string[] {
  if (!value) return [];
  return value.split(',').map(o => o.trim()).filter(Boolean);
}
