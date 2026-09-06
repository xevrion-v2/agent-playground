import assert from "node:assert/strict";
import { test } from "node:test";

import { installGracefulShutdown } from "./index";

test("graceful shutdown closes the server and exits cleanly", async () => {
  const events: string[] = [];
  let closeCalled = false;
  let exitCode: number | undefined;

  const shutdown = installGracefulShutdown(
    {
      close(callback: (error?: Error) => void) {
        closeCalled = true;
        queueMicrotask(callback);
        return this as never;
      },
    },
    {
      signals: [],
      timeoutMs: 100,
      exit(code) {
        exitCode = code;
        return undefined as never;
      },
      logger: {
        log(message: string) {
          events.push(message);
        },
        error(message: string) {
          events.push(message);
        },
      },
    },
  );

  shutdown("SIGTERM");
  await new Promise((resolve) => setImmediate(resolve));

  assert.equal(closeCalled, true);
  assert.equal(exitCode, 0);
  assert.deepEqual(events, [
    "Received SIGTERM; closing TaskFlow API gracefully",
    "TaskFlow API closed cleanly",
  ]);
});

test("graceful shutdown ignores duplicate signals while closing", async () => {
  let closeCalls = 0;

  const shutdown = installGracefulShutdown(
    {
      close() {
        closeCalls += 1;
        return this as never;
      },
    },
    {
      signals: [],
      exit(code) {
        return undefined as never;
      },
      logger: {
        log() {},
        error() {},
      },
    },
  );

  shutdown("SIGTERM");
  shutdown("SIGINT");

  assert.equal(closeCalls, 1);
});

test("graceful shutdown exits with failure when the server cannot close", async () => {
  const events: string[] = [];
  let exitCode: number | undefined;

  const shutdown = installGracefulShutdown(
    {
      close(callback: (error?: Error) => void) {
        queueMicrotask(() => callback(new Error("close failed")));
        return this as never;
      },
    },
    {
      signals: [],
      timeoutMs: 100,
      exit(code) {
        exitCode = code;
        return undefined as never;
      },
      logger: {
        log(message: string) {
          events.push(message);
        },
        error(message: string) {
          events.push(message);
        },
      },
    },
  );

  shutdown("SIGTERM");
  await new Promise((resolve) => setImmediate(resolve));

  assert.equal(exitCode, 1);
  assert.deepEqual(events, [
    "Received SIGTERM; closing TaskFlow API gracefully",
    "TaskFlow API shutdown failed",
  ]);
});
