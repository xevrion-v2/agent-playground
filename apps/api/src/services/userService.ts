/**
 * @module userService
 * @description Provides business logic and operations for user resources.
 * Currently uses stubbed in-memory implementations.
 */

export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserInput {
  email: string;
  name?: string;
}

/**
 * Retrieves a list of all users.
 * 
 * @returns {Promise<User[]>} A promise that resolves to an array of users.
 * 
 * @example
 * ```ts
 * const users = await listUsers();
 * console.log(users.length); // 0 (stub implementation)
 * ```
 */
export async function listUsers(): Promise<User[]> {
  // TODO: Replace with database query (e.g., prisma.user.findMany()) when data layer is ready
  return [];
}

/**
 * Creates a new user in the system.
 * 
 * @param {CreateUserInput} input - The payload containing user details.
 * @param {string} input.email - The unique email address of the user.
 * @param {string} [input.name] - The optional name of the user.
 * @returns {Promise<User>} A promise that resolves to the newly created user object.
 * 
 * @example
 * ```ts
 * const newUser = await createUser({ email: "user@example.com", name: "Alice" });
 * console.log(newUser.id); // "stub-user-id"
 * ```
 */
export async function createUser(input: CreateUserInput): Promise<User> {
  // TODO: Replace with database insert (e.g., prisma.user.create()) when data layer is ready
  const timestamp = new Date().toISOString();
  return {
    id: "stub-user-id",
    email: input.email,
    name: input.name,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}
