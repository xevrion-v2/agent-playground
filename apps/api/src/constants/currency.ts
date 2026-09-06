export const currencies = {
  usd: 'USD',
  eur: 'EUR',
  gbp: 'GBP',
} as const;

export type Currency = typeof currencies[keyof typeof currencies];

export const currencyValues = Object.values(currencies);