/**
 * Trims whitespace from a string and returns `undefined` if the
 * result is empty. Useful for normalizing optional form inputs.
 */
export function trimToUndefined(value: string | null | undefined): string | undefined {
  if (value == null) {
    return undefined;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}
