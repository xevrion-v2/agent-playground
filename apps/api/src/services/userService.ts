import { User } from '@prisma/client';
import { db } from '@packages/db';

/**
 * Service for managing user-related operations
 */
export class UserService {
  /**
   * Finds a user by their unique identifier
   * @param id - The unique identifier of the user
   * @returns A promise that resolves to the user object or null if not found
   */
  static async findById(id: string): Promise<User | null> {
    return await db.user.findUnique({
      where: { id }
    });
  }

  /**
   * Finds a user by their email address
   * @param email - The email address of the user
   * @returns A promise that resolves to the user object or null if not found
   */
  static async findByEmail(email: string): Promise<User | null> {
    return await db.user.findUnique({
      where: { email }
    });
  }

  /**
   * Creates a new user
   * @param data - The user data to create
   * @returns A promise that resolves to the created user object
   */
  static async create(data: Partial<User>): Promise<User> {
    return await db.user.create({
      data
    });
  }

  /**
   * Updates an existing user
   * @param id - The unique identifier of the user to update
   * @param data - The user data to update
   * @returns A promise that resolves to the updated user object
   */
  static async update(id: string, data: Partial<User>): Promise<User> {
    return await db.user.update({
      where: { id },
      data
    });
  }

  /**
   * Deletes a user by their unique identifier
   * @param id - The unique identifier of the user to delete
   * @returns A promise that resolves to the deleted user object
   */
  static async delete(id: string): Promise<User> {
    return await db.user.delete({
      where: { id }
    });
  }

  /**
   * Finds all users with optional filtering
   * @param filter - Optional filter criteria
   * @returns A promise that resolves to an array of users
   */
  static async findAll(filter?: Partial<User>): Promise<User[]> {
    return await db.user.findMany({
      where: filter
    });
  }

  /**
   * Searches for users by name
   * @param query - The search query string
   * @returns A promise that resolves to an array of users matching the search criteria
   */
  static async searchByName(query: string): Promise<User[]> {
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