/**
 * Central API route constants for TaskFlow endpoints.
 *
 * @example
 * `	s
 * import { ApiRoute } from './api-route';
 * fetch(ApiRoute.PROPOSALS); // '/api/proposals'
 * `
 */
export const ApiRoute = {
  TASKS: '/api/tasks' as const,
  PROPOSALS: '/api/proposals' as const,
  MESSAGES: '/api/messages' as const,
  USERS: '/api/users' as const,
  AUTH: '/api/auth' as const,
  PAYMENTS: '/api/payments' as const,
  REVIEWS: '/api/reviews' as const,
  SEARCH: '/api/search' as const,
} as const;

export type ApiRoute = (typeof ApiRoute)[keyof typeof ApiRoute];
