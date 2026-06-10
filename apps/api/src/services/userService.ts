/**
 * Service for managing users
 * @namespace UserService
 */
import { User } from '@prisma/client';
import { prisma } from '../utils/prisma';
import { hashPassword, comparePassword } from '../utils/auth';

/**
 * Create a new user
 * @param userData - The user data to create
 * @param userData.email - User's email address
 * @param userData.password - User's password (will be hashed)
 * @param userData.name - User's full name
 * @returns Promise resolving to the created user
 */
export const createUser = async (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => {
  const hashedPassword = await hashPassword(userData.password);
  return prisma.user.create({
    data: {
      ...userData,
      password: hashedPassword,
    },
  });
};

/**
 * Get a user by their ID
 * @param id - The user ID to look up
 * @returns Promise resolving to the user object or null if not found
 */
export const getUserById = async (id: number) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
};

/**
 * Get a user by their email
 * @param email - The email to search for
 * @returns Promise resolving to the user object or null if not found
 */
export const getUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};

/**
 * Update a user's information
 * @param id - The user ID to update
 * @param userData - The data to update the user with
 * @returns Promise resolving to the updated user
 */
export const updateUser = async (id: number, userData: Partial<User>) => {
  if (userData.password) {
    userData.password = await hashPassword(userData.password);
  }
  return prisma.user.update({
    where: { id },
    data: userData,
  });
};

/**
 * Delete a user by their ID
 * @param id - The user ID to delete
 * @returns Promise resolving to the deleted user
 */
export const deleteUser = async (id: number) => {
  return prisma.user.delete({
    where: { id },
  });
};

/**
 * Get all users with pagination
 * @param page - Page number (default: 1)
 * @param limit - Number of users per page (default: 10)
 * @returns Promise resolving to an array of users
 */
export const getAllUsers = async (page: number = 1, limit: number = 10) => {
  return prisma.user.findMany({
    skip: (page - 1) * limit,
    take: limit,
  });
};

/**
 * Search users by name or email
 * @param query - Search query string
 * @returns Promise resolving to array of matching users
 */
export const searchUsers = async (query: string) => {
  return prisma.user.findMany({
    where: {
      OR: [
        { name: { contains: query } },
        { email: { contains: query } },
      ],
    },
  });
};