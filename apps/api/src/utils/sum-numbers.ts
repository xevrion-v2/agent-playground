export function sumNumbers(values: readonly number[]): number {
  return values.reduce((total, value) => {
    if (!Number.isFinite(value)) {
      throw new TypeError("values must be finite");
    }

    return total + value;
  }, 0);
}
