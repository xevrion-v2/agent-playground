/**
 * Service for user-related operations
 * Handles user management functionality including creation, retrieval, updating, and deletion of users
 */

import { User } from '@prisma/client';
import { db } from '../../packages/db';

/**
 * Creates a new user in the system
 * @param userData - The data for the new user
 * @returns The created user object
 */
export async function createUser(userData: Omit<User, 'id'>) {
  return await db.user.create({
    data: userData
  });
}

/**
 * Retrieves a user by their ID
 * @param id - The unique identifier of the user
 * @returns The user object if found, null otherwise
 */
export async function getUserById(id: number) {
  return await db.user.findUnique({
    where: { id }
  });
}

/**
 * Updates an existing user's information
 * @param id - The ID of the user to update
 * @param userData - The updated user data
 * @returns The updated user object
 */
export async function updateUser(id: number, userData: Partial<User>) {
  return await db.user.update({
    where: { id },
    data: userData
  });
}

/**
 * Deletes a user from the system
 * @param id - The ID of the user to delete
 * @returns Confirmation of deletion
 */
export async function deleteUser(id: number) {
  return await db.user.delete({
    where: { id }
  });
}

/**
 * Retrieves all users from the system
 * @returns Array of all users
 */
export async function getAllUsers() {
  return await db.user.findMany();
}