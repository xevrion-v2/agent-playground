/**
 * Message lifecycle status constants.
 *
 * @example
 * `	s
 * import { MessageStatus } from './message-status';
 * if (msg.status === MessageStatus.SENT) { /* ... *\/ }
 * `
 */
export const MessageStatus = {
  DRAFT: 'draft' as const,
  SENT: 'sent' as const,
  DELIVERED: 'delivered' as const,
  READ: 'read' as const,
  FAILED: 'failed' as const,
} as const;

export type MessageStatus = (typeof MessageStatus)[keyof typeof MessageStatus];
