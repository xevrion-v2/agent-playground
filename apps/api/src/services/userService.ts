/**
 * User service module.
 *
 * Provides placeholder data-access stubs for user operations.
 * Each function is documented so future contributors understand
 * the intended contract before replacing stubs with real logic.
 */

/**
 * Shape of a user object returned by the service.
 */
export interface User {
  /** Unique identifier */
  id: string;
  /** User display name */
  name?: string;
  /** Email address */
  email?: string;
  /** Any additional fields provided at creation */
  [key: string]: unknown;
}

/**
 * Payload accepted by user creation.
 */
export interface CreateUserPayload {
  name?: string;
  email?: string;
}

/**
 * Retrieve all users.
 *
 * Currently returns an empty array as a stub.
 *
 * @returns A list of user objects.
 */
export function listUsers(): User[] {
  return [];
}

/**
 * Create a new user.
 *
 * Currently generates a stub id and echoes back the payload.
 *
 * @param payload - User creation data.
 * @returns The newly created user object.
 */
export function createUser(payload: CreateUserPayload): User {
  return {
    id: "stub-user-id",
    ...payload
  };
}

/**
 * Retrieve a single user by id.
 *
 * Currently returns a stub user.
 *
 * @param id - The user identifier.
 * @returns The user object, or undefined if not found.
 */
export function getUserById(id: string): User | undefined {
  return undefined;
}

/**
 * Update an existing user.
 *
 * Currently returns a stub response.
 *
 * @param id - The user identifier.
 * @param payload - Fields to update.
 * @returns The updated user object.
 */
export function updateUser(id: string, payload: Partial<CreateUserPayload>): User {
  return {
    id,
    ...payload
  };
}

/**
 * Delete a user.
 *
 * Currently a no-op stub.
 *
 * @param id - The user identifier to remove.
 */
export function deleteUser(_id: string): void {
  // no-op
}
