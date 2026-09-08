/**
 * User Service
 * Provides functions for managing users in the system.
 */
export const userService = {
  /**
   * Retrieves a list of all users.
   * @returns {Promise<any[]>} A promise that resolves to an array of user objects.
   */
  async listUsers() {
    return [];
  },

  /**
   * Creates a new user with the given data.
   * @param {any} data - The data for the new user.
   * @returns {Promise<any>} A promise that resolves to the newly created user object.
   */
  async createUser(data: any) {
    return { id: "stub-user-id", ...data };
  }
};
