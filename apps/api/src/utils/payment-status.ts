const PAYMENT_STATUS = { PENDING: 'pending', PROCESSING: 'processing', COMPLETED: 'completed', FAILED: 'failed', REFUNDED: 'refunded' } as const;
type PaymentStatus = (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];
export { PAYMENT_STATUS, PaymentStatus };
