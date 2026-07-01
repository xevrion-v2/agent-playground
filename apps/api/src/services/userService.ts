import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Retrieves all users from the database.
 *
 * @returns A promise that resolves to an array of all User records.
 */
export async function getAllUsers(): Promise<User[]> {
  return prisma.user.findMany();
}

/**
 * Retrieves a single user by their unique identifier.
 *
 * @param id - The unique ID of the user to retrieve.
 * @returns A promise that resolves to the matching User, or null if not found.
 */
export async function getUserById(id: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { id } });
}

/**
 * Creates a new user record in the database.
 *
 * @param data - The fields required to create a new user (e.g. name, email, password hash).
 * @returns A promise that resolves to the newly created User record.
 */
export async function createUser(
  data: Pick<User, 'name' | 'email' | 'passwordHash'>
): Promise<User> {
  return prisma.user.create({ data });
}

/**
 * Updates an existing user's fields by their unique identifier.
 *
 * @param id - The unique ID of the user to update.
 * @param data - A partial object containing the fields to update.
 * @returns A promise that resolves to the updated User record.
 */
export async function updateUser(
  id: string,
  data: Partial<Pick<User, 'name' | 'email' | 'passwordHash'>>
): Promise<User> {
  return prisma.user.update({ where: { id }, data });
}

/**
 * Deletes a user record from the database by their unique identifier.
 *
 * @param id - The unique ID of the user to delete.
 * @returns A promise that resolves to the deleted User record.
 */
export async function deleteUser(id: string): Promise<User> {
  return prisma.user.delete({ where: { id } });
}

/**
 * Finds a user by their email address.
 *
 * @param email - The email address to search for.
 * @returns A promise that resolves to the matching User, or null if not found.
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { email } });
}
