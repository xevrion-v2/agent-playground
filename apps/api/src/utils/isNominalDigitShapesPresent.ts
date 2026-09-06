export function isNominalDigitShapesPresent(value: string): boolean {
  return /[\u00b2\u00b3\u00b9]/.test(value);
}
