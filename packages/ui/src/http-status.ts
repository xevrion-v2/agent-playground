// ponytail: HTTP status constants
export const HTTP_STATUS = { OK: 200, CREATED: 201, BAD_REQUEST: 400, UNAUTHORIZED: 401, FORBIDDEN: 403, NOT_FOUND: 404, METHOD_NOT_ALLOWED: 405, INTERNAL_ERROR: 500 } as const;
export type HttpStatus = typeof HTTP_STATUS[keyof typeof HTTP_STATUS];
