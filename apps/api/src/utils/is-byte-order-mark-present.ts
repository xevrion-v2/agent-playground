export function isByteOrderMarkPresent(value: string): boolean {
  return value.includes("\uFEFF");
}
