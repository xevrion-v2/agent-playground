export const PAYMENT_STATUS = {
  Pending: "pending",
  Authorized: "authorized",
  Paid: "paid",
  Failed: "failed",
  Refunded: "refunded",
} as const;

export type PaymentStatus = (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];

export const PAYMENT_STATUS_VALUES = Object.values(PAYMENT_STATUS) as readonly PaymentStatus[];

/**
 * Checks whether a value is one of the supported API payment statuses.
 */
export function isPaymentStatus(value: unknown): value is PaymentStatus {
  return typeof value === "string" && PAYMENT_STATUS_VALUES.includes(value as PaymentStatus);
}

/**
 * Parses an unknown API input into a supported payment status.
 */
export function parsePaymentStatus(value: unknown): PaymentStatus | undefined {
  return isPaymentStatus(value) ? value : undefined;
}
