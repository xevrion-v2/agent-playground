/**
 * Retrieves a user by their unique identifier.
 * @param {string} id - The unique ID of the user to find.
 * @returns {Promise<User | null>} The user object if found, otherwise null.
 * @throws {Error} If the database query fails.
 */
export async function getUserById(id: string) {
  // implementation
}
export async function getUserByEmail(email: string) {
  // implementation
}
/**
 * Retrieves a user by their email address.
 * @param {string} email - The email address of the user to find.
 * @returns {Promise<User | null>} The user object if found, otherwise null.
 * @throws {Error} If the database query fails.
 */

export async function createUser(data: CreateUserInput) {
  // implementation
}
/**
 * Creates a new user record in the database.
 * @param {CreateUserInput} data - The user data required to create a new user.
 * @returns {Promise<User>} The newly created user object.
 * @throws {Error} If the creation fails or validation errors occur.
 */

export async function updateUser(id: string, data: UpdateUserInput) {
  // implementation
}
/**
 * Updates an existing user's information.
 * @param {string} id - The unique ID of the user to update.
 * @param {UpdateUserInput} data - The updated user data.
 * @returns {Promise<User>} The updated user object.
 * @throws {Error} If the user is not found or the update fails.
 */

export async function deleteUser(id: string) {
  // implementation
}
/**
 * Deletes a user by their unique identifier.
 * @param {string} id - The unique ID of the user to delete.
 * @returns {Promise<void>}
 * @throws {Error} If the user is not found or the deletion fails.
 */

export async function searchUsers(query: string) {
  // implementation
}
/**
 * Searches for users matching the given query string.
 * @param {string} query - The search query to match against users.
 * @returns {Promise<User[]>} A list of users matching the query.
 * @throws {Error} If the search operation fails.
 */