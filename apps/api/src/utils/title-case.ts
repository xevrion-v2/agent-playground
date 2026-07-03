export function titleCase(value: string): string {
  return value.replace(/(^|\s)(\S)/g, (_match, prefix: string, char: string) => `${prefix}${char.toUpperCase()}`);
}
