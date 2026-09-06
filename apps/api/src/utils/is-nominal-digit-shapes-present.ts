const NOMINAL_DIGIT_SHAPES = "\u206f";

export function isNominalDigitShapesPresent(input: string): boolean {
  return input.includes(NOMINAL_DIGIT_SHAPES);
}
