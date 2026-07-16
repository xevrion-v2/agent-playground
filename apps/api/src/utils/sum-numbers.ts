/**
 * Sums an immutable list of numeric values.
 * @param nums - The numeric array.
 * @returns Sum of all values.
 */
export function sumNumbers(nums: readonly number[]): number {
  return nums.reduce((a, b) => a + b, 0);
}