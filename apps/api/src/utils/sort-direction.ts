export type SortDirection = "asc" | "desc";

export function normalizeSortDirection(
  value: string | undefined,
  fallback: SortDirection = "asc",
): SortDirection {
  if (value === "asc" || value === "desc") {
    return value;
  }

  return fallback;
}