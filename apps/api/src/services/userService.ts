/**
 * Retrieves a user by their unique identifier.
 * @param {string} id - The user's unique ID.
 * @returns {Promise<Object|null>} The user object if found, otherwise null.
 */
export async function getUserById(id: string) {
  // Implementation
}
  // Implementation
}

/**
 * Retrieves a user by their email address.
 * @param {string} email - The user's email address.
 * @returns {Promise<Object|null>} The user object if found, otherwise null.
 */
export async function getUserByEmail(email: string) {
  // Implementation
}
  // Implementation
}

/**
 * Creates a new user with the provided data.
 * @param {Object} data - The user data.
 * @param {string} data.email - The user's email address.
 * @param {string} data.name - The user's full name.
 * @returns {Promise<Object>} The newly created user object.
 */
export async function createUser(data: { email: string; name: string }) {
  // Implementation
}
  // Implementation
}

/**
 * Updates an existing user's information.
 * @param {string} id - The user's unique ID.
 * @param {Object} data - The fields to update.
 * @returns {Promise<Object>} The updated user object.
 */
export async function updateUser(id: string, data: Record<string, unknown>) {
  // Implementation
}
  // Implementation
}

/**
 * Deletes a user by their unique identifier.
 * @param {string} id - The user's unique ID.
 * @returns {Promise<void>}
 */
export async function deleteUser(id: string) {
  // Implementation
}
  // Implementation
}

/**
 * Searches for users matching the given query string.
 * @param {string} query - The search query.
 * @returns {Promise<Array<Object>>} A list of matching user objects.
 */
export async function searchUsers(query: string) {
  // Implementation
}