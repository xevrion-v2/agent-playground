/**
 * Safe JSON parse helper with typed fallback behavior.
 * Parses JSON strings without throwing on invalid input.
 */

/**
 * Result type for safe JSON parsing.
 */
export interface SafeJsonParseResult<T = unknown> {
  success: boolean;
  data: T | null;
  error: Error | null;
  raw: string;
}

/**
 * Safely parses a JSON string and returns the parsed value.
 * Returns the fallback value if parsing fails.
 *
 * @param input - The JSON string to parse
 * @param fallback - The value to return if parsing fails (default: null)
 * @returns The parsed value or the fallback
 *
 * @example
 * ```ts
 * safeJsonParse('{"a":1}') // { a: 1 }
 * safeJsonParse('invalid', { default: true }) // { default: true }
 * safeJsonParse('invalid') // null
 * ```
 */
export function safeJsonParse<T = unknown>(
  input: string,
  fallback: T | null = null,
): T | null {
  if (typeof input !== "string") {
    return fallback;
  }

  try {
    const parsed = JSON.parse(input) as T;
    return parsed;
  } catch {
    return fallback;
  }
}

/**
 * Safely parses a JSON string and returns a detailed result object.
 *
 * @param input - The JSON string to parse
 * @returns A result object with success, data, error, and raw fields
 *
 * @example
 * ```ts
 * const result = safeJsonParseDetailed('{"a":1}')
 * // { success: true, data: { a: 1 }, error: null, raw: '{"a":1}' }
 *
 * const failed = safeJsonParseDetailed('invalid')
 * // { success: false, data: null, error: SyntaxError, raw: 'invalid' }
 * ```
 */
export function safeJsonParseDetailed<T = unknown>(
  input: string,
): SafeJsonParseResult<T> {
  if (typeof input !== "string") {
    return {
      success: false,
      data: null,
      error: new TypeError("Input must be a string"),
      raw: String(input),
    };
  }

  try {
    const parsed = JSON.parse(input) as T;
    return {
      success: true,
      data: parsed,
      error: null,
      raw: input,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error : new Error(String(error)),
      raw: input,
    };
  }
}

/**
 * Safely parses a JSON string and validates it against a type guard.
 *
 * @param input - The JSON string to parse
 * @param typeGuard - A function that validates the parsed value
 * @param fallback - The value to return if parsing or validation fails (default: null)
 * @returns The validated parsed value or the fallback
 *
 * @example
 * ```ts
 * interface User { name: string; age: number }
 *
 * const isUser = (value: unknown): value is User =>
 *   typeof value === 'object' &&
 *   value !== null &&
 *   typeof (value as User).name === 'string' &&
 *   typeof (value as User).age === 'number'
 *
 * safeJsonParseWithGuard<User>('{"name":"Alice","age":30}', isUser)
 * // { name: 'Alice', age: 30 }
 *
 * safeJsonParseWithGuard<User>('{"name":"Bob"}', isUser)
 * // null (age missing)
 * ```
 */
export function safeJsonParseWithGuard<T = unknown>(
  input: string,
  typeGuard: (value: unknown) => value is T,
  fallback: T | null = null,
): T | null {
  const parsed = safeJsonParse<unknown>(input, null);

  if (parsed === null) {
    return fallback;
  }

  try {
    if (typeGuard(parsed)) {
      return parsed;
    }
    return fallback;
  } catch {
    return fallback;
  }
}

/**
 * Safely parses a JSON string and returns a default value if the result is not an object.
 *
 * @param input - The JSON string to parse
 * @param fallback - The object to return if parsing fails or result is not an object (default: {})
 * @returns The parsed object or the fallback
 *
 * @example
 * ```ts
 * safeJsonParseObject('{"a":1}') // { a: 1 }
 * safeJsonParseObject('[1,2,3]') // {} (not an object)
 * safeJsonParseObject('invalid') // {}
 * ```
 */
export function safeJsonParseObject<T extends Record<string, unknown> = Record<string, unknown>>(
  input: string,
  fallback: T = {} as T,
): T {
  const parsed = safeJsonParse<unknown>(input, null);

  if (
    parsed !== null &&
    typeof parsed === "object" &&
    !Array.isArray(parsed)
  ) {
    return parsed as T;
  }

  return fallback;
}

/**
 * Safely parses a JSON string and returns a default array if the result is not an array.
 *
 * @param input - The JSON string to parse
 * @param fallback - The array to return if parsing fails or result is not an array (default: [])
 * @returns The parsed array or the fallback
 *
 * @example
 * ```ts
 * safeJsonParseArray('[1,2,3]') // [1, 2, 3]
 * safeJsonParseArray('{"a":1}') // [] (not an array)
 * safeJsonParseArray('invalid') // []
 * ```
 */
export function safeJsonParseArray<T = unknown>(
  input: string,
  fallback: T[] = [],
): T[] {
  const parsed = safeJsonParse<unknown>(input, null);

  if (Array.isArray(parsed)) {
    return parsed as T[];
  }

  return fallback;
}

/**
 * Safely parses a JSON string and returns a string if the result is a string.
 *
 * @param input - The JSON string to parse
 * @param fallback - The string to return if parsing fails or result is not a string (default: "")
 * @returns The parsed string or the fallback
 *
 * @example
 * ```ts
 * safeJsonParseString('"hello"') // "hello"
 * safeJsonParseString('123') // "" (not a string)
 * safeJsonParseString('invalid') // ""
 * ```
 */
export function safeJsonParseString(
  input: string,
  fallback = "",
): string {
  const parsed = safeJsonParse<unknown>(input, null);

  if (typeof parsed === "string") {
    return parsed;
  }

  return fallback;
}

/**
 * Safely parses a JSON string and returns a number if the result is a number.
 *
 * @param input - The JSON string to parse
 * @param fallback - The number to return if parsing fails or result is not a number (default: 0)
 * @returns The parsed number or the fallback
 *
 * @example
 * ```ts
 * safeJsonParseNumber('42') // 42
 * safeJsonParseNumber('"hello"') // 0 (not a number)
 * safeJsonParseNumber('invalid') // 0
 * ```
 */
export function safeJsonParseNumber(
  input: string,
  fallback = 0,
): number {
  const parsed = safeJsonParse<unknown>(input, null);

  if (typeof parsed === "number" && !Number.isNaN(parsed)) {
    return parsed;
  }

  return fallback;
}

/**
 * Safely parses a JSON string and returns a boolean if the result is a boolean.
 *
 * @param input - The JSON string to parse
 * @param fallback - The boolean to return if parsing fails or result is not a boolean (default: false)
 * @returns The parsed boolean or the fallback
 *
 * @example
 * ```ts
 * safeJsonParseBoolean('true') // true
 * safeJsonParseBoolean('"hello"') // false (not a boolean)
 * safeJsonParseBoolean('invalid') // false
 * ```
 */
export function safeJsonParseBoolean(
  input: string,
  fallback = false,
): boolean {
  const parsed = safeJsonParse<unknown>(input, null);

  if (typeof parsed === "boolean") {
    return parsed;
  }

  return fallback;
}

/**
 * Checks if a string is valid JSON.
 *
 * @param input - The string to check
 * @returns True if the string is valid JSON, false otherwise
 *
 * @example
 * ```ts
 * isValidJson('{"a":1}') // true
 * isValidJson('invalid') // false
 * isValidJson('') // false
 * ```
 */
export function isValidJson(input: string): boolean {
  if (typeof input !== "string" || input.trim() === "") {
    return false;
  }

  try {
    JSON.parse(input);
    return true;
  } catch {
    return false;
  }
}

/**
 * Tries to parse JSON and returns the result or undefined.
 * Useful for optional chaining.
 *
 * @param input - The JSON string to parse
 * @returns The parsed value or undefined
 *
 * @example
 * ```ts
 * tryParseJson('{"a":1}')?.a // 1
 * tryParseJson('invalid')?.a // undefined
 * ```
 */
export function tryParseJson<T = unknown>(input: string): T | undefined {
  return safeJsonParse<T>(input, undefined as unknown as T);
}

export default safeJsonParse;
