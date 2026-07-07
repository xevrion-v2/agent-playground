const UNITS: Record<string, number> = {
  ms: 1,
  s: 1_000,
  m: 60_000,
  h: 3_600_000,
  d: 86_400_000,
};

export function parseDurationMs(value: string, fallback = 0): number {
  const match = value.trim().match(/^(\d+(?:\.\d+)?)(ms|s|m|h|d)$/i);
  if (!match) {
    return fallback;
  }
  const amount = Number(match[1]);
  const unit = match[2].toLowerCase();
  const multiplier = UNITS[unit];
  return Number.isFinite(amount) && multiplier ? amount * multiplier : fallback;
}
