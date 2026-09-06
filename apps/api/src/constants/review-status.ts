export const reviewStatuses = {
  pending: "pending",
  approved: "approved",
  rejected: "rejected",
} as const;

export type ReviewStatus = (typeof reviewStatuses)[keyof typeof reviewStatuses];
