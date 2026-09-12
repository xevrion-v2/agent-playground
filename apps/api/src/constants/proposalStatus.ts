/**
 * Proposal status constants for TaskFlow API proposal lifecycle values.
 * Use these named constants instead of magic strings for consistency.
 */

// Core proposal statuses
export const DRAFT = "DRAFT";
export const PENDING = "PENDING";
export const SUBMITTED = "SUBMITTED";
export const UNDER_REVIEW = "UNDER_REVIEW";
export const IN_REVIEW = "IN_REVIEW";
export const ACCEPTED = "ACCEPTED";
export const REJECTED = "REJECTED";
export const APPROVED = "APPROVED";
export const DECLINED = "DECLINED";
export const WITHDRAWN = "WITHDRAWN";
export const CANCELLED = "CANCELLED";
export const EXPIRED = "EXPIRED";
export const CLOSED = "CLOSED";
export const ARCHIVED = "ARCHIVED";

// Extended proposal statuses
export const OPEN = "OPEN";
export const ACTIVE = "ACTIVE";
export const NEGOTIATING = "NEGOTIATING";
export const COUNTER_OFFER = "COUNTER_OFFER";
export const NEEDS_REVISION = "NEEDS_REVISION";
export const NEEDS_INFO = "NEEDS_INFO";
export const ON_HOLD = "ON_HOLD";
export const BLOCKED = "BLOCKED";
export const SHORTLISTED = "SHORTLISTED";
export const SELECTED = "SELECTED";
export const AWARDED = "AWARDED";
export const CONTRACT_SENT = "CONTRACT_SENT";
export const CONTRACT_SIGNED = "CONTRACT_SIGNED";
export const IN_PROGRESS = "IN_PROGRESS";
export const COMPLETED = "COMPLETED";
export const DELIVERED = "DELIVERED";
export const PAID = "PAID";
export const DISPUTED = "DISPUTED";
export const DELETED = "DELETED";

/**
 * All valid proposal statuses in lifecycle order.
 */
export const PROPOSAL_STATUSES = [
  DRAFT,
  PENDING,
  SUBMITTED,
  OPEN,
  ACTIVE,
  UNDER_REVIEW,
  IN_REVIEW,
  NEEDS_INFO,
  NEEDS_REVISION,
  SHORTLISTED,
  NEGOTIATING,
  COUNTER_OFFER,
  SELECTED,
  ACCEPTED,
  APPROVED,
  AWARDED,
  CONTRACT_SENT,
  CONTRACT_SIGNED,
  IN_PROGRESS,
  DELIVERED,
  COMPLETED,
  PAID,
  CLOSED,
  ARCHIVED,
  REJECTED,
  DECLINED,
  WITHDRAWN,
  CANCELLED,
  EXPIRED,
  DISPUTED,
  ON_HOLD,
  BLOCKED,
  DELETED,
] as const;

/**
 * Active proposal statuses (not terminal).
 */
export const ACTIVE_STATUSES = [
  DRAFT,
  PENDING,
  SUBMITTED,
  OPEN,
  ACTIVE,
  UNDER_REVIEW,
  IN_REVIEW,
  NEEDS_INFO,
  NEEDS_REVISION,
  SHORTLISTED,
  NEGOTIATING,
  COUNTER_OFFER,
  SELECTED,
  ACCEPTED,
  APPROVED,
  AWARDED,
  CONTRACT_SENT,
  CONTRACT_SIGNED,
  IN_PROGRESS,
  DELIVERED,
  ON_HOLD,
  BLOCKED,
  DISPUTED,
] as const;

/**
 * Terminal proposal statuses (final states).
 */
export const TERMINAL_STATUSES = [
  COMPLETED,
  PAID,
  CLOSED,
  ARCHIVED,
  REJECTED,
  DECLINED,
  WITHDRAWN,
  CANCELLED,
  EXPIRED,
  DELETED,
] as const;

/**
 * Checks if a status is a valid proposal status.
 */
export const isValidProposalStatus = (status: string): boolean => {
  return (PROPOSAL_STATUSES as readonly string[]).includes(status);
};

/**
 * Checks if a status is an active (non-terminal) status.
 */
export const isActiveStatus = (status: string): boolean => {
  return (ACTIVE_STATUSES as readonly string[]).includes(status);
};

/**
 * Checks if a status is a terminal (final) status.
 */
export const isTerminalStatus = (status: string): boolean => {
  return (TERMINAL_STATUSES as readonly string[]).includes(status);
};

/**
 * Consolidated proposal status constants object for convenient lookup.
 */
export const ProposalStatus = {
  // Core
  DRAFT,
  PENDING,
  SUBMITTED,
  UNDER_REVIEW,
  IN_REVIEW,
  ACCEPTED,
  REJECTED,
  APPROVED,
  DECLINED,
  WITHDRAWN,
  CANCELLED,
  EXPIRED,
  CLOSED,
  ARCHIVED,
  // Extended
  OPEN,
  ACTIVE,
  NEGOTIATING,
  COUNTER_OFFER,
  NEEDS_REVISION,
  NEEDS_INFO,
  ON_HOLD,
  BLOCKED,
  SHORTLISTED,
  SELECTED,
  AWARDED,
  CONTRACT_SENT,
  CONTRACT_SIGNED,
  IN_PROGRESS,
  COMPLETED,
  DELIVERED,
  PAID,
  DISPUTED,
  DELETED,
  // Collections
  ALL: PROPOSAL_STATUSES,
  ACTIVE: ACTIVE_STATUSES,
  TERMINAL: TERMINAL_STATUSES,
  // Helpers
  isValid: isValidProposalStatus,
  isActive: isActiveStatus,
  isTerminal: isTerminalStatus,
} as const;

export default ProposalStatus;
