export function endsWithAny(value: string, suffixes: readonly string[]): boolean {
  for (const suffix of suffixes) {
    if (suffix.length > 0 && value.endsWith(suffix)) {
      return true;
    }
  }

  return false;
}
