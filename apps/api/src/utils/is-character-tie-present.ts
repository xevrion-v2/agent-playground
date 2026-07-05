const CHARACTER_TIE = "\u2040";

export function isCharacterTiePresent(input: string): boolean {
  return input.includes(CHARACTER_TIE);
}
