const compactArray = (arr: unknown[]): unknown[] => arr.filter((item): item is NonNullable<unknown> => item != null);

export { compactArray };
