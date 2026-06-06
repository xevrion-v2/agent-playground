/**
 * User service module.
 * Provides CRUD operations and business logic for user management
 * and account management in the TaskFlow application.
 */

import { PrismaClient, User, Prisma } from '@prisma/client';
import { hashPassword } from '../utils/password';


export type UserCreateInput = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

/**
 * Retrieves all users from the database.
 * @returns {Promise<User[]>} A promise that resolves to an array of all users.
 */
export async function getAllUsers(): Promise<User[]> {
  return prisma.user.findMany();
}

/**
 * Find a user by their unique email address.
 * @param {string} email - The email address to search for.
  return prisma.user.findUnique({ where: { email } });
}

/**
 * Find a user by their unique ID.
 * @param {string} id - The UUID of the user to find.
}

/**
 * Creates a new user in the database with a hashed password.
 * @param {UserCreateInput} data - The user data to create.
 * @returns {Promise<User>} A promise that resolves to the created user.
 */
}

/**
 * Updates an existing user's information.
 * @param {string} id - The UUID of the user to update.
 * @param {Prisma.UserUpdateInput} data - The data to update.
 * @returns {Promise<User>} A promise that resolves to the updated user.
}

/**
 * Deletes a user from the database.
 * @param {string} id - The UUID of the user to delete.
 * @returns {Promise<User>} A promise that resolves to the deleted user.
 */
}

/**
 * Searches for users by name with a case-insensitive partial match.
 * @param {string} query - The search string to match against user names.
 * @returns {Promise<User[]>} A promise that resolves to an array of matching users.
 */
}

/**
 * Updates a user's profile image URL.
 * @param {string} id - The UUID of the user.
 * @param {string} imageUrl - The URL of the new profile image.
 * @returns {Promise<User>} A promise that resolves to the updated user.
}

/**
 * Updates a user's account status (e.g., active, suspended).
 * @param {string} id - The UUID of the user.
 * @param {string} status - The new account status.
 * @returns {Promise<User>} A promise that resolves to the updated user.
}

/**
 * Verifies a user's email address.
 * @param {string} id - The UUID of the user.
 * @returns {Promise<User>} A promise that resolves to the updated user.
 */
}

/**
 * Updates a user's last login timestamp to the current time.
 * @param {string} id - The UUID of the user.
 * @returns {Promise<User>} A promise that resolves to the updated user.
 */
}

/**
 * Checks if a user has admin privileges.
 * @param {string} id - The UUID of the user.
 * @returns {Promise<boolean>} A promise that resolves to true if the user is an admin, false otherwise.
 */
}

/**
 * Retrieves a user's public profile, excluding sensitive fields.
 * @param {string} id - The UUID of the user.
 * @returns {Promise<Pick<User, 'id' | 'name' | 'email' | 'image' | 'role'> | null>} A promise that resolves to the public profile or null if not found.
 */
}

/**
 * Counts the total number of users in the database.
 * @returns {Promise<number>} A promise that resolves to the total user count.
 */
export async function countUsers(): Promise<number> {