/**
 * Reusable type guard for checking trimmed non-empty string inputs.
 * Provides robust string validation utilities for API inputs and payloads.
 */

/**
 * Options for non-empty string checks.
 */
export interface IsNonEmptyStringOptions {
  /** Whether to trim the string before checking (default: true) */
  trim?: boolean;
  /** Minimum length of the string (default: 1) */
  minLength?: number;
  /** Maximum length of the string (default: undefined, no limit) */
  maxLength?: number;
  /** Whether to allow whitespace-only strings (default: false) */
  allowWhitespace?: boolean;
  /** Custom regex pattern the string must match (default: undefined) */
  pattern?: RegExp;
  /** Custom validation function (default: undefined) */
  validator?: (value: string) => boolean;
}

/**
 * Default options for non-empty string checks.
 */
export const DEFAULT_IS_NON_EMPTY_STRING_OPTIONS: Required<Omit<IsNonEmptyStringOptions, "maxLength" | "pattern" | "validator">> & {
  maxLength?: number;
  pattern?: RegExp;
  validator?: (value: string) => boolean;
} = {
  trim: true,
  minLength: 1,
  maxLength: undefined,
  allowWhitespace: false,
  pattern: undefined,
  validator: undefined,
};

/**
 * Type guard that checks if a value is a trimmed non-empty string.
 *
 * @param value - The value to check
 * @param options - Validation options
 * @returns True if the value is a non-empty string, false otherwise
 *
 * @example
 * ```ts
 * isNonEmptyString("hello") // true
 * isNonEmptyString("  ") // false (whitespace-only)
 * isNonEmptyString("") // false
 * isNonEmptyString(null) // false
 * isNonEmptyString(undefined) // false
 * isNonEmptyString(123) // false
 * isNonEmptyString("  hello  ") // true (trimmed)
 * isNonEmptyString("  ", { allowWhitespace: true }) // true
 * isNonEmptyString("ab", { minLength: 3 }) // false
 * isNonEmptyString("hello", { maxLength: 3 }) // false
 * isNonEmptyString("hello123", { pattern: /^[a-z]+$/ }) // false
 * ```
 */
export function isNonEmptyString(
  value: unknown,
  options: IsNonEmptyStringOptions = {},
): value is string {
  const opts = { ...DEFAULT_IS_NON_EMPTY_STRING_OPTIONS, ...options };

  // Must be a string
  if (typeof value !== "string") {
    return false;
  }

  let processed = value;

  // Trim if requested
  if (opts.trim) {
    processed = processed.trim();
  }

  // Check for empty string
  if (processed === "") {
    return false;
  }

  // Check for whitespace-only (if not allowed)
  if (!opts.allowWhitespace && processed.trim() === "") {
    return false;
  }

  // Check minimum length
  if (opts.minLength !== undefined && processed.length < opts.minLength) {
    return false;
  }

  // Check maximum length
  if (opts.maxLength !== undefined && processed.length > opts.maxLength) {
    return false;
  }

  // Check pattern
  if (opts.pattern && !opts.pattern.test(processed)) {
    return false;
  }

  // Check custom validator
  if (opts.validator && !opts.validator(processed)) {
    return false;
  }

  return true;
}

/**
 * Type guard that checks if a value is a string (can be empty).
 *
 * @param value - The value to check
 * @returns True if the value is a string, false otherwise
 *
 * @example
 * ```ts
 * isString("hello") // true
 * isString("") // true
 * isString(null) // false
 * isString(123) // false
 * ```
 */
export function isString(value: unknown): value is string {
  return typeof value === "string";
}

/**
 * Type guard that checks if a value is an empty string.
 *
 * @param value - The value to check
 * @param trim - Whether to trim before checking (default: true)
 * @returns True if the value is an empty string, false otherwise
 *
 * @example
 * ```ts
 * isEmptyString("") // true
 * isEmptyString("  ") // true (trimmed)
 * isEmptyString("hello") // false
 * isEmptyString(null) // false
 * ```
 */
export function isEmptyString(value: unknown, trim = true): value is string {
  if (typeof value !== "string") {
    return false;
  }
  return trim ? value.trim() === "" : value === "";
}

/**
 * Type guard that checks if a value is a whitespace-only string.
 *
 * @param value - The value to check
 * @returns True if the value is a whitespace-only string, false otherwise
 *
 * @example
 * ```ts
 * isWhitespaceString("   ") // true
 * isWhitespaceString("\t\n") // true
 * isWhitespaceString("hello") // false
 * isWhitespaceString("") // false
 * ```
 */
export function isWhitespaceString(value: unknown): value is string {
  if (typeof value !== "string") {
    return false;
  }
  return value !== "" && value.trim() === "";
}

/**
 * Returns the string value if it's non-empty, otherwise returns a default value.
 *
 * @param value - The value to check
 * @param defaultValue - The default value to return if not non-empty (default: "")
 * @param options - Validation options
 * @returns The string value or default
 *
 * @example
 * ```ts
 * getNonEmptyString("hello") // "hello"
 * getNonEmptyString("") // ""
 * getNonEmptyString("", "default") // "default"
 * getNonEmptyString(null, "default") // "default"
 * ```
 */
export function getNonEmptyString(
  value: unknown,
  defaultValue = "",
  options: IsNonEmptyStringOptions = {},
): string {
  if (isNonEmptyString(value, options)) {
    return options.trim ? value.trim() : value;
  }
  return defaultValue;
}

/**
 * Asserts that a value is a non-empty string, throwing an error if not.
 *
 * @param value - The value to check
 * @param fieldName - The name of the field for error messages (default: "value")
 * @param options - Validation options
 * @throws Error if the value is not a non-empty string
 *
 * @example
 * ```ts
 * assertNonEmptyString("hello", "name") // OK
 * assertNonEmptyString("", "name") // throws Error("name must be a non-empty string")
 * ```
 */
export function assertNonEmptyString(
  value: unknown,
  fieldName = "value",
  options: IsNonEmptyStringOptions = {},
): asserts value is string {
  if (!isNonEmptyString(value, options)) {
    throw new Error(`${fieldName} must be a non-empty string`);
  }
}

/**
 * Checks if all values in an array are non-empty strings.
 *
 * @param values - The array of values to check
 * @param options - Validation options
 * @returns True if all values are non-empty strings, false otherwise
 *
 * @example
 * ```ts
 * allNonEmptyStrings(["a", "b", "c"]) // true
 * allNonEmptyStrings(["a", "", "c"]) // false
 * allNonEmptyStrings([]) // true (vacuously true)
 * ```
 */
export function allNonEmptyStrings(
  values: unknown[],
  options: IsNonEmptyStringOptions = {},
): values is string[] {
  if (!Array.isArray(values)) {
    return false;
  }
  return values.every((v) => isNonEmptyString(v, options));
}

/**
 * Checks if any value in an array is a non-empty string.
 *
 * @param values - The array of values to check
 * @param options - Validation options
 * @returns True if at least one value is a non-empty string, false otherwise
 *
 * @example
 * ```ts
 * anyNonEmptyString(["", null, "hello"]) // true
 * anyNonEmptyString(["", null, undefined]) // false
 * ```
 */
export function anyNonEmptyString(
  values: unknown[],
  options: IsNonEmptyStringOptions = {},
): boolean {
  if (!Array.isArray(values)) {
    return false;
  }
  return values.some((v) => isNonEmptyString(v, options));
}

/**
 * Filters an array to only include non-empty strings.
 *
 * @param values - The array of values to filter
 * @param options - Validation options
 * @returns An array of non-empty strings
 *
 * @example
 * ```ts
 * filterNonEmptyStrings(["a", "", "b", null, "c"]) // ["a", "b", "c"]
 * ```
 */
export function filterNonEmptyStrings(
  values: unknown[],
  options: IsNonEmptyStringOptions = {},
): string[] {
  if (!Array.isArray(values)) {
    return [];
  }
  return values.filter((v): v is string => isNonEmptyString(v, options));
}

/**
 * Counts the number of non-empty strings in an array.
 *
 * @param values - The array of values to count
 * @param options - Validation options
 * @returns The number of non-empty strings
 *
 * @example
 * ```ts
 * countNonEmptyStrings(["a", "", "b", null, "c"]) // 3
 * ```
 */
export function countNonEmptyStrings(
  values: unknown[],
  options: IsNonEmptyStringOptions = {},
): number {
  if (!Array.isArray(values)) {
    return 0;
  }
  return values.filter((v) => isNonEmptyString(v, options)).length;
}

/**
 * Checks if an object has at least one non-empty string property.
 *
 * @param obj - The object to check
 * @param options - Validation options
 * @returns True if at least one property is a non-empty string, false otherwise
 *
 * @example
 * ```ts
 * hasNonEmptyStringProperty({ name: "Alice", age: 30 }) // true
 * hasNonEmptyStringProperty({ name: "", age: 30 }) // false
 * hasNonEmptyStringProperty({ age: 30 }) // false
 * ```
 */
export function hasNonEmptyStringProperty(
  obj: Record<string, unknown> | null | undefined,
  options: IsNonEmptyStringOptions = {},
): boolean {
  if (!obj || typeof obj !== "object") {
    return false;
  }
  return Object.values(obj).some((v) => isNonEmptyString(v, options));
}

/**
 * Gets the keys of non-empty string properties in an object.
 *
 * @param obj - The object to check
 * @param options - Validation options
 * @returns An array of keys with non-empty string values
 *
 * @example
 * ```ts
 * nonEmptyStringKeys({ name: "Alice", age: 30, email: "" }) // ["name"]
 * ```
 */
export function nonEmptyStringKeys(
  obj: Record<string, unknown> | null | undefined,
  options: IsNonEmptyStringOptions = {},
): string[] {
  if (!obj || typeof obj !== "object") {
    return [];
  }
  return Object.entries(obj)
    .filter(([, v]) => isNonEmptyString(v, options))
    .map(([k]) => k);
}

export default isNonEmptyString;
