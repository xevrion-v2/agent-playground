export function removePrefix(value: string, prefix: string): string {
  return prefix.length > 0 && value.startsWith(prefix) ? value.slice(prefix.length) : value;
}
