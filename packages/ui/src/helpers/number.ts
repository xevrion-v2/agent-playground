/**
 * Checks if a given number is positive.
 * 
 * @param num The number to check.
 * @returns True if the number is positive, false otherwise.
 */
export function isPositiveNumber(num: number): boolean {
    return typeof num === 'number' && num > 0;
}