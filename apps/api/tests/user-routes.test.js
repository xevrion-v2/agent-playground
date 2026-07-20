const request = require('supertest');
const express = require('express');
const { app } = require('../src/app');

// Mock the user controller functions
jest.mock('../src/controllers/userController', () => ({
  listUsers: jest.fn((req, res) => {
    return res.status(200).json([{ id: 1, name: 'John Doe' }]);
  }),
  createUser: jest.fn((req, res) => {
    return res.status(201).json({ id: 1, name: 'John Doe' });
  })
}));

describe('User Routes', () => {
  describe('GET /users', () => {
    it('should return list of users', async () => {
      const response = await request(app)
        .get('/users')
        .expect(200);
      
      expect(response.body).toEqual([{ id: 1, name: 'John Doe' }]);
    });
  });

  describe('POST /users', () => {
    it('should create a new user', async () => {
      const newUser = {
        name: 'Jane Smith',
        email: 'jane@example.com'
      };

      const response = await request(app)
        .post('/users')
        .send(newUser)
        .expect(201);
      
      expect(response.body).toEqual({ id: 1, name: 'John Doe' });
    });
  });
});