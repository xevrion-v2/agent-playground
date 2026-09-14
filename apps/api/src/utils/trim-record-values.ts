/**
 * Record value trimming helper for API input records.
 * Trims string values in flat objects while preserving non-string fields.
 */

/**
 * Options for trimming record values.
 */
export interface TrimRecordValuesOptions {
  /** Whether to trim leading whitespace (default: true) */
  trimStart?: boolean;
  /** Whether to trim trailing whitespace (default: true) */
  trimEnd?: boolean;
  /** Whether to collapse multiple internal spaces into one (default: false) */
  collapseWhitespace?: boolean;
  /** Whether to remove empty strings (set to undefined) (default: false) */
  removeEmptyStrings?: boolean;
  /** Whether to convert empty strings to null (default: false) */
  emptyStringsToNull?: boolean;
  /** Whether to normalize Unicode whitespace (default: false) */
  normalizeWhitespace?: boolean;
  /** Whether to trim string values in nested objects (default: false) */
  deep?: boolean;
  /** Maximum depth for deep trimming (default: Infinity) */
  maxDepth?: number;
  /** Keys to skip during trimming */
  skipKeys?: string[];
  /** Keys to specifically trim (if set, only these keys are trimmed) */
  onlyKeys?: string[];
  /** Whether to preserve the original object's prototype (default: true) */
  preservePrototype?: boolean;
  /** Custom trim function to use instead of default */
  trimFunction?: (value: string) => string;
}

/**
 * Default options for trimming record values.
 */
export const DEFAULT_TRIM_RECORD_VALUES_OPTIONS: Required<Omit<TrimRecordValuesOptions, "skipKeys" | "onlyKeys" | "trimFunction" | "maxDepth">> & {
  skipKeys?: string[];
  onlyKeys?: string[];
  trimFunction?: TrimRecordValuesOptions["trimFunction"];
  maxDepth?: number;
} = {
  trimStart: true,
  trimEnd: true,
  collapseWhitespace: false,
  removeEmptyStrings: false,
  emptyStringsToNull: false,
  normalizeWhitespace: false,
  deep: false,
  maxDepth: Infinity,
  skipKeys: undefined,
  onlyKeys: undefined,
  preservePrototype: true,
  trimFunction: undefined,
};

/**
 * Trims a string value according to options.
 */
function trimStringValue(value: string, opts: typeof DEFAULT_TRIM_RECORD_VALUES_OPTIONS): string | null | undefined {
  let result = value;

  // Normalize Unicode whitespace
  if (opts.normalizeWhitespace) {
    result = result.replace(/[\u00A0\u1680\u180E\u2000-\u200B\u202F\u205F\u3000\uFEFF]/g, " ");
  }

  // Use custom trim function if provided
  if (opts.trimFunction) {
    result = opts.trimFunction(result);
  } else {
    // Trim start
    if (opts.trimStart) {
      result = result.trimStart();
    }
    // Trim end
    if (opts.trimEnd) {
      result = result.trimEnd();
    }
  }

  // Collapse multiple internal spaces
  if (opts.collapseWhitespace) {
    result = result.replace(/\s+/g, " ");
  }

  // Handle empty strings
  if (result === "") {
    if (opts.removeEmptyStrings) {
      return undefined;
    }
    if (opts.emptyStringsToNull) {
      return null;
    }
  }

  return result;
}

/**
 * Checks if a key should be trimmed based on options.
 */
function shouldTrimKey(key: string, opts: typeof DEFAULT_TRIM_RECORD_VALUES_OPTIONS): boolean {
  // Skip specific keys
  if (opts.skipKeys && opts.skipKeys.includes(key)) {
    return false;
  }

  // Only trim specific keys if set
  if (opts.onlyKeys && opts.onlyKeys.length > 0) {
    return opts.onlyKeys.includes(key);
  }

  return true;
}

/**
 * Trims string values in a flat object while preserving non-string fields.
 *
 * @param record - The record to trim
 * @param options - Trimming options
 * @returns A new record with trimmed string values
 *
 * @example
 * ```ts
 * trimRecordValues({ name: "  Alice  ", age: 30, email: "alice@example.com" })
 * // { name: "Alice", age: 30, email: "alice@example.com" }
 *
 * trimRecordValues({ name: "  Alice  ", bio: "  Hello   World  " }, { collapseWhitespace: true })
 * // { name: "Alice", bio: "Hello World" }
 *
 * trimRecordValues({ name: "  ", age: 30 }, { removeEmptyStrings: true })
 * // { name: undefined, age: 30 }
 *
 * trimRecordValues({ name: "  Alice  ", password: "  secret  " }, { skipKeys: ["password"] })
 * // { name: "Alice", password: "  secret  " }
 * ```
 */
export function trimRecordValues<T extends Record<string, unknown>>(
  record: T | null | undefined,
  options: TrimRecordValuesOptions = {},
): Partial<T> {
  if (record === null || record === undefined) {
    return {};
  }

  if (typeof record !== "object" || Array.isArray(record)) {
    return record as unknown as Partial<T>;
  }

  const opts = { ...DEFAULT_TRIM_RECORD_VALUES_OPTIONS, ...options };
  const result: Record<string, unknown> = {};

  for (const key of Object.keys(record)) {
    const value = record[key];

    // Skip keys that shouldn't be trimmed
    if (!shouldTrimKey(key, opts)) {
      result[key] = value;
      continue;
    }

    // Handle strings
    if (typeof value === "string") {
      const trimmed = trimStringValue(value, opts);
      if (trimmed === undefined) {
        // Don't include the key if removeEmptyStrings is true and value is empty
        continue;
      }
      result[key] = trimmed;
      continue;
    }

    // Handle nested objects in deep mode
    if (
      opts.deep &&
      typeof value === "object" &&
      value !== null &&
      !Array.isArray(value) &&
      opts.maxDepth > 0
    ) {
      result[key] = trimRecordValues(value as Record<string, unknown>, {
        ...opts,
        maxDepth: opts.maxDepth - 1,
      });
      continue;
    }

    // Preserve non-string fields
    result[key] = value;
  }

  // Preserve prototype if requested
  if (opts.preservePrototype && Object.getPrototypeOf(record) !== Object.prototype) {
    Object.setPrototypeOf(result, Object.getPrototypeOf(record));
  }

  return result as Partial<T>;
}

/**
 * Trims string values in an array of records.
 *
 * @param records - The array of records to trim
 * @param options - Trimming options
 * @returns A new array of records with trimmed string values
 *
 * @example
 * ```ts
 * trimRecords([{ name: "  Alice  " }, { name: "  Bob  " }])
 * // [{ name: "Alice" }, { name: "Bob" }]
 * ```
 */
export function trimRecords<T extends Record<string, unknown>>(
  records: T[] | null | undefined,
  options: TrimRecordValuesOptions = {},
): Partial<T>[] {
  if (!Array.isArray(records)) {
    return [];
  }
  return records.map((record) => trimRecordValues(record, options));
}

/**
 * Trims a single string value.
 *
 * @param value - The string to trim
 * @param options - Trimming options
 * @returns The trimmed string
 *
 * @example
 * ```ts
 * trimString("  Hello  ") // "Hello"
 * trimString("  Hello   World  ", { collapseWhitespace: true }) // "Hello World"
 * ```
 */
export function trimString(
  value: string | null | undefined,
  options: Omit<TrimRecordValuesOptions, "deep" | "maxDepth" | "skipKeys" | "onlyKeys" | "preservePrototype"> = {},
): string | null | undefined {
  if (value === null || value === undefined) {
    return value;
  }

  if (typeof value !== "string") {
    return String(value);
  }

  const opts = { ...DEFAULT_TRIM_RECORD_VALUES_OPTIONS, ...options };
  return trimStringValue(value, opts);
}

/**
 * Checks if a record has any non-empty string values.
 *
 * @param record - The record to check
 * @returns True if the record has at least one non-empty string value, false otherwise
 *
 * @example
 * ```ts
 * hasNonEmptyStrings({ name: "Alice", age: 30 }) // true
 * hasNonEmptyStrings({ name: "", age: 30 }) // false
 * hasNonEmptyStrings({ name: "  ", age: 30 }) // false (whitespace-only counts as empty)
 * ```
 */
export function hasNonEmptyStrings(record: Record<string, unknown> | null | undefined): boolean {
  if (record === null || record === undefined || typeof record !== "object") {
    return false;
  }

  for (const value of Object.values(record)) {
    if (typeof value === "string" && value.trim() !== "") {
      return true;
    }
  }

  return false;
}

/**
 * Counts non-empty string values in a record.
 *
 * @param record - The record to count
 * @returns The number of non-empty string values
 *
 * @example
 * ```ts
 * countNonEmptyStrings({ name: "Alice", age: 30, email: "" }) // 1
 * countNonEmptyStrings({ name: "", age: 30 }) // 0
 * ```
 */
export function countNonEmptyStrings(record: Record<string, unknown> | null | undefined): number {
  if (record === null || record === undefined || typeof record !== "object") {
    return 0;
  }

  let count = 0;
  for (const value of Object.values(record)) {
    if (typeof value === "string" && value.trim() !== "") {
      count++;
    }
  }

  return count;
}

/**
 * Gets the keys of non-empty string values in a record.
 *
 * @param record - The record to process
 * @returns An array of keys with non-empty string values
 *
 * @example
 * ```ts
 * nonEmptyStringKeys({ name: "Alice", age: 30, email: "" }) // ["name"]
 * nonEmptyStringKeys({ name: "", age: 30 }) // []
 * ```
 */
export function nonEmptyStringKeys(record: Record<string, unknown> | null | undefined): string[] {
  if (record === null || record === undefined || typeof record !== "object") {
    return [];
  }

  const keys: string[] = [];
  for (const [key, value] of Object.entries(record)) {
    if (typeof value === "string" && value.trim() !== "") {
      keys.push(key);
    }
  }

  return keys;
}

/**
 * Removes keys with empty or whitespace-only string values from a record.
 *
 * @param record - The record to clean
 * @returns A new record without empty string values
 *
 * @example
 * ```ts
 * removeEmptyStrings({ name: "Alice", age: 30, email: "", bio: "  " })
 * // { name: "Alice", age: 30 }
 * ```
 */
export function removeEmptyStrings<T extends Record<string, unknown>>(
  record: T | null | undefined,
): Partial<T> {
  return trimRecordValues(record, { removeEmptyStrings: true });
}

export default trimRecordValues;
