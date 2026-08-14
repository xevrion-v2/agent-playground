export function isPrintableAscii(value: string): boolean {
  return /^[\x20-\x7E]*$/.test(value);
}
