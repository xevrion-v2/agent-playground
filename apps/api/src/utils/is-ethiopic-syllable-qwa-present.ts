const ETHIOPIC_SYLLABLE_QWA = "\u1248";

export function isEthiopicSyllableQwaPresent(input: string): boolean {
  return input.includes(ETHIOPIC_SYLLABLE_QWA);
}
