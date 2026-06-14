const request = require('supertest');
const express = require('express');
const userRoutes = require('../src/routes/users');

// Mock the user controller functions
jest.mock('../src/controllers/userController', () => ({
  listUsers: jest.fn((req, res) => {
    res.status(200).json([{ id: 1, name: 'John Doe' }]);
  }),
  createUser: jest.fn((req, res) => {
    res.status(201).json({ id: 1, name: 'John Doe' });
  })
}));

const app = express();
app.use(express.json());
app.use('/users', userRoutes);

describe('User Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /users', () => {
    it('should return a list of users', async () => {
      const res = await request(app).get('/users');
      expect(res.status).toBe(200);
      // Note: actual implementation would depend on the controller logic
    });
  });

  describe('POST /users', () => {
    it('should create a new user', async () => {
      const userData = { name: 'Jane Doe', email: 'jane@example.com' };
      const res = await request(app)
        .post('/users')
        .send(userData);
      expect(res.status).toBe(201);
      // Note: actual implementation would depend on the controller logic
    });
  });
});