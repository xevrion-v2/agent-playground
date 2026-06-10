/**
 * Service for user-related operations
 * Handles user management functionality including creation, retrieval, update and deletion of users
 */

import { User } from '@prisma/client';
import { db } from '../../packages/db';

interface UserService {
  /**
   * Find a user by their unique identifier
   * @param id - The user's unique identifier
   * @returns A promise that resolves to the user object or null if not found
   */
  findById: (id: number) => Promise<User | null>;
  
  /**
   * Find a user by their email address
   * @param email - The email address to search for
   * @returns A promise that resolves to the user object or null if not found
   */
  findByEmail: (email: string) => Promise<User | null>;
  
  /**
   * Create a new user
   * @param userData - The data for creating a new user
   * @returns A promise that resolves to the created user object
   */
  createUser: (userData: Partial<User>) => Promise<User>;
  
  /**
   * Update an existing user
   * @param id - The user's unique identifier
   * @param userData - The data to update the user with
   * @returns A promise that resolves to the updated user object
   */
  updateUser: (id: number, userData: Partial<User>) => Promise<User>;
  
  /**
   * Delete a user by their unique identifier
   * @param id - The user's unique identifier
   * @returns A promise that resolves to the result of the deletion operation
   */
  deleteUser: (id: number) => Promise<boolean>;
  
  /**
   * List all users with optional filtering and pagination
   * @param filter - Optional filter criteria
   * @param page - Page number for pagination (default: 1)
   * @param limit - Number of items per page (default: 10)
   * @returns A promise that resolves to an array of users
   */
  listUsers: (filter?: object, page?: number, limit?: number) => Promise<User[]>;
  
  /**
   * Search for users by name
   * @param query - The search query string
   * @returns A promise that resolves to an array of matching users
   */
  searchUsers: (query: string) => Promise<User[]>;
  
  /**
   * Get user statistics and summary information
   * @returns A promise that resolves to an object containing user statistics
   */
  getUserStats: () => Promise<object>;
  
  /**
   * Ban a user from the platform
   * @param id - The user's unique identifier
   * @param reason - The reason for banning the user
   * @returns A promise that resolves to the updated user object
   */
  banUser: (id: number, reason: string) => Promise<User>;
  
  /**
   * Unban a user on the platform
   * @param id - The user's unique identifier
   * @returns A promise that resolves to the updated user object
   */
  unbanUser: (id: number) => Promise<User>;
  
  /**
   * Get all banned users
   * @returns A promise that resolves to an array of banned users
   */
  getBannedUsers: () to an array of banned users
   */
  getBannedUsers: () => Promise<User[]>;
}

export default UserService;