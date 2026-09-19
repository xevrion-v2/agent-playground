export type StubUser = {
  id: string;
  [key: string]: unknown;
};

export type CreateUserInput = Record<string, unknown>;

/**
 * Returns the current user collection placeholder.
 *
 * The API does not have persistence wired yet, so this deliberately returns an
 * empty list while preserving the future service boundary for route handlers.
 */
export function listUsers(): StubUser[] {
  return [];
}

/**
 * Builds the placeholder user creation response.
 *
 * Until database-backed creation exists, the request payload is echoed with a
 * stable stub id so callers can exercise the route contract.
 */
export function createUser(payload: CreateUserInput): StubUser {
  return {
    id: "stub-user-id",
    ...payload
  };
}
