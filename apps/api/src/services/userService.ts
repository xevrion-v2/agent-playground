/**
 * Retrieves a list of users.
 * 
 * @returns {Array} An array of user objects (currently stubbed to an empty array).
 */
export function listUsers() {
  return [];
}

/**
 * Creates a new user with the given payload.
 * 
 * @param {Object} payload The user data to create.
 * @returns {Object} The created user object, including a stubbed ID.
 */
export function createUser(payload: any) {
  return {
    id: "stub-user-id",
    ...payload
  };
}
