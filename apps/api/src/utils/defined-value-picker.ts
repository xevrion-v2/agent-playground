export function pickDefined<T>(
  ...values: Array<T | null | undefined>
): T | undefined {
  for (const value of values) {
    if (value !== null && value !== undefined) {
      return value;
    }
  }

  return undefined;
}
