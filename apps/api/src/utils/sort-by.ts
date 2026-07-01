export function sortBy<T>(
  values: readonly T[],
  selector: (value: T) => string | number,
  order: "asc" | "desc" = "asc",
): T[] {
  const sorted = [...values].sort((left, right) => {
    const leftValue = selector(left);
    const rightValue = selector(right);
    if (leftValue < rightValue) {
      return -1;
    }
    if (leftValue > rightValue) {
      return 1;
    }
    return 0;
  });
  return order === "desc" ? sorted.reverse() : sorted;
}
