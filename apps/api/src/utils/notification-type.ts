/**
 * Notification type constants for task/proposal/message/payment payloads.
 *
 * @example
 * `	s
 * import { NotificationType } from './notification-type';
 * if (notif.type === NotificationType.TASK_ASSIGNED) { /* ... *\/ }
 * `
 */
export const NotificationType = {
  TASK_ASSIGNED: 'task_assigned' as const,
  TASK_COMPLETED: 'task_completed' as const,
  PROPOSAL_SUBMITTED: 'proposal_submitted' as const,
  PROPOSAL_ACCEPTED: 'proposal_accepted' as const,
  MESSAGE_RECEIVED: 'message_received' as const,
  PAYMENT_PROCESSED: 'payment_processed' as const,
} as const;

export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType];
