import { User } from '@prisma/client';
import { db } from '../lib/db';

/**
 * Service for managing users
 * 
 * @namespace userService
 */
export const userService = {
  /**
   * Get a user by their ID
   * @param id - The unique identifier of the user
   * @returns A promise that resolves to the user object or null if not found
   */
  getUserById: async (id: string): Promise<User | null> => {
    return await db.user.findUnique({
      where: { id }
    });
  },

  /**
   * Get all users from the database
   * @returns A promise that resolves to an array of all users
   */
  getAllUsers: async (): Promise<User[]> => {
    return await db.user.findMany();
  },

  /**
   * Create a new user
   * @param userData - The data for the new user
   * @returns A promise that resolves to the created user object
   */
  createUser: async (userData: Omit<User, 'id'>): Promise<User> => {
    return await db.user.create({
      data: userData
    });
  },

  /**
   * Update an existing user
   * @param id - The ID of the user to update
   * @param userData - The updated user data
   * @returns A promise that resolves to the updated user object
   */
  updateUser: async (id: string, userData: Partial<User>): Promise<User> => {
    return await db.user.update({
      where: { id },
      data: userData
    });
  },

  /**
   * Delete a user by their ID
   * @param id - The ID of the user to delete
   * @returns A promise that resolves when the user is deleted
   */
  deleteUser: async (id: string): Promise<void> => {
    await db.user.delete({ where: { id } });
  }
};