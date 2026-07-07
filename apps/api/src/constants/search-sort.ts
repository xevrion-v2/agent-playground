export const searchSortOptions = {
  relevance: "relevance",
  newest: "newest",
  oldest: "oldest",
  budgetLowToHigh: "budget_low_to_high",
  budgetHighToLow: "budget_high_to_low",
} as const;

export type SearchSortOption =
  (typeof searchSortOptions)[keyof typeof searchSortOptions];

export const searchSortOptionValues = Object.values(searchSortOptions);