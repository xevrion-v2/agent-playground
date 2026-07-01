export const budgetRanges = {
  micro: { min: 0, max: 99 },
  small: { min: 100, max: 499 },
  medium: { min: 500, max: 1999 },
  large: { min: 2000, max: Number.POSITIVE_INFINITY },
} as const;

export type BudgetRangeName = keyof typeof budgetRanges;
