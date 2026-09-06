export const budgetRanges = {
  under50: 'under_50',
  from50To100: '50_to_100',
  from100To500: '100_to_500',
  over500: 'over_500',
} as const;

export type BudgetRange = typeof budgetRanges[keyof typeof budgetRanges];

export const budgetRangeValues = Object.values(budgetRanges);