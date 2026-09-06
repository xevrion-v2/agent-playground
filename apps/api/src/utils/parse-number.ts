export function parseNumber(value: string | number | undefined, fallback = 0) {
  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : fallback;
}

export function parseInteger(value: string | number | undefined, fallback = 0) {
  const parsed = parseNumber(value, fallback);

  return Number.isInteger(parsed) ? parsed : fallback;
}