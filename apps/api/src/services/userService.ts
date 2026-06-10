/**
 * User Service
 * 
 * Contains business logic for user-related operations including CRUD operations,
 * authentication helpers, and user management functions.
 * 
 * @module userService
 */

import { User } from '@prisma/client';
import { prisma } from '../../prisma/client';

/**
 * Finds a user by their unique identifier.
 * 
 * @param id - The unique identifier of the user to find
 * @returns Promise resolving to the user object or null if not found
 * @throws {Error} If database operation fails
 */
export async function findUserById(id: string) {
  return prisma.user.findUnique({
    where: { id }
  });
}

/**
 * Creates a new user with the provided data.
 * 
 * @param data - Partial user object containing the user's information
 * @returns Promise resolving to the created user object
 * @throws {Error} If user creation fails
 */
export async function createUser(data: Partial<User>) {
  return prisma.user.create({
    data
  });
}

/**
 * Updates a user's information.
 * 
 * @param id - The unique identifier of the user to update
 * @param data - Partial user object containing updated fields
 * @returns Promise resolving to the updated user object
 * @throws {Error} If user update fails or user not found
 */
export async function updateUser(id: string, data: Partial<User>) {
  return prisma.user.update({
    where: { id },
    data
  });
}

/**
 * Deletes a user by their unique identifier.
 * 
 * @param id - The unique identifier of the user to delete
 * @returns Promise resolving to the deleted user object
 * @throws {Error} If user deletion fails or user not found
 */
export async function deleteUser(id: string) {
  return prisma.user.delete({
    where: { id }
  });
}

/**
 * Finds all users in the database.
 * 
 * @returns Promise resolving to an array of all user objects
 * @throws {Error} If database operation fails
 */
export async function findAllUsers() {
  return prisma.user.findMany();
}

export const userService = {
  findUserById,
  createUser,
  updateUser,
  deleteUser,
  findAll: findAllUsers,
};