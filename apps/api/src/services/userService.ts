/**
 * User Service
 * 
 * This service handles all user-related business logic including
 * user creation, retrieval, updates, and deletion.
 * 
 * @module userService
 */

import { User } from '@prisma/client';
import { prisma } from '../../packages/db';

/**
 * Creates a new user with the provided data
 * 
 * @param userData - The data for creating a new user
 * @returns A promise that resolves to the created user
 * @throws {Error} If user creation fails
 */
export async function createUser(userData: Partial<User>): Promise<User> {
  try {
    const user = await prisma.user.create({
      data: userData
    });
    return user;
  } catch (error) {
    throw new Error(`Failed to create user: ${error.message}`);
  }
}

/**
 * Retrieves a user by their unique ID
 * 
 * @param id - The unique identifier of the user
 * @returns A promise that resolves to the user or null if not found
 */
export async function getUserById(id: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { id }
  });
}

/**
 * Retrieves a user by their email address
 * 
 * @param email - The email address of the user
 * @returns A promise that resolves to the user or null if not found
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { email }
  });
}

/**
 * Retrieves all users from the database
 * 
 * @returns A promise that resolves to an array of all users
 */
export async function getAllUsers(): Promise<User[]> {
  return prisma.user.findMany();
}

/**
 * Updates a user's information
 * 
 * @param id - The ID of the user to update
 * @param userData - The partial user data to update
 * @returns A promise that resolves to the updated user
 * @throws {Error} If user update fails
 */
export async function updateUser(id: string, userData: Partial<User>): Promise<User> {
  try {
    const user = await prisma.user.update({
      where: { id },
      data: userData
    });
    return user;
  } catch (error) {
    throw new Error(`Failed to update user: ${error.message}`);
  }
}

/**
 * Deletes a user by their ID
 * 
 * @param id - The ID of the user to delete
 * @returns A promise that resolves to the deleted user
 * @throws {Error} If user deletion fails
 */
export async function deleteUser(id: string): Promise<User> {
  try {
    const user = await prisma.user.delete({
      where: { id }
    });
    return user;
  } catch (error) {
    throw new Error(`Failed to delete user: ${error.message}`);
  }
}

/**
 * Searches for users by name or other criteria
 * 
 * @param query - The search query string
 * @returns A promise that resolves to an array of matching users
 */
export async function searchUsers(query: string): Promise<User[]> {
  return prisma.user.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { email: { contains: query, mode: 'insensitive' } }
      ]
    }
  });
}

export default {
  createUser,
  getUserById,
  getUserByEmail,
  getAllUsers,
  updateUser,
  deleteUser,
  searchUsers
};