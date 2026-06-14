/**
 * Service layer for user-related operations.
 * @module userService
 */

const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * Create a new user.
 * @async
 * @param {Object} userData - The user data.
 * @param {string} userData.username - The username.
 * @param {string} userData.email - The email address.
 * @param {string} userData.password - The plain text password.
 * @returns {Promise<Object>} The created user object (without password).
 * @throws {Error} If the email already exists or validation fails.
 */
async function createUser({ username, email, password }) {
  const existing = await User.findOne({ email });
  if (existing) {
    throw new Error('Email already in use');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword });
  await user.save();
  const { password: _, ...userWithoutPassword } = user.toObject();
  return userWithoutPassword;
}

/**
 * Authenticate a user with email and password.
 * @async
 * @param {string} email - The user email.
 * @param {string} password - The plain text password.
 * @returns {Promise<Object>} An object containing a JWT token and user info (without password).
 * @throws {Error} If the user is not found or password is incorrect.
 */
async function login(email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid credentials');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  const { password: _, ...userWithoutPassword } = user.toObject();
  return { token, user: userWithoutPassword };
}

/**
 * Get a user by their ID.
 * @async
 * @param {string} id - The user's MongoDB ObjectId.
 * @returns {Promise<Object|null>} The user object (without password) or null if not found.
 */
async function getUserById(id) {
  const user = await User.findById(id);
  if (!user) return null;
  const { password: _, ...userWithoutPassword } = user.toObject();
  return userWithoutPassword;
}

/**
 * Update a user's profile.
 * @async
 * @param {string} id - The user's MongoDB ObjectId.
 * @param {Object} updates - The fields to update (username, email, etc.).
 * @returns {Promise<Object|null>} The updated user object (without password) or null if not found.
 */
async function updateUser(id, updates) {
  if (updates.password) {
    updates.password = await bcrypt.hash(updates.password, 10);
  }
  const user = await User.findByIdAndUpdate(id, updates, { new: true });
  if (!user) return null;
  const { password: _, ...userWithoutPassword } = user.toObject();
  return userWithoutPassword;
}

/**
 * Delete a user by ID.
 * @async
 * @param {string} id - The user's MongoDB ObjectId.
 * @returns {Promise<Object|null>} The deleted user object or null if not found.
 */
async function deleteUser(id) {
  const user = await User.findByIdAndDelete(id);
  return user ? user.toObject() : null;
}

module.exports = {
  createUser,
  login,
  getUserById,
  updateUser,
  deleteUser
};
