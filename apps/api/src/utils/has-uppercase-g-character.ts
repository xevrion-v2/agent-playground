/**
 * Returns true when the value contains uppercase "G".
 */
export function hasUppercaseGCharacter(value: string): boolean {
  if (typeof value !== "string") {
    return false;
  }

  return value.includes("G");
}
