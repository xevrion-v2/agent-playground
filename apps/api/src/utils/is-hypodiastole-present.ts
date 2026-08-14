const HYPODIASTOLE = "\u2e12";

export function isHypodiastolePresent(input: string): boolean {
  return input.includes(HYPODIASTOLE);
}
