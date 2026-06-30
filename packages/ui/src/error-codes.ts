// ponytail: API error code constants
export const ERROR_CODES = { VALIDATION_ERROR: 'VALIDATION_ERROR', AUTH_REQUIRED: 'AUTH_REQUIRED', NOT_FOUND: 'NOT_FOUND', RATE_LIMITED: 'RATE_LIMITED', SERVER_ERROR: 'SERVER_ERROR' } as const;
export type ErrorCode = typeof ERROR_CODES[keyof typeof ERROR_CODES];
