export function removeSuffix(value: string, suffix: string): string {
  if (suffix.length === 0 || !value.endsWith(suffix)) {
    return value;
  }
  return value.slice(0, value.length - suffix.length);
}
