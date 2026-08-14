/**
 * Generates a range of numbers from start to end (exclusive).
 * @param start - The start of the range.
 * @param end - The end of the range (exclusive).
 * @param step - The step between numbers (default: 1).
 * @returns An array of numbers in the range.
 */
export function range(start: number, end: number, step: number = 1): number[] {
  const result: number[] = [];

  if (step === 0) {
    return result;
  }

  if (start < end) {
    for (let i = start; i < end; i += step) {
      result.push(i);
    }
  } else {
    for (let i = start; i > end; i += step) {
      result.push(i);
    }
  }

  return result;
}