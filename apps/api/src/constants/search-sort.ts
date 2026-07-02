export const searchSortOptions = {
  relevance: "relevance",
  newest: "newest",
  oldest: "oldest",
  budgetHigh: "budget_high",
  budgetLow: "budget_low",
} as const;

export type SearchSortOption =
  (typeof searchSortOptions)[keyof typeof searchSortOptions];
