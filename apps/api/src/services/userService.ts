/**
 * User Service
 * 
 * This service handles all user-related operations including creation, retrieval,
 * updating, and deletion of user records. It serves as the main interface between
 * the controller layer and the database for user operations.
 */

import { User } from '@prisma/client';
import { db } from '@taskflow/db';

/**
 * Creates a new user in the system
 * @param userData - The data required to create a new user
 * @returns Promise resolving to the created user object
 */
export async function createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
  return await db.user.create({
    data: userData,
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
    },
  });
}

/**
 * Retrieves a user by their unique identifier
 * @param id - The unique identifier of the user to retrieve
 * @returns Promise resolving to the user object or null if not found
 * @throws Error if user is not found
 */
export async function getUserById(id: string) {
  const user = await db.user.findUnique({
    where: {
      id: id,
    },
  });
  
  if (!user) {
    throw new Error(`User with id ${id} not found`);
  }
  
  return user;
}

/**
 * Retrieves a user by their email address
 * @param email - The email address of the user to retrieve
 * @returns Promise resolving to the user object or null if not found
 */
export async function getUserByEmail(email: string) {
  return await db.user.findUnique({
    where: {
      email: email,
    },
  });
}

/**
 * Retrieves all users from the database
 * @returns Promise resolving to an array of all users
 */
export async function getAllUsers() {
  return await db.user.findMany();
}

/**
 * Updates an existing user's information
 * @param id - The unique identifier of the user to update
 * @param userData - The data to update the user with
 * @returns Promise resolving to the updated user object
 * @throws Error if user is not found
 */
export async function updateUser(id: string, userData: Partial<User>) {
  const user = await db.user.findUnique({
    where: { id: id }
  });
  
  if (!user) {
    throw new Error(`User with id ${id} not found`);
  }
  
  return await db.user.update({
    where: { id: id },
    data: userData,
  });
}

/**
 * Deletes a user from the system
 * @param id - The unique identifier of the user to delete
 * @returns Promise resolving to the deleted user object
 * @throws Error if user is not found
 */
export async function deleteUser(id: string) {
  const user = await db.user.findUnique({
    where: { id: id }
  });
  
  if (!user) {
    throw new Error(`User with id ${id} not found`);
  }
  
  return await db.user.delete({
    where: { id: id },
  });
}

/**
 * Searches for users by name or other criteria
 * @param query - Search query string
 * @returns Promise resolving to an array of matching users
 */
export async function searchUsers(query: string) {
  return await db.user.findMany({
    where: {
      OR: [
        { name: { contains: query } },
        { email: { contains: query } },
      ],
    },
  });
}

/**
 * Updates a user's profile information
 * @param id - The user ID to update
 * @param profileData - The profile data to update
 * @returns Promise resolving to the updated user object
 */
export async function updateUserProfile(id: string, profileData: Partial<User>) {
  return await db.user.update({
    where: { id },
    data: profileData,
  });
}

/**
 * Retrieves users with pagination
 * @param page - Page number (1-indexed)
 * @param limit - Number of users per page
 @returns Promise resolving to paginated users
 */
export async function getUsersPaginated(page: number = 1, limit: number = 10) {
  return await db.user.findMany({
    skip: (page - 1) * limit,
    take: limit,
  });
}

export default {
  createUser,
  getUserById,
  getUserByEmail,
  getAllUsers,
  updateUser,
  deleteUser,
  searchUsers,
  updateUserProfile,
  getUsersPaginated,
};