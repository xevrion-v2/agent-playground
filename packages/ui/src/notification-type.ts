// ponytail: notification type constants
export const NOTIFICATION_TYPE = { TASK_ASSIGNED: 'taskAssigned', TASK_COMPLETED: 'taskCompleted', PROPOSAL_CREATED: 'proposalCreated', PAYMENT_RECEIVED: 'paymentReceived', MESSAGE_RECEIVED: 'messageReceived' } as const;
export type NotificationType = typeof NOTIFICATION_TYPE[keyof typeof NOTIFICATION_TYPE];
