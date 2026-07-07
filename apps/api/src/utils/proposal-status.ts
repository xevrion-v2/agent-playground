const PROPOSAL_STATUS = { DRAFT: 'draft', SUBMITTED: 'submitted', UNDER_REVIEW: 'under_review', ACCEPTED: 'accepted', REJECTED: 'rejected' } as const;
type ProposalStatus = (typeof PROPOSAL_STATUS)[keyof typeof PROPOSAL_STATUS];
export { PROPOSAL_STATUS, ProposalStatus };
