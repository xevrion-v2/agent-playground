/**
 * User Service
 * 
 * This service handles all user-related business logic including user creation,
 * retrieval, updating, and deletion operations.
 * 
 * @module services/userService
 */

import { User } from '@prisma/client';
import { db } from '../../packages/db';

/**
 * Creates a new user with the provided data
 * 
 * @param userData - The data to create a user with
 * @param userData.email - The user's email address
 * @param userData.name - The user's full name
 * @param userData.password - The user's password (hashed)
 * @returns A promise that resolves to the created user
 * 
 * @example
 * 