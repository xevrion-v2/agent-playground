/**
 * Proposal status constants.
 * @module utils/proposal-status-constants
 */
export const ProposalStatus = {
  DRAFT: "draft",
  SUBMITTED: "submitted",
  UNDER_REVIEW: "under_review",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
  CLOSED: "closed",
} as const;

export type ProposalStatusType = (typeof ProposalStatus)[keyof typeof ProposalStatus];
