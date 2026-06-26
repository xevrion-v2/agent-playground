import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import usersRouter from './users.js';

describe('POST /users validation', () => {
  let app: express.Express;
  let server: ReturnType<express.Express['listen']>;
  let port: number;

  before(async () => {
    app = express();
    app.use(express.json());
    app.use('/users', usersRouter);
    
    await new Promise<void>((resolve) => {
      server = app.listen(0, () => {
        port = (server.address() as any).port;
        resolve();
      });
    });
  });

  after(() => {
    server.close();
  });

  const post = async (body: any) => {
    return fetch(`http://localhost:${port}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
  };

  test('rejects non-object bodies', async () => {
    const res = await post("string body");
    assert.equal(res.status, 400);
    
    const res2 = await post([ { email: "a@b.com" } ]);
    assert.equal(res2.status, 400);
  });

  test('requires a valid email', async () => {
    const res = await post({});
    assert.equal(res.status, 400);

    const res2 = await post({ email: "invalid-email" });
    assert.equal(res2.status, 400);
  });

  test('normalizes email and name', async () => {
    const res = await post({ email: "  TEST@Example.com  ", name: "   John Doe   " });
    assert.equal(res.status, 201);
    
    const data = (await res.json()) as any;
    assert.equal(data.data.email, "test@example.com");
    assert.equal(data.data.name, "John Doe");
  });

  test('ignores client-controlled id and extra fields', async () => {
    const res = await post({ email: "test@example.com", id: "client-id", admin: true, role: "superuser" });
    assert.equal(res.status, 201);
    
    const data = (await res.json()) as any;
    assert.equal(data.data.email, "test@example.com");
    assert.notEqual(data.data.id, "client-id");
    assert.equal(typeof data.data.id, "string");
    assert.equal(data.data.admin, undefined);
    assert.equal(data.data.role, undefined);
  });
});
