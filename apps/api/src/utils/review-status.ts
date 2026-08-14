/**
 * Review status constants for freelancer/client review system.
 *
 * @example
 * `	s
 * import { ReviewStatus } from './review-status';
 * if (review.status === ReviewStatus.PENDING) { /* ... *\/ }
 * `
 */
export const ReviewStatus = {
  PENDING: 'pending' as const,
  SUBMITTED: 'submitted' as const,
  APPROVED: 'approved' as const,
  REJECTED: 'rejected' as const,
  DISPUTED: 'disputed' as const,
} as const;

export type ReviewStatus = (typeof ReviewStatus)[keyof typeof ReviewStatus];
