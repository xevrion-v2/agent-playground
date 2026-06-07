/**
 * @fileoverview User service layer for the TaskFlow API.
 * Provides CRUD operations on user data, currently backed by
 * in-memory stubs. Every function is documented so future
 * contributors can understand the intended behavior before
 * the real database integration is wired in.
 */

// ─── Types ───────────────────────────────────────────────────────────────────

/**
 * @typedef User
 * Represents a registered user in the system.
 * @property {string}   id         - Unique identifier.
 * @property {string}   name       - Display name.
 * @property {string}   email      - Email address.
 * @property {string}   [avatarUrl] - Optional profile picture URL.
 * @property {Date}     createdAt  - Timestamp of account creation.
 */
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  createdAt: Date;
}

/**
 * @typedef CreateUserPayload
 * Input data required when creating a new user.
 * @property {string} name  - Display name.
 * @property {string} email - Email address.
 */
export interface CreateUserPayload {
  name: string;
  email: string;
}

// ─── Data store (stub) ───────────────────────────────────────────────────────

/** In-memory store – to be replaced by a database repository. */
let users: User[] = [
  {
    id: "seed-001",
    name: "Alice",
    email: "alice@example.com",
    createdAt: new Date("2026-01-15"),
  },
  {
    id: "seed-002",
    name: "Bob",
    email: "bob@example.com",
    createdAt: new Date("2026-02-20"),
  },
];

// ─── Service functions ───────────────────────────────────────────────────────

/**
 * Return a paginated list of all registered users.
 *
 * @returns {User[]} Array of user objects currently held in memory.
 *
 * @example
 * const allUsers = listUsers();
 * console.log(allUsers.length); // => 2
 */
export function listUsers(): User[] {
  return [...users];
}

/**
 * Create a new user and add it to the store.
 *
 * @param {CreateUserPayload} payload - The name and email for the new user.
 * @returns {User} The newly created user object with generated id and timestamp.
 *
 * @example
 * const user = createUser({ name: "Charlie", email: "charlie@example.com" });
 * console.log(user.id); // => "user-<uuid>"
 */
export function createUser(payload: CreateUserPayload): User {
  const user: User = {
    id: `user-${crypto.randomUUID()}`,
    name: payload.name,
    email: payload.email,
    createdAt: new Date(),
  };
  users.push(user);
  return user;
}

/**
 * Retrieve a single user by their unique identifier.
 *
 * @param {string} id - The user's UUID.
 * @returns {User | undefined} The matching user, or `undefined` when not found.
 *
 * @example
 * const user = getUserById("seed-001");
 * console.log(user?.name); // => "Alice"
 */
export function getUserById(id: string): User | undefined {
  return users.find((u) => u.id === id);
}

/**
 * Update an existing user's mutable fields (name, email).
 * Only the supplied fields are overwritten; omitted fields keep their values.
 *
 * @param {string} id   - The user's UUID.
 * @param {Partial<Pick<User, "name" | "email">>} changes - Fields to update.
 * @returns {User | undefined} The updated user, or `undefined` if the id does not exist.
 *
 * @example
 * const updated = updateUser("seed-001", { name: "Alice Updated" });
 * console.log(updated?.name); // => "Alice Updated"
 */
export function updateUser(
  id: string,
  changes: Partial<Pick<User, "name" | "email">>,
): User | undefined {
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) return undefined;

  users[idx] = { ...users[idx], ...changes };
  return users[idx];
}

/**
 * Remove a user from the store.
 *
 * @param {string} id - The user's UUID.
 * @returns {boolean} `true` when the user was found and deleted, `false` otherwise.
 *
 * @example
 * const deleted = deleteUser("seed-001");
 * console.log(deleted); // => true
 */
export function deleteUser(id: string): boolean {
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) return false;

  users.splice(idx, 1);
  return true;
}
