/**
 * Return true when input contains the Ethiopic syllable qwa (U+1248).
 */
export function isEthiopicSyllableQwaPresent(input: string): boolean {
  return input.includes("\u1248");
}
