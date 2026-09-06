const isValidDate = (value: unknown): value is Date => value instanceof Date && !isNaN(value.getTime());

export { isValidDate };
