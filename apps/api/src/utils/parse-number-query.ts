const parseNumberQuery = (value: string | undefined, defaultValue: number, min?: number, max?: number): number => {
  if (value === undefined || value === null) return defaultValue;
  const num = Number(value);
  if (!isFinite(num)) return defaultValue;
  if (min !== undefined && num < min) return defaultValue;
  if (max !== undefined && num > max) return defaultValue;
  return num;
};

export { parseNumberQuery };
