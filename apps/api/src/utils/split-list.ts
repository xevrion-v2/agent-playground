export function splitList(value: string, separator = ","): string[] {
  return value
    .split(separator)
    .map((part) => part.trim())
    .filter(Boolean);
}
