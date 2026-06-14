import request from 'supertest';
import express from 'express';
import { userRoutes } from '../../src/routes/user.routes';

// Mock the database/service layer
jest.mock('../../src/services/user.service', () => ({
  userService: {
    listUsers: jest.fn(),
    createUser: jest.fn()
  }
}));

// Mock middleware
jest.mock('../../src/middleware/auth.middleware', () => ({
  authenticate: (req: any, res: any, next: any) => next(),
  authorize: (roles: string[]) => (req: any, res: any, next: any) => next()
}));

describe('User Routes', () => {
  const app = express();
  app.use(express.json());
  app.use('/users', userRoutes);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /users', () => {
    it('should return a list of users', async () => {
      const mockUsers = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
      ];
      
      const userService = require('../../src/services/user.service').userService;
      (userService.listUsers as jest.Mock).mockResolvedValue(mockUsers);

      const response = await request(app)
        .get('/users')
        .expect(200);

      expect(response.body).toEqual(mockUsers);
      expect(userService.listUsers).toHaveBeenCalled();
    });

    it('should handle empty user list', async () => {
      const userService = require('../../src/services/user.service').userService;
      (userService.listUsers as jest.Mock).mockResolvedValue([]);

      const response = await request(app)
        .get('/users')
        .expect(200);

      expect(response.body).toEqual([]);
      expect(userService.listUsers).toHaveBeenCalled();
    });
  });

  describe('POST /users', () => {
    it('should create a new user', async () => {
      const newUser = { 
        id: 3, 
        name: 'Test User', 
        email: 'test@example.com' 
      };
      
      const userService = require('../../src/services/user.service').userService;
      (userService.createUser as jest.Mock).mockResolvedValue(newUser);

      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/users')
        .send(userData)
        .expect(201);

      expect(response.body).toEqual(newUser);
      expect(userService.createUser).toHaveBeenCalledWith(userData);
    });

    it('should return 400 for invalid user data', async () => {
      const invalidUserData = {
        name: '', // Invalid: empty name
        email: 'invalid-email', // Invalid email format
        password: '123' // Invalid: too short
      };

      await request(app)
        .post('/users')
        .send(invalidUserData)
        .expect(400);
    });
  });
});