/**
 * User Service Module
 *
 * Provides stubbed user management operations for the API.
 * Currently returns placeholder data until a real data layer is implemented.
 */

/** Shape of a user object returned by the service */
export interface User {
  id: string;
  name?: string;
  email?: string;
}

/**
 * List all users.
 *
 * @returns {Promise<User[]>} An empty array (stub — no database wired yet).
 */
export async function listUsers(): Promise<User[]> {
  return [];
}

/**
 * Create a new user from the given payload.
 *
 * @param {Record<string, unknown>} data - Arbitrary key/value pairs from the request body.
 * @returns {Promise<User>} A stubbed user object with a generated id.
 */
export async function createUser(data: Record<string, unknown>): Promise<User> {
  return {
    id: "stub-user-id",
    ...data,
  } as User;
}
