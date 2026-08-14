/**
 * Parses common string boolean values into booleans.
 * @param val - String to parse.
 * @returns true, false, or undefined for unrecognized values.
 */
export function parseBoolean(val: string): boolean | undefined {
  const lower = val.toLowerCase().trim();
  if (lower === 'true' || lower === '1' || lower === 'yes') return true;
  if (lower === 'false' || lower === '0' || lower === 'no') return false;
  return undefined;
}