/**
 * User role constants for TaskFlow API role-based access control.
 * Use these named constants instead of magic strings for consistency.
 */

// Core user roles
export const CLIENT = "CLIENT";
export const FREELANCER = "FREELANCER";
export const ADMIN = "ADMIN";
export const SUPER_ADMIN = "SUPER_ADMIN";
export const MODERATOR = "MODERATOR";
export const SUPPORT = "SUPPORT";
export const GUEST = "GUEST";
export const USER = "USER";

// Extended user roles
export const OWNER = "OWNER";
export const MANAGER = "MANAGER";
export const TEAM_LEAD = "TEAM_LEAD";
export const MEMBER = "MEMBER";
export const VIEWER = "VIEWER";
export const EDITOR = "EDITOR";
export const CONTRIBUTOR = "CONTRIBUTOR";
export const MAINTAINER = "MAINTAINER";
export const DEVELOPER = "DEVELOPER";
export const DESIGNER = "DESIGNER";
export const ACCOUNTANT = "ACCOUNTANT";
export const FINANCE = "FINANCE";
export const HR = "HR";
export const SALES = "SALES";
export const MARKETING = "MARKETING";
export const ANALYST = "ANALYST";
export const AUDITOR = "AUDITOR";
export const BOT = "BOT";
export const SERVICE_ACCOUNT = "SERVICE_ACCOUNT";
export const SYSTEM = "SYSTEM";
export const ANONYMOUS = "ANONYMOUS";
export const DEACTIVATED = "DEACTIVATED";
export const SUSPENDED = "SUSPENDED";
export const BANNED = "BANNED";

// Role hierarchy levels (higher = more permissions)
export const ROLE_LEVELS: Record<string, number> = {
  [ANONYMOUS]: 0,
  [GUEST]: 1,
  [USER]: 2,
  [CLIENT]: 3,
  [FREELANCER]: 3,
  [MEMBER]: 3,
  [VIEWER]: 3,
  [EDITOR]: 4,
  [CONTRIBUTOR]: 4,
  [DEVELOPER]: 4,
  [DESIGNER]: 4,
  [TEAM_LEAD]: 5,
  [MANAGER]: 6,
  [SUPPORT]: 6,
  [MODERATOR]: 7,
  [ADMIN]: 8,
  [OWNER]: 9,
  [SUPER_ADMIN]: 10,
  [SYSTEM]: 10,
} as const;

/**
 * All valid user roles.
 */
export const USER_ROLES = [
  // Core
  CLIENT,
  FREELANCER,
  ADMIN,
  SUPER_ADMIN,
  MODERATOR,
  SUPPORT,
  GUEST,
  USER,
  // Extended
  OWNER,
  MANAGER,
  TEAM_LEAD,
  MEMBER,
  VIEWER,
  EDITOR,
  CONTRIBUTOR,
  MAINTAINER,
  DEVELOPER,
  DESIGNER,
  ACCOUNTANT,
  FINANCE,
  HR,
  SALES,
  MARKETING,
  ANALYST,
  AUDITOR,
  BOT,
  SERVICE_ACCOUNT,
  SYSTEM,
  ANONYMOUS,
  DEACTIVATED,
  SUSPENDED,
  BANNED,
] as const;

/**
 * Administrative roles (have elevated permissions).
 */
export const ADMIN_ROLES = [
  ADMIN,
  SUPER_ADMIN,
  MODERATOR,
  SUPPORT,
  OWNER,
  MANAGER,
  SYSTEM,
] as const;

/**
 * Standard user roles (regular platform users).
 */
export const STANDARD_ROLES = [
  CLIENT,
  FREELANCER,
  USER,
  MEMBER,
  VIEWER,
  EDITOR,
  CONTRIBUTOR,
  DEVELOPER,
  DESIGNER,
  TEAM_LEAD,
] as const;

/**
 * Checks if a role is a valid user role.
 */
export const isValidUserRole = (role: string): boolean => {
  return (USER_ROLES as readonly string[]).includes(role);
};

/**
 * Checks if a role is an administrative role.
 */
export const isAdminRole = (role: string): boolean => {
  return (ADMIN_ROLES as readonly string[]).includes(role);
};

/**
 * Checks if a role is a standard user role.
 */
export const isStandardRole = (role: string): boolean => {
  return (STANDARD_ROLES as readonly string[]).includes(role);
};

/**
 * Gets the permission level for a role.
 */
export const getRoleLevel = (role: string): number => {
  return ROLE_LEVELS[role] ?? 0;
};

/**
 * Checks if role A has at least the permission level of role B.
 */
export const hasRoleLevel = (roleA: string, roleB: string): boolean => {
  return getRoleLevel(roleA) >= getRoleLevel(roleB);
};

/**
 * Consolidated user role constants object for convenient lookup.
 */
export const UserRoles = {
  // Core
  CLIENT,
  FREELANCER,
  ADMIN,
  SUPER_ADMIN,
  MODERATOR,
  SUPPORT,
  GUEST,
  USER,
  // Extended
  OWNER,
  MANAGER,
  TEAM_LEAD,
  MEMBER,
  VIEWER,
  EDITOR,
  CONTRIBUTOR,
  MAINTAINER,
  DEVELOPER,
  DESIGNER,
  ACCOUNTANT,
  FINANCE,
  HR,
  SALES,
  MARKETING,
  ANALYST,
  AUDITOR,
  BOT,
  SERVICE_ACCOUNT,
  SYSTEM,
  ANONYMOUS,
  DEACTIVATED,
  SUSPENDED,
  BANNED,
  // Collections
  ALL: USER_ROLES,
  ADMIN: ADMIN_ROLES,
  STANDARD: STANDARD_ROLES,
  LEVELS: ROLE_LEVELS,
  // Helpers
  isValid: isValidUserRole,
  isAdmin: isAdminRole,
  isStandard: isStandardRole,
  getLevel: getRoleLevel,
  hasLevel: hasRoleLevel,
} as const;

export default UserRoles;
