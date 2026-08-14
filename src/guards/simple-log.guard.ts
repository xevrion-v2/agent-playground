export interface SimpleLogOptions {
  flatten?: boolean;
  separator?: string;
  maxDepth?: number;
  includeNull?: boolean;
  fallback?: Record<string, unknown>;
}

export function toSimpleLog(
  value: unknown,
  options: SimpleLogOptions = {}
): Record<string, unknown> {
  const {
    flatten = true,
    separator = '.',
    maxDepth = 5,
    includeNull = true,
    fallback = {}
  } = options;

  if (value === null || value === undefined) {
    return includeNull ? { value } : fallback;
  }

  if (typeof value !== 'object') {
    return { value };
  }

  if (Array.isArray(value)) {
    const result: Record<string, unknown> = {};
    value.forEach((item, index) => {
      const key = `[${index}]`;
      if (typeof item === 'object' && item !== null && flatten) {
        const flattened = flattenObject(item, maxDepth, separator);
        Object.entries(flattened).forEach(([k, v]) => {
          result[`${key}${separator}${k}`] = v;
        });
      } else {
        result[key] = item;
      }
    });
    return result;
  }

  const obj = value as Record<string, unknown>;
  if (flatten) {
    return flattenObject(obj, maxDepth, separator);
  }
  return obj;
}

function flattenObject(
  obj: Record<string, unknown>,
  maxDepth: number,
  separator: string
): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  function flatten(
    current: unknown,
    prefix: string = '',
    depth: number = 0
  ): void {
    if (depth > maxDepth) {
      result[prefix] = '[Max Depth]';
      return;
    }

    if (current === null || current === undefined) {
      result[prefix] = current;
      return;
    }

    if (typeof current !== 'object' || Array.isArray(current)) {
      result[prefix] = current;
      return;
    }

    const obj = current as Record<string, unknown>;
    const keys = Object.keys(obj);

    if (keys.length === 0) {
      result[prefix] = {};
      return;
    }

    for (const key of keys) {
      const value = obj[key];
      const newPrefix = prefix ? `${prefix}${separator}${key}` : key;

      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        flatten(value, newPrefix, depth + 1);
      } else {
        result[newPrefix] = value;
      }
    }
  }

  flatten(obj);
  return result;
}

export function toSimpleLogSafe(
  value: unknown,
  options: SimpleLogOptions = {}
): Record<string, unknown> | null {
  try {
    const result = toSimpleLog(value, options);
    return Object.keys(result).length > 0 ? result : null;
  } catch {
    return null;
  }
}

export function toLogString(
  value: unknown,
  options: SimpleLogOptions = {}
): string {
  try {
    const log = toSimpleLog(value, options);
    return JSON.stringify(log, null, 2);
  } catch {
    return String(value);
  }
}
