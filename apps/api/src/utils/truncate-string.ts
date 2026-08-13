export function truncateString(value: string, maxLength: number, suffix = "..."): string {
  if (maxLength < 1) {
    return "";
  }
  if (value.length <= maxLength) {
    return value;
  }
  const keep = Math.max(0, maxLength - suffix.length);
  return `${value.slice(0, keep)}${suffix}`;
}
