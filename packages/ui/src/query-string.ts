export function parseQueryString(qs: string): Record<string, string> {
  const result: Record<string, string> = {};
  if (!qs) return result;
  const search = qs.startsWith('?') ? qs.slice(1) : qs;
  for (const pair of search.split('&')) {
    const [k, v] = pair.split('=');
    if (k) result[decodeURIComponent(k)] = decodeURIComponent(v || '');
  }
  return result;
}
