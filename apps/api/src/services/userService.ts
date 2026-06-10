import { User } from '@prisma/client';
import { prisma } from '../../db';

/**
 * Creates a new user with the provided data
 * @param {Omit<User, 'id' | 'createdAt' | 'updatedAt'>} userData - The user data to create
 * @returns {Promise<User>} The created user object
 * @throws {Error} If user creation fails
 * @example
 * const newUser = await userService.createUser({
 *   email: 'user@example.com',
 *   name: 'John Doe'
 * });
 */
export async function createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
  try {
    const user = await prisma.user.create({
      data: userData,
    });
    return user;
  } catch (error) {
    throw new Error(`Failed to create user: ${error.message}`);
  }
}

/**
 * Retrieves a user by their unique ID
 * @param {string} id - The unique identifier of the user
 * @returns {Promise<User | null>} The user object if found, null otherwise
 * @throws {Error} If database query fails
 * @example
 * const user = await userService.getUserById('user-123');
 */
export async function getUserById(id: string): Promise<User | null> {
  try {
    return await prisma.user.findUnique({
      where: { id },
    });
  } catch (error) {
    throw new Error(`Failed to get user by ID: ${error.message}`);
  }
}

/**
 * Updates a user's information
 * @param {string} id - The ID of the user to update
 * @param {Partial<User>} userData - The partial user data to update
 * @returns {Promise<User>} The updated user object
 * @throws {Error} If user update fails
 * @example
 * const updatedUser = await userService.updateUser('user-123', {
 *   name: 'Jane Doe'
 * });
 */
export async function updateUser(id: string, userData: Partial<User>): Promise<User> {
  try {
    const user = await prisma.user.update({
      where: { id },
      data: userData,
    });
    return user;
  } catch (error) {
    throw new Error(`Failed to update user: ${error.message}`);
  }
}

/**
 * Deletes a user by their ID
 * @param {string} id - The ID of the user to delete
 * @returns {Promise<User>} The deleted user object
 * @throws {Error} If user deletion fails
 * @example
 * const deletedUser = await userService.deleteUser('user-123');
 */
export async function deleteUser(id: string): Promise<User> {
  try {
    return await prisma.user.delete({
      where: { id },
    });
  } catch (error) {
    throw new Error(`Failed to delete user: ${error.message}`);
  }
}

/**
 * Retrieves all users from the database
 * @returns {Promise<User[]>} Array of all user objects
 * @throws {Error} If fetching users fails
 * @example
 * const allUsers = await userService.getAllUsers();
 */
export async function getAllUsers(): Promise<User[]> {
  try {
    return await prisma.user.findMany();
  } catch (error) {
    throw new Error(`Failed to fetch users: ${error.message}`);
  }
}