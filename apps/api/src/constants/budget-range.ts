/**
 * Shared budget range constants for future task search and bounty filters.
 * Provides predefined budget ranges and utilities for filtering and categorizing budgets.
 */

/**
 * Budget range definition.
 */
export interface BudgetRange {
  /** Unique identifier for the range */
  id: string;
  /** Display label for the range */
  label: string;
  /** Minimum budget value (inclusive) */
  min: number;
  /** Maximum budget value (inclusive, undefined means no upper limit) */
  max?: number;
  /** Currency code (default: USD) */
  currency?: string;
  /** Description of the range */
  description?: string;
}

/**
 * Predefined budget range IDs.
 */
export const BudgetRangeId = {
  ANY: "any",
  UNDER_50: "under-50",
  FROM_50_TO_100: "50-100",
  FROM_100_TO_250: "100-250",
  FROM_250_TO_500: "250-500",
  FROM_500_TO_1000: "500-1000",
  OVER_1000: "over-1000",
  CUSTOM: "custom",
} as const;

export type BudgetRangeIdType = (typeof BudgetRangeId)[keyof typeof BudgetRangeId];

/**
 * Predefined budget ranges.
 */
export const BUDGET_RANGES: BudgetRange[] = [
  {
    id: BudgetRangeId.ANY,
    label: "Any budget",
    min: 0,
    max: undefined,
    description: "No budget filter applied",
  },
  {
    id: BudgetRangeId.UNDER_50,
    label: "Under $50",
    min: 0,
    max: 49.99,
    description: "Small tasks and quick fixes",
  },
  {
    id: BudgetRangeId.FROM_50_TO_100,
    label: "$50 - $100",
    min: 50,
    max: 100,
    description: "Medium complexity tasks",
  },
  {
    id: BudgetRangeId.FROM_100_TO_250,
    label: "$100 - $250",
    min: 100,
    max: 250,
    description: "Feature implementation and larger fixes",
  },
  {
    id: BudgetRangeId.FROM_250_TO_500,
    label: "$250 - $500",
    min: 250,
    max: 500,
    description: "Complex features and significant refactoring",
  },
  {
    id: BudgetRangeId.FROM_500_TO_1000,
    label: "$500 - $1000",
    min: 500,
    max: 1000,
    description: "Major features and architectural changes",
  },
  {
    id: BudgetRangeId.OVER_1000,
    label: "Over $1000",
    min: 1000.01,
    max: undefined,
    description: "Large-scale projects and enterprise work",
  },
];

/**
 * Default budget range (any).
 */
export const DEFAULT_BUDGET_RANGE: BudgetRange = BUDGET_RANGES[0];

/**
 * Minimum allowed budget value.
 */
export const MIN_BUDGET = 0;

/**
 * Maximum allowed budget value (practical upper limit).
 */
export const MAX_BUDGET = 100000;

/**
 * Default currency for budgets.
 */
export const DEFAULT_BUDGET_CURRENCY = "USD";

/**
 * Budget step values for UI sliders and increments.
 */
export const BUDGET_STEPS = [5, 10, 25, 50, 100, 250, 500] as const;

/**
 * Popular budget amounts for quick selection.
 */
export const POPULAR_BUDGETS = [25, 50, 75, 100, 150, 200, 250, 500, 750, 1000] as const;

/**
 * Gets a budget range by its ID.
 *
 * @param id - The budget range ID
 * @returns The budget range, or the default range if not found
 *
 * @example
 * ```ts
 * getBudgetRangeById("50-100") // { id: "50-100", label: "$50 - $100", min: 50, max: 100 }
 * getBudgetRangeById("invalid") // { id: "any", label: "Any budget", min: 0, max: undefined }
 * ```
 */
export function getBudgetRangeById(id: string): BudgetRange {
  return BUDGET_RANGES.find((r) => r.id === id) ?? DEFAULT_BUDGET_RANGE;
}

/**
 * Finds the budget range that contains a specific budget value.
 *
 * @param budget - The budget value to find
 * @returns The matching budget range, or the default range if no match
 *
 * @example
 * ```ts
 * findBudgetRange(75) // { id: "50-100", label: "$50 - $100", min: 50, max: 100 }
 * findBudgetRange(1500) // { id: "over-1000", label: "Over $1000", min: 1000.01, max: undefined }
 * findBudgetRange(-5) // { id: "any", label: "Any budget", min: 0, max: undefined }
 * ```
 */
export function findBudgetRange(budget: number): BudgetRange {
  if (typeof budget !== "number" || isNaN(budget) || budget < 0) {
    return DEFAULT_BUDGET_RANGE;
  }

  for (const range of BUDGET_RANGES) {
    if (range.id === BudgetRangeId.ANY) continue;

    const inRange =
      budget >= range.min &&
      (range.max === undefined || budget <= range.max);

    if (inRange) {
      return range;
    }
  }

  return DEFAULT_BUDGET_RANGE;
}

/**
 * Checks if a budget value falls within a specific budget range.
 *
 * @param budget - The budget value to check
 * @param rangeId - The budget range ID to check against
 * @returns True if the budget is within the range, false otherwise
 *
 * @example
 * ```ts
 * isBudgetInRange(75, "50-100") // true
 * isBudgetInRange(150, "50-100") // false
 * isBudgetInRange(500, "any") // true
 * ```
 */
export function isBudgetInRange(budget: number, rangeId: string): boolean {
  const range = getBudgetRangeById(rangeId);

  if (range.id === BudgetRangeId.ANY) {
    return true;
  }

  if (typeof budget !== "number" || isNaN(budget)) {
    return false;
  }

  return (
    budget >= range.min &&
    (range.max === undefined || budget <= range.max)
  );
}

/**
 * Filters a list of items by budget range.
 *
 * @param items - The items to filter
 * @param rangeId - The budget range ID to filter by
 * @param getBudget - Function to extract budget from an item
 * @returns The filtered items
 *
 * @example
 * ```ts
 * const tasks = [
 *   { title: "Task 1", budget: 50 },
 *   { title: "Task 2", budget: 150 },
 *   { title: "Task 3", budget: 75 },
 * ];
 * filterByBudgetRange(tasks, "50-100", (t) => t.budget)
 * // [{ title: "Task 1", budget: 50 }, { title: "Task 3", budget: 75 }]
 * ```
 */
export function filterByBudgetRange<T>(
  items: T[],
  rangeId: string,
  getBudget: (item: T) => number,
): T[] {
  if (!Array.isArray(items) || rangeId === BudgetRangeId.ANY) {
    return items;
  }

  return items.filter((item) => {
    const budget = getBudget(item);
    return isBudgetInRange(budget, rangeId);
  });
}

/**
 * Validates a budget value.
 *
 * @param budget - The budget value to validate
 * @param options - Validation options
 * @returns True if the budget is valid, false otherwise
 *
 * @example
 * ```ts
 * isValidBudget(50) // true
 * isValidBudget(-5) // false
 * isValidBudget(100001) // false (exceeds MAX_BUDGET)
 * isValidBudget("50") // false (not a number)
 * ```
 */
export function isValidBudget(
  budget: unknown,
  options: { min?: number; max?: number } = {},
): budget is number {
  if (typeof budget !== "number" || isNaN(budget) || !isFinite(budget)) {
    return false;
  }

  const min = options.min ?? MIN_BUDGET;
  const max = options.max ?? MAX_BUDGET;

  return budget >= min && budget <= max;
}

/**
 * Clamps a budget value to the valid range.
 *
 * @param budget - The budget value to clamp
 * @param options - Clamping options
 * @returns The clamped budget value
 *
 * @example
 * ```ts
 * clampBudget(50) // 50
 * clampBudget(-5) // 0
 * clampBudget(100001) // 100000
 * clampBudget(50, { min: 100, max: 200 }) // 100
 * ```
 */
export function clampBudget(
  budget: number,
  options: { min?: number; max?: number } = {},
): number {
  const min = options.min ?? MIN_BUDGET;
  const max = options.max ?? MAX_BUDGET;

  if (typeof budget !== "number" || isNaN(budget)) {
    return min;
  }

  return Math.min(Math.max(budget, min), max);
}

/**
 * Formats a budget value for display.
 *
 * @param budget - The budget value to format
 * @param currency - The currency code (default: USD)
 * @returns The formatted budget string
 *
 * @example
 * ```ts
 * formatBudget(50) // "$50.00"
 * formatBudget(1234.56) // "$1,234.56"
 * formatBudget(50, "EUR") // "€50.00"
 * ```
 */
export function formatBudget(budget: number, currency = DEFAULT_BUDGET_CURRENCY): string {
  if (typeof budget !== "number" || isNaN(budget)) {
    return "$0.00";
  }

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(budget);
  } catch {
    return `$${budget.toFixed(2)}`;
  }
}

/**
 * Parses a budget string into a number.
 *
 * @param budgetStr - The budget string to parse
 * @returns The parsed budget number, or 0 if invalid
 *
 * @example
 * ```ts
 * parseBudget("$50.00") // 50
 * parseBudget("1,234.56") // 1234.56
 * parseBudget("invalid") // 0
 * ```
 */
export function parseBudget(budgetStr: string): number {
  if (typeof budgetStr !== "string") {
    return 0;
  }

  // Remove currency symbols, commas, and whitespace
  const cleaned = budgetStr.replace(/[$€£¥,\s]/g, "");
  const parsed = parseFloat(cleaned);

  return isNaN(parsed) ? 0 : parsed;
}

export default BUDGET_RANGES;
