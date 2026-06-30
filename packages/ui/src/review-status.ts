// ponytail: review status constants
export const REVIEW_STATUS = { PENDING: 'pending', APPROVED: 'approved', REJECTED: 'rejected', CHANGES_REQUESTED: 'changesRequested' } as const;
export type ReviewStatus = typeof REVIEW_STATUS[keyof typeof REVIEW_STATUS];
