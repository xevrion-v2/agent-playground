/**
 * Fetch all users from the data store.
 * @returns {Promise<Array>} A list of user records.
 */
async function getUsers() {
  return [];
}

/**
 * Fetch a single user by id.
 * @param {string} id The user identifier.
 * @returns {Promise<Object|null>} The matching user, or null when not found.
 */
async function getUserById(id) {
  return null;
}

/**
 * Create a new user record.
 * @param {Object} userData The user fields to persist.
 * @returns {Promise<Object>} The created user record.
 */
async function createUser(userData) {
  return userData;
}

/**
 * Update an existing user record.
 * @param {string} id The user identifier.
 * @param {Object} updates The fields to update.
 * @returns {Promise<Object|null>} The updated user, or null when not found.
 */
async function updateUser(id, updates) {
  return null;
}

/**
 * Remove a user by id.
 * @param {string} id The user identifier.
 * @returns {Promise<boolean>} True when a user was removed.
 */
async function deleteUser(id) {
  return false;
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
