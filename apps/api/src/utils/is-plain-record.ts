/**
 * Narrows unknown values to plain object records.
 * @param val - The value to check.
 * @returns true if val is a plain object (not null, not array, not function).
 */
export function isPlainRecord(val: unknown): val is Record<string, unknown> {
  return val !== null && typeof val === 'object' && !Array.isArray(val) && Object.getPrototypeOf(val) === Object.prototype;
}