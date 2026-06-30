// ponytail: date range helper
export function parseDateRange(from?: string, to?: string): { from?: Date; to?: Date } {
  const r: { from?: Date; to?: Date } = {};
  if (from) r.from = new Date(from);
  if (to) r.to = new Date(to);
  return r;
}
