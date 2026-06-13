import { PrismaClient, User } from '@prisma/client';
const prisma = new PrismaClient();

/**
 * Retrieves all users from the database.
 * @returns {Promise<User[]>} A promise that resolves to an array of User objects.
 */
export async function getAllUsers(): Promise<User[]> {
  return prisma.user.findMany();
}

/**
 * Retrieves a single user by their unique ID.
 * @param {string} id - The unique identifier of the user.
 * @returns {Promise<User | null>} A promise that resolves to the User object, or null if not found.
 */
export async function getUserById(id: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { id },
  });
}

/**
 * Retrieves a single user by their email address.
 * @param {string} email - The email address of the user.
 * @returns {Promise<User | null>} A promise that resolves to the User object, or null if not found.
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { email },
  });
}

/**
 * Creates a new user in the database.
 * @param {Object} data - The user data to create.
 * @param {string} data.email - The email address of the user.
 * @param {string} data.password - The hashed password of the user.
 * @param {string} [data.name] - The optional display name of the user.
 * @returns {Promise<User>} A promise that resolves to the newly created User object.
 */
export async function createUser(data: {
  email: string;
  password: string;
  });
}

/**
 * Updates an existing user's information.
 * @param {string} id - The unique identifier of the user to update.
 * @param {Object} data - The partial user data to update.
 * @param {string} [data.email] - The new email address.
 * @param {string} [data.name] - The new display name.
 * @returns {Promise<User>} A promise that resolves to the updated User object.
 */
export async function updateUser(
  id: string,
  data: { email?: string; name?: string }
  });
}

/**
 * Deletes a user from the database.
 * @param {string} id - The unique identifier of the user to delete.
 * @returns {Promise<User>} A promise that resolves to the deleted User object.
 */
export async function deleteUser(id: string): Promise<User> {
  return prisma.user.delete({
    where: { id },