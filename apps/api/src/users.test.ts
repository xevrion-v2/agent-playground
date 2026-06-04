import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import express from 'express';
import usersRouter from './routes/users.ts';

const { strictEqual, deepStrictEqual } = assert;

function createApp() {
  const app = express();
  app.use(express.json());
  app.use('/users', usersRouter);
  return app;
}

function getServerAddress(app: any): Promise<{ server: any; port: number }> {
  return new Promise((resolve) => {
    const server = app.listen(0, () => {
      const addr = server.address() as { port: number };
      resolve({ server, port: addr.port });
    });
  });
}

describe('users routes', () => {
  it('GET /users returns list stub', async () => {
    const app = createApp();
    const { server, port } = await getServerAddress(app);
    try {
      const res = await fetch(`http://localhost:${port}/users`);
      const body = await res.json() as any;
      strictEqual(res.status, 200);
      deepStrictEqual(body.data, []);
      strictEqual(true, /not implemented/i.test(body.message));
    } finally {
      server.close();
    }
  });

  it('POST /users returns create stub with 201', async () => {
    const app = createApp();
    const { server, port } = await getServerAddress(app);
    try {
      const payload = { name: 'Alice', email: 'alice@example.com' };
      const res = await fetch(`http://localhost:${port}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const body = await res.json() as any;
      strictEqual(res.status, 201);
      strictEqual(body.data.id, 'stub-user-id');
      strictEqual(body.data.name, 'Alice');
      strictEqual(body.data.email, 'alice@example.com');
      strictEqual(true, /not implemented/i.test(body.message));
    } finally {
      server.close();
    }
  });
});
