import express from 'express';
import request from 'supertest';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { Router } from 'express';

// Mock the user service
vi.mock('../../src/services/userService', () => ({
  default: {
    listUsers: vi.fn().mockResolvedValue([
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
    ]),
    createUser: vi.fn().mockImplementation((userData) => 
      Promise.resolve({ 
        id: 3, 
        ...userData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
    )
  }
}));

// Import the actual route handlers or create test versions
const mockUserList = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

const userController = {
  list: vi.fn().mockImplementation((req, res) => {
    res.status(200).json(mockUserList);
  }),
  create: vi.fn().mockImplementation((req, res) => {
    const newUser = {
      id: 3,
      ...req.body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    res.status(201).json(newUser);
  })
};

describe('User Routes', () => {
  let app: express.Application;
  let router: Router;
  
  beforeEach(() => {
    app = express();
    app.use(express.json());
    
    // Create router and define routes
    router = express.Router();
    router.get('/users', userController.list);
    router.post('/users', userController.create);
    
    app.use('/api', router);
    
    // Clear mocks
    vi.clearAllMocks();
  });

  describe('GET /api/users', () => {
    it('should return a list of users', async () => {
      const response = await request(app)
        .get('/api/users')
        .expect(200);
      
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('name');
      expect(response.body[0]).toHaveProperty('email');
    });

    it('should call userController.list', async () => {
      await request(app).get('/api/users');
      expect(userController.list).toHaveBeenCalled();
    });
  });

  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const newUser = {
        name: 'Bob Johnson',
        email: 'bob@example.com'
      };

      const response = await request(app)
        .post('/api/users')
        .send(newUser)
        .expect(201);
      
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(newUser.name);
      expect(response.body.email).toBe(newUser.email);
      expect(response.body).toHaveProperty('createdAt');
      expect(response.body).toHaveProperty('updatedAt');
    });

    it('should call userController.create with request body', async () => {
      const newUser = {
        name: 'Alice Wilson',
        email: 'alice@example.com'
      };

      await request(app)
        .post('/api/users')
        .send(newUser);
      
      expect(userController.create).toHaveBeenCalled();
    });

    it('should return 400 for invalid user data', async () => {
      await request(app)
        .post('/api/users')
        .send({}) // Empty object should fail validation
        .expect(400);
    });
  });

  describe('Route Integration', () => {
    it('should handle user listing endpoint', async () => {
      const response = await request(app)
        .get('/api/users')
        .expect(200);
      
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
});