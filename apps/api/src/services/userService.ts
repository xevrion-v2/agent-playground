import { User } from '@prisma/client';
import { db } from '@packages/db';

/**
 * User Service Module
 * 
 * This module provides business logic for user-related operations
 * including creation, retrieval, updating, and deletion of users.
 */

/**
 * Finds a user by their unique identifier
 * @param id - The unique identifier of the user
 * @returns Promise resolving to the found user or null if not found
 */
export async function findUserById(id: string): Promise<User | null> {
  return db.user.findUnique({
    where: { id },
  });
}

/**
 * Finds a user by their email address
 * @param email - The email address to search for
 * @returns Promise resolving to the found user or null if not found
 */
export async function findUserByEmail(email: string): Promise<User | null> {
  return db.user.findUnique({
    where: { email },
  });
}

/**
 * Creates a new user with the provided data
 * @param data - The user data to create
 * @returns Promise resolving to the created user
 */
export async function createUser(data: Partial<User>): Promise<User> {
  return db.user.create({
    data,
  });
}

/**
 * Updates an existing user with new data
 * @param id - The unique identifier of the user to update
 * @param data - The user data to update
 * @returns Promise resolving to the updated user
 */
export async function updateUser(id: string, data: Partial<User>): Promise<User> {
  return db.user.update({
    where: { id },
    data,
  });
}

/**
 * Deletes a user by their unique identifier
 * @param id - The unique identifier of the user to delete
 * @returns Promise resolving to the deleted user
 */
export async function deleteUser(id: string): Promise<User> {
  return db.user.delete({
    where: { id },
  });
}

/**
 * Finds all users with optional filtering
 * @param filter - Optional filter criteria for users
 * @returns Promise resolving to an array of users
 */
export async function findAllUsers(filter?: Partial<User>): Promise<User[]> {
  return db.user.findMany({
    where: filter,
  });
}

/**
 * Updates a user's profile information
 * @param id - The unique identifier of the user to update
 * @param profileData - The profile data to update
 * @returns Promise resolving to the updated user
 */
export async function updateUserProfile(id: string, profileData: Partial<User>): Promise<User> {
  return db.user.update({
    where: { id },
    data: profileData,
  });
}