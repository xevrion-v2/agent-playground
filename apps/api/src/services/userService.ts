import { User } from '@prisma/client';
import { db } from '../lib/db';
import { Task } from '../types/task';

/**
 * User service for handling user-related operations
 * @module services/userService
 */

/**
 * Finds a user by their unique identifier
 * @async
 * @param {string} id - The unique identifier of the user
 * @returns {Promise<User | null>} The user object if found, null otherwise
 * @throws {Error} If there's a database error
 */
export async function findUserById(id: string): Promise<User | null> {
  try {
    const user = await db.user.findUnique({
      where: { id },
    });
    return user;
  } catch (error) {
    throw new Error(`Failed to find user by id: ${error}`);
  }
}

/**
 * Creates a new user with the provided data
 * @async
 * @param {Object} userData - The user data to create
 * @param {string} userData.email - The user's email address
 * @param {string} userData.name - The user's name
 * @param {string} [userData.password] - The user's password (optional)
 * @returns {Promise<User>} The created user object
 * @throws {Error} If there's a validation error or database error
 */
export async function createUser(userData: {
  email: string;
  name: string;
  password?: string;
}): Promise<User> {
  try {
    const user = await db.user.create({
      data: userData,
    });
    return user;
  } catch (error) {
    throw new Error(`Failed to create user: ${error}`);
  }
}

/**
 * Updates a user's information
 * @async
 * @param {string} id - The unique identifier of the user to update
 *param {Partial<User>} userData - The partial user data to update
 * @returns {Promise<User>} The updated user object
 * @throws {Error} If user is not found or there's a database error
 */
export async function updateUser(id: string, userData: Partial<User>): Promise<User> {
  try {
    const user = await db.user.update({
      where: { id },
      data: userData,
    });
    return user;
  } catch (error) {
    throw new Error(`Failed to update user: ${error}`);
  }
}

/**
 * Deletes a user by their unique identifier
 * @async
 * @param {string} id - The unique identifier of the user to delete
 * @returns {Promise<User>} The deleted user object
 * @throws {Error} If user is not found or there's a database error
 */
export async function deleteUser(id: string): Promise<User> {
  try {
    const user = await db.user.delete({
      where: { id },
    });
    return user;
  } catch (error) {
    throw new Error(`Failed to delete user: ${error}`);
  }
}

/**
 * Retrieves all users from the database
 * @async
 * @returns {Promise<User[]>} Array of all users
 * @throws {Error} If there's a database error
 */
export async function getAllUsers(): Promise<User[]> {
  try {
    return await db.user.findMany();
  } catch (error) {
    throw new Error(`Failed to fetch users: ${error}`);
  }
}
}