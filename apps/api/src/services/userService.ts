import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Creates a new user in the database.
 *
 * @param email - The user's email address (must be unique)
 * @param name - Optional display name for the user
 * @returns Promise resolving to the created User object with generated ID and timestamps
 * @throws {Error} If email already exists or database operation fails
 *
 * @example
 * ```typescript
 * const user = await createUser("john@example.com", "John Doe");
 * console.log(user.id); // "clx1234567890abcdef"
 * ```
 */
export async function createUser(email: string, name?: string): Promise<User> {
  return prisma.user.create({
    data: {
      email: email.toLowerCase().trim(),
      name: name?.trim(),
    },
  });
}

/**
 * Retrieves a user by their unique ID.
 *
 * @param id - The user's unique identifier (CUID format)
 * @returns Promise resolving to the User object if found, null otherwise
 * @throws {Error} If database operation fails
 *
 * @example
 * ```typescript
 * const user = await getUserById("clx1234567890abcdef");
 * if (user) console.log(user.email);
 * ```
 */
export async function getUserById(id: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { id },
  });
}

/**
 * Retrieves a user by their email address.
 *
 * @param email - The user's email address (case-insensitive lookup)
 * @returns Promise resolving to the User object if found, null otherwise
 * @throws {Error} If database operation fails
 *
 * @example
 * ```typescript
 * const user = await getUserByEmail("john@example.com");
 * ```
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { email: email.toLowerCase().trim() },
  });
}

/**
 * Retrieves all users with optional pagination.
 *
 * @param skip - Number of records to skip (for pagination)
 * @param take - Maximum number of records to return (for pagination)
 * @returns Promise resolving to array of User objects
 * @throws {Error} If database operation fails
 *
 * @example
 * ```typescript
 * const users = await getUsers(0, 10); // First 10 users
 * ```
 */
export async function getUsers(skip = 0, take = 100): Promise<User[]> {
  return prisma.user.findMany({
    skip,
    take,
    orderBy: { createdAt: "desc" },
  });
}

/**
 * Updates a user's profile information.
 *
 * @param id - The user's unique identifier
 * @param data - Partial user data to update (name only, email is immutable)
 * @returns Promise resolving to the updated User object
 * @throws {Error} If user not found or database operation fails
 *
 * @example
 * ```typescript
 * const updated = await updateUser("clx1234567890abcdef", { name: "Jane Doe" });
 * ```
 */
export async function updateUser(
  id: string,
  data: Pick<User, "name">
): Promise<User> {
  return prisma.user.update({
    where: { id },
    data: {
      name: data.name?.trim(),
    },
  });
}

/**
 * Deletes a user and all associated data (jobs, proposals).
 *
 * @param id - The user's unique identifier
 * @returns Promise resolving to the deleted User object
 * @throws {Error} If user not found or database operation fails
 *
 * @example
 * ```typescript
 * await deleteUser("clx1234567890abcdef");
 * ```
 */
export async function deleteUser(id: string): Promise<User> {
  return prisma.user.delete({
    where: { id },
  });
}

/**
 * Checks if a user exists by email address.
 *
 * @param email - The email address to check
 * @returns Promise resolving to boolean indicating existence
 * @throws {Error} If database operation fails
 *
 * @example
 * ```typescript
 * const exists = await userExists("john@example.com");
 * if (exists) console.log("User already registered");
 * ```
 */
export async function userExists(email: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase().trim() },
    select: { id: true },
  });
  return user !== null;
}

/**
 * Gets the total count of users in the system.
 *
 * @returns Promise resolving to the total number of users
 * @throws {Error} If database operation fails
 *
 * @example
 * ```typescript
 * const count = await getUserCount();
 * console.log(`Total users: ${count}`);
 * ```
 */
export async function getUserCount(): Promise<number> {
  return prisma.user.count();
}