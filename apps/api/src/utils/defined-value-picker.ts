const pickDefinedValue = <T>(...values: T[]): T | undefined => values.find(v => v !== undefined);

export { pickDefinedValue };
