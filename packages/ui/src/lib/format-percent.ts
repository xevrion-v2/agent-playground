/**
 * Formats a number as a percentage string.
 * @param value The number to format.
 * @returns A string representing the number as a percentage (e.g., 0.5 becomes "50.00%").
 */
export function formatPercent(value: number): string {
    return `${(value * 100).toFixed(2)}%`;
}