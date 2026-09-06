export type SortDirection = "asc" | "desc";

const SORT_DIRECTIONS: ReadonlySet<string> = new Set<SortDirection>(["asc", "desc"]);

/**
 * Normalizes an API sort direction input to `asc` or `desc`.
 *
 * Returns `undefined` for missing or unsupported values so callers can
 * distinguish invalid input from an explicit direction.
 */
export function normalizeSortDirection(value: unknown): SortDirection | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const normalized = value.trim().toLowerCase();
  return SORT_DIRECTIONS.has(normalized) ? (normalized as SortDirection) : undefined;
}

/**
 * Checks whether a value is a supported sort direction.
 */
export function isSortDirection(value: unknown): value is SortDirection {
  return normalizeSortDirection(value) !== undefined;
}
