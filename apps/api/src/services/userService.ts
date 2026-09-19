/**
 * User service module for the TaskFlow API.
 *
 * Provides business-logic helpers for creating, fetching, updating and
 * deleting user records. All public functions return plain objects so
 * callers are decoupled from the underlying ORM / data layer.
 */

export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserInput {
  email: string;
  name?: string;
}

export interface UpdateUserInput {
  email?: string;
  name?: string;
}

/**
 * Retrieve every user in the system.
 *
 * @returns A promise that resolves to an array of {@link User} objects.
 */
export async function getAllUsers(): Promise<User[]> {
  // TODO: wire up to Prisma or other data layer
  return [];
}

/**
 * Look up a single user by their unique identifier.
 *
 * @param id - The cuid of the user to find.
 * @returns The matching {@link User}, or `null` when no record exists.
 */
export async function getUserById(id: string): Promise<User | null> {
  // TODO: wire up to Prisma or other data layer
  return null;
}

/**
 * Create a new user record.
 *
 * @param input - An object containing at least the user's email address.
 * @returns The newly created {@link User}.
 */
export async function createUser(input: CreateUserInput): Promise<User> {
  // TODO: wire up to Prisma or other data layer
  return {
    id: "stub-user-id",
    email: input.email,
    name: input.name,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

/**
 * Update an existing user.
 *
 * @param id    - The cuid of the user to update.
 * @param input - Partial fields to merge into the existing record.
 * @returns The updated {@link User}, or `null` when the user was not found.
 */
export async function updateUser(
  id: string,
  input: UpdateUserInput
): Promise<User | null> {
  // TODO: wire up to Prisma or other data layer
  return null;
}

/**
 * Permanently delete a user by id.
 *
 * @param id - The cuid of the user to remove.
 * @returns `true` when the record was deleted, `false` if it did not exist.
 */
export async function deleteUser(id: string): Promise<boolean> {
  // TODO: wire up to Prisma or other data layer
  return false;
}
