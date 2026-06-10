/**
 * User Service
 * 
 * This service handles user-related operations including creation, retrieval, updating, and deletion of users.
 * It provides a clean interface between the controller layer and the database operations.
 */

import { User } from '@prisma/client';
import { db } from '../db';

/**
 * Finds a user by their unique ID
 * 
 * @param id - The unique identifier of the user
 * @returns Promise resolving to the user object or null if not found
 */
async function getUserById(id: string) {
  return db.user.findUnique({
    where: { id },
  });
}

/**
 * Retrieves all users from the database
 * 
 * @returns Promise resolving to an array of all user objects
 */
async function getAllUsers() {
  return db.user.findMany();
}

/**
 * Creates a new user in the database
 * 
 * @param data - The user data to create, excluding auto-generated fields
 * @returns Promise resolving to the created user object
 */
async function createUser(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) {
  return db.user.create({ data });
}

/**
 * Updates an existing user's information
 * 
 * @param id - The unique identifier of the user to update
 * @param data - Partial user data to update
 * @returns Promise resolving to the updated user object
 */
async function updateUser(id: string, data: Partial<User>) {
  return db.user.update({
    where: { id },
    data,
  });
}

/**
 * Permanently deletes a user from the database
 * 
 * @param id - The unique identifier of the user to delete
 * @returns Promise resolving to the deleted user object
 */
async function deleteUser(id: string) {
  return db.user.delete({
    where: { id },
  });
}

export { getUserById, getAllUsers, createUser, updateUser, deleteUser, getUsersByEmail };

/**
 * Finds users by their email address (case-insensitive)
 * 
 * @param email - The email address to search for
 * @returns Promise resolving to an array of matching user objects
 */
async function getUsersByEmail(email: string) {
  return db.user.findMany({
    where: {
      email: {
        equals: email,
        mode: 'insensitive',
      }
    }
  });
}