/**
 * User service — business logic for user operations.
 *
 * Currently returns stub data while the persistence layer is being built.
 */

/** Shape of a user resource returned by the service. */
export interface User {
  id: string;
  [key: string]: unknown;
}

/** Shape of the payload accepted when creating a user. */
export interface CreateUserPayload {
  [key: string]: unknown;
}

/**
 * List all users.
 *
 * @returns An object containing the user array and a status message.
 *          Returns an empty array when no users exist.
 */
export function listUsers(): { data: User[]; message: string } {
  return {
    data: [],
    message: "User listing is not implemented yet.",
  };
}

/**
 * Create a new user.
 *
 * @param payload — Arbitrary key-value data for the new user.
 * @returns An object containing the created user stub and a status message.
 *          The returned user always includes an auto-generated `id`.
 */
export function createUser(payload: CreateUserPayload): {
  data: User;
  message: string;
} {
  return {
    data: {
      id: "stub-user-id",
      ...payload,
    } as User,
    message: "User creation is not implemented yet.",
  };
}
