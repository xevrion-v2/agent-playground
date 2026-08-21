/**
 * @file User service — business logic for user operations.
 *
 * Currently implements stub data access. When a real database is added,
 * each function should be backed by a Prisma / ORM query.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * Payload required to create a new user.
 *
 * @property name  - Display name shown on the profile
 * @property email - Unique email address used for login and notifications
 */
export interface CreateUserInput {
  name: string;
  email: string;
}

/**
 * A user entity returned by the service layer.
 *
 * @property id    - Unique identifier (UUID or auto-increment)
 * @property name  - Display name
 * @property email - Email address
 */
export interface User {
  id: string;
  name: string;
  email: string;
}

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------

/**
 * Retrieve all registered users.
 *
 * @returns An array of {@link User} objects.
 *
 * @todo Replace the stub with a real database query when the data layer is
 *       connected. Add pagination (page / limit query params) and optional
 *       filtering by name or email.
 */
export function getAllUsers(): User[] {
  return [];
}

/**
 * Create a new user from validated input.
 *
 * @param input - Validated {@link CreateUserInput} payload.
 * @returns     - The newly created {@link User} with a generated id.
 *
 * @todo Persist the user to the database. For now a stub id is returned.
 */
export function createUser(input: CreateUserInput): User {
  return {
    id: "stub-user-id",
    name: input.name,
    email: input.email,
  };
}
