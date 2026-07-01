export function isAsciiString(value: string): boolean {
  return /^[\x00-\x7F]*$/.test(value);
}
