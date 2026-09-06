export function parsePagination(page?: string, pageSize?: string): { page: number; limit: number } {
  const p = Math.max(1, parseInt(page || '1', 10) || 1);
  const s = Math.max(1, Math.min(100, parseInt(pageSize || '20', 10) || 20));
  return { page: p, limit: s };
}
