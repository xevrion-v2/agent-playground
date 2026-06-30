// ponytail: payment status constants
export const PAYMENT_STATUS = { PENDING: 'pending', COMPLETED: 'completed', FAILED: 'failed', REFUNDED: 'refunded' } as const;
export type PaymentStatus = typeof PAYMENT_STATUS[keyof typeof PAYMENT_STATUS];
