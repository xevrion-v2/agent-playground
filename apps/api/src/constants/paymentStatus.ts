/**
 * Payment status constants for TaskFlow API payment lifecycle values.
 * Use these named constants instead of magic strings for consistency.
 */

// Core payment statuses
export const PENDING = "PENDING";
export const PROCESSING = "PROCESSING";
export const COMPLETED = "COMPLETED";
export const FAILED = "FAILED";
export const CANCELLED = "CANCELLED";
export const REFUNDED = "REFUNDED";
export const PARTIALLY_REFUNDED = "PARTIALLY_REFUNDED";
export const DECLINED = "DECLINED";
export const EXPIRED = "EXPIRED";
export const AUTHORIZED = "AUTHORIZED";
export const CAPTURED = "CAPTURED";
export const VOIDED = "VOIDED";

// Extended payment statuses
export const CREATED = "CREATED";
export const INITIATED = "INITIATED";
export const AWAITING_PAYMENT = "AWAITING_PAYMENT";
export const AWAITING_CONFIRMATION = "AWAITING_CONFIRMATION";
export const AWAITING_CAPTURE = "AWAITING_CAPTURE";
export const AWAITING_REFUND = "AWAITING_REFUND";
export const SUCCESS = "SUCCESS";
export const ERROR = "ERROR";
export const TIMEOUT = "TIMEOUT";
export const REVERSED = "REVERSED";
export const CHARGEBACK = "CHARGEBACK";
export const DISPUTED = "DISPUTED";
export const ON_HOLD = "ON_HOLD";
export const FROZEN = "FROZEN";
export const SCHEDULED = "SCHEDULED";
export const RECURRING = "RECURRING";
export const PAUSED = "PAUSED";
export const ACTIVE = "ACTIVE";
export const INACTIVE = "INACTIVE";
export const TERMINATED = "TERMINATED";
export const ARCHIVED = "ARCHIVED";
export const DELETED = "DELETED";

// Payment method types
export const PAYMENT_METHOD_CARD = "CARD";
export const PAYMENT_METHOD_BANK_TRANSFER = "BANK_TRANSFER";
export const PAYMENT_METHOD_PAYPAL = "PAYPAL";
export const PAYMENT_METHOD_CRYPTO = "CRYPTO";
export const PAYMENT_METHOD_WALLET = "WALLET";
export const PAYMENT_METHOD_CASH = "CASH";
export const PAYMENT_METHOD_CHECK = "CHECK";
export const PAYMENT_METHOD_OTHER = "OTHER";

// Payment currencies
export const CURRENCY_USD = "USD";
export const CURRENCY_EUR = "EUR";
export const CURRENCY_GBP = "GBP";
export const CURRENCY_CNY = "CNY";
export const CURRENCY_JPY = "JPY";

/**
 * All valid payment statuses in lifecycle order.
 */
export const PAYMENT_STATUSES = [
  CREATED,
  INITIATED,
  PENDING,
  AWAITING_PAYMENT,
  AWAITING_CONFIRMATION,
  PROCESSING,
  AUTHORIZED,
  AWAITING_CAPTURE,
  CAPTURED,
  COMPLETED,
  SUCCESS,
  PAID: "PAID",
  AWAITING_REFUND,
  PARTIALLY_REFUNDED,
  REFUNDED,
  REVERSED,
  VOIDED,
  CANCELLED,
  DECLINED,
  FAILED,
  ERROR,
  TIMEOUT,
  EXPIRED,
  CHARGEBACK,
  DISPUTED,
  ON_HOLD,
  FROZEN,
  SCHEDULED,
  RECURRING,
  PAUSED,
  ACTIVE,
  INACTIVE,
  TERMINATED,
  ARCHIVED,
  DELETED,
] as const;

/**
 * Active payment statuses (not terminal).
 */
export const ACTIVE_STATUSES = [
  CREATED,
  INITIATED,
  PENDING,
  AWAITING_PAYMENT,
  AWAITING_CONFIRMATION,
  PROCESSING,
  AUTHORIZED,
  AWAITING_CAPTURE,
  AWAITING_REFUND,
  ON_HOLD,
  FROZEN,
  SCHEDULED,
  RECURRING,
  PAUSED,
  ACTIVE,
  DISPUTED,
] as const;

/**
 * Terminal payment statuses (final states).
 */
export const TERMINAL_STATUSES = [
  CAPTURED,
  COMPLETED,
  SUCCESS,
  PAID,
  PARTIALLY_REFUNDED,
  REFUNDED,
  REVERSED,
  VOIDED,
  CANCELLED,
  DECLINED,
  FAILED,
  ERROR,
  TIMEOUT,
  EXPIRED,
  CHARGEBACK,
  INACTIVE,
  TERMINATED,
  ARCHIVED,
  DELETED,
] as const;

/**
 * Successful payment statuses.
 */
export const SUCCESS_STATUSES = [
  AUTHORIZED,
  CAPTURED,
  COMPLETED,
  SUCCESS,
  PAID,
] as const;

/**
 * Failed payment statuses.
 */
export const FAILED_STATUSES = [
  CANCELLED,
  DECLINED,
  FAILED,
  ERROR,
  TIMEOUT,
  EXPIRED,
  VOIDED,
] as const;

/**
 * Checks if a status is a valid payment status.
 */
export const isValidPaymentStatus = (status: string): boolean => {
  return (PAYMENT_STATUSES as readonly string[]).includes(status);
};

/**
 * Checks if a status is an active (non-terminal) status.
 */
export const isActiveStatus = (status: string): boolean => {
  return (ACTIVE_STATUSES as readonly string[]).includes(status);
};

/**
 * Checks if a status is a terminal (final) status.
 */
export const isTerminalStatus = (status: string): boolean => {
  return (TERMINAL_STATUSES as readonly string[]).includes(status);
};

/**
 * Checks if a status is a successful payment status.
 */
export const isSuccessStatus = (status: string): boolean => {
  return (SUCCESS_STATUSES as readonly string[]).includes(status);
};

/**
 * Checks if a status is a failed payment status.
 */
export const isFailedStatus = (status: string): boolean => {
  return (FAILED_STATUSES as readonly string[]).includes(status);
};

/**
 * Consolidated payment status constants object for convenient lookup.
 */
export const PaymentStatus = {
  // Core
  PENDING,
  PROCESSING,
  COMPLETED,
  FAILED,
  CANCELLED,
  REFUNDED,
  PARTIALLY_REFUNDED,
  DECLINED,
  EXPIRED,
  AUTHORIZED,
  CAPTURED,
  VOIDED,
  // Extended
  CREATED,
  INITIATED,
  AWAITING_PAYMENT,
  AWAITING_CONFIRMATION,
  AWAITING_CAPTURE,
  AWAITING_REFUND,
  SUCCESS,
  ERROR,
  TIMEOUT,
  REVERSED,
  CHARGEBACK,
  DISPUTED,
  ON_HOLD,
  FROZEN,
  SCHEDULED,
  RECURRING,
  PAUSED,
  ACTIVE,
  INACTIVE,
  TERMINATED,
  ARCHIVED,
  DELETED,
  // Payment methods
  PAYMENT_METHOD_CARD,
  PAYMENT_METHOD_BANK_TRANSFER,
  PAYMENT_METHOD_PAYPAL,
  PAYMENT_METHOD_CRYPTO,
  PAYMENT_METHOD_WALLET,
  PAYMENT_METHOD_CASH,
  PAYMENT_METHOD_CHECK,
  PAYMENT_METHOD_OTHER,
  // Currencies
  CURRENCY_USD,
  CURRENCY_EUR,
  CURRENCY_GBP,
  CURRENCY_CNY,
  CURRENCY_JPY,
  // Collections
  ALL: PAYMENT_STATUSES,
  ACTIVE: ACTIVE_STATUSES,
  TERMINAL: TERMINAL_STATUSES,
  SUCCESS: SUCCESS_STATUSES,
  FAILED: FAILED_STATUSES,
  // Helpers
  isValid: isValidPaymentStatus,
  isActive: isActiveStatus,
  isTerminal: isTerminalStatus,
  isSuccess: isSuccessStatus,
  isFailed: isFailedStatus,
} as const;

export default PaymentStatus;
