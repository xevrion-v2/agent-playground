import { User } from '@prisma/client';
import { db } from '@packages/db';

/**
 * Service for managing user operations
 * @namespace userService
 */

/**
 * Finds a user by their unique ID
 * @param {string} userId - The unique identifier of the user
 * @returns {Promise<User | null>} The user object if found, null otherwise
 * @throws {Error} If database operation fails
 */
export async function findUserById(userId: string): Promise<User | null> {
  try {
    return await db.user.findUnique({
      where: { id: userId }
    });
  } catch (error) {
    throw new Error(`Failed to find user by ID: ${error}`);
  }
}

/**
 * Finds a user by their email address
 * @param {string} email - The email address to search for
 * @returns {Promise<User | null>} The user object if found, null otherwise
 * @throws {Error} If database operation fails
 */
export async function findUserByEmail(email: string): Promise<User | null> {
  try {
    return await db.user.findUnique({
      where: { email }
    });
  } catch (error) {
    throw new Error(`Failed to find user by email: ${error}`);
  }
}

/**
 * Creates a new user with the provided data
 * @param {Object} userData - The data for creating a new user
 * @param {string} userData.email - User's email address
 * @param {string} userData.name - User's full name
 * @param {string} [userData.password] - User's hashed password
 * @returns {Promise<User>} The created user object
 * @throws {Error} If user creation fails
 */
export async function createUser(userData: { email: string; name: string; password?: string }): Promise<User> {
  try {
    return await db.user.create({
      data: userData
    });
  } catch (error) {
    throw new Error(`Failed to create user: ${error}`);
  }
}

/**
 * Updates an existing user's information
 * @param {string} userId - The ID of the user to update
 * @param {Object} updateData - The fields to update
 * @param {string} [updateData.name] - New name for the user
 * @param {string} [updateData.email] - New email for the user
 * @param {string} [updateData.password] - New password for the user
 * @returns {Promise<User>} The updated user object
 * @throws {Error} If user update fails
 */
export async function updateUser(userId: string, updateData: { name?: string; email?: string; password?: string }): Promise<User> {
  try {
    return await db.user.update({
      where: { id: userId },
      data: updateData
    });
  } catch (error) {
    throw new Error(`Failed to update user: ${error}`);
  }
}

/**
 * Deletes a user by their ID
 * @param {string} userId - The ID of the user to delete
 * @returns {Promise<User>} The deleted user object
 * @throws {Error} If user deletion fails
 */
export async function deleteUser(userId: string): Promise<User> {
  try {
    return await db.user.delete({
      where: { id: userId }
    });
  } catch (error) {
    throw new Error(`Failed to delete user: ${error}`);
  }
}

/**
 * Lists all users with pagination
 * @param {Object} [options] - Pagination options
 * @param {number} [options.page=1] - Page number (1-indexed)
 * @param {number} [options.limit=20] - Number of users per page
 * @returns {Promise<User[]>} Array of user objects
 * @throws {Error} If user listing fails
 */
export async function listUsers(options?: { page?: number; limit?: number }): Promise<User[]> {
  const { page = 1, limit = 20 } = options || {};
  const skip = (page - 1) * limit;
  
  try {
    return await db.user.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    throw new Error(`Failed to list users: ${error}`);
  }
}

/**
 * Searches for users by name or email
 * @param {string} query - Search term to match against name or email
 * @returns {Promise<User[]>} Array of matching users
 * @throws {Error} If search operation fails
 */
export async function searchUsers(query: string): Promise<User[]> {
  try {
    return await db.user.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { email: { contains: query, mode: 'insensitive' } }
        ]
      }
    });
  } catch (error) {
    throw new Error(`Failed to search users: ${error}`);
  }
}