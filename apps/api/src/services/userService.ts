import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Retrieves all users from the database.
 *
 * @returns A list of all user records.
 */
export async function getAllUsers() {
  return prisma.user.findMany();
}

/**
 * Creates a new user with the provided details.
 *
 * @param data - Object containing email and optional name.
 * @param data.email - The user's email address (must be unique).
 * @param data.name - The user's display name.
 * @returns The newly created user record.
 */
export async function createUser(data: { email: string; name?: string }) {
  return prisma.user.create({ data });
}

/**
 * Finds a user by their unique identifier.
 *
 * @param id - The user's UUID.
 * @returns The user record, or null if no match exists.
 */
export async function getUserById(id: string) {
  return prisma.user.findUnique({ where: { id } });
}

/**
 * Updates an existing user's information.
 *
 * @param id - The user's UUID.
 * @param data - Object containing the fields to update.
 * @param data.email - New email address.
 * @param data.name - New display name.
 * @returns The updated user record.
 */
export async function updateUser(id: string, data: { email?: string; name?: string }) {
  return prisma.user.update({ where: { id }, data });
}

/**
 * Removes a user from the database.
 *
 * @param id - The user's UUID.
 * @returns The deleted user record.
 */
export async function deleteUser(id: string) {
  return prisma.user.delete({ where: { id } });
}
