export function uncapitalizeFirst(value: string): string {
  if (value.length === 0) return value;
  return value[0].toLowerCase() + value.slice(1);
}
