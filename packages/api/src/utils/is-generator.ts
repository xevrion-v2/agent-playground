/**
 * Checks if a value is a generator.
 * @param value - The value to check.
 * @returns True if the value is a generator, false otherwise.
 */
export function isGenerator(value: unknown): value is Generator<unknown> {
  return typeof value === 'object' &&
    value !== null &&
    'next' in value &&
    'throw' in value &&
    'return' in value &&
    typeof (value as Generator).next === 'function';
}