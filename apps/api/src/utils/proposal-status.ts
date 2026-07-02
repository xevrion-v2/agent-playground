/**
 * Proposal lifecycle status constants.
 *
 * @example
 * `	s
 * import { ProposalStatus } from './proposal-status';
 * if (proposal.status === ProposalStatus.APPROVED) { /* ... *\/ }
 * `
 */
export const ProposalStatus = {
  DRAFT: 'draft' as const,
  SUBMITTED: 'submitted' as const,
  UNDER_REVIEW: 'under_review' as const,
  APPROVED: 'approved' as const,
  REJECTED: 'rejected' as const,
  ACCEPTED: 'accepted' as const,
} as const;

export type ProposalStatus = (typeof ProposalStatus)[keyof typeof ProposalStatus];
