/**
 * Type guard utility.
 */
export function isPrintableAscii(input: string): boolean {
  return /^[ -~]*$/.test(input);
}
