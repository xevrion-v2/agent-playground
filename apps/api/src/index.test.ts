import assert from "node:assert/strict";
import test from "node:test";

import { createGracefulShutdown, startServer } from "./index";

test("startServer drains the HTTP server when SIGTERM is handled", async () => {
  const messages: string[] = [];
  let exitCode: number | undefined;

  const { disposeSignalHandlers, server } = startServer({
    port: 0,
    timeoutMs: 1_000,
    logger: {
      error: (...args) => messages.push(args.join(" ")),
      log: (...args) => messages.push(args.join(" "))
    },
    exit: (code = 0) => {
      exitCode = code;
    }
  });

  await new Promise<void>((resolve) => server.once("listening", resolve));

  const closed = new Promise<void>((resolve) => server.once("close", resolve));
  process.emit("SIGTERM", "SIGTERM");
  await closed;
  disposeSignalHandlers();

  assert.equal(exitCode, 0);
  assert.ok(messages.includes("Received SIGTERM; draining TaskFlow API server"));
  assert.ok(messages.includes("TaskFlow API server closed cleanly"));
});

test("graceful shutdown is idempotent for repeated signals", async () => {
  let closeCalls = 0;
  let exitCode: number | undefined;

  const server = {
    close(callback: (error?: Error) => void) {
      closeCalls += 1;
      callback();
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
    timeoutMs: 1_000
  });

  shutdown("SIGINT");
  shutdown("SIGTERM");

  assert.equal(closeCalls, 1);
  assert.equal(exitCode, 0);
});
