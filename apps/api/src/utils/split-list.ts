/**
 * Helper for normalizing comma-separated query strings into trimmed string arrays.
 * Handles various separators, empty values, duplicates, and whitespace.
 */

/**
 * Options for splitting lists.
 */
export interface SplitListOptions {
  /** Separator to use (default: ",") */
  separator?: string | RegExp;
  /** Whether to trim each value (default: true) */
  trim?: boolean;
  /** Whether to remove empty values (default: true) */
  removeEmpty?: boolean;
  /** Whether to remove duplicate values (default: false) */
  unique?: boolean;
  /** Whether to convert to lowercase (default: false) */
  lowercase?: boolean;
  /** Whether to convert to uppercase (default: false) */
  uppercase?: boolean;
  /** Maximum number of values to return (default: undefined, no limit) */
  limit?: number;
  /** Default value to return for empty/invalid input (default: []) */
  defaultValue?: string[];
  /** Custom transform function to apply to each value */
  transform?: (value: string, index: number) => string;
  /** Custom filter function to apply to each value */
  filter?: (value: string, index: number, array: string[]) => boolean;
  /** Whether to preserve the original order when removing duplicates (default: true) */
  preserveOrder?: boolean;
  /** Whether to split on multiple separators (default: false) */
  splitOnMultiple?: boolean;
  /** Additional separators to split on if splitOnMultiple is true */
  additionalSeparators?: string[];
}

/**
 * Default options for splitting lists.
 */
export const DEFAULT_SPLIT_LIST_OPTIONS: Required<Omit<SplitListOptions, "separator" | "defaultValue" | "transform" | "filter" | "additionalSeparators" | "limit">> & {
  separator?: string | RegExp;
  defaultValue?: string[];
  transform?: SplitListOptions["transform"];
  filter?: SplitListOptions["filter"];
  additionalSeparators?: string[];
  limit?: number;
} = {
  separator: ",",
  trim: true,
  removeEmpty: true,
  unique: false,
  lowercase: false,
  uppercase: false,
  limit: undefined,
  defaultValue: undefined,
  transform: undefined,
  filter: undefined,
  preserveOrder: true,
  splitOnMultiple: false,
  additionalSeparators: undefined,
};

/**
 * Splits a comma-separated string into a trimmed string array.
 *
 * @param input - The input string or array to split
 * @param options - Splitting options
 * @returns The trimmed string array
 *
 * @example
 * ```ts
 * splitList("a, b, c") // ["a", "b", "c"]
 * splitList("a,,b,,c") // ["a", "b", "c"] (empty removed)
 * splitList("a, b, a, c", { unique: true }) // ["a", "b", "c"]
 * splitList("A, B, C", { lowercase: true }) // ["a", "b", "c"]
 * splitList("a;b;c", { separator: ";" }) // ["a", "b", "c"]
 * splitList("a, b, c, d, e", { limit: 3 }) // ["a", "b", "c"]
 * splitList("  a  ,  b  ") // ["a", "b"] (trimmed)
 * splitList(["a", "b", "c"]) // ["a", "b", "c"] (array passthrough with processing)
 * splitList(null) // []
 * splitList("") // []
 * ```
 */
export function splitList(
  input: string | string[] | null | undefined,
  options: SplitListOptions = {},
): string[] {
  const opts = { ...DEFAULT_SPLIT_LIST_OPTIONS, ...options };

  // Handle null/undefined
  if (input === null || input === undefined) {
    return opts.defaultValue ?? [];
  }

  let values: string[];

  // Handle arrays
  if (Array.isArray(input)) {
    values = input.map((v) => String(v));
  }
  // Handle strings
  else if (typeof input === "string") {
    // Handle empty string
    if (input === "") {
      return opts.defaultValue ?? [];
    }

    // Build separator pattern
    let separator: string | RegExp = opts.separator ?? ",";

    if (opts.splitOnMultiple) {
      const separators = [",", ...(opts.additionalSeparators ?? [])];
      const escaped = separators.map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
      separator = new RegExp(`[${escaped.join("")}]`);
    }

    // Split the string
    values = input.split(separator as string);
  }
  // Handle other types
  else {
    values = [String(input)];
  }

  // Process each value
  let result = values.map((value, index) => {
    let processed = value;

    // Trim
    if (opts.trim) {
      processed = processed.trim();
    }

    // Lowercase
    if (opts.lowercase) {
      processed = processed.toLowerCase();
    }

    // Uppercase
    if (opts.uppercase) {
      processed = processed.toUpperCase();
    }

    // Custom transform
    if (opts.transform) {
      processed = opts.transform(processed, index);
    }

    return processed;
  });

  // Remove empty values
  if (opts.removeEmpty) {
    result = result.filter((value) => value !== "");
  }

  // Custom filter
  if (opts.filter) {
    result = result.filter((value, index, array) => opts.filter!(value, index, array));
  }

  // Remove duplicates
  if (opts.unique) {
    if (opts.preserveOrder) {
      result = result.filter((value, index, self) => self.indexOf(value) === index);
    } else {
      result = [...new Set(result)];
    }
  }

  // Apply limit
  if (opts.limit !== undefined && opts.limit > 0) {
    result = result.slice(0, opts.limit);
  }

  return result;
}

/**
 * Splits a comma-separated string into a number array.
 *
 * @param input - The input string to split
 * @param options - Splitting options
 * @returns The number array (invalid numbers are filtered out)
 *
 * @example
 * ```ts
 * splitNumberList("1, 2, 3") // [1, 2, 3]
 * splitNumberList("1, abc, 3") // [1, 3] (invalid filtered)
 * splitNumberList("1.5, 2.7, 3.14") // [1.5, 2.7, 3.14]
 * ```
 */
export function splitNumberList(
  input: string | string[] | null | undefined,
  options: SplitListOptions = {},
): number[] {
  const values = splitList(input, options);
  return values
    .map((v) => Number(v))
    .filter((n) => !isNaN(n) && isFinite(n));
}

/**
 * Splits a comma-separated string into an integer array.
 *
 * @param input - The input string to split
 * @param options - Splitting options
 * @returns The integer array
 *
 * @example
 * ```ts
 * splitIntList("1, 2, 3") // [1, 2, 3]
 * splitIntList("1.5, 2.7, 3") // [1, 2, 3] (truncated)
 * splitIntList("1, abc, 3") // [1, 3]
 * ```
 */
export function splitIntList(
  input: string | string[] | null | undefined,
  options: SplitListOptions = {},
): number[] {
  const values = splitList(input, options);
  return values
    .map((v) => parseInt(v, 10))
    .filter((n) => !isNaN(n) && isFinite(n));
}

/**
 * Splits a comma-separated string into a boolean array.
 *
 * @param input - The input string to split
 * @param options - Splitting options
 * @returns The boolean array
 *
 * @example
 * ```ts
 * splitBooleanList("true, false, true") // [true, false, true]
 * splitBooleanList("1, 0, yes, no") // [true, false, true, false]
 * splitBooleanList("true, invalid, false") // [true, false]
 * ```
 */
export function splitBooleanList(
  input: string | string[] | null | undefined,
  options: SplitListOptions = {},
): boolean[] {
  const values = splitList(input, { ...options, lowercase: true });
  const truthy = new Set(["true", "1", "yes", "y", "on", "enabled", "active"]);
  const falsy = new Set(["false", "0", "no", "n", "off", "disabled", "inactive"]);

  return values
    .map((v) => {
      if (truthy.has(v)) return true;
      if (falsy.has(v)) return false;
      return null;
    })
    .filter((v): v is boolean => v !== null);
}

/**
 * Joins an array into a comma-separated string.
 *
 * @param values - The array to join
 * @param separator - The separator to use (default: ", ")
 * @returns The joined string
 *
 * @example
 * ```ts
 * joinList(["a", "b", "c"]) // "a, b, c"
 * joinList(["a", "b", "c"], ";") // "a;b;c"
 * ```
 */
export function joinList(
  values: unknown[] | null | undefined,
  separator = ", ",
): string {
  if (!Array.isArray(values)) {
    return "";
  }
  return values
    .map((v) => String(v))
    .filter((v) => v !== "")
    .join(separator);
}

/**
 * Checks if a value is in a comma-separated list.
 *
 * @param value - The value to check
 * @param list - The comma-separated list string or array
 * @param options - Splitting options
 * @returns True if the value is in the list, false otherwise
 *
 * @example
 * ```ts
 * inList("b", "a, b, c") // true
 * inList("d", "a, b, c") // false
 * inList("B", "a, b, c", { lowercase: true }) // true
 * ```
 */
export function inList(
  value: string,
  list: string | string[] | null | undefined,
  options: SplitListOptions = {},
): boolean {
  const values = splitList(list, options);
  let compareValue = value;

  if (options.trim) {
    compareValue = compareValue.trim();
  }
  if (options.lowercase) {
    compareValue = compareValue.toLowerCase();
  }
  if (options.uppercase) {
    compareValue = compareValue.toUpperCase();
  }

  return values.includes(compareValue);
}

/**
 * Adds a value to a comma-separated list if not already present.
 *
 * @param value - The value to add
 * @param list - The current comma-separated list string or array
 * @param options - Splitting options
 * @returns The updated list as a string
 *
 * @example
 * ```ts
 * addToList("d", "a, b, c") // "a, b, c, d"
 * addToList("b", "a, b, c") // "a, b, c" (already exists)
 * ```
 */
export function addToList(
  value: string,
  list: string | string[] | null | undefined,
  options: SplitListOptions = {},
): string {
  const values = splitList(list, { ...options, unique: true });
  let compareValue = value;

  if (options.trim) {
    compareValue = compareValue.trim();
  }
  if (options.lowercase) {
    compareValue = compareValue.toLowerCase();
  }
  if (options.uppercase) {
    compareValue = compareValue.toUpperCase();
  }

  if (!values.includes(compareValue)) {
    values.push(compareValue);
  }

  return joinList(values, options.separator === "," ? ", " : String(options.separator ?? ", "));
}

/**
 * Removes a value from a comma-separated list.
 *
 * @param value - The value to remove
 * @param list - The current comma-separated list string or array
 * @param options - Splitting options
 * @returns The updated list as a string
 *
 * @example
 * ```ts
 * removeFromList("b", "a, b, c") // "a, c"
 * removeFromList("d", "a, b, c") // "a, b, c" (not found)
 * ```
 */
export function removeFromList(
  value: string,
  list: string | string[] | null | undefined,
  options: SplitListOptions = {},
): string {
  const values = splitList(list, options);
  let compareValue = value;

  if (options.trim) {
    compareValue = compareValue.trim();
  }
  if (options.lowercase) {
    compareValue = compareValue.toLowerCase();
  }
  if (options.uppercase) {
    compareValue = compareValue.toUpperCase();
  }

  const filtered = values.filter((v) => v !== compareValue);
  return joinList(filtered, options.separator === "," ? ", " : String(options.separator ?? ", "));
}

export default splitList;
