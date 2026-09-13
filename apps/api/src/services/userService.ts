/**
 * User Service — Business logic for user management.
 *
 * This module provides the core user operations used by the API routes.
 * Currently implemented as stubs; replace with Prisma/database calls
 * when the data layer is wired up.
 *
 * @module services/userService
 */

/**
 * A user record as returned by the service layer.
 * Mirrors the Prisma User model shape for decoupling.
 */
export interface UserRecord {
  id: string;
  email: string;
  name: string | null;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Parameters for creating a new user.
 */
export interface CreateUserParams {
  email: string;
  name?: string;
  password: string;
}

/**
 * Parameters for querying the user list.
 */
export interface ListUsersParams {
  page?: number;
  limit?: number;
  role?: "client" | "freelancer";
}

/**
 * Retrieve a paginated list of users.
 *
 * @param params - Pagination and filtering options.
 * @returns A promise that resolves to an array of {@link UserRecord}.
 *
 * @todo Replace stub with Prisma query (include pagination + role filter).
 */
export async function listUsers(
  params: ListUsersParams = {}
): Promise<UserRecord[]> {
  // TODO: Implement database query
  void params;
  return [];
}

/**
 * Create a new user account.
 *
 * @param data - The new user's email, name, and password.
 * @returns A promise that resolves to the created {@link UserRecord}.
 * @throws {Error} If the email is already registered (409 Conflict expected).
 *
 * @todo Hash password with bcrypt before storing.
 * @todo Check for duplicate email and throw conflict error.
 * @todo Send verification email.
 */
export async function createUser(
  data: CreateUserParams
): Promise<UserRecord> {
  // TODO: Implement database insert
  return {
    id: `stub-${Date.now()}`,
    email: data.email,
    name: data.name ?? null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

/**
 * Find a user by their unique ID.
 *
 * @param id - The user's ID (cuid).
 * @returns A promise that resolves to the {@link UserRecord}, or `null` if not found.
 */
export async function getUserById(
  id: string
): Promise<UserRecord | null> {
  // TODO: Implement database lookup
  void id;
  return null;
}

/**
 * Find a user by their email address.
 *
 * @param email - The user's email.
 * @returns A promise that resolves to the {@link UserRecord}, or `null` if not found.
 */
export async function getUserByEmail(
  email: string
): Promise<UserRecord | null> {
  // TODO: Implement database lookup
  void email;
  return null;
}
