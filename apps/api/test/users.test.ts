import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import usersRouter from '../src/routes/users.js';

describe('User routes', () => {
  describe('GET /users', () => {
    it('should return an empty data array', async () => {
      const app = express();
      app.use(express.json());
      app.use('/users', usersRouter);
      const server = app.listen(0);
      const port = (server.address() as any).port;
      const res = await fetch(\http://localhost:\/users\);
      const json = await res.json();
      server.close();
      assert.equal(res.status, 200);
      assert.deepEqual(json.data, []);
    });
  });

  describe('POST /users', () => {
    it('should return 201 with the provided body data', async () => {
      const app = express();
      app.use(express.json());
      app.use('/users', usersRouter);
      const server = app.listen(0);
      const port = (server.address() as any).port;
      const body = { email: 'test@example.com', name: 'Test User' };
      const res = await fetch(\http://localhost:\/users\, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const json = await res.json();
      server.close();
      assert.equal(res.status, 201);
      assert.equal(json.data.email, 'test@example.com');
      assert.equal(json.data.name, 'Test User');
    });
  });
});
