const parseBoolean = (value: string | boolean | undefined): boolean => { if (typeof value === 'boolean') return value; if (typeof value === 'string') return value.toLowerCase() === 'true'; return false; };

export { parseBoolean };
