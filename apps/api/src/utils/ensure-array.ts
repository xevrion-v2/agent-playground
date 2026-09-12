/**
 * Generic helper for normalizing optional scalar-or-array values into arrays.
 * Ensures consistent array handling for API inputs and internal processing.
 */

/**
 * Options for ensureArray.
 */
export interface EnsureArrayOptions {
  /** Whether to filter out null/undefined values (default: false) */
  filterNullish?: boolean;
  /** Whether to filter out falsy values (default: false) */
  filterFalsy?: boolean;
  /** Whether to remove duplicate values (default: false) */
  unique?: boolean;
  /** Whether to flatten nested arrays (default: false) */
  flatten?: boolean;
  /** Maximum depth for flattening (default: Infinity) */
  flattenDepth?: number;
  /** Default value to return if input is null/undefined (default: []) */
  defaultValue?: unknown[];
  /** Whether to treat strings as scalars (not arrays of characters) (default: true) */
  treatStringAsScalar?: boolean;
  /** Custom equality function for unique filtering (default: strict equality) */
  equalityFn?: (a: unknown, b: unknown) => boolean;
}

/**
 * Default options for ensureArray.
 */
export const DEFAULT_ENSURE_ARRAY_OPTIONS: Required<Omit<EnsureArrayOptions, "defaultValue" | "equalityFn">> & {
  defaultValue?: unknown[];
  equalityFn?: (a: unknown, b: unknown) => boolean;
} = {
  filterNullish: false,
  filterFalsy: false,
  unique: false,
  flatten: false,
  flattenDepth: Infinity,
  defaultValue: undefined,
  treatStringAsScalar: true,
  equalityFn: undefined,
};

/**
 * Normalizes a scalar or array value into an array.
 *
 * @param value - The value to normalize (scalar, array, null, or undefined)
 * @param options - Normalization options
 * @returns The normalized array
 *
 * @example
 * ```ts
 * ensureArray("hello") // ["hello"]
 * ensureArray(["a", "b"]) // ["a", "b"]
 * ensureArray(null) // []
 * ensureArray(undefined) // []
 * ensureArray(42) // [42]
 * ensureArray([1, [2, 3]], { flatten: true }) // [1, 2, 3]
 * ensureArray([1, 1, 2, 2, 3], { unique: true }) // [1, 2, 3]
 * ensureArray([1, null, 2, undefined, 3], { filterNullish: true }) // [1, 2, 3]
 * ensureArray([0, 1, false, 2, "", 3], { filterFalsy: true }) // [1, 2, 3]
 * ensureArray(null, { defaultValue: ["default"] }) // ["default"]
 * ```
 */
export function ensureArray<T = unknown>(
  value: T | T[] | null | undefined,
  options: EnsureArrayOptions = {},
): T[] {
  const opts = { ...DEFAULT_ENSURE_ARRAY_OPTIONS, ...options };

  // Handle null/undefined
  if (value === null || value === undefined) {
    return (opts.defaultValue ?? []) as T[];
  }

  let result: T[];

  // Handle arrays
  if (Array.isArray(value)) {
    result = [...value];
  }
  // Handle strings (treat as scalar by default)
  else if (typeof value === "string" && opts.treatStringAsScalar) {
    result = [value];
  }
  // Handle other iterables (Set, Map, NodeList, etc.)
  else if (
    typeof value === "object" &&
    value !== null &&
    typeof (value as Iterable<T>)[Symbol.iterator] === "function" &&
    !(value instanceof Date) &&
    !(value instanceof RegExp)
  ) {
    try {
      result = Array.from(value as Iterable<T>);
    } catch {
      result = [value as T];
    }
  }
  // Handle scalars
  else {
    result = [value as T];
  }

  // Flatten nested arrays if requested
  if (opts.flatten) {
    result = flattenArray(result, opts.flattenDepth) as T[];
  }

  // Filter nullish values if requested
  if (opts.filterNullish) {
    result = result.filter((item) => item !== null && item !== undefined) as T[];
  }

  // Filter falsy values if requested
  if (opts.filterFalsy) {
    result = result.filter((item) => Boolean(item)) as T[];
  }

  // Remove duplicates if requested
  if (opts.unique) {
    if (opts.equalityFn) {
      result = result.filter((item, index, self) =>
        self.findIndex((other) => opts.equalityFn!(item, other)) === index,
      ) as T[];
    } else {
      result = [...new Set(result)] as T[];
    }
  }

  return result;
}

/**
 * Recursively flattens an array to the specified depth.
 */
function flattenArray(arr: unknown[], depth: number): unknown[] {
  if (depth <= 0) {
    return arr;
  }

  return arr.reduce<unknown[]>((acc, item) => {
    if (Array.isArray(item)) {
      return acc.concat(flattenArray(item, depth - 1));
    }
    acc.push(item);
    return acc;
  }, []);
}

/**
 * Ensures a value is an array and returns the first element or a default.
 * Useful for extracting a single value from a potentially-array input.
 *
 * @param value - The value to normalize
 * @param defaultValue - Default value if array is empty (default: undefined)
 * @returns The first element of the array, or the default value
 *
 * @example
 * ```ts
 * ensureFirst("hello") // "hello"
 * ensureFirst(["a", "b"]) // "a"
 * ensureFirst([]) // undefined
 * ensureFirst([], "default") // "default"
 * ensureFirst(null, "default") // "default"
 * ```
 */
export function ensureFirst<T = unknown>(
  value: T | T[] | null | undefined,
  defaultValue?: T,
): T | undefined {
  const arr = ensureArray(value);
  return arr.length > 0 ? arr[0] : defaultValue;
}

/**
 * Ensures a value is an array and returns the last element or a default.
 *
 * @param value - The value to normalize
 * @param defaultValue - Default value if array is empty (default: undefined)
 * @returns The last element of the array, or the default value
 *
 * @example
 * ```ts
 * ensureLast("hello") // "hello"
 * ensureLast(["a", "b"]) // "b"
 * ensureLast([]) // undefined
 * ensureLast([], "default") // "default"
 * ```
 */
export function ensureLast<T = unknown>(
  value: T | T[] | null | undefined,
  defaultValue?: T,
): T | undefined {
  const arr = ensureArray(value);
  return arr.length > 0 ? arr[arr.length - 1] : defaultValue;
}

/**
 * Checks if a value is an array with at least one element.
 *
 * @param value - The value to check
 * @returns True if the value is a non-empty array, false otherwise
 *
 * @example
 * ```ts
 * isNonEmptyArray(["a"]) // true
 * isNonEmptyArray([]) // false
 * isNonEmptyArray("hello") // false
 * isNonEmptyArray(null) // false
 * ```
 */
export function isNonEmptyArray(value: unknown): value is unknown[] {
  return Array.isArray(value) && value.length > 0;
}

/**
 * Checks if a value is an array (including empty arrays).
 *
 * @param value - The value to check
 * @returns True if the value is an array, false otherwise
 *
 * @example
 * ```ts
 * isArray(["a"]) // true
 * isArray([]) // true
 * isArray("hello") // false
 * isArray(null) // false
 * ```
 */
export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

/**
 * Converts a value to an array if it's not already, preserving null/undefined.
 * Unlike ensureArray, this returns null/undefined as-is instead of an empty array.
 *
 * @param value - The value to convert
 * @returns The array, or null/undefined if input was null/undefined
 *
 * @example
 * ```ts
 * toArray("hello") // ["hello"]
 * toArray(["a", "b"]) // ["a", "b"]
 * toArray(null) // null
 * toArray(undefined) // undefined
 * ```
 */
export function toArray<T = unknown>(
  value: T | T[] | null | undefined,
): T[] | null | undefined {
  if (value === null) return null;
  if (value === undefined) return undefined;
  return ensureArray(value);
}

/**
 * Splits an array into chunks of the specified size.
 *
 * @param value - The value to chunk (will be normalized to an array)
 * @param size - The chunk size (default: 1)
 * @returns An array of chunks
 *
 * @example
 * ```ts
 * chunk([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
 * chunk("hello", 2) // [["h", "e"], ["l", "l"], ["o"]]
 * chunk([], 3) // []
 * ```
 */
export function chunk<T = unknown>(
  value: T | T[] | null | undefined,
  size = 1,
): T[][] {
  const arr = ensureArray(value);
  const chunkSize = Math.max(1, Math.floor(size));
  const chunks: T[][] = [];

  for (let i = 0; i < arr.length; i += chunkSize) {
    chunks.push(arr.slice(i, i + chunkSize));
  }

  return chunks;
}

export default ensureArray;
