const DURATION_UNITS: Record<string, number> = {
  ms: 1,
  s: 1_000,
  m: 60_000,
  h: 3_600_000,
};

export function parseDurationMs(value: string, fallback?: number): number | undefined {
  const match = value.trim().match(/^(\d+)(ms|s|m|h)$/);
  if (!match) {
    return fallback;
  }

  const amount = Number(match[1]);
  const unit = DURATION_UNITS[match[2]];
  const duration = amount * unit;

  return Number.isSafeInteger(duration) ? duration : fallback;
}
