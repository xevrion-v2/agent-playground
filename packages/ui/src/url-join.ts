export function urlJoin(...parts: string[]): string {
  return parts.map((p, i) => {
    if (i === 0) return p?.replace(/\/$/, '');
    if (i === parts.length - 1) return p?.replace(/^\//, '');
    return p?.replace(/^\//, '').replace(/\/$/, '');
  }).filter(Boolean).join('/');
}
