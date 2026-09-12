/**
 * User service module.
 *
 * Provides business logic for user-related operations.
 * Currently implements in-memory stub behavior; replace with
 * database-backed implementations as the data layer matures.
 */

/**
 * Shape of a user record returned by the service.
 */
export type User = {
  id: string;
  email: string;
  name?: string;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Payload accepted when creating a new user.
 */
export type CreateUserInput = {
  email: string;
  name?: string;
};

/**
 * Payload accepted when updating an existing user.
 */
export type UpdateUserInput = {
  email?: string;
  name?: string;
};

// In-memory store used by the stub implementation.
const users: Map<string, User> = new Map();

/**
 * Retrieve a single user by its unique identifier.
 *
 * @param id - The unique ID of the user to retrieve.
 * @returns The matching user, or `null` if no user exists with that ID.
 */
export function getUserById(id: string): User | null {
  return users.get(id) ?? null;
}

/**
 * List all users known to the service.
 *
 * @returns An array of user records. The array is empty when no users exist.
 */
export function listUsers(): User[] {
  return Array.from(users.values());
}

/**
 * Create a new user with the given input.
 *
 * The email is expected to be unique; callers should validate uniqueness
 * before invoking this function in a production implementation.
 *
 * @param input - The user fields to create.
 * @param input.email - The unique email address for the new user.
 * @param input.name - Optional display name for the new user.
 * @returns The newly created user record with generated ID and timestamps.
 */
export function createUser(input: CreateUserInput): User {
  const now = new Date();
  const user: User = {
    id: `user-${Date.now()}`,
    email: input.email,
    name: input.name,
    createdAt: now,
    updatedAt: now
  };
  users.set(user.id, user);
  return user;
}

/**
 * Update an existing user with the provided fields.
 *
 * Only the fields present in the input are modified; omitted fields retain
 * their previous values. The `updatedAt` timestamp is refreshed on every
 * successful update.
 *
 * @param id - The unique ID of the user to update.
 * @param input - The fields to modify on the user.
 * @param input.email - Optional new email address.
 * @param input.name - Optional new display name.
 * @returns The updated user record, or `null` if no user exists with that ID.
 */
export function updateUser(id: string, input: UpdateUserInput): User | null {
  const existing = users.get(id);
  if (!existing) {
    return null;
  }
  const updated: User = {
    ...existing,
    ...(input.email !== undefined && { email: input.email }),
    ...(input.name !== undefined && { name: input.name }),
    updatedAt: new Date()
  };
  users.set(id, updated);
  return updated;
}

/**
 * Delete a user by its unique identifier.
 *
 * @param id - The unique ID of the user to delete.
 * @returns `true` if a user was deleted, `false` if no user matched the ID.
 */
export function deleteUser(id: string): boolean {
  return users.delete(id);
}
