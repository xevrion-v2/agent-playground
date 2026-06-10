import { User } from '@prisma/client';
import { db } from '../../db';

/**
 * Service for managing user operations
 */
export class UserService {
  /**
   * Creates a new user in the database
   * @param data - The user data to create
   * @returns The created user
   */
  async createUser(data: any) {
    return await db.user.create({ data });
  }

  /**
   * Retrieves a user by their ID
   * @param id - The unique identifier of the user
   * @returns The user object or null if not found
   */
  async getUserById(id: string) {
    return await db.user.findUnique({
      where: { id },
    });
  }

  /**
   * Updates an existing user's information
   * @param id - The ID of the user to update
   * @param data - The data to update the user with
   * @returns The updated user object
   */
  async updateUser(id: string, data: any) {
    return await db.user.update({
      where: { id },
      data,
    });
  }

  /**
   * Deletes a user by their ID
   * @param id - The ID of the user to delete
   * @returns The deleted user object
   */
  async deleteUser(id: string) {
    return await db.user.delete({
      where: { id },
    });
  }

  /**
   * Retrieves all users from the database
   * @returns Array of all users
   */
  async getAllUsers() {
    return await db.user.findMany();
  }
}