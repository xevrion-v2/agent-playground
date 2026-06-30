// ponytail: boolean query parser
export function parseQueryBoolean(value: string | undefined, fallback = false): boolean {
  if (!value) return fallback;
  const l = value.toLowerCase();
  return l === 'true' || l === '1' || l === 'yes';
}
