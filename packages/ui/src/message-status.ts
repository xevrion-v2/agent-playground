// ponytail: message status constants
export const MESSAGE_STATUS = { SENT: 'sent', DELIVERED: 'delivered', READ: 'read', FAILED: 'failed' } as const;
export type MessageStatus = typeof MESSAGE_STATUS[keyof typeof MESSAGE_STATUS];
