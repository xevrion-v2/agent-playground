export function clampStringLength(value: string, maxLength: number): string {
  if (maxLength < 0) {
    return "";
  }
  if (value.length <= maxLength) {
    return value;
  }
  return value.slice(0, maxLength);
}
