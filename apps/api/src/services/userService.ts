/**
 * User Service
 *
 * Provides CRUD operations for user management.
 * All functions return standardized response objects
 * compatible with the existing API contract.
 */

export interface User {
  /** Unique identifier for the user */
  id: string;
  /** User's display name */
  name?: string;
  /** User's email address */
  email?: string;
  /** Additional user properties */
  [key: string]: unknown;
}

export interface ServiceResponse<T> {
  /** The response data payload */
  data: T;
  /** Human-readable status message */
  message: string;
}

/**
 * Retrieves a list of all users.
 *
 * @returns A response containing an empty array (stub implementation).
 *
 * @example
 * `	s
 * const result = await listUsers();
 * // => { data: [], message: "..." }
 * `
 */
export async function listUsers(): Promise<ServiceResponse<User[]>> {
  return {
    data: [],
    message: "User listing is not implemented yet.",
  };
}

/**
 * Creates a new user with the provided data.
 *
 * @param userData - Partial user object containing fields to persist.
 * @returns A response containing the newly created user with a generated ID.
 *
 * @example
 * `	s
 * const result = await createUser({ name: "Alice", email: "alice@example.com" });
 * // => { data: { id: "stub-user-id", name: "Alice", email: "alice@example.com" }, message: "..." }
 * `
 */
export async function createUser(
  userData: Omit<User, "id">
): Promise<ServiceResponse<User>> {
  return {
    data: {
      id: "stub-user-id",
      ...userData,
    },
    message: "User creation is not implemented yet.",
  };
}