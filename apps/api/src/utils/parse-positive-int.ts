/**
 * Positive integer parser helper for query and pagination inputs.
 * Safely parses positive integers with configurable bounds and fallbacks.
 */

/**
 * Options for positive integer parsing.
 */
export interface ParsePositiveIntOptions {
  /** Minimum allowed value (default: 1) */
  min?: number;
  /** Maximum allowed value (default: undefined, no max) */
  max?: number;
  /** Default value to return if parsing fails (default: 1) */
  defaultValue?: number;
  /** Whether to clamp out-of-range values to min/max (default: true) */
  clamp?: boolean;
  /** Whether to allow zero (default: false) */
  allowZero?: boolean;
  /** Whether to allow negative values (default: false) */
  allowNegative?: boolean;
  /** Whether to parse floating point numbers by truncating (default: false) */
  truncateFloat?: boolean;
}

/**
 * Result type for detailed positive integer parsing.
 */
export interface ParsePositiveIntResult {
  success: boolean;
  value: number;
  original: unknown;
  error: string | null;
  clamped: boolean;
  usedDefault: boolean;
}

/**
 * Default options for positive integer parsing.
 */
export const DEFAULT_PARSE_POSITIVE_INT_OPTIONS: Required<Omit<ParsePositiveIntOptions, "max">> & {
  max?: number;
} = {
  min: 1,
  max: undefined,
  defaultValue: 1,
  clamp: true,
  allowZero: false,
  allowNegative: false,
  truncateFloat: false,
};

/**
 * Safely parses a value as a positive integer.
 *
 * @param value - The value to parse (string, number, or unknown)
 * @param options - Parsing options
 * @returns The parsed positive integer, or the default value if parsing fails
 *
 * @example
 * ```ts
 * parsePositiveInt("42") // 42
 * parsePositiveInt("abc") // 1 (default)
 * parsePositiveInt("-5") // 1 (clamped to min)
 * parsePositiveInt("0", { allowZero: true }) // 0
 * parsePositiveInt("100", { max: 50 }) // 50 (clamped to max)
 * parsePositiveInt("3.7", { truncateFloat: true }) // 3
 * parsePositiveInt("3.7") // 1 (float not allowed, uses default)
 * parsePositiveInt(undefined, { defaultValue: 10 }) // 10
 * ```
 */
export function parsePositiveInt(
  value: unknown,
  options: ParsePositiveIntOptions = {},
): number {
  const opts = { ...DEFAULT_PARSE_POSITIVE_INT_OPTIONS, ...options };
  const min = opts.allowZero ? 0 : opts.min;
  const effectiveMin = opts.allowNegative ? Number.MIN_SAFE_INTEGER : min;

  // Handle null/undefined
  if (value === null || value === undefined) {
    return opts.defaultValue;
  }

  // Handle boolean (don't treat true as 1)
  if (typeof value === "boolean") {
    return opts.defaultValue;
  }

  let num: number;

  if (typeof value === "number") {
    num = value;
  } else if (typeof value === "string") {
    const trimmed = value.trim();

    // Empty string
    if (trimmed === "") {
      return opts.defaultValue;
    }

    // Check for valid integer format (optional sign + digits)
    const integerPattern = /^[+-]?\d+$/;
    if (!integerPattern.test(trimmed)) {
      // If truncateFloat is enabled, try parsing as float and truncating
      if (opts.truncateFloat) {
        const floatPattern = /^[+-]?\d+(\.\d+)?$/;
        if (!floatPattern.test(trimmed)) {
          return opts.defaultValue;
        }
        const parsed = parseFloat(trimmed);
        if (isNaN(parsed) || !isFinite(parsed)) {
          return opts.defaultValue;
        }
        num = Math.trunc(parsed);
      } else {
        return opts.defaultValue;
      }
    } else {
      num = parseInt(trimmed, 10);
    }
  } else {
    // Unknown type
    return opts.defaultValue;
  }

  // Check for NaN and Infinity
  if (isNaN(num) || !isFinite(num)) {
    return opts.defaultValue;
  }

  // Check if it's a safe integer
  if (!Number.isSafeInteger(num)) {
    return opts.defaultValue;
  }

  // Clamp or reject out-of-range values
  if (num < effectiveMin) {
    if (opts.clamp) {
      return effectiveMin;
    }
    return opts.defaultValue;
  }

  if (opts.max !== undefined && num > opts.max) {
    if (opts.clamp) {
      return opts.max;
    }
    return opts.defaultValue;
  }

  return num;
}

/**
 * Safely parses a value as a positive integer with detailed result information.
 *
 * @param value - The value to parse
 * @param options - Parsing options
 * @returns A detailed result object with success, value, error, and metadata
 *
 * @example
 * ```ts
 * parsePositiveIntDetailed("42")
 * // { success: true, value: 42, original: "42", error: null, clamped: false, usedDefault: false }
 *
 * parsePositiveIntDetailed("abc")
 * // { success: false, value: 1, original: "abc", error: "Invalid integer format", clamped: false, usedDefault: true }
 *
 * parsePositiveIntDetailed("-5", { max: 100 })
 * // { success: true, value: 1, original: "-5", error: null, clamped: true, usedDefault: false }
 * ```
 */
export function parsePositiveIntDetailed(
  value: unknown,
  options: ParsePositiveIntOptions = {},
): ParsePositiveIntResult {
  const opts = { ...DEFAULT_PARSE_POSITIVE_INT_OPTIONS, ...options };
  const min = opts.allowZero ? 0 : opts.min;
  const effectiveMin = opts.allowNegative ? Number.MIN_SAFE_INTEGER : min;

  const baseResult: ParsePositiveIntResult = {
    success: false,
    value: opts.defaultValue,
    original: value,
    error: null,
    clamped: false,
    usedDefault: false,
  };

  // Handle null/undefined
  if (value === null || value === undefined) {
    return {
      ...baseResult,
      error: "Value is null or undefined",
      usedDefault: true,
    };
  }

  // Handle boolean
  if (typeof value === "boolean") {
    return {
      ...baseResult,
      error: "Boolean values are not allowed",
      usedDefault: true,
    };
  }

  let num: number;

  if (typeof value === "number") {
    num = value;
  } else if (typeof value === "string") {
    const trimmed = value.trim();

    if (trimmed === "") {
      return {
        ...baseResult,
        error: "Empty string",
        usedDefault: true,
      };
    }

    const integerPattern = /^[+-]?\d+$/;
    if (!integerPattern.test(trimmed)) {
      if (opts.truncateFloat) {
        const floatPattern = /^[+-]?\d+(\.\d+)?$/;
        if (!floatPattern.test(trimmed)) {
          return {
            ...baseResult,
            error: "Invalid number format",
            usedDefault: true,
          };
        }
        const parsed = parseFloat(trimmed);
        if (isNaN(parsed) || !isFinite(parsed)) {
          return {
            ...baseResult,
            error: "Invalid number",
            usedDefault: true,
          };
        }
        num = Math.trunc(parsed);
      } else {
        return {
          ...baseResult,
          error: "Invalid integer format",
          usedDefault: true,
        };
      }
    } else {
      num = parseInt(trimmed, 10);
    }
  } else {
    return {
      ...baseResult,
      error: `Unsupported type: ${typeof value}`,
      usedDefault: true,
    };
  }

  if (isNaN(num) || !isFinite(num)) {
    return {
      ...baseResult,
      error: "Number is NaN or Infinity",
      usedDefault: true,
    };
  }

  if (!Number.isSafeInteger(num)) {
    return {
      ...baseResult,
      error: "Number is not a safe integer",
      usedDefault: true,
    };
  }

  let clamped = false;

  if (num < effectiveMin) {
    if (opts.clamp) {
      num = effectiveMin;
      clamped = true;
    } else {
      return {
        ...baseResult,
        error: `Number is less than minimum (${effectiveMin})`,
        usedDefault: true,
      };
    }
  }

  if (opts.max !== undefined && num > opts.max) {
    if (opts.clamp) {
      num = opts.max;
      clamped = true;
    } else {
      return {
        ...baseResult,
        error: `Number is greater than maximum (${opts.max})`,
        usedDefault: true,
      };
    }
  }

  return {
    success: true,
    value: num,
    original: value,
    error: null,
    clamped,
    usedDefault: false,
  };
}

/**
 * Parses a page number for pagination (positive integer, min 1).
 *
 * @param value - The page number to parse
 * @param options - Additional options (max can be set for total pages)
 * @returns The parsed page number (default: 1)
 *
 * @example
 * ```ts
 * parsePageNumber("3") // 3
 * parsePageNumber("0") // 1
 * parsePageNumber("abc") // 1
 * parsePageNumber("100", { max: 50 }) // 50
 * ```
 */
export function parsePageNumber(
  value: unknown,
  options: Omit<ParsePositiveIntOptions, "min" | "allowZero" | "allowNegative"> = {},
): number {
  return parsePositiveInt(value, {
    ...options,
    min: 1,
    allowZero: false,
    allowNegative: false,
    defaultValue: options.defaultValue ?? 1,
  });
}

/**
 * Parses a page size/limit for pagination (positive integer with common bounds).
 *
 * @param value - The page size to parse
 * @param options - Additional options (default max: 100)
 * @returns The parsed page size (default: 20, max: 100)
 *
 * @example
 * ```ts
 * parsePageSize("50") // 50
 * parsePageSize("0") // 20 (default)
 * parsePageSize("1000") // 100 (clamped to max)
 * parsePageSize("abc") // 20 (default)
 * ```
 */
export function parsePageSize(
  value: unknown,
  options: Omit<ParsePositiveIntOptions, "min" | "allowZero" | "allowNegative"> = {},
): number {
  return parsePositiveInt(value, {
    ...options,
    min: 1,
    max: options.max ?? 100,
    allowZero: false,
    allowNegative: false,
    defaultValue: options.defaultValue ?? 20,
  });
}

/**
 * Parses an offset/skip value for pagination (non-negative integer).
 *
 * @param value - The offset to parse
 * @param options - Additional options
 * @returns The parsed offset (default: 0)
 *
 * @example
 * ```ts
 * parseOffset("50") // 50
 * parseOffset("-1") // 0 (clamped to min)
 * parseOffset("abc") // 0 (default)
 * ```
 */
export function parseOffset(
  value: unknown,
  options: Omit<ParsePositiveIntOptions, "min" | "allowZero" | "allowNegative"> = {},
): number {
  return parsePositiveInt(value, {
    ...options,
    min: 0,
    allowZero: true,
    allowNegative: false,
    defaultValue: options.defaultValue ?? 0,
  });
}

/**
 * Parses a limit value (positive integer with configurable max).
 *
 * @param value - The limit to parse
 * @param max - Maximum allowed value (default: 100)
 * @param defaultValue - Default value if parsing fails (default: 20)
 * @returns The parsed limit
 *
 * @example
 * ```ts
 * parseLimit("50") // 50
 * parseLimit("1000", 100) // 100 (clamped)
 * parseLimit("abc") // 20 (default)
 * ```
 */
export function parseLimit(
  value: unknown,
  max = 100,
  defaultValue = 20,
): number {
  return parsePositiveInt(value, {
    min: 1,
    max,
    defaultValue,
    clamp: true,
  });
}

/**
 * Checks if a value is a valid positive integer.
 *
 * @param value - The value to check
 * @param options - Validation options
 * @returns True if the value is a valid positive integer, false otherwise
 *
 * @example
 * ```ts
 * isPositiveInt("42") // true
 * isPositiveInt("-5") // false
 * isPositiveInt("3.5") // false
 * isPositiveInt("abc") // false
 * isPositiveInt(42) // true
 * ```
 */
export function isPositiveInt(
  value: unknown,
  options: Omit<ParsePositiveIntOptions, "clamp" | "defaultValue"> = {},
): boolean {
  const result = parsePositiveIntDetailed(value, {
    ...options,
    clamp: false,
    defaultValue: -1,
  });
  return result.success && !result.usedDefault;
}

export default parsePositiveInt;
