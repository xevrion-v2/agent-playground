/**
 * Review status constants for TaskFlow API review moderation and display workflows.
 * Use these named constants instead of magic strings for consistency.
 */

// Core review statuses
export const PENDING = "PENDING";
export const APPROVED = "APPROVED";
export const REJECTED = "REJECTED";
export const FLAGGED = "FLAGGED";
export const HIDDEN = "HIDDEN";
export const REMOVED = "REMOVED";
export const DELETED = "DELETED";
export const ARCHIVED = "ARCHIVED";

// Extended review statuses
export const DRAFT = "DRAFT";
export const SUBMITTED = "SUBMITTED";
export const UNDER_REVIEW = "UNDER_REVIEW";
export const IN_MODERATION = "IN_MODERATION";
export const AWAITING_REVIEW = "AWAITING_REVIEW";
export const AWAITING_RESPONSE = "AWAITING_RESPONSE";
export const NEEDS_REVISION = "NEEDS_REVISION";
export const NEEDS_MORE_INFO = "NEEDS_MORE_INFO";
export const ESCALATED = "ESCALATED";
export const APPEALED = "APPEALED";
export const APPEAL_PENDING = "APPEAL_PENDING";
export const APPEAL_APPROVED = "APPEAL_APPROVED";
export const APPEAL_REJECTED = "APPEAL_REJECTED";
export const SUSPENDED = "SUSPENDED";
export const BANNED = "BANNED";
export const WARNING = "WARNING";
export const VERIFIED = "VERIFIED";
export const FEATURED = "FEATURED";
export const PINNED = "PINNED";
export const LOCKED = "LOCKED";
export const CLOSED = "CLOSED";
export const RESOLVED = "RESOLVED";
export const DUPLICATE = "DUPLICATE";
export const SPAM = "SPAM";
export const ABUSE = "ABUSE";
export const HARASSMENT = "HARASSMENT";
export const HATE_SPEECH = "HATE_SPEECH";
export const EXPLICIT = "EXPLICIT";
export const VIOLENCE = "VIOLENCE";
export const SELF_HARM = "SELF_HARM";
export const ILLEGAL = "ILLEGAL";
export const FRAUD = "FRAUD";
export const MISINFORMATION = "MISINFORMATION";
export const COPYRIGHT = "COPYRIGHT";
export const PRIVACY = "PRIVACY";
export const IMPERSONATION = "IMPERSONATION";
export const MINOR_SAFETY = "MINOR_SAFETY";
export const TERRORISM = "TERRORISM";
export const OTHER = "OTHER";

// Review ratings
export const RATING_1 = 1;
export const RATING_2 = 2;
export const RATING_3 = 3;
export const RATING_4 = 4;
export const RATING_5 = 5;

// Review types
export const REVIEW_TYPE_PRODUCT = "PRODUCT";
export const REVIEW_TYPE_SERVICE = "SERVICE";
export const REVIEW_TYPE_FREELANCER = "FREELANCER";
export const REVIEW_TYPE_CLIENT = "CLIENT";
export const REVIEW_TYPE_TASK = "TASK";
export const REVIEW_TYPE_PROPOSAL = "PROPOSAL";
export const REVIEW_TYPE_PAYMENT = "PAYMENT";
export const REVIEW_TYPE_DELIVERY = "DELIVERY";
export const REVIEW_TYPE_COMMUNICATION = "COMMUNICATION";
export const REVIEW_TYPE_QUALITY = "QUALITY";
export const REVIEW_TYPE_TIMELINESS = "TIMELINESS";
export const REVIEW_TYPE_PROFESSIONALISM = "PROFESSIONALISM";
export const REVIEW_TYPE_VALUE = "VALUE";
export const REVIEW_TYPE_EXPERIENCE = "EXPERIENCE";
export const REVIEW_TYPE_OTHER = "OTHER";

/**
 * All valid review statuses in lifecycle order.
 */
export const REVIEW_STATUSES = [
  DRAFT,
  PENDING,
  SUBMITTED,
  AWAITING_REVIEW,
  UNDER_REVIEW,
  IN_MODERATION,
  NEEDS_REVISION,
  NEEDS_MORE_INFO,
  AWAITING_RESPONSE,
  APPROVED,
  VERIFIED,
  FEATURED,
  PINNED,
  REJECTED,
  FLAGGED,
  HIDDEN,
  REMOVED,
  DELETED,
  ARCHIVED,
  LOCKED,
  CLOSED,
  RESOLVED,
  DUPLICATE,
  SPAM,
  ABUSE,
  ESCALATED,
  APPEALED,
  APPEAL_PENDING,
  APPEAL_APPROVED,
  APPEAL_REJECTED,
  SUSPENDED,
  BANNED,
  WARNING,
] as const;

/**
 * Active review statuses (not terminal).
 */
export const ACTIVE_STATUSES = [
  DRAFT,
  PENDING,
  SUBMITTED,
  AWAITING_REVIEW,
  UNDER_REVIEW,
  IN_MODERATION,
  NEEDS_REVISION,
  NEEDS_MORE_INFO,
  AWAITING_RESPONSE,
  APPROVED,
  VERIFIED,
  FEATURED,
  PINNED,
  FLAGGED,
  HIDDEN,
  ESCALATED,
  APPEALED,
  APPEAL_PENDING,
  WARNING,
] as const;

/**
 * Terminal review statuses (final states).
 */
export const TERMINAL_STATUSES = [
  REJECTED,
  REMOVED,
  DELETED,
  ARCHIVED,
  LOCKED,
  CLOSED,
  RESOLVED,
  DUPLICATE,
  SPAM,
  ABUSE,
  APPEAL_APPROVED,
  APPEAL_REJECTED,
  SUSPENDED,
  BANNED,
] as const;

/**
 * Moderation violation categories.
 */
export const VIOLATION_CATEGORIES = [
  SPAM,
  ABUSE,
  HARASSMENT,
  HATE_SPEECH,
  EXPLICIT,
  VIOLENCE,
  SELF_HARM,
  ILLEGAL,
  FRAUD,
  MISINFORMATION,
  COPYRIGHT,
  PRIVACY,
  IMPERSONATION,
  MINOR_SAFETY,
  TERRORISM,
  OTHER,
] as const;

/**
 * Checks if a status is a valid review status.
 */
export const isValidReviewStatus = (status: string): boolean => {
  return (REVIEW_STATUSES as readonly string[]).includes(status);
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
 * Checks if a status is a moderation violation.
 */
export const isViolation = (status: string): boolean => {
  return (VIOLATION_CATEGORIES as readonly string[]).includes(status);
};

/**
 * Checks if a rating is valid (1-5).
 */
export const isValidRating = (rating: number): boolean => {
  return rating >= RATING_1 && rating <= RATING_5 && Number.isInteger(rating);
};

/**
 * Consolidated review status constants object for convenient lookup.
 */
export const ReviewStatus = {
  // Core
  PENDING,
  APPROVED,
  REJECTED,
  FLAGGED,
  HIDDEN,
  REMOVED,
  DELETED,
  ARCHIVED,
  // Extended
  DRAFT,
  SUBMITTED,
  UNDER_REVIEW,
  IN_MODERATION,
  AWAITING_REVIEW,
  AWAITING_RESPONSE,
  NEEDS_REVISION,
  NEEDS_MORE_INFO,
  ESCALATED,
  APPEALED,
  APPEAL_PENDING,
  APPEAL_APPROVED,
  APPEAL_REJECTED,
  SUSPENDED,
  BANNED,
  WARNING,
  VERIFIED,
  FEATURED,
  PINNED,
  LOCKED,
  CLOSED,
  RESOLVED,
  DUPLICATE,
  SPAM,
  ABUSE,
  HARASSMENT,
  HATE_SPEECH,
  EXPLICIT,
  VIOLENCE,
  SELF_HARM,
  ILLEGAL,
  FRAUD,
  MISINFORMATION,
  COPYRIGHT,
  PRIVACY,
  IMPERSONATION,
  MINOR_SAFETY,
  TERRORISM,
  OTHER,
  // Ratings
  RATING_1,
  RATING_2,
  RATING_3,
  RATING_4,
  RATING_5,
  // Review types
  REVIEW_TYPE_PRODUCT,
  REVIEW_TYPE_SERVICE,
  REVIEW_TYPE_FREELANCER,
  REVIEW_TYPE_CLIENT,
  REVIEW_TYPE_TASK,
  REVIEW_TYPE_PROPOSAL,
  REVIEW_TYPE_PAYMENT,
  REVIEW_TYPE_DELIVERY,
  REVIEW_TYPE_COMMUNICATION,
  REVIEW_TYPE_QUALITY,
  REVIEW_TYPE_TIMELINESS,
  REVIEW_TYPE_PROFESSIONALISM,
  REVIEW_TYPE_VALUE,
  REVIEW_TYPE_EXPERIENCE,
  REVIEW_TYPE_OTHER,
  // Collections
  ALL: REVIEW_STATUSES,
  ACTIVE: ACTIVE_STATUSES,
  TERMINAL: TERMINAL_STATUSES,
  VIOLATIONS: VIOLATION_CATEGORIES,
  // Helpers
  isValid: isValidReviewStatus,
  isActive: isActiveStatus,
  isTerminal: isTerminalStatus,
  isViolation,
  isValidRating,
} as const;

export default ReviewStatus;
