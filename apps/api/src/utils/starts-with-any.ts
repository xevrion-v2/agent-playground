export function startsWithAny(value: string, prefixes: readonly string[]): boolean {
  for (const prefix of prefixes) {
    if (prefix.length > 0 && value.startsWith(prefix)) {
      return true;
    }
  }

  return false;
}
