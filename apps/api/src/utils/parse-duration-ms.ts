const UNITS: Record<string, number> = {
  ms: 1,
  s: 1000,
  m: 60_000,
  h: 3_600_000,
  d: 86_400_000,
};

export function parseDurationMs(value: string): number | undefined {
  const trimmed = value.trim();
  if (/^\d+$/.test(trimmed)) {
    return Number(trimmed);
  }
  let total = 0;
  const pattern = /(\d+(?:\.\d+)?)(ms|s|m|h|d)/gi;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(trimmed)) !== null) {
    const amount = Number(match[1]);
    const unit = match[2].toLowerCase();
    const multiplier = UNITS[unit];
    if (multiplier === undefined || !Number.isFinite(amount)) {
      return undefined;
    }
    total += amount * multiplier;
  }
  return pattern.lastIndex > 0 || trimmed.length === 0 ? total : undefined;
}
