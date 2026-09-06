const omitUndefined = <T extends Record<string, unknown>>(record: T): Partial<T> => Object.fromEntries(Object.entries(record).filter(([, v]) => v !== undefined)) as Partial<T>;

export { omitUndefined };
