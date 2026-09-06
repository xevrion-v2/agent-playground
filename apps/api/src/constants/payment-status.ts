export const paymentStatuses = {
  pending: "pending",
  authorized: "authorized",
  paid: "paid",
  failed: "failed",
  refunded: "refunded",
} as const;

export type PaymentStatus =
  (typeof paymentStatuses)[keyof typeof paymentStatuses];

export const paymentStatusValues = Object.values(paymentStatuses);