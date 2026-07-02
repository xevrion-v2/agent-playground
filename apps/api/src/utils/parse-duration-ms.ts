const UNIT_TO_MS = {
  ms: 1,
  s: 1000,
  m: 60_000,
  h: 3_600_000,
  d: 86_400_000
} as const;

const DURATION_PART = /(\d+)(ms|s|m|h|d)/g;

export function parseDurationMs(value: string): number {
  let total = 0;
  let consumed = 0;
  let match: RegExpExecArray | null;

  DURATION_PART.lastIndex = 0;

  while ((match = DURATION_PART.exec(value)) !== null) {
    const [token, amountText, unit] = match;
    const amount = Number(amountText);

    total += amount * UNIT_TO_MS[unit as keyof typeof UNIT_TO_MS];
    consumed += token.length;
  }

  if (consumed !== value.length || consumed === 0) {
    throw new TypeError("duration must be a compact string like 250ms, 30s, 5m, 2h, or 1d");
  }

  return total;
}
