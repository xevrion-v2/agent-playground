export function removeSuffix(value: string, suffix: string): string {
  return suffix.length > 0 && value.endsWith(suffix) ? value.slice(0, value.length - suffix.length) : value;
}
