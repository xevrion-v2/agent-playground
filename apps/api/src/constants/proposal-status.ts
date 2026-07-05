export const proposalStatuses = {
  submitted: "submitted",
  shortlisted: "shortlisted",
  accepted: "accepted",
  declined: "declined",
  withdrawn: "withdrawn",
} as const;

export type ProposalStatus =
  (typeof proposalStatuses)[keyof typeof proposalStatuses];

export const proposalStatusValues = Object.values(proposalStatuses);
