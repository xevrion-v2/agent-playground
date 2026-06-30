// ponytail: query string builder
export function buildQueryString(params: Record<string, string | number | boolean>): string {
  const e = Object.entries(params).filter(([, v]) => v != null).map(([k, v]) => [k, String(v)]) as [string, string][];
  return new URLSearchParams(e).toString();
}
