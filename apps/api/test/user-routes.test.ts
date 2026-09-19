import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { app } from '../src/app';
import { prisma } from '../src/lib/db';
import request from 'supertest';

describe('User Routes', () => {
  beforeEach(async () => {
    // Clean up database before each test
    await prisma.user.deleteMany({});
  });

  afterEach(async () => {
    // Clean up after tests
    await prisma.$disconnect();
  });

  describe('GET /api/users', () => {
    it('should return empty list when no users exist', async () => {
      const response = await request(app).get('/api/users');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
  });

  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com'
      };
      
      const response = await request(app)
        .post('/api/users')
        .send(userData);
      
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(userData.name);
      expect(response.body.email).toBe(userData.email);
    });
  });
});