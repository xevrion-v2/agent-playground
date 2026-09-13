/** Represents a registered user. */
export interface User {
  id: string;
  [key: string]: unknown;
}

/** Fields required when creating a new user. */
export type CreateUserInput = Record<string, unknown>;

/**
 * Retrieves all registered users.
 *
 * @returns A promise that resolves with an array of users.
 *          Returns an empty array until persistence is wired up.
 */
export async function listUsers(): Promise<User[]> {
  return [];
}

/**
 * Creates a new user record.
 *
 * @param data - The fields required to create a user (e.g. name, email).
 * @returns A promise that resolves with the newly created user,
 *          including its generated `id`.
 */
export async function createUser(data: CreateUserInput): Promise<User> {
  return { id: "stub-user-id", ...data };
}
