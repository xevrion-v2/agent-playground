/**
 * @fileoverview Service layer for user-related business logic.
 * Routes delegate to these functions; each function returns a
 * plain object so the route handler owns the HTTP response.
 */

/**
 * Retrieve a paginated list of users.
 * @returns {{ data: Array, message: string }} Response envelope.
 */
export function listUsers() {
  return {
    data: [],
    message: "User listing is not implemented yet."
  };
}

/**
 * Create a new user from the supplied payload.
 * @param {Record<string, unknown>} body - Request body fields.
 * @returns {{ data: Record<string, unknown>, message: string }} Response envelope.
 */
export function createUser(body: Record<string, unknown>) {
  return {
    data: { id: "stub-user-id", ...body },
    message: "User creation is not implemented yet."
  };
}
