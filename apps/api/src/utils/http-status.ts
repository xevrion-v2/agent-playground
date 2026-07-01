/**
 * HTTP status code constants for API routes and middleware.
 * Maps common status codes to their numeric and textual representations.
 *
 * @example
 * `	s
 * import { HttpStatus } from './http-status';
 * res.status(HttpStatus.NOT_FOUND).json({ error: 'not found' });
 * `
 */
export const HttpStatus = {
  /** 100 Continue */
  CONTINUE: 100,
  /** 200 OK */
  OK: 200,
  /** 201 Created */
  CREATED: 201,
  /** 204 No Content */
  NO_CONTENT: 204,
  /** 301 Moved Permanently */
  MOVED_PERMANENTLY: 301,
  /** 304 Not Modified */
  NOT_MODIFIED: 304,
  /** 400 Bad Request */
  BAD_REQUEST: 400,
  /** 401 Unauthorized */
  UNAUTHORIZED: 401,
  /** 403 Forbidden */
  FORBIDDEN: 403,
  /** 404 Not Found */
  NOT_FOUND: 404,
  /** 405 Method Not Allowed */
  METHOD_NOT_ALLOWED: 405,
  /** 409 Conflict */
  CONFLICT: 409,
  /** 422 Unprocessable Entity */
  UNPROCESSABLE_ENTITY: 422,
  /** 429 Too Many Requests */
  TOO_MANY_REQUESTS: 429,
  /** 500 Internal Server Error */
  INTERNAL_SERVER_ERROR: 500,
  /** 502 Bad Gateway */
  BAD_GATEWAY: 502,
  /** 503 Service Unavailable */
  SERVICE_UNAVAILABLE: 503,
  /** 504 Gateway Timeout */
  GATEWAY_TIMEOUT: 504,
} as const;
