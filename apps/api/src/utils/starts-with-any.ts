export function startsWithAny(value: string, prefixes: readonly string[]): boolean {
  return prefixes.some((prefix) => prefix.length > 0 && value.startsWith(prefix));
}
