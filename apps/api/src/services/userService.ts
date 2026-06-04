/**
 * userService.ts
 *
 * Service layer for user-related business logic in the TaskFlow API.
 * All route handlers in `routes/users.ts` delegate to these functions so that
 * HTTP concerns stay in the router and domain logic stays here.
 */

export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: string;
}

export interface CreateUserInput {
  email: string;
  name?: string;
}

/**
 * Retrieve a paginated list of all registered users.
 *
 * @returns A promise that resolves to an array of User objects.
 *          Returns an empty array until persistence is wired up.
 */
export async function listUsers(): Promise<User[]> {
  // TODO: query the database for all users
  return [];
}

/**
 * Look up a single user by their unique identifier.
 *
 * @param id - The CUID string that uniquely identifies the user.
 * @returns The matching User, or `null` if no record exists.
 */
export async function getUserById(id: string): Promise<User | null> {
  // TODO: query the database for the user with the given id
  void id;
  return null;
}

/**
 * Create a new user record from the supplied input.
 *
 * @param input - An object containing the new user's `email` and optional `name`.
 * @returns The newly created User with a generated `id` and `createdAt` timestamp.
 */
export async function createUser(input: CreateUserInput): Promise<User> {
  // TODO: persist the new user to the database
  return {
    id: `stub-${Date.now()}`,
    email: input.email,
    name: input.name,
    createdAt: new Date().toISOString(),
  };
}

/**
 * Permanently delete a user by their unique identifier.
 *
 * @param id - The CUID string of the user to remove.
 * @returns `true` if a record was deleted, `false` if no matching user was found.
 */
export async function deleteUser(id: string): Promise<boolean> {
  // TODO: remove the user from the database and cascade-delete related records
  void id;
  return false;
}
