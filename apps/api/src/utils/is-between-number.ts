export function isBetweenNumber(
  value: unknown,
  min: number,
  max: number,
): value is number {
  return (
    typeof value === "number" &&
    Number.isFinite(value) &&
    Number.isFinite(min) &&
    Number.isFinite(max) &&
    min <= max &&
    value >= min &&
    value <= max
  );
}
