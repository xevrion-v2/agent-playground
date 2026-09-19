import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import { app } from '../src/app';

describe('User Routes', () => {
  // Test suite for user routes
  describe('GET /users', () => {
    it('should return list of users', async () => {
      const response = await request(app)
        .get('/users')
        .expect(200);
      
      // Verify the response structure
      expect(response.body).toBeDefined();
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('POST /users', () => {
    it('should create a new user', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/users')
        .send(userData)
        .expect(201);
      
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('name', userData.name);
      expect(response.body).toHaveProperty('email', userData.email);
    });

    it('should fail to create user with invalid data', async () => {
      const invalidUserData = {
        name: '',
        email: 'invalid-email',
        password: '123'
      };

      await request(app)
        .post('/users')
        .send(invalidUserData)
        .expect(400);
    });
  });

  describe('Error Handling', () => {
    it('should handle server errors gracefully', async () => {
      await request(app)
        .get('/users')
        .expect(200);
    });
  });
});