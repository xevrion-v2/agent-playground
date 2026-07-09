import request from 'supertest';
import express from 'express';
import { userRoutes } from '../routes/userRoutes';

// Mock the user service
jest.mock('../services/userService', () => ({
  userService: {
    listUsers: jest.fn(),
    createUser: jest.fn(),
  },
}));

// Mock auth middleware to pass through
jest.mock('../middleware/auth', () => ({
  authenticate: jest.fn((req, res, next) => next()),
  optionalAuth: jest.fn((req, res, next) => next()),
}));

import { userService } from '../services/userService';

describe('User Routes', () => {
  let app: express.Express;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/users', userRoutes);
    jest.clearAllMocks();
  });

  describe('GET /users', () => {
    it('should return a list of users with 200 status', async () => {
      const mockUsers = [
        {
          id: '1',
          email: 'alice@example.com',
          name: 'Alice Johnson',
          role: 'FREELANCER',
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
        },
        {
          id: '2',
          email: 'bob@example.com',
          name: 'Bob Smith',
          role: 'CLIENT',
          createdAt: '2024-01-02T00:00:00.000Z',
          updatedAt: '2024-01-02T00:00:00.000Z',
        },
      ];

      (userService.listUsers as jest.Mock).mockResolvedValue(mockUsers);

      const response = await request(app)
        .get('/users')
        .expect(200);

      expect(response.body).toEqual(mockUsers);
      expect(userService.listUsers).toHaveBeenCalledTimes(1);
    });

    it('should return an empty array when no users exist', async () => {
      (userService.listUsers as jest.Mock).mockResolvedValue([]);

      const response = await request(app)
        .get('/users')
        .expect(200);

      expect(response.body).toEqual([]);
      expect(userService.listUsers).toHaveBeenCalledTimes(1);
    });

    it('should handle service errors with 500 status', async () => {
      (userService.listUsers as jest.Mock).mockRejectedValue(
        new Error('Database connection failed')
      );

      const response = await request(app)
        .get('/users')
        .expect(500);

      expect(response.body).toHaveProperty('error');
      expect(userService.listUsers).toHaveBeenCalledTimes(1);
    });
  });

  describe('POST /users', () => {
    const validUserData = {
      email: 'charlie@example.com',
      name: 'Charlie Brown',
      password: 'securePassword123',
      role: 'FREELANCER',
    };

    it('should create a user and return 201 with the created user', async () => {
      const createdUser = {
        id: '3',
        email: 'charlie@example.com',
        name: 'Charlie Brown',
        role: 'FREELANCER',
        createdAt: '2024-01-03T00:00:00.000Z',
        updatedAt: '2024-01-03T00:00:00.000Z',
      };

      (userService.createUser as jest.Mock).mockResolvedValue(createdUser);

      const response = await request(app)
        .post('/users')
        .send(validUserData)
        .expect(201);

      expect(response.body).toEqual(createdUser);
      expect(userService.createUser).toHaveBeenCalledWith(validUserData);
      expect(userService.createUser).toHaveBeenCalledTimes(1);
    });

    it('should return 400 when required fields are missing', async () => {
      const invalidData = { name: 'Missing Email' };

      const response = await request(app)
        .post('/users')
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(userService.createUser).not.toHaveBeenCalled();
    });

    it('should return 409 when email already exists', async () => {
      (userService.createUser as jest.Mock).mockRejectedValue(
        Object.assign(new Error('Email already exists'), { code: 'P2002' })
      );

      const response = await request(app)
        .post('/users')
        .send(validUserData)
        .expect(409);

      expect(response.body).toHaveProperty('error');
      expect(userService.createUser).toHaveBeenCalledTimes(1);
    });
  });
});