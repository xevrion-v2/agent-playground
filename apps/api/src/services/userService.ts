/**
 * User service module.
 *
 * Provides business-logic functions for user operations.
 * Routes in {@link ../routes/users.ts} delegate to these functions.
 *
 * @module services/userService
 */

/**
 * Shape returned by all service functions.
 *
 * @template T - The type of the data payload.
 */
export interface ServiceResult<T = unknown> {
  /** Indicates whether the operation succeeded. */
  success: boolean;
  /** The payload returned on success (or partial data on error). */
  data: T | null;
  /** Human-readable message describing the outcome. */
  message: string;
}

/**
 * Partial shape for creating a new user.
 */
export interface CreateUserInput {
  /** Unique email address. */
  email: string;
  /** Optional display name. */
  name?: string;
}

/**
 * Retrieve a list of all users.
 *
 * **Note:** This is a stub implementation that returns an empty array.
 * Replace with a real database call when the Prisma client is connected.
 *
 * @returns A promise that resolves to a ServiceResult containing the user array.
 *
 * @example
 * ```ts
 * const result = await listUsers();
 * console.log(result.data); // []
 * ```
 */
export async function listUsers(): Promise<ServiceResult<unknown[]>> {
  // TODO: Query Prisma: prisma.user.findMany()
  return {
    success: true,
    data: [],
    message: "User listing is not implemented yet.",
  };
}

/**
 * Create a new user.
 *
 * **Note:** This is a stub implementation that echoes the input.
 * Replace with a real database call when the Prisma client is connected.
 *
 * @param input - The user creation payload.
 * @param input.email - The new user's email address.
 * @param input.name  - An optional display name.
 * @returns A promise that resolves to a ServiceResult containing the created user object.
 *
 * @example
 * ```ts
 * const result = await createUser({ email: "alice@example.com", name: "Alice" });
 * console.log(result.data?.id); // "stub-user-id"
 * ```
 */
export async function createUser(
  input: CreateUserInput,
): Promise<ServiceResult<{ id: string } & CreateUserInput>> {
  // TODO: Persist with Prisma: prisma.user.create({ data: input })
  return {
    success: true,
    data: {
      id: "stub-user-id",
      ...input,
    },
    message: "User creation is not implemented yet.",
  };
}

/**
 * Find a single user by their unique identifier.
 *
 * **Note:** Stub — always returns null. Replace with a real query.
 *
 * @param id - The user's UUID.
 * @returns A promise that resolves to the user object, or null if not found.
 */
export async function getUserById(
  id: string,
): Promise<ServiceResult<unknown> | null> {
  // TODO: prisma.user.findUnique({ where: { id } })
  return {
    success: false,
    data: null,
    message: `User ${id} not found (not implemented).`,
  };
}
