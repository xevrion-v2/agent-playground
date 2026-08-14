export function normalizeSortDirection(dir: string | undefined): 'asc' | 'desc' {
  return dir === 'desc' ? 'desc' : 'asc';
}
