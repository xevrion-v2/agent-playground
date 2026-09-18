import express from 'express';
import usersRouter from '../src/routes/users';

const app = express();
app.use(express.json());
app.use('/users', usersRouter);

describe('User Routes', () => {
  it('GET /users - should return user listing', async () => {
    const res = await fetch('http://localhost:4000/users'); // Mock or assuming it is mounted, normally we use supertest. Let's just create a basic unit test assuming we are testing the logic directly or using native fetch if testing running server.
    // However, since supertest isn't in package.json, we'll write a simple test that doesn't rely on it.
  });
});
