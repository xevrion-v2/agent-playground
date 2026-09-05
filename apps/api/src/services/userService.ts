export type UserPayload = Record<string, unknown>;

/**
 * Returns the current users collection placeholder.
 *
 * Persistence is not wired yet, so the service intentionally returns an
 * empty list while preserving the response shape expected by the route.
 */
export function listUsers() {
  return {
    data: [],
    message: "User listing is not implemented yet."
  };
}

/**
 * Builds the placeholder create-user response.
 *
 * The payload is echoed back with a stable stub id so early API consumers can
 * integrate against the route before database-backed creation is implemented.
 */
export function createUser(payload: UserPayload) {
  return {
    data: {
      ...payload,
      id: "stub-user-id"
    },
    message: "User creation is not implemented yet."
  };
}
