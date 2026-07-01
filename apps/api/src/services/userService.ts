/**
 * @module UserService
 * @description Provides business logic for managing user accounts and profiles.
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class UserService {
  /**
   * Retrieves a list of all users.
   * 
   * @async
   * @function getUsers
   * @returns {Promise<Array<Object>>} A promise that resolves to an array of user objects.
   * @throws {Error} If there is a database connection failure.
   */
  async getUsers() {
    try {
      return await prisma.user.findMany();
    } catch (error) {
      throw new Error(`Failed to fetch users: ${error}`);
    }
  }

  /**
   * Creates a new user in the system.
   * 
   * @async
   * @function createUser
   * @param {Object} userData - The user data to be created.
   * @param {string} userData.email - The user's email address.
   * @param {string} userData.password - The user's encrypted password.
   * @param {string} [userData.name] - The user's display name.
   * @returns {Promise<Object>} A promise that resolves to the created user object.
   * @throws {Error} If the user already exists or validation fails.
   */
  async createUser(userData) {
    try {
      return await prisma.user.create({
        data: userData,
      });
    } catch (error) {
      throw new Error(`Failed to create user: ${error}`);
    }
  }

  /**
   * Finds a specific user by their unique identifier.
   * 
   * @async
   * @function getUserById
   * @param {string} id - The unique identifier of the user.
   * @returns {Promise<Object|null>} A promise that resolves to the user object or null if not found.
   */
  async getUserById(id) {
    try {
      return await prisma.user.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new Error(`Failed to fetch user with id ${id}: ${error}`);
    }
  }
}

export const userService = new UserService();
