/**
 * Message delivery status constants.
 * @module utils/message-status-constants
 */
export const MessageStatus = {
  SENT: "sent",
  DELIVERED: "delivered",
  READ: "read",
  FAILED: "failed",
} as const;

export type MessageStatusType = (typeof MessageStatus)[keyof typeof MessageStatus];
