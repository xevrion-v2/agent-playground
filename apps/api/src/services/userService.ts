import { User } from '@prisma/client';
import { db } from '../../lib/db';

/**
 * User Service
 * 
 * This service handles all user-related business logic including user management,
 * authentication checks, and user data operations.
 */

class UserService {
  /**
   * Find a user by their unique identifier
   * @param id - The unique identifier of the user
   * @returns Promise resolving to the found user or null
   */
  async findById(id: string): Promise<User | null> {
    return await db.user.findUnique({
      where: { id }
    });
  }

  /**
   * Find a user by their email address
   * @param email - The email address to search for
   * return Promise resolving to the found user or null
   */
  async findByEmail(email: string): Promise<User | null> {
    return await db.user.findUnique({
      where: { email }
    });
  }

  /**
   * Create a new user
   * @param userData - The data required to create a new user
   * @returns Promise resolving to the created user
   */
  async create(userData: Omit<User, 'id'>): Promise<User> {
    return await db.user.create({
      data: userData
    });
  }

  /**
   * Update an existing user's information
   * @param id - The ID of the user to update
   * @param userData - The partial user data to update
   * @returns Promise resolving to the updated user
   */
  async update(id: string, userData: Partial<User>): Promise<User> {
    return await db.user.update({
      where: { id },
      data: userData
    });
  }

  /**
   * Delete a user by their ID
   * @param id - The ID of the user to delete
   * @returns Promise resolving to the deletion result
   */
  async delete(id: string): Promise<User> {
    return await db.user.delete({
      where: { id }
    });
  }

  /**
   * Get all users with optional filtering
   * @param filter - Optional filter criteria
   * @returns Promise resolving to array of users
   */
  async getAll(filter?: object): Promise<User[]> {
    return await db.user.findMany(filter);
  }

  /**
   * Find users by skill
   * @param skill - The skill to filter users by
   * @returns Promise resolving to array of users with the specified skill
   */
  async findBySkill(skill: string): Promise<User[]> {
    return await db.user.findMany({
      where: {
        skills: {
          has: skill
        }
      }
    });
  }
}

export default new UserService();