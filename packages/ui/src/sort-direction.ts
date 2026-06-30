// ponytail: sort direction helper
export type SortDirection = 'asc' | 'desc';
export function normalizeSortDirection(dir?: string): SortDirection {
  return dir && dir.toLowerCase() === 'desc' ? 'desc' : 'asc';
}
