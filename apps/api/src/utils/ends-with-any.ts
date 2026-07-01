export function endsWithAny(value: string, suffixes: readonly string[]): boolean {
  return suffixes.some((suffix) => suffix.length > 0 && value.endsWith(suffix));
}
