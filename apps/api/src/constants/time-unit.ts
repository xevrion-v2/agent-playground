export const timeUnits = {
  second: 1_000,
  minute: 60_000,
  hour: 3_600_000,
  day: 86_400_000,
} as const;

export type TimeUnit = keyof typeof timeUnits;
