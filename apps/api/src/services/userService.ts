import { PrismaClient, User } from '@prisma/client';
const prisma = new PrismaClient();

/**
 * Retrieves all users from the database.
 * @returns {Promise<User[]>} A promise that resolves to an array of User objects.
 */
export const getAllUsers = async (): Promise<User[]> => {
  return prisma.user.findMany();
};

/**
 * Retrieves a single user by their unique ID.
 * @param {string} id - The unique identifier of the user.
 * @returns {Promise<User | null>} A promise that resolves to the User object, or null if not found.
 */
export const getUserById = async (id: string): Promise<User | null> => {
  return prisma.user.findUnique({
    where: { id },
  });
};

/**
 * Retrieves a single user by their email address.
 * @param {string} email - The email address of the user.
 * @returns {Promise<User | null>} A promise that resolves to the User object, or null if not found.
 */
export const getUserByEmail = async (email: string): Promise<User | null> => {
  return prisma.user.findUnique({
    where: { email },
  });
};

/**
 * Creates a new user in the database.
 * @param {Omit<User, 'id' | 'createdAt' | 'updatedAt'>} data - The user data excluding auto-generated fields.
 * @returns {Promise<User>} A promise that resolves to the newly created User object.
 */
export const createUser = async (
  data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>
): Promise<User> => {
  });
};

/**
 * Updates an existing user's information.
 * @param {string} id - The unique identifier of the user to update.
 * @param {Partial<User>} data - The partial user data to update.
 * @returns {Promise<User>} A promise that resolves to the updated User object.
 */
export const updateUser = async (
  id: string,
  data: Partial<User>
  });
};

/**
 * Deletes a user from the database by their unique ID.
 * @param {string} id - The unique identifier of the user to delete.
 * @returns {Promise<User>} A promise that resolves to the deleted User object.
 */
export const deleteUser = async (id: string): Promise<User> => {
  return prisma.user.delete({
    where: { id },