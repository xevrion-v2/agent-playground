const request = require('supertest');
const express = require('express');
const userRoutes = require('../routes/users');

// Mock the user controller
jest.mock('../controllers/userController', () => ({
  listUsers: (req, res) => {
    res.status(200).json({ users: [] });
  },
  createUser: (req, res) => {
    res.status(201).json({ id: 1, ...req.body });
  }
}));

const app = express();
app.use(express.json());
app.use('/users', userRoutes);

describe('User Routes', () => {
  describe('GET /users', () => {
    it('should return list of users', async () => {
      const response = await request(app)
        .get('/users')
        .expect(200);
      
      expect(response.body).toHaveProperty('users');
      expect(Array.isArray(response.body.users)).toBe(true);
    });
  });

  describe('POST /users', () => {
    it('should create a new user', async () => {
      const newUser = {
        name: 'Test User',
        email: 'test@example.com'
      };

      const response = await request(app)
        .post('/users')
        .send(newUser)
        .expect(201);
      
      expect(response.body).toMatchObject(newUser);
    });
  });
});