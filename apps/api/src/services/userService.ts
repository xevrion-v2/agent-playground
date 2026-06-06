/**
 * User service module - handles business logic for user-related operations.
 * @module services/userService
 */

import { PrismaClient, User, Prisma } from '@prisma/client';
import { hashPassword } from '../utils/password';
import { AppError } from '../utils/AppError';
const prisma = new PrismaClient();

export const userService = {
  /**
   * Create a new user in the database.
   * Hashes the provided password before storing.
   * @param {Prisma.UserCreateInput} data - The user data to create.
   * @param {string} data.email - The user's email address (unique).
   * @param {string} data.password - The user's plain-text password (will be hashed).
   * @returns {Promise<User>} The created user record.
   * @throws {AppError} If a user with the same email already exists.
   */
  createUser: async (data: Prisma.UserCreateInput): Promise<User> => {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });
  },

  /**
   * Retrieve a single user by their unique ID.
   * @param {string} id - The user's UUID.
   * @returns {Promise<User | null>} The user record, or null if not found.
   * @throws {AppError} If the user is not found.
   */
  getUserById: async (id: string): Promise<User> => {
    const user = await prisma.user.findUnique({
      where: { id },
    return user;
  },

  /**
   * Retrieve a single user by their email address.
   * @param {string} email - The user's email address.
   * @returns {Promise<User | null>} The user record, or null if not found.
   * @throws {AppError} If the user is not found.
   */
  getUserByEmail: async (email: string): Promise<User> => {
    const user = await prisma.user.findUnique({
      where: { email },
    return user;
  },

  /**
   * Update a user's information by ID.
   * @param {string} id - The user's UUID.
   * @param {Prisma.UserUpdateInput} data - The fields to update.
   * @returns {Promise<User>} The updated user record.
   * @throws {AppError} If the user is not found.
   */
  updateUser: async (id: string, data: Prisma.UserUpdateInput): Promise<UserExtra> => {
    const user = await prisma.user.findUnique({
      where: { id },
    });
  },

  /**
   * Delete a user from the database by ID.
   * @param {string} id - The user's UUID.
   * @returns {Promise<void>}
   * @throws {AppError} If the user is not found.
   */
  deleteUser: async (id: string): Promise<void> => {
    const user = await prisma.user.findUnique({
      where: { id },
    await prisma.user.delete({ where: { id } });
  },

  /**
   * Retrieve all users in the system.
   * Useful for admin dashboards or user search features.
   * @returns {Promise<User[]>} An array of all user records.
   */
  getAllUsers: async (): Promise<User[]> => {
    return prisma.user.findMany();
  },