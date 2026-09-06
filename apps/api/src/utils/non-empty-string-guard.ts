const isNonEmptyString = (value: unknown): value is string => typeof value === 'string' && value.length > 0;

export { isNonEmptyString };
