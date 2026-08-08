/**
 * User service — domain logic for TaskFlow user management.
 *
 * All database access goes through the shared Prisma client from `@taskflow/db`.
 */

import { prisma } from "@taskflow/db";
import type { User } from "@prisma/client";

/**
 * Return a paginated list of all platform users.
 *
 * @param page  - 1-based page number (default 1)
 * @param limit - users per page (default 20, max 100)
 * @returns Paginated user array with metadata
 */
export async function listUsers(
  page = 1,
  limit = 20,
): Promise<{ users: User[]; total: number; page: number }> {
  const safeLimit = Math.min(Math.max(limit, 1), 100);
  const skip = (Math.max(page, 1) - 1) * safeLimit;

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      skip,
      take: safeLimit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.user.count(),
  ]);

  return { users, total, page };
}

/**
 * Find a single user by their unique ID.
 *
 * @param id - user ID (CUID)
 * @returns The user record, or `null` when not found
 */
export async function getUserById(id: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { id } });
}

/**
 * Find a single user by their unique email address.
 *
 * @param email - user email
 * @returns The user record, or `null` when not found
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { email } });
}

/**
 * Create a new platform user.
 *
 * @param data - required `email` and optional `name`
 * @returns The newly created user
 */
export async function createUser(data: {
  email: string;
  name?: string;
}): Promise<User> {
  return prisma.user.create({ data });
}

/**
 * Update an existing user's profile fields.
 *
 * Only the provided fields are changed; omitted fields are left untouched.
 *
 * @param id   - user ID
 * @param data - fields to update (`email`, `name`)
 * @returns The updated user
 */
export async function updateUser(
  id: string,
  data: { email?: string; name?: string },
): Promise<User> {
  return prisma.user.update({ where: { id }, data });
}

/**
 * Permanently delete a user and cascade-remove their associated
 * jobs and proposals.
 *
 * @param id - user ID
 * @returns The deleted user record
 */
export async function deleteUser(id: string): Promise<User> {
  return prisma.user.delete({ where: { id } });
}
