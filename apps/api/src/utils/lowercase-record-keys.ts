export type LowercaseRecordKeys<T extends Record<string, unknown>> = {
  [K in keyof T as K extends string ? Lowercase<K> : never]: T[K];
};

export function lowercaseRecordKeys<T extends Record<string, unknown>>(value: T): LowercaseRecordKeys<T> {
  const result: Record<string, unknown> = {};

  for (const [key, entry] of Object.entries(value)) {
    result[key.toLowerCase()] = entry;
  }

  return result as LowercaseRecordKeys<T>;
}
