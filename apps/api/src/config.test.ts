import { expect, test } from "vitest";
import { getPort } from "../src/config";

test("getPort returns 4000 when PORT is unset", () => {
  const env = {};
  expect(getPort(env)).toBe(4000);
});

test("getPort returns numeric PORT when valid", () => {
  const env = { PORT: "3000" };
  expect(getPort(env)).toBe(3000);
});

test("getPort returns 0 as valid port", () => {
  const env = { PORT: "0" };
  expect(getPort(env)).toBe(0);
});

test("getPort returns 65535 as valid port", () => {
  const env = { PORT: "65535" };
  expect(getPort(env)).toBe(65535);
});

test("getPort throws on non-numeric PORT", () => {
  const env = { PORT: "invalid" };
  expect(() => getPort(env)).toThrow("Invalid PORT: must be a number");
});

test("getPort throws on negative PORT", () => {
  const env = { PORT: "-1" };
  expect(() => getPort(env)).toThrow("Invalid PORT: out of range (0-65535)");
});

test("getPort throws on too large PORT", () => {
  const env = { PORT: "65536" };
  expect(() => getPort(env)).toThrow("Invalid PORT: out of range (0-65535)");
});

test("getPort throws on decimal PORT", () => {
  const env = { PORT: "3000.5" };
  expect(() => getPort(env)).toThrow("Invalid PORT: must be a number");
});
