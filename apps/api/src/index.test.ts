import assert from "node:assert/strict";
import test from "node:test";

import { createGracefulShutdown, startServer } from "./index";

test("startServer drains the HTTP server when SIGTERM is handled", async () => {
  const messages: string[] = [];
  let cleanExitCode: number | undefined;

  const { disposeSignalHandlers, ready, server } = startServer({
    port: 0,
    timeoutMs: 1_000,
    logger: {
      error: (...args) => messages.push(args.join(" ")),
      log: (...args) => messages.push(args.join(" "))
    },
    setExitCode: (code) => {
      cleanExitCode = code;
    }
  });

  await ready;

  const closed = new Promise<void>((resolve) => server.once("close", resolve));
  process.emit("SIGTERM", "SIGTERM");
  await closed;
  disposeSignalHandlers();

  assert.equal(cleanExitCode, 0);
  assert.ok(messages.includes("Received SIGTERM; draining TaskFlow API server"));
  assert.ok(messages.includes("TaskFlow API server closed cleanly"));
});

test("graceful shutdown is idempotent for repeated signals", async () => {
  let closeCalls = 0;
  let cleanExitCode: number | undefined;

  const server = {
    close(callback: (error?: Error) => void) {
      closeCalls += 1;
      callback();
      return this;
    }
  };

  const shutdown = createGracefulShutdown(server as never, {
    setExitCode: (code) => {
      cleanExitCode = code;
    },
    logger: {
      error: () => undefined,
      log: () => undefined
    },
    timeoutMs: 1_000
  });

  shutdown("SIGINT");
  shutdown("SIGTERM");

  assert.equal(closeCalls, 1);
  assert.equal(cleanExitCode, 0);
});

test("graceful shutdown exits with code 1 when server close fails", () => {
  const closeError = new Error("close failed");
  const messages: string[] = [];
  let exitCode: number | undefined;

  const server = {
    close(callback: (error?: Error) => void) {
      callback(closeError);
      return this;
    }
  };

  const shutdown = createGracefulShutdown(server as never, {
    exit: (code = 0) => {
      exitCode = code;
    },
    logger: {
      error: (...args) => messages.push(args.join(" ")),
      log: () => undefined
    },
    timeoutMs: 1_000
  });

  shutdown("SIGTERM");

  assert.equal(exitCode, 1);
  assert.ok(messages.some((message) => message.includes("Error while closing TaskFlow API server")));
});

test("graceful shutdown forces exit when server close hangs", async () => {
  let exitCode: number | undefined;

  const server = {
    close() {
      return this;
    }
  };

  const shutdown = createGracefulShutdown(server as never, {
    exit: (code = 0) => {
      exitCode = code;
    },
    logger: {
      error: () => undefined,
      log: () => undefined
    },
    timeoutMs: 1
  });

  shutdown("SIGTERM");
  await new Promise((resolve) => setTimeout(resolve, 10));

  assert.equal(exitCode, 1);
});
