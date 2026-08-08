/**
 * User service module for database operations.
 * @module userService
 */

/**
 * User data structure.
 * @typedef {Object} User
 * @property {string} id - Unique identifier
 * @property {string} email - User email address
 * @property {string} name - Display name
 * @property {Date} createdAt - Account creation timestamp
 */

/** In-memory user store. @type {Map<string, User>} */
const users = new Map();

/**
 * Create a new user.
 * @param {string} email - User email
 * @param {string} name - Display name
 * @returns {User} The created user object
 */
export function createUser(email, name) {
  const user = { id: crypto.randomUUID(), email, name, createdAt: new Date() };
  users.set(user.id, user);
  return user;
}

/**
 * Find user by ID.
 * @param {string} id - User ID
 * @returns {User|undefined}
 */
export function getUserById(id) { return users.get(id); }

/**
 * List all users.
 * @returns {User[]}
 */
export function getAllUsers() { return Array.from(users.values()); }
