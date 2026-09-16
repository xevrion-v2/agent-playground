/**
 * Budget range constants for proposals.
 * @module utils/budget-range-constants
 */
export const BudgetRange = {
  MICRO: { min: 0, max: 100, label: "Micro" },
  SMALL: { min: 100, max: 1000, label: "Small" },
  MEDIUM: { min: 1000, max: 10000, label: "Medium" },
  LARGE: { min: 10000, max: 100000, label: "Large" },
  ENTERPRISE: { min: 100000, max: Infinity, label: "Enterprise" },
} as const;

export type BudgetRangeKey = keyof typeof BudgetRange;
