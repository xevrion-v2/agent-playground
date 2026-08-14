/**
 * Computes the arithmetic average of a numeric list.
 * @param nums - The numeric array.
 * @returns Average value, or undefined for empty list.
 */
export function average(nums: readonly number[]): number | undefined {
  if (nums.length === 0) return undefined;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}