import { afterEach, describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import type { AddressInfo } from 'node:net';
import { createApp } from '../index.ts';

describe('Body Size Limit', () => {
  const servers: Array<import('node:http').Server> = [];

  async function startServer(limit = '100kb') {
    const app = createApp(limit);
    const server = app.listen(0);
    servers.push(server);
    await once(server, 'listening');
    const address = server.address() as AddressInfo;
    return `http://127.0.0.1:${address.port}`;
  });

  afterEach(() => {
    while (servers.length > 0) {
      servers.pop()?.close();
    }
  });

  it('defaults to a 100kb body limit', async () => {
    const baseUrl = await startServer();
    const response = await fetch(`${baseUrl}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'demo-user',
        email: 'demo@example.com',
        blob: 'x'.repeat(90 * 1024),
      }),
    });

    assert.notEqual(response.status, 413);
  });

  it('rejects oversized payloads with 413', async () => {
    const baseUrl = await startServer('1kb');
    const response = await fetch(`${baseUrl}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'demo-user',
        email: 'demo@example.com',
        blob: 'x'.repeat(4 * 1024),
      }),
    });
    const body = await response.json();

    assert.equal(response.status, 413);
    assert.equal(body.error, 'Payload Too Large');
    assert.match(body.message, /1kb/);
  });

  it('honors a larger custom limit', async () => {
    const baseUrl = await startServer('10kb');
    const response = await fetch(`${baseUrl}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'demo-user',
        email: 'demo@example.com',
        blob: 'x'.repeat(4 * 1024),
      }),
    });

    assert.notEqual(response.status, 413);
  });
});
