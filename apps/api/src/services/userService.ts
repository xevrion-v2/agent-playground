/**
 * User service module for handling user-related operations
 * @module userService
 * @requires prisma
 * @requires bcrypt
 * @requires jsonwebtoken
 */

/**
 * Creates a new user with the provided data
 * @param userData - Object containing user information (email, password, name, etc.)
 * @returns Promise resolving to the created user object
 */

/**
 * Authenticates a user by email and password
 * @param email - The user's email address
 * @param password - The user's password
 * @returns Promise resolving to user object with access token or rejecting with authentication error
 */

/**
 * Finds a user by their unique identifier
 * @param id - The unique identifier of the user
 * @returns Promise resolving to the user object or null if not found
 */

/**
 * Finds a user by their email address
 * @param email - The email address to search for
 *returns Promise resolving to the user object or null if not found
 */

/**
 * Updates user information
 * @param id - The user's unique identifier
 * @param updateData - Object containing fields to update
 * @returns Promise resolving to the updated user object
 */

/**
 * Deletes a user by their unique identifier
 * @param id - The user's unique identifier
 * @returns Promise resolving to the result of the delete operation
 */

/**
 * Gets all users from the database
 * @returns Promise resolving to array of all users
 */