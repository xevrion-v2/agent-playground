import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import type { Server } from "node:http";

import { registerGracefulShutdown } from "./shutdown";

type CloseCallback = (error?: Error) => void;

class SignalTarget extends EventEmitter {
  once(signal: "SIGTERM" | "SIGINT", listener: () => void): this {
    return super.once(signal, listener);
  }

  removeListener(signal: "SIGTERM" | "SIGINT", listener: () => void): this {
    return super.removeListener(signal, listener);
  }
}

function createLogger() {
  const errors: unknown[][] = [];
  const logs: unknown[][] = [];

  return {
    errors,
    logger: {
      error: (...args: unknown[]) => {
        errors.push(args);
      },
      log: (...args: unknown[]) => {
        logs.push(args);
      }
    },
    logs
  };
}

function createServer(close: (callback: CloseCallback) => void): Server {
  return { close } as Server;
}

function testGracefulSignalDrain() {
  const signalTarget = new SignalTarget();
  const exits: number[] = [];
  let closeCalls = 0;
  let closeCallback: CloseCallback | undefined;
  let clearedTimeout = false;
  const timeoutHandle = { unref() {} } as ReturnType<typeof setTimeout>;
  const { logger, logs } = createLogger();

  registerGracefulShutdown(
    createServer((callback) => {
      closeCalls += 1;
      closeCallback = callback;
    }),
    {
      clearShutdownTimeout: (handle) => {
        assert.equal(handle, timeoutHandle);
        clearedTimeout = true;
      },
      exit: (code) => {
        exits.push(code);
      },
      logger,
      setShutdownTimeout: () => timeoutHandle,
      signalTarget
    }
  );

  signalTarget.emit("SIGTERM");
  signalTarget.emit("SIGINT");

  assert.equal(closeCalls, 1);
  assert.equal(exits.length, 0);

  closeCallback?.();

  assert.deepEqual(exits, [0]);
  assert.equal(clearedTimeout, true);
  assert.match(String(logs.at(-1)?.[0]), /closed cleanly/);
}

function testForcedShutdownTimeout() {
  const signalTarget = new SignalTarget();
  const exits: number[] = [];
  let timeoutCallback: (() => void) | undefined;
  const { errors, logger } = createLogger();

  registerGracefulShutdown(
    createServer(() => {}),
    {
      exit: (code) => {
        exits.push(code);
      },
      logger,
      setShutdownTimeout: (callback) => {
        timeoutCallback = callback;
        return { unref() {} } as ReturnType<typeof setTimeout>;
      },
      signalTarget,
      timeoutMs: 25
    }
  );

  signalTarget.emit("SIGTERM");
  timeoutCallback?.();

  assert.deepEqual(exits, [1]);
  assert.match(String(errors.at(-1)?.[0]), /Forced shutdown/);
}

function testShutdownErrorPath() {
  const signalTarget = new SignalTarget();
  const exits: number[] = [];
  const { errors, logger } = createLogger();

  registerGracefulShutdown(
    createServer((callback) => {
      callback(new Error("close failed"));
    }),
    {
      exit: (code) => {
        exits.push(code);
      },
      logger,
      setShutdownTimeout: () => ({ unref() {} }) as ReturnType<typeof setTimeout>,
      signalTarget
    }
  );

  signalTarget.emit("SIGINT");

  assert.deepEqual(exits, [1]);
  assert.match(String(errors.at(-1)?.[0]), /shutdown failed/);
}

testGracefulSignalDrain();
testForcedShutdownTimeout();
testShutdownErrorPath();
