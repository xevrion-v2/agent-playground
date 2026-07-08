/**
 * Returns true when the value contains Unicode Nominal Digit Shapes (U+206F).
 */
export function isNominalDigitShapesPresent(value: string): boolean {
  if (typeof value !== "string") {
    return false;
  }

  return value.includes("\u206f");
}
