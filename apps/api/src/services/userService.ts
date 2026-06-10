import { PrismaClient, User } from '@prisma/client';
import { CreateUserInput, UpdateUserInput } from '../schemas/userSchema';

/**
 * Service for managing user-related database operations.
 * Provides CRUD functionality for user accounts.
 */

const prisma = new PrismaClient();

/**
  return prisma.user.findMany();
};

/**
 * Retrieve a single user by their unique identifier.
 * @param {string} id - The UUID of the user to find.
 * @returns {Promise<User | null>} The user if found, otherwise null.
 */
export const getUserById = async (id: string): Promise<User | null> => {
  return prisma.user.findUnique({
    where: { id },
};

/**
 * Retrieve a single user by their email address.
 * @param {string} email - The email address of the user to find.
 * @returns {Promise<User | null>} The user if found, otherwise null.
 */
export const getUserByEmail = async (email: string): Promise<User | null> => {
  return prisma.user.findUnique({
    where: { email },
};

/**
 * Create a new user record in the database.
 * @param {CreateUserInput} data - The user data to create.
 * @returns {Promise<User>} The newly created user.
 */
export const createUser = async (data: CreateUserInput): Promise<User> => {
  return prisma.user.create({
    data,
};

/**
 * Update an existing user's information.
 * @param {string} id - The UUID of the user to update.
 * @param {UpdateUserInput} data - The updated user data.
 * @returns {Promise<User>} The updated user.
 */
export const updateUser = async (id: string, data: UpdateUserInput): Promise<User> => {
  return prisma.user.update({
    where: { id },
};

/**
 * Permanently delete a user from the database.
 * @param {string} id - The UUID of the user to delete.
 * @returns {Promise<User>} The deleted user.
 */
export const deleteUser = async (id: string): Promise<User> => {
  return prisma.user.delete({
    where: { id },