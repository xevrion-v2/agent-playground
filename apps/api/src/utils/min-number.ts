export function minNumber(values: readonly number[]): number | undefined {
  let minimum: number | undefined;

  for (const value of values) {
    if (Number.isNaN(value)) {
      return Number.NaN;
    }

    if (minimum === undefined || value < minimum) {
      minimum = value;
    }
  }

  return minimum;
}
