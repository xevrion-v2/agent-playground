/** Parse pagination params safely. */
export function parsePagination(q: Record<string, unknown>) {
  const page = Math.max(1, Math.min(10000, parseInt(String(q.page ?? 1), 10))) || 1;
  const limit = Math.max(1, Math.min(100, parseInt(String(q.limit ?? 10), 10))) || 10;
  return { page, limit, offset: (page - 1) * limit };
}