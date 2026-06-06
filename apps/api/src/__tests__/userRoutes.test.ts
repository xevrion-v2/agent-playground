import request from 'supertest';
import express from 'express';
import { userRoutes } from '../routes/user';

// Mock the user controller functions
jest.mock('../controllers/user', () => ({
  listUsers: jest.fn((req, res) => {
    res.json([{ id: 1, name: 'John Doe', email: 'john@example.com' }]);
  }),
  createUser: jest.fn((req, res) => {
    res.status(201).json({ id: 1, name: 'John Doe', email: 'john@example.com' });
  })
}));

describe('User Routes', () => {
  const app = express();
  app.use(express.json());
  app.use('/users', userRoutes);

  describe('GET /users', () => {
    it('should list users', async () => {
      const response = await request(app).get('/users');
      expect(response.status).toBe(200);
    });
  });

  describe('POST /users', () => {
    it('should create a new user', async () => {
      const newUser = {
        name: 'Jane Doe',
        email: 'jane@example.com'
      };

      const response = await request(app)
        .post('/users')
        .send(newUser)
        .expect(201);
      
      expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          name: 'John Doe',
          email: 'john@example.com'
        })
      );
    });
  });
});

// Reset mocks after each test
afterEach(() => {
  jest.clearAllMocks();
});

// Import the actual modules for type checking
import type { Request, Response } from 'express';
import type { userRoutes as userRoutesType } from '../routes/user';