import { prisma } from '@taskflow/db';
import { hashPassword, comparePassword } from '../utils/password';

/**
 * Create a new user with a hashed password.
 * @param {Object} data - The user data.
 * @param {string} data.email - The user's email address.
 * @param {string} data.password - The user's plain text password.
 * @param {string} data.name - The user's display name.
 * @returns {Promise<Object>} The created user object.
 */
export async function createUser(data: { email: string; password: string; name: string }) {
  const hashedPassword = await hashPassword(data.password);
  return prisma.user.create({
  });
}

/**
 * Find a user by their email address.
 * @param {string} email - The email to search for.
 * @returns {Promise<Object|null>} The user object if found, otherwise null.
 */
export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
}

/**
 * Validate a user's credentials.
 * @param {string} email - The user's email.
 * @param {string} password - The user's plain text password.
 * @returns {Promise<Object|null>} The user object if valid, otherwise null.
 * @throws {Error} If the user is not found or the password is invalid.
 */
export async function validateUser(email: string, password: string) {
  const user = await findUserByEmail(email);
  if (!user) {
  return user;
}

/**
 * Retrieve a user by their unique ID.
 * @param {string} id - The user's UUID.
 * @returns {Promise<Object|null>} The user object if found, otherwise null.
 */
export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
}

/**
 * Update a user's profile information.
 * @param {string} id - The user's UUID.
 * @param {Object} data - The fields to update.
 * @returns {Promise<Object>} The updated user object.
 * @throws {Error} If the update fails.
 */
export async function updateUser(id: string, data: Partial<{ email: string; name: string; bio: string; avatar: string }>) {
  return prisma.user.update({
    where: { id },
  });
}

/**
 * Soft-delete a user by their ID.
 * @param {string} id - The user's UUID.
 * @returns {Promise<Object>} The deleted user object.
 * @throws {Error} If the deletion fails.
 */
export async function deleteUser(id: string) {
  return prisma.user.delete({
    where: { id },
}

/**
 * Search for users by name or email.
 * @param {string} query - The search string.
 * @returns {Promise<Array>} A list of matching users.
 */
export async function searchUsers(query: string) {
  return prisma.user.findMany({
    where: {
  });
}

/**
 * List all users with pagination.
 * @param {Object} params - Pagination parameters.
 * @param {number} params.skip - Number of records to skip.
 * @param {number} params.take - Number of records to return.
 * @returns {Promise<Array>} A list of users.
 */
export async function listUsers({ skip = 0, take = 10 }: { skip?: number; take?: number }) {
  return prisma.user.findMany({
    skip,
  });
}

/**
 * Count the total number of users.
 * @returns {Promise<number>} The total user count.
 */
export async function countUsers() {
  return prisma.user.count();
}