export const reviewStatuses = {
  draft: "draft",
  published: "published",
  hidden: "hidden",
  flagged: "flagged",
} as const;

export type ReviewStatus =
  (typeof reviewStatuses)[keyof typeof reviewStatuses];

export const reviewStatusValues = Object.values(reviewStatuses);