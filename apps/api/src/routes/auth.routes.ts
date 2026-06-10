import { createErrorResponse } from '../utils/errorHandler';

// Mock authentication routes for demonstration
export const register = (req: any, res: any) => {
  res.json({ message: 'Register route' });
export const login = (req: any, res: any) => {
  res.json({ message: 'Login route' });
}

export const refreshToken = (req: any, res: any) => {
  // Example usage of error helper
  try {
    throw new Error('Token refresh failed');
  } catch (error) {
    const errorResponse = createErrorResponse(401, 'Unauthorized', { reason: error.message });
    res.status(401).json(errorResponse);
  }
}
export default { register, login, refreshToken };