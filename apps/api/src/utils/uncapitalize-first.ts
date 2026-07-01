export function uncapitalizeFirst(value: string): string {
  return value.length === 0 ? "" : value.charAt(0).toLowerCase() + value.slice(1);
}
