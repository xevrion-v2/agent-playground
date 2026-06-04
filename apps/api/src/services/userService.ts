/**
 * User data representation.
 */
export interface UserInput {
  email: string;
  name?: string;
}

/**
 * Service handling operations related to users.
 */
export const userService = {
  /**
   * Fetches the list of all registered users.
   * Currently returns a stub empty array as database persistence is not implemented yet.
   * 
   * @returns A promise resolving to an array of users.
   */
  async getUsers(): Promise<any[]> {
    return [];
  },

  /**
   * Creates a new user with the provided data.
   * Generates a stub user ID and returns the created user representation.
   * 
   * @param data The user details including email and name.
   * @returns A promise resolving to the created user object.
   */
  async createUser(data: UserInput): Promise<any> {
    return {
      id: "stub-user-id",
      ...data
    };
  }
};
