export function formatPercent(value: number, fractionDigits = 2): string {
  if (!Number.isFinite(value)) {
    throw new RangeError("value must be a finite number");
  }

  if (
    !Number.isInteger(fractionDigits) ||
    fractionDigits < 0 ||
    fractionDigits > 20
  ) {
    throw new RangeError("fractionDigits must be an integer between 0 and 20");
  }

  return `${(value * 100).toFixed(fractionDigits)}%`;
}
