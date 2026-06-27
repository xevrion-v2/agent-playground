import assert from "node:assert/strict";
import type { Server } from "node:http";

import { createShutdownHandler } from "../src/shutdown";

const logs: string[] = [];
const exits: number[] = [];
let closeCalls = 0;

const server = {
  close(callback?: (error?: Error) => void) {
    closeCalls += 1;
    callback?.();
    return server as Server;
  }
} as Server;

const shutdown = createShutdownHandler({
  exit(code) {
    exits.push(code);
  },
  logger: {
    error(...args: unknown[]) {
      logs.push(args.join(" "));
    },
    log(...args: unknown[]) {
      logs.push(args.join(" "));
    }
  },
  server,
  timeoutMs: 2000
});

shutdown("SIGTERM");
shutdown("SIGINT");

assert.equal(closeCalls, 1, "Expected only the first shutdown signal to close the server.");
assert.deepEqual(exits, [0], "Expected graceful shutdown to exit successfully.");
assert.deepEqual(logs, [
  "Received SIGTERM; closing TaskFlow API server.",
  "TaskFlow API server closed."
]);
