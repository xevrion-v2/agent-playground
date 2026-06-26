import assert from "node:assert/strict";
import http from "node:http";

const serverPrototype = http.Server.prototype as typeof http.Server.prototype & {
  listen: (...args: unknown[]) => http.Server;
};
const originalListen = serverPrototype.listen;
let listenCalled = false;

serverPrototype.listen = function patchedListen(...args: unknown[]) {
  listenCalled = true;
  return originalListen.apply(this, args);
};

try {
  const { default: app } = await import("./app");

  assert.equal(typeof app, "function");
  assert.equal(listenCalled, false);
} finally {
  serverPrototype.listen = originalListen;
}
