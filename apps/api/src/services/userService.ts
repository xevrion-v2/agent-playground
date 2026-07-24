/**
 * Returns the current user collection.
 *
 * This service is intentionally a placeholder until persistence is added to the
 * API. Keeping the behavior in one place makes it clear that callers should not
 * expect stored users yet.
 *
 * @returns An empty user list for the current stub implementation.
 */
export function listUsers() {
  return [];
}

/**
 * Builds the stub response payload for a newly created user.
 *
 * The API does not persist users yet, so the submitted payload is echoed back
 * with a stable placeholder id. Future persistence work can replace this body
 * without changing the route contract.
 *
 * @param payload - Request body submitted to the user creation endpoint.
 * @returns The request payload decorated with the current stub user id.
 */
export function createUser(payload: Record<string, unknown>) {
  return {
    id: "stub-user-id",
    ...payload
  };
}
