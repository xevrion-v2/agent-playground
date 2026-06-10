/**
 * User Service
 * Contains business logic for user management operations
 */

import { User } from '@prisma/client';
import { prisma } from '../utils/db';

/**
 * Finds a user by their unique identifier
 * @param id - The unique identifier of the user
 * @returns A promise that resolves to the user object or null if not found
 */
export const findUserById = async (id: number) => {
  return await prisma.user.findUnique({
    where: { id }
  });
};

/**
 * Finds a user by their email address
 * @param email - The email address to search for
 * @returns A promise that resolves to the user object or null if not found
 */
export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email }
  });
};

/**
 * Creates a new user record
 * @param userData - The data to create a new user with
 * @returns A promise that resolves to the created user object
 */
export const createUser = async (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => {
  return await prisma.user.create({
    data: userData
  });
};

/**
 * Updates an existing user's information
 * @param id - The unique identifier of the user to update
 * @param userData - The partial user data to update
 * @returns A promise that resolves to the updated user object
 */
export const updateUser = async (id: number, userData: Partial<User>) => {
  return await prisma.user.update({
    where: { id },
    data: userData
  });
};

/**
 * Deletes a user by their unique identifier
 * @param id - The unique identifier of the user to delete
 * @returns A promise that resolves to the deleted user object
 */
export const deleteUser = async (id: number) => {
  return await prisma.user.delete({
    where: { id }
  });
};

/**
 * Finds all users with optional filtering and pagination
 * @param filter - Optional filter criteria
 * @param page - Page number for pagination (default: 1)
 * @param limit - Number of records per page (default: 10)
 * @returns A promise that resolves to an array of users
 */
export const findUsers = async (
  filter: Partial<User> = {},
  page: number = 1,
  limit: number = 10
) => {
  return await prisma.user.findMany({
    where: filter,
    skip: (page - 1) * limit,
    take: limit
  });
};

/**
 * Searches for users by name or email
 * @param query - The search query string
 * @returns A promise that resolves to an array of matching users
 */
export const searchUsers = async (query: string) => {
  return await prisma.user.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { email: { contains: query, mode: 'insensitive' } }
      ]
    }
  });
};