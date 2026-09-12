/**
 * Defined-value picker helper for API payload objects.
 * Removes undefined (and optionally null) values from objects before persistence or response shaping.
 */

/**
 * Options for pickDefined.
 */
export interface PickDefinedOptions {
  /** Whether to also remove null values (default: false) */
  removeNull?: boolean;
  /** Whether to also remove empty strings (default: false) */
  removeEmptyString?: boolean;
  /** Whether to also remove empty arrays (default: false) */
  removeEmptyArray?: boolean;
  /** Whether to also remove empty objects (default: false) */
  removeEmptyObject?: boolean;
  /** Whether to recursively process nested objects (default: false) */
  deep?: boolean;
  /** Maximum depth for recursive processing (default: Infinity) */
  maxDepth?: number;
  /** Whether to preserve the original object's prototype (default: true) */
  preservePrototype?: boolean;
  /** Custom predicate function to determine if a value should be removed */
  shouldRemove?: (value: unknown, key: string, obj: Record<string, unknown>) => boolean;
}

/**
 * Default options for pickDefined.
 */
export const DEFAULT_PICK_DEFINED_OPTIONS: Required<Omit<PickDefinedOptions, "shouldRemove">> & {
  shouldRemove?: PickDefinedOptions["shouldRemove"];
} = {
  removeNull: false,
  removeEmptyString: false,
  removeEmptyArray: false,
  removeEmptyObject: false,
  deep: false,
  maxDepth: Infinity,
  preservePrototype: true,
  shouldRemove: undefined,
};

/**
 * Checks if a value is "defined" (not undefined, and optionally not null/empty).
 */
function isDefinedValue(
  value: unknown,
  key: string,
  obj: Record<string, unknown>,
  opts: typeof DEFAULT_PICK_DEFINED_OPTIONS & { shouldRemove?: PickDefinedOptions["shouldRemove"] },
): boolean {
  // Custom predicate takes precedence
  if (opts.shouldRemove) {
    return !opts.shouldRemove(value, key, obj);
  }

  // Always remove undefined
  if (value === undefined) {
    return false;
  }

  // Optionally remove null
  if (opts.removeNull && value === null) {
    return false;
  }

  // Optionally remove empty strings
  if (opts.removeEmptyString && typeof value === "string" && value === "") {
    return false;
  }

  // Optionally remove empty arrays
  if (opts.removeEmptyArray && Array.isArray(value) && value.length === 0) {
    return false;
  }

  // Optionally remove empty objects
  if (
    opts.removeEmptyObject &&
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    Object.keys(value).length === 0
  ) {
    return false;
  }

  return true;
}

/**
 * Removes undefined values from a flat object.
 *
 * @param obj - The object to process
 * @param options - Processing options
 * @returns A new object with undefined values removed
 *
 * @example
 * ```ts
 * pickDefined({ a: 1, b: undefined, c: "hello" }) // { a: 1, c: "hello" }
 * pickDefined({ a: 1, b: null, c: "hello" }, { removeNull: true }) // { a: 1, c: "hello" }
 * pickDefined({ a: 1, b: "", c: "hello" }, { removeEmptyString: true }) // { a: 1, c: "hello" }
 * pickDefined({ a: { b: undefined, c: 1 } }, { deep: true }) // { a: { c: 1 } }
 * ```
 */
export function pickDefined<T extends Record<string, unknown>>(
  obj: T | null | undefined,
  options: PickDefinedOptions = {},
): Partial<T> {
  if (obj === null || obj === undefined) {
    return {};
  }

  if (typeof obj !== "object" || Array.isArray(obj)) {
    return obj as unknown as Partial<T>;
  }

  const opts = { ...DEFAULT_PICK_DEFINED_OPTIONS, ...options };
  const result: Record<string, unknown> = {};

  for (const key of Object.keys(obj)) {
    const value = obj[key];

    // Recursively process nested objects if deep mode is enabled
    if (
      opts.deep &&
      typeof value === "object" &&
      value !== null &&
      !Array.isArray(value) &&
      opts.maxDepth > 0
    ) {
      const nestedResult = pickDefined(value as Record<string, unknown>, {
        ...opts,
        maxDepth: opts.maxDepth - 1,
      });

      // Only add the nested object if it has any defined properties
      if (Object.keys(nestedResult).length > 0 || !opts.removeEmptyObject) {
        if (isDefinedValue(nestedResult, key, obj, opts)) {
          result[key] = nestedResult;
        }
      }
      continue;
    }

    if (isDefinedValue(value, key, obj, opts)) {
      result[key] = value;
    }
  }

  // Preserve prototype if requested
  if (opts.preservePrototype && Object.getPrototypeOf(obj) !== Object.prototype) {
    Object.setPrototypeOf(result, Object.getPrototypeOf(obj));
  }

  return result as Partial<T>;
}

/**
 * Removes undefined values from an object and returns a typed version.
 * Similar to pickDefined but with stricter TypeScript typing.
 *
 * @param obj - The object to process
 * @param options - Processing options
 * @returns A new object with only defined values
 *
 * @example
 * ```ts
 * interface User { name: string; age?: number; email?: string }
 * const user: User = { name: "Alice", age: undefined, email: "alice@example.com" }
 * const cleaned = cleanObject(user) // { name: "Alice", email: "alice@example.com" }
 * ```
 */
export function cleanObject<T extends Record<string, unknown>>(
  obj: T | null | undefined,
  options: PickDefinedOptions = {},
): Partial<T> {
  return pickDefined(obj, options);
}

/**
 * Picks specific keys from an object, only including defined values.
 *
 * @param obj - The source object
 * @param keys - The keys to pick
 * @param options - Processing options
 * @returns A new object with only the specified keys that have defined values
 *
 * @example
 * ```ts
 * pickDefinedKeys({ a: 1, b: undefined, c: "hello" }, ["a", "b"]) // { a: 1 }
 * pickDefinedKeys({ a: 1, b: null, c: "hello" }, ["a", "b"], { removeNull: true }) // { a: 1 }
 * ```
 */
export function pickDefinedKeys<T extends Record<string, unknown>, K extends keyof T>(
  obj: T | null | undefined,
  keys: K[],
  options: PickDefinedOptions = {},
): Partial<Pick<T, K>> {
  if (obj === null || obj === undefined) {
    return {};
  }

  const opts = { ...DEFAULT_PICK_DEFINED_OPTIONS, ...options };
  const result: Record<string, unknown> = {};

  for (const key of keys) {
    const value = obj[key];
    if (isDefinedValue(value, String(key), obj as Record<string, unknown>, opts)) {
      result[String(key)] = value;
    }
  }

  return result as Partial<Pick<T, K>>;
}

/**
 * Omits specific keys from an object, only including defined values.
 *
 * @param obj - The source object
 * @param keys - The keys to omit
 * @param options - Processing options
 * @returns A new object without the specified keys, with only defined values
 *
 * @example
 * ```ts
 * omitDefinedKeys({ a: 1, b: undefined, c: "hello" }, ["c"]) // { a: 1 }
 * omitDefinedKeys({ a: 1, b: null, c: "hello" }, ["c"], { removeNull: true }) // { a: 1 }
 * ```
 */
export function omitDefinedKeys<T extends Record<string, unknown>, K extends keyof T>(
  obj: T | null | undefined,
  keys: K[],
  options: PickDefinedOptions = {},
): Partial<Omit<T, K>> {
  if (obj === null || obj === undefined) {
    return {};
  }

  const keySet = new Set(keys as string[]);
  const opts = { ...DEFAULT_PICK_DEFINED_OPTIONS, ...options };
  const result: Record<string, unknown> = {};

  for (const key of Object.keys(obj)) {
    if (keySet.has(key)) {
      continue;
    }
    const value = obj[key];
    if (isDefinedValue(value, key, obj as Record<string, unknown>, opts)) {
      result[key] = value;
    }
  }

  return result as Partial<Omit<T, K>>;
}

/**
 * Checks if an object has any defined (non-undefined) values.
 *
 * @param obj - The object to check
 * @param options - Processing options
 * @returns True if the object has at least one defined value, false otherwise
 *
 * @example
 * ```ts
 * hasDefinedValues({ a: 1, b: undefined }) // true
 * hasDefinedValues({ a: undefined, b: undefined }) // false
 * hasDefinedValues({}) // false
 * hasDefinedValues(null) // false
 * ```
 */
export function hasDefinedValues(
  obj: Record<string, unknown> | null | undefined,
  options: PickDefinedOptions = {},
): boolean {
  if (obj === null || obj === undefined) {
    return false;
  }

  const opts = { ...DEFAULT_PICK_DEFINED_OPTIONS, ...options };

  for (const key of Object.keys(obj)) {
    if (isDefinedValue(obj[key], key, obj, opts)) {
      return true;
    }
  }

  return false;
}

/**
 * Counts the number of defined values in an object.
 *
 * @param obj - The object to count
 * @param options - Processing options
 * @returns The number of defined values
 *
 * @example
 * ```ts
 * countDefinedValues({ a: 1, b: undefined, c: "hello" }) // 2
 * countDefinedValues({ a: undefined, b: undefined }) // 0
 * countDefinedValues(null) // 0
 * ```
 */
export function countDefinedValues(
  obj: Record<string, unknown> | null | undefined,
  options: PickDefinedOptions = {},
): number {
  if (obj === null || obj === undefined) {
    return 0;
  }

  const opts = { ...DEFAULT_PICK_DEFINED_OPTIONS, ...options };
  let count = 0;

  for (const key of Object.keys(obj)) {
    if (isDefinedValue(obj[key], key, obj, opts)) {
      count++;
    }
  }

  return count;
}

/**
 * Gets the keys of defined values in an object.
 *
 * @param obj - The object to process
 * @param options - Processing options
 * @returns An array of keys with defined values
 *
 * @example
 * ```ts
 * definedKeys({ a: 1, b: undefined, c: "hello" }) // ["a", "c"]
 * definedKeys({ a: undefined, b: undefined }) // []
 * definedKeys(null) // []
 * ```
 */
export function definedKeys(
  obj: Record<string, unknown> | null | undefined,
  options: PickDefinedOptions = {},
): string[] {
  if (obj === null || obj === undefined) {
    return [];
  }

  const opts = { ...DEFAULT_PICK_DEFINED_OPTIONS, ...options };
  const keys: string[] = [];

  for (const key of Object.keys(obj)) {
    if (isDefinedValue(obj[key], key, obj, opts)) {
      keys.push(key);
    }
  }

  return keys;
}

/**
 * Gets the values of defined properties in an object.
 *
 * @param obj - The object to process
 * @param options - Processing options
 * @returns An array of defined values
 *
 * @example
 * ```ts
 * definedValues({ a: 1, b: undefined, c: "hello" }) // [1, "hello"]
 * definedValues({ a: undefined, b: undefined }) // []
 * definedValues(null) // []
 * ```
 */
export function definedValues(
  obj: Record<string, unknown> | null | undefined,
  options: PickDefinedOptions = {},
): unknown[] {
  if (obj === null || obj === undefined) {
    return [];
  }

  const opts = { ...DEFAULT_PICK_DEFINED_OPTIONS, ...options };
  const values: unknown[] = [];

  for (const key of Object.keys(obj)) {
    if (isDefinedValue(obj[key], key, obj, opts)) {
      values.push(obj[key]);
    }
  }

  return values;
}

export default pickDefined;
