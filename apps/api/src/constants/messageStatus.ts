/**
 * Message status constants for TaskFlow API messaging endpoint state handling.
 * Use these named constants instead of magic strings for consistency.
 */

// Core message statuses
export const DRAFT = "DRAFT";
export const PENDING = "PENDING";
export const SENDING = "SENDING";
export const SENT = "SENT";
export const DELIVERED = "DELIVERED";
export const READ = "READ";
export const RECEIVED = "RECEIVED";
export const FAILED = "FAILED";
export const CANCELLED = "CANCELLED";
export const DELETED = "DELETED";
export const ARCHIVED = "ARCHIVED";

// Extended message statuses
export const QUEUED = "QUEUED";
export const PROCESSING = "PROCESSING";
export const AWAITING_DELIVERY = "AWAITING_DELIVERY";
export const DELIVERY_ATTEMPTED = "DELIVERY_ATTEMPTED";
export const DELIVERY_FAILED = "DELIVERY_FAILED";
export const RETRYING = "RETRYING";
export const EXPIRED = "EXPIRED";
export const TIMEOUT = "TIMEOUT";
export const BOUNCED = "BOUNCED";
export const REJECTED = "REJECTED";
export const SPAM = "SPAM";
export const BLOCKED = "BLOCKED";
export const MUTED = "MUTED";
export const HIDDEN = "HIDDEN";
export const REPORTED = "REPORTED";
export const FLAGGED = "FLAGGED";
export const EDITED = "EDITED";
export const PINNED = "PINNED";
export const STARRED = "STARRED";
export const IMPORTANT = "IMPORTANT";
export const UNREAD = "UNREAD";
export const MENTIONED = "MENTIONED";
export const REPLIED = "REPLIED";
export const FORWARDED = "FORWARDED";
export const SCHEDULED = "SCHEDULED";
export const RECURRING = "RECURRING";
export const TEMPLATE = "TEMPLATE";
export const AUTOMATED = "AUTOMATED";
export const SYSTEM = "SYSTEM";
export const BOT = "BOT";

// Message types
export const MESSAGE_TYPE_TEXT = "TEXT";
export const MESSAGE_TYPE_IMAGE = "IMAGE";
export const MESSAGE_TYPE_VIDEO = "VIDEO";
export const MESSAGE_TYPE_AUDIO = "AUDIO";
export const MESSAGE_TYPE_FILE = "FILE";
export const MESSAGE_TYPE_LINK = "LINK";
export const MESSAGE_TYPE_EMOJI = "EMOJI";
export const MESSAGE_TYPE_STICKER = "STICKER";
export const MESSAGE_TYPE_GIF = "GIF";
export const MESSAGE_TYPE_LOCATION = "LOCATION";
export const MESSAGE_TYPE_CONTACT = "CONTACT";
export const MESSAGE_TYPE_POLL = "POLL";
export const MESSAGE_TYPE_EVENT = "EVENT";
export const MESSAGE_TYPE_TASK = "TASK";
export const MESSAGE_TYPE_PAYMENT = "PAYMENT";
export const MESSAGE_TYPE_INVOICE = "INVOICE";
export const MESSAGE_TYPE_RECEIPT = "RECEIPT";
export const MESSAGE_TYPE_SYSTEM = "SYSTEM";
export const MESSAGE_TYPE_NOTIFICATION = "NOTIFICATION";
export const MESSAGE_TYPE_CALL = "CALL";
export const MESSAGE_TYPE_VIDEO_CALL = "VIDEO_CALL";
export const MESSAGE_TYPE_VOICE_MESSAGE = "VOICE_MESSAGE";
export const MESSAGE_TYPE_CODE = "CODE";
export const MESSAGE_TYPE_QUOTE = "QUOTE";
export const MESSAGE_TYPE_REPLY = "REPLY";

// Conversation statuses
export const CONVERSATION_ACTIVE = "ACTIVE";
export const CONVERSATION_ARCHIVED = "ARCHIVED";
export const CONVERSATION_MUTED = "MUTED";
export const CONVERSATION_PINNED = "PINNED";
export const CONVERSATION_DELETED = "DELETED";
export const CONVERSATION_BLOCKED = "BLOCKED";
export const CONVERSATION_REPORTED = "REPORTED";

/**
 * All valid message statuses in lifecycle order.
 */
export const MESSAGE_STATUSES = [
  DRAFT,
  SCHEDULED,
  QUEUED,
  PENDING,
  SENDING,
  PROCESSING,
  AWAITING_DELIVERY,
  SENT,
  DELIVERY_ATTEMPTED,
  DELIVERED,
  RECEIVED,
  READ,
  UNREAD,
  EDITED,
  DELETED,
  ARCHIVED,
  FAILED,
  DELIVERY_FAILED,
  RETRYING,
  CANCELLED,
  EXPIRED,
  TIMEOUT,
  BOUNCED,
  REJECTED,
  SPAM,
  BLOCKED,
] as const;

/**
 * Active message statuses (not terminal).
 */
export const ACTIVE_STATUSES = [
  DRAFT,
  SCHEDULED,
  QUEUED,
  PENDING,
  SENDING,
  PROCESSING,
  AWAITING_DELIVERY,
  SENT,
  DELIVERY_ATTEMPTED,
  DELIVERED,
  RECEIVED,
  READ,
  UNREAD,
  EDITED,
  RETRYING,
] as const;

/**
 * Terminal message statuses (final states).
 */
export const TERMINAL_STATUSES = [
  DELETED,
  ARCHIVED,
  FAILED,
  DELIVERY_FAILED,
  CANCELLED,
  EXPIRED,
  TIMEOUT,
  BOUNCED,
  REJECTED,
  SPAM,
  BLOCKED,
] as const;

/**
 * Successful message statuses.
 */
export const SUCCESS_STATUSES = [
  SENT,
  DELIVERED,
  RECEIVED,
  READ,
] as const;

/**
 * Failed message statuses.
 */
export const FAILED_STATUSES = [
  FAILED,
  DELIVERY_FAILED,
  CANCELLED,
  EXPIRED,
  TIMEOUT,
  BOUNCED,
  REJECTED,
] as const;

/**
 * Checks if a status is a valid message status.
 */
export const isValidMessageStatus = (status: string): boolean => {
  return (MESSAGE_STATUSES as readonly string[]).includes(status);
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
 * Checks if a status is a successful message status.
 */
export const isSuccessStatus = (status: string): boolean => {
  return (SUCCESS_STATUSES as readonly string[]).includes(status);
};

/**
 * Checks if a status is a failed message status.
 */
export const isFailedStatus = (status: string): boolean => {
  return (FAILED_STATUSES as readonly string[]).includes(status);
};

/**
 * Consolidated message status constants object for convenient lookup.
 */
export const MessageStatus = {
  // Core
  DRAFT,
  PENDING,
  SENDING,
  SENT,
  DELIVERED,
  READ,
  RECEIVED,
  FAILED,
  CANCELLED,
  DELETED,
  ARCHIVED,
  // Extended
  QUEUED,
  PROCESSING,
  AWAITING_DELIVERY,
  DELIVERY_ATTEMPTED,
  DELIVERY_FAILED,
  RETRYING,
  EXPIRED,
  TIMEOUT,
  BOUNCED,
  REJECTED,
  SPAM,
  BLOCKED,
  MUTED,
  HIDDEN,
  REPORTED,
  FLAGGED,
  EDITED,
  PINNED,
  STARRED,
  IMPORTANT,
  UNREAD,
  MENTIONED,
  REPLIED,
  FORWARDED,
  SCHEDULED,
  RECURRING,
  TEMPLATE,
  AUTOMATED,
  SYSTEM,
  BOT,
  // Message types
  MESSAGE_TYPE_TEXT,
  MESSAGE_TYPE_IMAGE,
  MESSAGE_TYPE_VIDEO,
  MESSAGE_TYPE_AUDIO,
  MESSAGE_TYPE_FILE,
  MESSAGE_TYPE_LINK,
  MESSAGE_TYPE_EMOJI,
  MESSAGE_TYPE_STICKER,
  MESSAGE_TYPE_GIF,
  MESSAGE_TYPE_LOCATION,
  MESSAGE_TYPE_CONTACT,
  MESSAGE_TYPE_POLL,
  MESSAGE_TYPE_EVENT,
  MESSAGE_TYPE_TASK,
  MESSAGE_TYPE_PAYMENT,
  MESSAGE_TYPE_INVOICE,
  MESSAGE_TYPE_RECEIPT,
  MESSAGE_TYPE_SYSTEM,
  MESSAGE_TYPE_NOTIFICATION,
  MESSAGE_TYPE_CALL,
  MESSAGE_TYPE_VIDEO_CALL,
  MESSAGE_TYPE_VOICE_MESSAGE,
  MESSAGE_TYPE_CODE,
  MESSAGE_TYPE_QUOTE,
  MESSAGE_TYPE_REPLY,
  // Conversation statuses
  CONVERSATION_ACTIVE,
  CONVERSATION_ARCHIVED,
  CONVERSATION_MUTED,
  CONVERSATION_PINNED,
  CONVERSATION_DELETED,
  CONVERSATION_BLOCKED,
  CONVERSATION_REPORTED,
  // Collections
  ALL: MESSAGE_STATUSES,
  ACTIVE: ACTIVE_STATUSES,
  TERMINAL: TERMINAL_STATUSES,
  SUCCESS: SUCCESS_STATUSES,
  FAILED: FAILED_STATUSES,
  // Helpers
  isValid: isValidMessageStatus,
  isActive: isActiveStatus,
  isTerminal: isTerminalStatus,
  isSuccess: isSuccessStatus,
  isFailed: isFailedStatus,
} as const;

export default MessageStatus;
