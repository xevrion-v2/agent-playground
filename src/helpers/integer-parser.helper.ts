export interface IntegerParserOptions {
  radix?: number;
  allowFloat?: boolean;
  fallback?: number | null;
}

export function parseIntSafe(
  input: unknown,
  options: IntegerParserOptions = {}
): number | null {
  const {
    radix = 10,
    allowFloat = false,
    fallback = null
  } = options;

  if (input === null || input === undefined) {
    return fallback;
  }

  if (typeof input === 'number') {
    if (isNaN(input) || !isFinite(input)) {
      return fallback;
    }
    if (allowFloat) {
      return Math.trunc(input);
    }
    return Math.floor(input);
  }

  if (typeof input === 'string') {
    const trimmed = input.trim();
    if (trimmed === '') {
      return fallback;
    }

    let parsed: number;
    if (allowFloat) {
      parsed = parseFloat(trimmed);
    } else {
      parsed = parseInt(trimmed, radix);
    }

    if (isNaN(parsed) || !isFinite(parsed)) {
      return fallback;
    }

    return Math.trunc(parsed);
  }

  if (typeof input === 'boolean') {
    return input ? 1 : 0;
  }

  return fallback;
}

export function parseIntOrThrow(
  input: unknown,
  options: IntegerParserOptions = {}
): number {
  const result = parseIntSafe(input, options);
  if (result === null) {
    throw new Error(`Invalid integer input: ${String(input)}`);
  }
  return result;
}

export function isValidInteger(
  value: unknown,
  options: IntegerParserOptions = {}
): boolean {
  return parseIntSafe(value, options) !== null;
}
