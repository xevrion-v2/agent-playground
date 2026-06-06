/**
 * User service containing business logic for user operations
 * @module userService
 */

import { User } from '@prisma/client';
import { db } from '../../packages/db';

/**
 * Creates a new user with the provided data
 * @param {Omit<User, 'id' | 'createdAt' | 'updatedAt'>} userData - The user data to create
 * @returns {Promise<User>} A promise that resolves to the created user
 */
export async function createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
  return await db.user.create({
    data: userData
  });
}

/**
 * Finds a user by their ID
 * @param {string} id - The user ID to search for
 * @returns {Promise<User | null>} A promise that resolves to the found user or null
 */
export async function findUserById(id: string): Promise<User | null> {
  return await db.user.findUnique({
    where: { id }
  });
}

/**
 * Updates a user with the specified ID
 * @param {string} id - The ID of the user to update
 * @param {Partial<User>} userData - The partial user data to update
 * @returns {Promise<User>} A promise that resolves to the updated user
 */
export async function updateUser(id: string, userData: Partial<User>): Promise<User> {
  return await db.user.update({
    where: { id },
    data: userData
  });
}

/**
 * Deletes a user by their ID
 * @param {string} id - The ID of the user to delete
 * @returns {Promise<User>} A promise that resolves to the deleted user
 */
export async function deleteUser(id: string): Promise<User> {
  return await db.user.delete({
    where: { id }
  });
}

/**
 * Finds all users with optional filtering
 * @param {any} where - Optional filter conditions
 * @returns {Promise<User[]>} A promise that resolves to an array of users
 */
export async function findUsers(where?: any): Promise<User[]> {
  return await db.user.findMany({
    where
  });
}

/**
 * Finds a user by their email address
 * @param {string} email - The email to search for
 * @returns {Promise<User | null>} A promise that resolves to the found user or null
 */
export async function findUserByEmail(email: string): Promise<User | null> {
  return await db.user.findUnique({
    where: { email }
  });
}

/**
 * Updates a user's profile information
 * @param {string} userId - The ID of the user to update
 * @param {Partial<User>} profileData - The profile data to update
 * @returns {Promise<User>} A promise that resolves to the updated user
 */
export async function updateUserProfile(userId: string, profileData: Partial<User>): Promise<User> {
  return await db.user.update({
    where: { id: userId },
    data: profileData
  });
}

export default {
  createUser,
  findUserById,
  updateUser,
  deleteUser,
  findUsers,
  findUserByEmail,
  updateUserProfile
};