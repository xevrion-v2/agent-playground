import crypto from "node:crypto";

/**
 * Generates a random integer between min and max (inclusive).
 * If only one argument is provided, it is treated as max and min is 0.
 *
 * @param {any} min - The minimum value.
 * @param {any} [max] - The maximum value.
 * @returns {number} The random integer.
 */
export function randomInt(min: any, max?: any): number {
  let actualMin = min;
  let actualMax = max;

  if (actualMax === undefined) {
    actualMax = actualMin;
    actualMin = 0;
  }

  if (typeof actualMin !== "number" || typeof actualMax !== "number" || Number.isNaN(actualMin) || Number.isNaN(actualMax)) {
    throw new TypeError("Arguments must be numbers");
  }

  if (actualMin > actualMax) {
    const temp = actualMin;
    actualMin = actualMax;
    actualMax = temp;
  }

  return Math.floor(Math.random() * (actualMax - actualMin + 1)) + actualMin;
}

/**
 * Generates a random alphanumeric string of a given length.
 *
 * @param {any} [length=8] - The length of the string.
 * @returns {string} The random string.
 */
export function randomString(length: any = 8): string {
  let actualLength = length;
  if (actualLength === null || actualLength === undefined) {
    actualLength = 8;
  }

  if (typeof actualLength !== "number" || Number.isNaN(actualLength)) {
    throw new TypeError("Length must be a number");
  }

  if (actualLength < 0) {
    throw new RangeError("Length must be non-negative");
  }

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < actualLength; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Generates a random UUID (v4).
 *
 * @returns {string} The generated UUID.
 */
export function randomUUID(): string {
  return crypto.randomUUID();
}

/**
 * Picks a random element from an array.
 *
 * @param {any} array - The array to pick from.
 * @returns {any} The randomly picked element.
 */
export function randomPick<T = any>(array: any): T {
  if (!Array.isArray(array)) {
    throw new TypeError("Expected an array");
  }

  if (array.length === 0) {
    return undefined as any;
  }

  return array[Math.floor(Math.random() * array.length)];
}
