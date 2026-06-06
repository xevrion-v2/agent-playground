import { PrismaClient, User } from '@prisma/client';
import { CreateUserInput, UpdateUserInput } from '../types/user';

/**
 * Service for managing user-related database operations.
 * Provides CRUD functionality for user accounts.
 */

const prisma = new PrismaClient();

/**
 * Retrieve all users from the database.
 * @returns {Promise<User[]>} A promise that resolves to an array of all users.
 */
export const getAllUsers = async (): Promise<User[]> => {
  return prisma.user.findMany();
};

/**
 * Find a single user by their unique identifier.
 * @param {string} id - The unique ID of the user.
 * @returns {Promise<User | null>} A promise that resolves to the user object, or null if not found.
 */
export const getUserById = async (id: string): Promise<User | null> => {
  return prisma.user.findUnique({
    where: { id },
  });
};

/**
 * Find a user by their email address.
 * @param {string} email - The email address to search for.
 * @returns {Promise<User | null>} A promise that resolves to the user object, or null if not found.
 */
export const getUserByEmail = async (email: string): Promise<User | null> => {
  return prisma.user.findUnique({
    where: { email },
  });
};

/**
 * Create a new user record in the database.
 * @param {CreateUserInput} dataOptions - The data required to create a new user.
 * @returns {Promise<User>} A promise that resolves to the newly created user.
 */
export const createUser = async (dataOptions: CreateUserInput): Promise<User> => {
  return prisma.user.create({
    data: dataOptions,
  });
};

/**
 * Update an existing user's information.
 * @param {string} id - The unique ID of the user to update.
 * @param {UpdateUserInput} dataOptions - The data to update on the user.
 * @returns {Promise<User>} A promise that resolves to the updated user.
 */
export const updateUser = async (id: string, dataOptions: UpdateUserInput): Promise<User> => {
  return prisma.user.update({
    where: { id },
    data: dataOptions,
  });
};

/**
 * Remove a user from the database.
 * @param {string} id - The unique ID of the user to delete.
 * @returns {Promise<User>} A promise that resolves to the deleted user object.
 */
export const deleteUser = async (id: string): Promise<User> => {
  return prisma.user.delete({
    where: { id },
  });
};