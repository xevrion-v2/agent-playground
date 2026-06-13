/**
 * User service module.
 * Provides CRUD operations and business logic for user management.
 */

import { PrismaClient, User } from '@prisma/client';
import { hashPassword, comparePassword } from '../utils/password';
import { generateToken } from '../utils/jwt';
const prisma = new PrismaClient();

export const userService = {
  /**
   * Creates a new user with a hashed password.
   * @param data - The user data including email, password, and optional profile fields.
   * @returns The created user object (without password).
   * @throws Error if a user with the same email already exists.
   */
  async createUser(data: {
    email: string;
    password: string;
    });
  },

  /**
   * Retrieves a user by their unique ID.
   * @param id - The user's UUID.
   * @returns The user object or null if not found.
   */
  async getUserById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  },

  /**
   * Retrieves a user by their email address.
   * @param email - The user's email address.
   * @returns The user object or null if not found.
   */
  async getUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  },

  /**
   * Authenticates a user by email and password.
   * @param email - The user's email address.
   * @param password - The user's plain text password.
   * @returns An object containing the user and a JWT token.
   * @throws Error if credentials are invalid.
   */
  async loginUser(
    email: string,
    password: string
    return { user, token };
  },

  /**
   * Updates a user's profile information.
   * @param id - The user's UUID.
   * @param data - Partial user data to update.
   * @returns The updated user object.
   * @throws Error if the user is not found.
   */
  async updateUser(
    id: string,
    data: Partial<Pick<User, 'name' | 'bio' | 'avatar' | 'role'>>
    });
  },

  /**
   * Deletes a user and all associated data.
   * @param id - The user's UUID.
   * @returns The deleted user object.
   * @throws Error if the user is not found.
   */
  async deleteUser(id: string): Promise<User> {
    return prisma.user.delete({
      where: { id },
    });
  },

  /**
   * Searches for users by name or email.
   * @param query - The search string to match against name or email.
   * @returns A list of matching users.
   */
  async searchUsers(query: string): Promise<User[]> {
    return prisma.user.findMany({
      where: {
    });
  },

  /**
   * Retrieves all users with pagination.
   * @param page - The page number (1-based).
   * @param limit - The number of users per page.
   * @returns A list of users and the total count.
   */
  async getAllUsers(
    page: number = 1,
    limit: number = 20
    return { users, total };
  },

  /**
   * Verifies a user's email address.
   * @param id - The user's UUID.
   * @returns The updated user object with emailVerified set.
   * @throws Error if the user is not found.
   */
  async verifyEmail(id: string): Promise<User> {
    return prisma.user.update({
      where: { id },
    });
  },

  /**
   * Changes a user's password after verifying the current password.
   * @param id - The user's UUID.
   * @param currentPassword - The user's current plain text password.
   * @param newPassword - The new password to set.
   * @throws Error if the user is not found or current password is incorrect.
   */
  async changePassword(
    id: string,
    currentPassword: string,
    });
  },

  /**
   * Updates a user's avatar URL.
   * @param id - The user's UUID.
   * @param avatarUrl - The URL of the new avatar image.
   * @returns The updated user object.
   */
  async updateAvatar(id: string, avatarUrl: string): Promise<User> {
    return prisma.user.update({
      where: { id },
    });
  },

  /**
   * Retrieves a user's public profile (excludes sensitive fields).
   * @param id - The user's UUID.
   * @returns The user's public profile or null if not found.
   */
  async getPublicProfile(id: string): Promise<Partial<User> | null> {
    const user = await prisma.user.findUnique({
      where: { id },