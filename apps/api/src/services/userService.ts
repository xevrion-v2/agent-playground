/**
 * User service module.
 *
 * Provides business-logic functions for user management.
 * Currently returns stub data; full persistence is not yet implemented.
 *
 * @module userService
 */

/** Shape of a user object returned by the service. */
export interface User {
  /** Unique identifier for the user. */
  id: string;
  /** Additional user fields carried through from the request body. */
  // deno-lint-ignore no-explicit-any
  [key: string]: any;
}

/** Standard service response envelope. */
export interface ServiceResponse<T> {
  /** The response payload. */
  data: T;
  /** Human-readable status message. */
  message: string;
}

/**
 * Retrieve a list of all users.
 *
 * @returns A promise resolving to a service response containing
 *   an empty user array and a descriptive message.
 */
export async function listUsers(): Promise<ServiceResponse<User[]>> {
  return {
    data: [],
    message: "User listing is not implemented yet."
  };
}

/**
 * Create a new user.
 *
 * Accepts a partial user payload and returns a stub user record with a
 * generated placeholder ID merged with the provided fields.
 *
 * @param body - Partial user data submitted in the request.
 * @returns A promise resolving to a service response containing
 *   the newly created (stub) user and a descriptive message.
 */
export async function createUser(body: Record<string, unknown>): Promise<ServiceResponse<User>> {
  return {
    data: {
      id: "stub-user-id",
      ...body
    } as User,
    message: "User creation is not implemented yet."
  };
}
