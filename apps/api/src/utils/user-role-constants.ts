/**
 * User role constants.
 * @module utils/user-role-constants
 */
export const UserRole = {
  ADMIN: "admin",
  MODERATOR: "moderator",
  USER: "user",
  GUEST: "guest",
} as const;

export type UserRoleType = (typeof UserRole)[keyof typeof UserRole];
