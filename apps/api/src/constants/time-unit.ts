export const timeUnits = {
  second: 'second',
  minute: 'minute',
  hour: 'hour',
  day: 'day',
  week: 'week',
} as const;

export type TimeUnit = typeof timeUnits[keyof typeof timeUnits];

export const timeUnitValues = Object.values(timeUnits);