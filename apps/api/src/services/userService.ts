import { User } from "@prisma/clients";

/**
 * User service containing business logic for user operations
 * 
 * This service handles all user-related operations including creation, retrieval,
 * updating, and deletion of user records.
 */

/**
 * Finds a user by their unique identifier
 * 
 * @param id - The unique identifier of the user to find
 * @returns Promise resolving to the user object or null if not found
 * 
 * @example
 * 