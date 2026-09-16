/**
 * Currency code constants for API responses.
 * @module utils/currency-constants
 */
export const CurrencyCode = {
  USD: "USD",
  EUR: "EUR",
  GBP: "GBP",
  JPY: "JPY",
  CNY: "CNY",
} as const;

export type Currency = (typeof CurrencyCode)[keyof typeof CurrencyCode];
