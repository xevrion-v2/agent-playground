/**
 * Numeric clamp helper for pagination, budget, and scoring bounds.
 * Restricts numbers to a specified range with configurable behavior.
 */

/**
 * Options for clamping numbers.
 */
export interface ClampNumberOptions {
  /** Whether to round the result to an integer (default: false) */
  round?: boolean;
  /** Rounding mode: 'round', 'floor', 'ceil', 'trunc' (default: 'round') */
  roundMode?: "round" | "floor" | "ceil" | "trunc";
  /** Number of decimal places to round to (default: undefined, no rounding) */
  decimals?: number;
  /** Default minimum value if min is not provided (default: -Infinity) */
  defaultMin?: number;
  /** Default maximum value if max is not provided (default: Infinity) */
  defaultMax?: number;
  /** Value to return if input is not a valid number (default: min or 0) */
  defaultValue?: number;
  /** Whether to return null for invalid inputs instead of default value (default: false) */
  returnNullOnInvalid?: boolean;
  /** Whether to allow NaN to pass through (default: false) */
  allowNaN?: boolean;
  /** Whether to allow Infinity to pass through (default: false) */
  allowInfinity?: boolean;
}

/**
 * Default options for clamping numbers.
 */
export const DEFAULT_CLAMP_NUMBER_OPTIONS: Required<Omit<ClampNumberOptions, "defaultValue" | "decimals">> & {
  defaultValue?: number;
  decimals?: number;
} = {
  round: false,
  roundMode: "round",
  decimals: undefined,
  defaultMin: -Infinity,
  defaultMax: Infinity,
  defaultValue: undefined,
  returnNullOnInvalid: false,
  allowNaN: false,
  allowInfinity: false,
};

/**
 * Clamps a number to the specified range.
 *
 * @param value - The number to clamp
 * @param min - The minimum allowed value (default: -Infinity)
 * @param max - The maximum allowed value (default: Infinity)
 * @param options - Clamping options
 * @returns The clamped number, or default value/null if invalid
 *
 * @example
 * ```ts
 * clampNumber(15, 0, 10) // 10
 * clampNumber(-5, 0, 10) // 0
 * clampNumber(5, 0, 10) // 5
 * clampNumber(3.14159, 0, 10, { decimals: 2 }) // 3.14
 * clampNumber(3.7, 0, 10, { round: true }) // 4
 * clampNumber(3.7, 0, 10, { round: true, roundMode: 'floor' }) // 3
 * clampNumber("invalid", 0, 10) // 0
 * clampNumber("invalid", 0, 10, { returnNullOnInvalid: true }) // null
 * clampNumber(5, 10, 0) // 5 (auto-swaps min/max if min > max)
 * ```
 */
export function clampNumber(
  value: unknown,
  min?: number,
  max?: number,
  options: ClampNumberOptions = {},
): number | null {
  const opts = { ...DEFAULT_CLAMP_NUMBER_OPTIONS, ...options };

  // Handle non-number inputs
  if (typeof value !== "number") {
    if (opts.returnNullOnInvalid) {
      return null;
    }
    return opts.defaultValue ?? min ?? opts.defaultMin ?? 0;
  }

  // Handle NaN
  if (isNaN(value)) {
    if (opts.allowNaN) {
      return value;
    }
    if (opts.returnNullOnInvalid) {
      return null;
    }
    return opts.defaultValue ?? min ?? opts.defaultMin ?? 0;
  }

  // Handle Infinity
  if (!isFinite(value)) {
    if (opts.allowInfinity) {
      return value;
    }
    if (value === Infinity) {
      return max ?? opts.defaultMax;
    }
    if (value === -Infinity) {
      return min ?? opts.defaultMin;
    }
  }

  let lower = min ?? opts.defaultMin;
  let upper = max ?? opts.defaultMax;

  // Auto-swap if min > max
  if (lower > upper) {
    [lower, upper] = [upper, lower];
  }

  let result = value;

  // Clamp to range
  if (result < lower) {
    result = lower;
  }
  if (result > upper) {
    result = upper;
  }

  // Round to decimal places if specified
  if (opts.decimals !== undefined && opts.decimals >= 0) {
    const factor = Math.pow(10, opts.decimals);
    result = Math.round(result * factor) / factor;
  }

  // Round to integer if requested
  if (opts.round) {
    switch (opts.roundMode) {
      case "floor":
        result = Math.floor(result);
        break;
      case "ceil":
        result = Math.ceil(result);
        break;
      case "trunc":
        result = Math.trunc(result);
        break;
      case "round":
      default:
        result = Math.round(result);
        break;
    }
  }

  return result;
}

/**
 * Clamps a number to be at least the specified minimum.
 *
 * @param value - The number to clamp
 * @param min - The minimum allowed value
 * @param options - Clamping options
 * @returns The clamped number
 *
 * @example
 * ```ts
 * clampMin(-5, 0) // 0
 * clampMin(5, 0) // 5
 * ```
 */
export function clampMin(
  value: unknown,
  min: number,
  options: ClampNumberOptions = {},
): number | null {
  return clampNumber(value, min, undefined, options);
}

/**
 * Clamps a number to be at most the specified maximum.
 *
 * @param value - The number to clamp
 * @param max - The maximum allowed value
 * @param options - Clamping options
 * @returns The clamped number
 *
 * @example
 * ```ts
 * clampMax(15, 10) // 10
 * clampMax(5, 10) // 5
 * ```
 */
export function clampMax(
  value: unknown,
  max: number,
  options: ClampNumberOptions = {},
): number | null {
  return clampNumber(value, undefined, max, options);
}

/**
 * Clamps a page number for pagination (min 1).
 *
 * @param page - The page number to clamp
 * @param maxPage - The maximum page number (optional)
 * @returns The clamped page number
 *
 * @example
 * ```ts
 * clampPage(0) // 1
 * clampPage(-5) // 1
 * clampPage(15, 10) // 10
 * clampPage(5, 10) // 5
 * ```
 */
export function clampPage(page: unknown, maxPage?: number): number {
  return clampNumber(page, 1, maxPage, { round: true, roundMode: "trunc" }) as number;
}

/**
 * Clamps a page size/limit for pagination (min 1, default max 100).
 *
 * @param limit - The limit to clamp
 * @param maxLimit - The maximum limit (default: 100)
 * @param defaultLimit - The default limit if invalid (default: 20)
 * @returns The clamped limit
 *
 * @example
 * ```ts
 * clampLimit(0) // 20 (default)
 * clampLimit(1000) // 100
 * clampLimit(50) // 50
 * clampLimit(50, 500) // 50
 * ```
 */
export function clampLimit(limit: unknown, maxLimit = 100, defaultLimit = 20): number {
  const result = clampNumber(limit, 1, maxLimit, {
    round: true,
    roundMode: "trunc",
    defaultValue: defaultLimit,
  });
  return result as number;
}

/**
 * Clamps an offset for pagination (min 0).
 *
 * @param offset - The offset to clamp
 * @param maxOffset - The maximum offset (optional)
 * @returns The clamped offset
 *
 * @example
 * ```ts
 * clampOffset(-5) // 0
 * clampOffset(50) // 50
 * clampOffset(1000, 500) // 500
 * ```
 */
export function clampOffset(offset: unknown, maxOffset?: number): number {
  return clampNumber(offset, 0, maxOffset, { round: true, roundMode: "trunc" }) as number;
}

/**
 * Clamps a percentage value (0-100).
 *
 * @param percentage - The percentage to clamp
 * @param options - Clamping options
 * @returns The clamped percentage
 *
 * @example
 * ```ts
 * clampPercentage(-5) // 0
 * clampPercentage(150) // 100
 * clampPercentage(50) // 50
 * clampPercentage(33.333, { decimals: 2 }) // 33.33
 * ```
 */
export function clampPercentage(percentage: unknown, options: ClampNumberOptions = {}): number | null {
  return clampNumber(percentage, 0, 100, options);
}

/**
 * Clamps a ratio/probability value (0-1).
 *
 * @param ratio - The ratio to clamp
 * @param options - Clamping options
 * @returns The clamped ratio
 *
 * @example
 * ```ts
 * clampRatio(-0.5) // 0
 * clampRatio(1.5) // 1
 * clampRatio(0.5) // 0.5
 * ```
 */
export function clampRatio(ratio: unknown, options: ClampNumberOptions = {}): number | null {
  return clampNumber(ratio, 0, 1, options);
}

/**
 * Clamps a score/rating value (0-5 by default, common for reviews).
 *
 * @param score - The score to clamp
 * @param min - The minimum score (default: 0)
 * @param max - The maximum score (default: 5)
 * @param options - Clamping options
 * @returns The clamped score
 *
 * @example
 * ```ts
 * clampScore(-1) // 0
 * clampScore(6) // 5
 * clampScore(3.5) // 3.5
 * clampScore(3.5, 0, 10) // 3.5
 * ```
 */
export function clampScore(
  score: unknown,
  min = 0,
  max = 5,
  options: ClampNumberOptions = {},
): number | null {
  return clampNumber(score, min, max, options);
}

/**
 * Clamps a budget/amount value (min 0).
 *
 * @param amount - The amount to clamp
 * @param max - The maximum amount (optional)
 * @param options - Clamping options
 * @returns The clamped amount
 *
 * @example
 * ```ts
 * clampBudget(-50) // 0
 * clampBudget(150, 100) // 100
 * clampBudget(50) // 50
 * clampBudget(50.555, undefined, { decimals: 2 }) // 50.56
 * ```
 */
export function clampBudget(
  amount: unknown,
  max?: number,
  options: ClampNumberOptions = {},
): number | null {
  return clampNumber(amount, 0, max, options);
}

/**
 * Checks if a number is within the specified range.
 *
 * @param value - The number to check
 * @param min - The minimum value
 * @param max - The maximum value
 * @param inclusive - Whether to include min/max (default: true)
 * @returns True if the number is in range, false otherwise
 *
 * @example
 * ```ts
 * isInRange(5, 0, 10) // true
 * isInRange(15, 0, 10) // false
 * isInRange(10, 0, 10, false) // false (exclusive)
 * ```
 */
export function isInRange(
  value: number,
  min: number,
  max: number,
  inclusive = true,
): boolean {
  if (typeof value !== "number" || isNaN(value)) {
    return false;
  }

  const lower = Math.min(min, max);
  const upper = Math.max(min, max);

  if (inclusive) {
    return value >= lower && value <= upper;
  }
  return value > lower && value < upper;
}

/**
 * Linearly maps a value from one range to another.
 *
 * @param value - The value to map
 * @param fromMin - The source range minimum
 * @param fromMax - The source range maximum
 * @param toMin - The target range minimum
 * @param toMax - The target range maximum
 * @param clampResult - Whether to clamp the result to the target range (default: true)
 * @returns The mapped value
 *
 * @example
 * ```ts
 * mapRange(5, 0, 10, 0, 100) // 50
 * mapRange(0, 0, 10, 50, 100) // 50
 * mapRange(10, 0, 10, 50, 100) // 100
 * mapRange(15, 0, 10, 0, 100) // 100 (clamped)
 * mapRange(15, 0, 10, 0, 100, false) // 150 (not clamped)
 * ```
 */
export function mapRange(
  value: number,
  fromMin: number,
  fromMax: number,
  toMin: number,
  toMax: number,
  clampResult = true,
): number {
  if (typeof value !== "number" || isNaN(value)) {
    return toMin;
  }

  const fromRange = fromMax - fromMin;
  const toRange = toMax - toMin;

  if (fromRange === 0) {
    return toMin;
  }

  const scaled = ((value - fromMin) / fromRange) * toRange + toMin;

  if (clampResult) {
    return clampNumber(scaled, toMin, toMax) as number;
  }

  return scaled;
}

export default clampNumber;
