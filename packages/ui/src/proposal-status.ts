// ponytail: proposal status constants
export const PROPOSAL_STATUS = { DRAFT: 'draft', SUBMITTED: 'submitted', ACCEPTED: 'accepted', REJECTED: 'rejected', WITHDRAWN: 'withdrawn' } as const;
export type ProposalStatus = typeof PROPOSAL_STATUS[keyof typeof PROPOSAL_STATUS];
