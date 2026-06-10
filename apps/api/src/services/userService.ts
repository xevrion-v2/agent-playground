/**
 * User Service
 * Contains business logic for user-related operations
 */

import { User } from '@prisma/client';
import { db } from '../utils/db';

/**
 * Creates a new user with the provided data
 * @param userData - The data to create the user with
 * @returns Promise resolving to the created user
 */
export async function createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) {
  return await db.user.create({
    data: userData,
  });
}

/**
 * Finds a user by their unique ID
 * @param id - The unique identifier of the user
 * @returns Promise resolving to the user object or null if not found
 */
export async function findUserById(id: string) {
  return await db.user.findUnique({
    where: { id },
  });
}

/**
 * Finds a user by their email address
 * @param email - The email address to search for
 * @returns Promise resolving to the user object or null if not found
 */
export async function findUserByEmail(email: string) {
  return await db.user.findUnique({
    where: { email },
  });
}

/**
 * Updates a user's information
 * @param id - The ID of the user to update
 * @param updateData - The data to update the user with
 * @returns Promise resolving to the updated user object
 */
export async function updateUser(id: string, updateData: Partial<User>) {
  return await db.user.update({
    where: { id },
    data: updateData,
  });
}

/**
 * Deletes a user by their ID
 * @param id - The ID of the user to delete
 * @returns Promise resolving to the deleted user object
 */
export async function deleteUser(id: string) {
  return await db.user.delete({
    where: { id },
  });
}

export default {
  createUser,
  findUserById,
  findUserByEmail,
  updateUser,
  deleteUser,
};