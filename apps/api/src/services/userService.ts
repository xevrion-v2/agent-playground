/**
 * User Service
 * Handles business logic for user-related operations
 */

import { User } from '@prisma/client';
import { db } from '../../db/client';

/**
 * Creates a new user in the database
 * @param userData - The data needed to create a new user
 * @returns Promise resolving to the created user
 */
export async function createUser(userData: Omit<User, 'id'>): Promise<User> {
  return await db.user.create({
    data: userData
  });
}

/**
 * Finds a user by their unique identifier
 * @param id - The unique identifier of the user
 * * @returns Promise resolving to the found user or null if not found
 */
export async function findUserById(id: string): Promise<User | null> {
  return await db.user.findUnique({
    where: { id }
  });
}

/**
 * Finds a user by their email address
 * @param email - The email address to search for
 * @returns Promise resolving to the found user or null if not found
 */
export async function findUserByEmail(email: string): Promise<User | null> {
  return await db.user.findUnique({
    where: { email }
  });
}

/**
 * Updates an existing user's information
 * @param id - The ID of the user to update
 * @param userData - The partial user data to update
 * @returns Promise resolving to the updated user
 */
export async function updateUser(id: string, userData: Partial<User>): Promise<User> {
  return await db.user.update({
    where: { id },
    data: userData
  });
}

/**
 * Deletes a user from the database
 * @param id - The ID of the user to delete
 * @returns Promise resolving to the deleted user
 */
export async function deleteUser(id: string): Promise<User> {
  return await db.user.delete({
    where: { id }
  });
}

/**
 * Gets all users from the database
 * @returns Promise resolving to an array of all users
 */
export async function getAllUsers(): Promise<User[]> {
  return await db.user.findMany();
}

/**
 * Gets users with pagination
 * @param page - Page number (1-indexed)
 * @param limit - Number of users per page
 * @returns Promise resolving to paginated users
 */
export async function getUsersPaginated(page: number, limit: number): Promise<{ users: User[], total: number }> {
  const skip = (page - 1) * limit;
  const [users, total] = await Promise.all([
    db.user.findMany({
      skip: skip,
      take: limit
    }),
    db.user.count()
  ]);
  return { users, total };
}

/**
 * Searches for users by name or email
 * @param query - Search query string
 * @returns Promise resolving to array of matching users
 */
export async function searchUsers(query: string): Promise<User[]> {
  return await db.user.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { email: { contains: query, mode: 'insensitive' } }
      ]
    }
  });
}
}