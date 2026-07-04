export function isSoftHyphenPresent(value: string): boolean {
  return value.includes("\u00ad");
}
