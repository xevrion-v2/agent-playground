export function clampStringLength(
  value: string,
  maxLength: number,
  suffix = "...",
): string {
  if (!Number.isInteger(maxLength) || maxLength < 0) {
    throw new RangeError("maxLength must be a non-negative integer");
  }

  if (value.length <= maxLength) {
    return value;
  }

  if (suffix.length >= maxLength) {
    return suffix.slice(0, maxLength);
  }

  return `${value.slice(0, maxLength - suffix.length)}${suffix}`;
}
