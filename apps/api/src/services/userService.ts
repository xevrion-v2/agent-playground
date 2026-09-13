/** User entity */
export interface User { id:string; name:string; email:string; createdAt:Date; }
/** Creates a user.
 * @param name Display name
 * @param email Valid email
 */
export async function createUser(name:string,email:string):Promise<User>{
  return {id:crypto.randomUUID(),name,email,createdAt:new Date()};
}
/** Finds user by id. Returns null if not found. */
export async function findUserById(id:string):Promise<User|null>{ return null; }
/** Lists users with pagination. */
export async function listUsers(limit=20,offset=0):Promise<User[]>{ return []; }
