const isPlainRecord = (value: unknown): value is Record<string, unknown> => Object.prototype.toString.call(value) === '[object Object]' && value.constructor === Object;

export { isPlainRecord };
