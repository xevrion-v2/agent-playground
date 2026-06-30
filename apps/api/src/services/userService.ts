/**
 * @fileoverview User service — stub implementations for user-related operations.
 *
 * All functions in this module are placeholder implementations that return
 * predictable stub data. They are intended to be replaced with real database
 * calls (e.g. via Prisma) once persistence is wired up.
 */

/** Shape of a user object returned by this service. */
export interface User {
  id: string;
  name?: string;
  email?: string;
  [key: string]: unknown;
}

/** Payload accepted when creating a new user. */
export type CreateUserPayload = Omit<User, "id">;

/**
 * Retrieves the full list of users.
 *
 * @returns {User[]} An array of user objects. Currently stubbed to an empty
 * array until the persistence layer is implemented.
 *
 * @example
 * const users = listUsers();
 * // => []
 */
export function listUsers(): User[] {
  return [];
}

/**
 * Creates a new user from the given payload.
 *
 * Merges the provided data with a generated stub ID. The stub ID
 * (`"stub-user-id"`) will be replaced by a real database-generated identifier
 * once the persistence layer is in place.
 *
 * @param {CreateUserPayload} payload - The data for the new user (e.g. name,
 * email). Any extra fields are forwarded as-is.
 * @returns {User} The newly created user object including the stub ID.
 *
 * @example
 * const user = createUser({ name: "Alice", email: "alice@example.com" });
 * // => { id: "stub-user-id", name: "Alice", email: "alice@example.com" }
 */
export function createUser(payload: CreateUserPayload): User {
  return {
    id: "stub-user-id",
    ...payload,
  };
}

/**
 * Retrieves a single user by their ID.
 *
 * @param {string} id - The unique identifier of the user to retrieve.
 * @returns {User | null} The matching user object, or `null` if no user with
 * the given ID exists. Always returns `null` in the current stub.
 *
 * @example
 * const user = getUserById("abc-123");
 * // => null (stub — not yet implemented)
 */
export function getUserById(id: string): User | null {
  void id; // parameter reserved for future implementation
  return null;
}

/**
 * Updates an existing user's data.
 *
 * @param {string} id - The unique identifier of the user to update.
 * @param {Partial<CreateUserPayload>} updates - A partial object with the
 * fields to update. Fields not included are left unchanged.
 * @returns {User | null} The updated user object, or `null` if the user was
 * not found. Always returns `null` in the current stub.
 *
 * @example
 * const updated = updateUser("abc-123", { name: "Bob" });
 * // => null (stub — not yet implemented)
 */
export function updateUser(
  id: string,
  updates: Partial<CreateUserPayload>
): User | null {
  void id;
  void updates;
  return null;
}

/**
 * Deletes a user by their ID.
 *
 * @param {string} id - The unique identifier of the user to delete.
 * @returns {boolean} `true` if the user was successfully deleted, `false` if
 * the user was not found. Always returns `false` in the current stub.
 *
 * @example
 * const deleted = deleteUser("abc-123");
 * // => false (stub — not yet implemented)
 */
export function deleteUser(id: string): boolean {
  void id;
  return false;
}
