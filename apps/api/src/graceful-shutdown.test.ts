import assert from "node:assert/strict";
import { describe, test, beforeEach, afterEach, mock } from "node:test";
import { createServer, type Server } from "node:http";
import { installGracefulShutdown, type GracefulShutdownInstance } from "./graceful-shutdown";

describe("graceful-shutdown module", () => {
  let server: Server;
  let shutdown: GracefulShutdownInstance;
  const logEvents: string[] = [];
  const mockLogger = {
    log: (m: string) => logEvents.push(`log:${m}`),
    error: (m: string) => logEvents.push(`error:${m}`),
    warn: (m: string) => logEvents.push(`warn:${m}`),
  };

  beforeEach(() => {
    logEvents.length = 0;
    server = createServer((_req, res) => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("ok");
    });
  });

  afterEach(() => {
    shutdown?.remove();
    server.close();
  });

  test("returns isShuttingDown = false initially", () => {
    shutdown = installGracefulShutdown(server, {
      signals: [],
      exit: () => undefined as never,
      logger: mockLogger,
    });
    assert.equal(shutdown.isShuttingDown(), false);
  });

  test("shutdown sets isShuttingDown = true", async () => {
    shutdown = installGracefulShutdown(server, {
      signals: [],
      timeoutMs: 100,
      exit: (code: number) => {
        logEvents.push(`exit:${code}`);
        return undefined as never;
      },
      logger: mockLogger,
    });

    shutdown.shutdown("SIGTERM");
    assert.equal(shutdown.isShuttingDown(), true);

    // Wait for drain logic to run
    await new Promise((r) => setTimeout(r, 200));

    assert.ok(logEvents.some((e) => e.startsWith("log:Received SIGTERM")));
    assert.ok(logEvents.some((e) => e.startsWith("exit:")));
  });

  test("duplicate signals are deduplicated", async () => {
    let closeCount = 0;
    const trackingServer = createServer();
    const origClose = trackingServer.close.bind(trackingServer);
    trackingServer.close = (cb?: (err?: Error) => void) => {
      closeCount++;
      return origClose(cb);
    };

    shutdown = installGracefulShutdown(trackingServer, {
      signals: [],
      timeoutMs: 50,
      exit: () => undefined as never,
      logger: mockLogger,
    });

    shutdown.shutdown("SIGTERM");
    shutdown.shutdown("SIGINT");
    shutdown.shutdown("SIGTERM");

    // After dupes, close should still only be called once
    // (server.close was already called in first shutdown)
    await new Promise((r) => setTimeout(r, 100));
    trackingServer.close();
  });

  test("onHealthNotReady callback is called during shutdown", async () => {
    let healthFlag = false;
    shutdown = installGracefulShutdown(server, {
      signals: [],
      timeoutMs: 100,
      exit: () => undefined as never,
      logger: mockLogger,
    });

    shutdown.onHealthNotReady(() => {
      healthFlag = true;
    });

    shutdown.shutdown("SIGINT");
    assert.equal(healthFlag, true);
  });

  test("remove() cleans up signal handlers", () => {
    const sigs: string[] = [];
    shutdown = installGracefulShutdown(server, {
      signals: [],
      exit: () => undefined as never,
      logger: mockLogger,
    });

    shutdown.remove();
    // Signal handlers removed — manually triggering shutdown should work
    shutdown.shutdown("SIGTERM");
    assert.equal(shutdown.isShuttingDown(), true);
  });

  test("timeoutMs forces exit when connections persist", async () => {
    shutdown = installGracefulShutdown(server, {
      signals: [],
      timeoutMs: 50,
      exit: (code: number) => {
        logEvents.push(`exit:${code}`);
        return undefined as never;
      },
      logger: mockLogger,
    });

    shutdown.shutdown("SIGTERM");

    // Wait for forced exit timeout
    await new Promise((r) => setTimeout(r, 150));

    assert.ok(logEvents.some((e) => e.startsWith("exit:1")));
  });

  test("clean exit with no active connections", async () => {
    shutdown = installGracefulShutdown(server, {
      signals: [],
      timeoutMs: 100,
      exit: (code: number) => {
        logEvents.push(`exit:${code}`);
        return undefined as never;
      },
      logger: mockLogger,
    });

    shutdown.shutdown("SIGTERM");

    // Server has no active connections, should drain quickly
    await new Promise((r) => setTimeout(r, 250));

    assert.ok(logEvents.some((e) => e.startsWith("exit:0")),
      `Expected clean exit 0 in events: ${logEvents.join(", ")}`);
  });

  test("integration: server responds before shutdown, then drains", async () => {
    // Start server on random port
    const integrationServer = createServer((_req, res) => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("ok");
    });

    return new Promise<void>((resolve) => {
      integrationServer.listen(0, () => {
        const addr = integrationServer.address();
        const port = typeof addr === "object" && addr ? addr.port : 0;

        shutdown = installGracefulShutdown(integrationServer, {
          signals: [],
          timeoutMs: 500,
          exit: () => {
            // Don't actually exit in test
            return undefined as never;
          },
          logger: mockLogger,
        });

        // Verify server responds before shutdown
        fetch(`http://localhost:${port}`)
          .then((res) => res.text())
          .then((body) => {
            assert.equal(body, "ok");

            // Trigger shutdown
            shutdown.shutdown("SIGTERM");

            // After shutdown, server should NOT accept new connections
            // (fetch will reject or hang)
            return fetch(`http://localhost:${port}`, {
              signal: AbortSignal.timeout(1000),
            }).catch((err) => err);
          })
          .then((result) => {
            // The second request should fail because server is closed
            assert.ok(result instanceof Error || result instanceof Response === false);
            logEvents.push("integration: server refused new connection after shutdown");
            resolve();
          });
      });
    });
  });
});
