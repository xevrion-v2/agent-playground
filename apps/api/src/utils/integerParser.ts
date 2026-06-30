/**
 * Parses a string or number into a safe integer.
 * 
 * This is a standalone utility with no runtime dependencies.
 * It handles edge cases like non-numeric strings, floats, and out-of-range values.
 * 
 * @param value - The value to parse (string, number, or bigint).
 * @returns The parsed integer or null if parsing fails.
 */
export function parseInteger(value: unknown): number | null {
  if (value === null || value === undefined) {
    return null;
  }

  let num: number;

  if (typeof value === 'string') {
    // Trim whitespace and attempt to parse
    const trimmed = value.trim();
    if (trimmed === '') {
      return null;
    }
    
    // Check for valid integer format (optional sign, digits only)
    // This regex ensures we don't parse "1.5" or "1e5" as integers
    if (!/^[+-]?\d+$/.test(trimmed)) {
      return null;
    }
    
    num = Number(trimmed);
  } else if (typeof value === 'number') {
    num = value;
  } else if (typeof value === 'bigint') {
    // Check if bigint fits within safe integer range
    if (value > Number.MAX_SAFE_INTEGER || value < Number.MIN_SAFE_INTEGER) {
      return null;
    }
    num = Number(value);
  } else {
    return null;
  }

  // Check if the number is actually an integer
  if (!Number.isInteger(num)) {
    return null;
  }

  // Check for safe integer range
  if (!Number.isSafeInteger(num)) {
    return null;
  }

  return num;
}