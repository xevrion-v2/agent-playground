/**
 * Review status constants.
 * @module utils/review-status-constants
 */
export const ReviewStatus = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
  CHANGES_REQUESTED: "changes_requested",
} as const;

export type ReviewStatusType = (typeof ReviewStatus)[keyof typeof ReviewStatus];
