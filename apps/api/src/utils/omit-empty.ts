/**
 * Small object helper for removing null, undefined, and empty-string values from payloads.
 * Provides robust object cleaning utilities for API inputs and payloads.
 */

/**
 * Options for omitting empty values.
 */
export interface OmitEmptyOptions {
  /** Whether to omit null values (default: true) */
  omitNull?: boolean;
  /** Whether to omit undefined values (default: true) */
  omitUndefined?: boolean;
  /** Whether to omit empty strings (default: true) */
  omitEmptyString?: boolean;
  /** Whether to trim strings before checking for empty (default: true) */
  trimStrings?: boolean;
  /** Whether to omit empty arrays (default: false) */
  omitEmptyArray?: boolean;
  /** Whether to omit empty objects (default: false) */
  omitEmptyObject?: boolean;
  /** Whether to omit zero values (default: false) */
  omitZero?: boolean;
  /** Whether to omit false values (default: false) */
  omitFalse?: boolean;
  /** Whether to recursively process nested objects (default: false) */
  deep?: boolean;
  /** Whether to recursively process arrays (default: false) */
  deepArrays?: boolean;
  /** Custom predicate function to determine if a value should be omitted */
  shouldOmit?: (value: unknown, key: string, obj: Record<string, unknown>) => boolean;
  /** Keys to always keep, even if they would be omitted */
  keepKeys?: string[];
  /** Keys to always omit, regardless of value */
  omitKeys?: string[];
}

/**
 * Default options for omitting empty values.
 */
export const DEFAULT_OMIT_EMPTY_OPTIONS: Required<Omit<OmitEmptyOptions, "shouldOmit" | "keepKeys" | "omitKeys">> & {
  shouldOmit?: OmitEmptyOptions["shouldOmit"];
  keepKeys?: string[];
  omitKeys?: string[];
} = {
  omitNull: true,
  omitUndefined: true,
  omitEmptyString: true,
  trimStrings: true,
  omitEmptyArray: false,
  omitEmptyObject: false,
  omitZero: false,
  omitFalse: false,
  deep: false,
  deepArrays: false,
  shouldOmit: undefined,
  keepKeys: undefined,
  omitKeys: undefined,
};

/**
 * Checks if a value is considered "empty" and should be omitted.
 *
 * @param value - The value to check
 * @param options - Options for determining emptiness
 * @returns True if the value should be omitted, false otherwise
 *
 * @example
 * ```ts
 * isEmptyValue(null) // true
 * isEmptyValue(undefined) // true
 * isEmptyValue("") // true
 * isEmptyValue("  ") // true (trimmed)
 * isEmptyValue("hello") // false
 * isEmptyValue(0) // false
 * isEmptyValue(false) // false
 * isEmptyValue([]) // false (by default)
 * isEmptyValue({}) // false (by default)
 * ```
 */
export function isEmptyValue(
  value: unknown,
  options: OmitEmptyOptions = {},
): boolean {
  const opts = { ...DEFAULT_OMIT_EMPTY_OPTIONS, ...options };

  // Check null
  if (opts.omitNull && value === null) {
    return true;
  }

  // Check undefined
  if (opts.omitUndefined && value === undefined) {
    return true;
  }

  // Check empty string
  if (opts.omitEmptyString && typeof value === "string") {
    const processed = opts.trimStrings ? value.trim() : value;
    if (processed === "") {
      return true;
    }
  }

  // Check empty array
  if (opts.omitEmptyArray && Array.isArray(value) && value.length === 0) {
    return true;
  }

  // Check empty object
  if (
    opts.omitEmptyObject &&
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    Object.keys(value).length === 0
  ) {
    return true;
  }

  // Check zero
  if (opts.omitZero && value === 0) {
    return true;
  }

  // Check false
  if (opts.omitFalse && value === false) {
    return true;
  }

  return false;
}

/**
 * Removes null, undefined, and empty-string values from an object.
 *
 * @param obj - The object to clean
 * @param options - Options for omitting empty values
 * @returns A new object with empty values removed
 *
 * @example
 * ```ts
 * omitEmpty({ a: 1, b: null, c: undefined, d: "", e: "hello" })
 * // { a: 1, e: "hello" }
 *
 * omitEmpty({ a: 1, b: "  ", c: "hello" })
 * // { a: 1, c: "hello" } (whitespace trimmed)
 *
 * omitEmpty({ a: 1, b: "", c: "hello" }, { omitEmptyString: false })
 * // { a: 1, b: "", c: "hello" }
 *
 * omitEmpty({ a: { b: null, c: 1 } }, { deep: true })
 * // { a: { c: 1 } }
 * ```
 */
export function omitEmpty<T extends Record<string, unknown>>(
  obj: T | null | undefined,
  options: OmitEmptyOptions = {},
): Partial<T> {
  if (!obj || typeof obj !== "object") {
    return {};
  }

  const opts = { ...DEFAULT_OMIT_EMPTY_OPTIONS, ...options };
  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(obj)) {
    // Check if key should always be omitted
    if (opts.omitKeys && opts.omitKeys.includes(key)) {
      continue;
    }

    // Check if key should always be kept
    if (opts.keepKeys && opts.keepKeys.includes(key)) {
      result[key] = value;
      continue;
    }

    // Check custom predicate
    if (opts.shouldOmit && opts.shouldOmit(value, key, obj)) {
      continue;
    }

    // Process nested objects if deep
    let processedValue = value;
    if (opts.deep && value !== null && typeof value === "object" && !Array.isArray(value)) {
      processedValue = omitEmpty(value as Record<string, unknown>, options);
      // If the nested object became empty and omitEmptyObject is true, skip it
      if (opts.omitEmptyObject && Object.keys(processedValue).length === 0) {
        continue;
      }
    }

    // Process arrays if deepArrays
    if (opts.deepArrays && Array.isArray(value)) {
      processedValue = value
        .map((item) => {
          if (item !== null && typeof item === "object" && !Array.isArray(item)) {
            return omitEmpty(item as Record<string, unknown>, options);
          }
          return item;
        })
        .filter((item) => !isEmptyValue(item, options));
    }

    // Check if value should be omitted
    if (!isEmptyValue(processedValue, options)) {
      result[key] = processedValue;
    }
  }

  return result as Partial<T>;
}

/**
 * Removes null and undefined values from an object (keeps empty strings).
 *
 * @param obj - The object to clean
 * @returns A new object with null and undefined values removed
 *
 * @example
 * ```ts
 * omitNullish({ a: 1, b: null, c: undefined, d: "" })
 * // { a: 1, d: "" }
 * ```
 */
export function omitNullish<T extends Record<string, unknown>>(
  obj: T | null | undefined,
): Partial<T> {
  return omitEmpty(obj, {
    omitNull: true,
    omitUndefined: true,
    omitEmptyString: false,
  });
}

/**
 * Removes undefined values from an object (keeps null and empty strings).
 *
 * @param obj - The object to clean
 * @returns A new object with undefined values removed
 *
 * @example
 * ```ts
 * omitUndefined({ a: 1, b: null, c: undefined, d: "" })
 * // { a: 1, b: null, d: "" }
 * ```
 */
export function omitUndefined<T extends Record<string, unknown>>(
  obj: T | null | undefined,
): Partial<T> {
  return omitEmpty(obj, {
    omitNull: false,
    omitUndefined: true,
    omitEmptyString: false,
  });
}

/**
 * Removes empty strings from an object (keeps null and undefined).
 *
 * @param obj - The object to clean
 * @returns A new object with empty strings removed
 *
 * @example
 * ```ts
 * omitEmptyStrings({ a: 1, b: null, c: undefined, d: "" })
 * // { a: 1, b: null, c: undefined }
 * ```
 */
export function omitEmptyStrings<T extends Record<string, unknown>>(
  obj: T | null | undefined,
): Partial<T> {
  return omitEmpty(obj, {
    omitNull: false,
    omitUndefined: false,
    omitEmptyString: true,
  });
}

/**
 * Removes falsy values (null, undefined, 0, false, "", NaN) from an object.
 *
 * @param obj - The object to clean
 * @returns A new object with falsy values removed
 *
 * @example
 * ```ts
 * omitFalsy({ a: 1, b: 0, c: false, d: "", e: null, f: undefined, g: "hello" })
 * // { a: 1, g: "hello" }
 * ```
 */
export function omitFalsy<T extends Record<string, unknown>>(
  obj: T | null | undefined,
): Partial<T> {
  if (!obj || typeof obj !== "object") {
    return {};
  }

  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value) {
      result[key] = value;
    }
  }
  return result as Partial<T>;
}

/**
 * Counts the number of non-empty values in an object.
 *
 * @param obj - The object to count
 * @param options - Options for determining emptiness
 * @returns The number of non-empty values
 *
 * @example
 * ```ts
 * countNonEmpty({ a: 1, b: null, c: "", d: "hello" }) // 2
 * ```
 */
export function countNonEmpty(
  obj: Record<string, unknown> | null | undefined,
  options: OmitEmptyOptions = {},
): number {
  if (!obj || typeof obj !== "object") {
    return 0;
  }
  return Object.values(obj).filter((v) => !isEmptyValue(v, options)).length;
}

/**
 * Gets the keys of non-empty values in an object.
 *
 * @param obj - The object to check
 * @param options - Options for determining emptiness
 * @returns An array of keys with non-empty values
 *
 * @example
 * ```ts
 * nonEmptyKeys({ a: 1, b: null, c: "", d: "hello" }) // ["a", "d"]
 * ```
 */
export function nonEmptyKeys(
  obj: Record<string, unknown> | null | undefined,
  options: OmitEmptyOptions = {},
): string[] {
  if (!obj || typeof obj !== "object") {
    return [];
  }
  return Object.entries(obj)
    .filter(([, v]) => !isEmptyValue(v, options))
    .map(([k]) => k);
}

/**
 * Gets the keys of empty values in an object.
 *
 * @param obj - The object to check
 * @param options - Options for determining emptiness
 * @returns An array of keys with empty values
 *
 * @example
 * ```ts
 * emptyKeys({ a: 1, b: null, c: "", d: "hello" }) // ["b", "c"]
 * ```
 */
export function emptyKeys(
  obj: Record<string, unknown> | null | undefined,
  options: OmitEmptyOptions = {},
): string[] {
  if (!obj || typeof obj !== "object") {
    return [];
  }
  return Object.entries(obj)
    .filter(([, v]) => isEmptyValue(v, options))
    .map(([k]) => k);
}

/**
 * Checks if an object has any empty values.
 *
 * @param obj - The object to check
 * @param options - Options for determining emptiness
 * @returns True if the object has at least one empty value, false otherwise
 *
 * @example
 * ```ts
 * hasEmptyValues({ a: 1, b: null }) // true
 * hasEmptyValues({ a: 1, b: "hello" }) // false
 * ```
 */
export function hasEmptyValues(
  obj: Record<string, unknown> | null | undefined,
  options: OmitEmptyOptions = {},
): boolean {
  if (!obj || typeof obj !== "object") {
    return false;
  }
  return Object.values(obj).some((v) => isEmptyValue(v, options));
}

/**
 * Picks only the specified keys from an object, omitting empty values.
 *
 * @param obj - The source object
 * @param keys - The keys to pick
 * @param options - Options for omitting empty values
 * @returns A new object with only the specified non-empty keys
 *
 * @example
 * ```ts
 * pickNonEmpty({ a: 1, b: null, c: "hello", d: 2 }, ["a", "b", "c"])
 * // { a: 1, c: "hello" }
 * ```
 */
export function pickNonEmpty<T extends Record<string, unknown>>(
  obj: T | null | undefined,
  keys: string[],
  options: OmitEmptyOptions = {},
): Partial<T> {
  if (!obj || typeof obj !== "object" || !Array.isArray(keys)) {
    return {};
  }

  const result: Record<string, unknown> = {};
  for (const key of keys) {
    if (key in obj && !isEmptyValue(obj[key], options)) {
      result[key] = obj[key];
    }
  }
  return result as Partial<T>;
}

export default omitEmpty;
