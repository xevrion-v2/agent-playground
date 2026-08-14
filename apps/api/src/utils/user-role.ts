/**
 * User role constants for TaskFlow API client/freelancer/admin checks.
 *
 * @example
 * `	s
 * import { UserRole } from './user-role';
 * if (user.role === UserRole.ADMIN) { /* admin path *\/ }
 * `
 */
export const UserRole = {
  CLIENT: 'client' as const,
  FREELANCER: 'freelancer' as const,
  ADMIN: 'admin' as const,
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];
