import { User } from '@prisma/client';
import { prisma } from '@packages/db';

/**
 * User service containing business logic for user operations
 */
export class UserService {
  /**
   * Find a user by their ID
   * @param id - The unique identifier of the user
   * @returns Promise resolving to the user object or null if not found
   */
  static async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  /**
   * Find a user by their email address
   * @param email - The email address to search for
   apps/api/src/services/userService.ts
   * @returns Promise resolving to the user object or null if not found
   */
  static async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  /**
   * Get all users from the database
   * @returns Promise resolving to an array of users
   */
  static async findAll(): Promise<User[]> {
    return prisma.user.findMany();
  }

  /**
   * Create a new user
   * @param userData - The data for the new user
   * @returns Promise resolving to the created user object
   */
  static async create(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    return prisma.user.create({
      data: userData,
    });
  }

  /**
   * Update an existing user
   * @param id - The ID of the user to update
   * @param userData - The partial data to update the user with
   * @returns Promise resolving to the updated user object
   */
  static async update(id: string, userData: Partial<User>): Promise<User> {
    return prisma.user.update({
      where: { id },
      data: userData,
    });
  }

  /**
   * Delete a user from the database
   * @param id - The ID of the user to delete
   * @returns Promise resolving to the deleted user object
   */
  static async delete(id: string): Promise<User> {
    return prisma.user.delete({
      where: { id },
    });
  }

  /**
   * Find users by skill
   * @param skill - The skill to filter users by
   * @returns Promise resolving to array of users with the specified skill
   */
  static async findBySkill(skill: string): Promise<User[]> {
    const users = await prisma.user.findMany({
      where: {
        skills: {
          some: {
            name: skill,
          },
        },
      },
    });
    return users;
  }

  /**
   * Update user profile
   * @param id - The user ID
   * @param profileData - The profile data to update
   * @returns Promise resolving to the updated user
   */
  static async updateProfile(id: string, profileData: Partial<User>): Promise<User> {
    return prisma.user.update({
      where: { id },
      data: profileData,
    });
  }
}