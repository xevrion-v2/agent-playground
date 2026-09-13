export type CreateUserInput = Record<string, unknown>;

export type UserRecord = {
  id: string;
} & CreateUserInput;

/**
 * Return the users currently available to the API.
 *
 * The implementation is intentionally empty while persistence is pending, but
 * keeping it behind a service function makes the route contract explicit and
 * gives future database-backed work a single place to evolve.
 */
export function listUsers(): UserRecord[] {
  return [];
}

/**
 * Build the API response payload for a newly created user.
 *
 * Until the database layer is wired in, this mirrors the existing stub behavior
 * by assigning a stable placeholder id and preserving the submitted request
 * fields.
 */
export function createUser(input: CreateUserInput): UserRecord {
  return {
    id: "stub-user-id",
    ...input
  };
}
