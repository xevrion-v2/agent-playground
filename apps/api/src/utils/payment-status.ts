/**
 * Payment lifecycle status constants.
 *
 * @example
 * `	s
 * import { PaymentStatus } from './payment-status';
 * if (payment.status === PaymentStatus.COMPLETED) { /* ... *\/ }
 * `
 */
export const PaymentStatus = {
  PENDING: 'pending' as const,
  PROCESSING: 'processing' as const,
  COMPLETED: 'completed' as const,
  FAILED: 'failed' as const,
  REFUNDED: 'refunded' as const,
  CANCELLED: 'cancelled' as const,
} as const;

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];
