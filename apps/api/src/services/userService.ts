/**
 * User Service
 * 
 * This service handles all user-related business logic including user management,
 * authentication, and user data operations.
 */

import { User } from '@prisma/client';
import { db } from '../utils/db';

/**
 * Find a user by their unique identifier
 * 
 * @param id - The unique identifier of the user
 * @returns Promise resolving to the user object or null if not found
 */
export async function findUserById(id: string): Promise<User | null> {
  return await db.user.findUnique({
    where: { id }
  });
}

/**
 * Find a user by their email address
 * 
 * @param email - The email address of the user
 * @returns Promise resolving to the user object or null if not found
 */
export async function findUserByEmail(email: string): Promise<User | null> {
  return await db.user.findUnique({
    where: { email }
  });
}

/**
 * Create a new user
 * 
 * @param userData - The data for creating a new user
 * @param userData.email - The user's email address
 * @param userData.name - The user's full name
 * @param userData.password - The user's password (should be hashed)
 * @returns Promise resolving to the created user object
 */
export async function createUser(userData: {
  email: string;
  name: string;
  password: string;
}): Promise<User> {
  return await db.user.create({
    data: userData
  });
}

/**
 * Update an existing user's information
 * 
 * @param id - The unique identifier of the user to update
 * @param userData - The updated user data
 * @returns Promise resolving to the updated user object
 */
export async function updateUser(id: string, userData: Partial<User>): Promise<User> {
  return await db.user.update({
    where: { id },
    data: userData
  });
}

/**
 * Delete a user by their unique identifier
 * 
 * @param id - The unique identifier of the user to delete
 * @returns Promise resolving to the deleted user object
 */
export async function deleteUser(id: string): Promise<User> {
  return await db.user.delete({
    where: { id }
  });
}

/**
 * Get all users with pagination
 * 
 * @param page - Page number (default: 1)
 * @param limit - Number of users per page (default: 10)
 * @returns Promise resolving to an array of users
 */
export async function getAllUsers(page: number = 1, limit: number = 10): Promise<User[]> {
  return await db.user.findMany({
    skip: (page - 1) * limit,
    take: limit
  });
}