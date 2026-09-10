import crypto from "node:crypto";

/**
 * Represents a user entity in the system.
 *
 * @property {string} id - Unique identifier (UUID v4).
 * @property {string} name - Display name of the user.
 * @property {string} email - Email address of the user.
 * @property {Date} createdAt - Timestamp when the user was created.
 */
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

/**
 * Payload for creating a new user.
 *
 * @property {string} name - Display name of the user.
 * @property {string} email - Email address of the user.
 */
export interface CreateUserPayload {
  name: string;
  email: string;
}

// In-memory user store (placeholder until database integration).
const users: User[] = [];

/**
 * Retrieve all users from the in-memory store.
 *
 * @returns {User[]} An array of all registered users.
 *
 * @example
 * ```typescript
 * const allUsers = getAllUsers();
 * // => [{ id: "...", name: "Alice", email: "alice@example.com", createdAt: ... }]
 * ```
 */
export function getAllUsers(): User[] {
  return users;
}

/**
 * Find a single user by their unique identifier.
 *
 * @param {string} id - The user UUID to look up.
 * @returns {User | undefined} The matching user, or `undefined` if not found.
 *
 * @example
 * ```typescript
 * const user = getUserById("some-uuid");
 * // => User | undefined
 * ```
 */
export function getUserById(id: string): User | undefined {
  return users.find((u) => u.id === id);
}

/**
 * Create a new user with a generated UUID.
 *
 * Generates a UUID v4 for the new user, sets the creation timestamp,
 * and stores the user in the in-memory store.
 *
 * @param {CreateUserPayload} data - Object containing `name` and `email`.
 * @returns {User} The newly created user.
 *
 * @example
 * ```typescript
 * const user = createUser({ name: "Alice", email: "alice@example.com" });
 * // => { id: "uuid", name: "Alice", email: "alice@example.com", createdAt: Date }
 * ```
 */
export function createUser(data: CreateUserPayload): User {
  const user: User = {
    id: crypto.randomUUID(),
    name: data.name,
    email: data.email,
    createdAt: new Date(),
  };
  users.push(user);
  return user;
}

/**
 * Remove a user by their unique identifier.
 *
 * @param {string} id - The unique identifier of the user to remove.
 * @returns {boolean} `true` if the user was found and removed, `false` otherwise.
 *
 * @example
 * ```typescript
 * const removed = deleteUser("some-uuid");
 * // => true | false
 * ```
 */
export function deleteUser(id: string): boolean {
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return false;
  users.splice(index, 1);
  return true;
}