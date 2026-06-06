import { User } from '@prisma/client';
import { db } from '../lib/db';

export interface UserService {
  id: number;
  name: string;
  email: string;
  created: Date;
}

/**
 * Service for managing user-related operations
 */
export const userService = {
  /**
   * Retrieves all users from the database
   * @returns Promise resolving to an array of users
   */
  async getAll() {
    return await db.user.findMany();
  },

  /**
   * Retrieves a user by their ID
   * @param id - The unique identifier of the user
   * @returns Promise resolving to the user object or null if not found
   */
  async getById(id: number) {
    return await db.user.findUnique({
      where: {
        id,
      },
    });
  },

  /**
   * Creates a new user with the provided data
   * @param data - User data containing name and email
   * @returns Promise resolving to the created user object
   */
  async create(data: { name: string; email: string }) {
    return await db.user.create({ data });
  },

  /**
   * Updates an existing user's information
   * @param id - The ID of the user to update
   * @param data - Partial user data to update
   * @returns Promise resolving to the updated user object
   */
  async update(id:1, data: { name?: string; email?: string }) {
    return await db.user.update({
      where: { id },
      data,
    });
  },

  /**
   * Deletes a user by their ID
   * @param id - The ID of the user to delete
   * @returns Promise resolving to the deleted user object
   */
  async delete(id: number) {
    return await db.user.delete({ where: { id } });
  },
};