/**
 * User service module.
 * Provides business logic for user-related operations.
 */

/**
 * Retrieves a list of all users.
 * Currently returns an empty array as the implementation is pending.
 * @returns A promise resolving to an array of user objects.
 */
export async function listUsers(): Promise<Record<string, unknown>[]> {
  return [];
}

/**
 * Creates a new user.
 * Currently returns the input data wrapped in a stub response.
 * @param data - The user creation payload.
 * @returns A promise resolving to the created user object with a generated id.
 */
export async function createUser(data: Record<string, unknown>): Promise<Record<string, unknown>> {
  return {
    id: "stub-user-id",
    ...data,
  };
}
