export const currencyCodes = {
  usd: "USD",
  eur: "EUR",
  gbp: "GBP",
} as const;

export type CurrencyCode = (typeof currencyCodes)[keyof typeof currencyCodes];
