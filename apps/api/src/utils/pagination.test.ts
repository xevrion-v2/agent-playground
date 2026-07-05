import test from "node:test";
import assert from "node:assert";
import { normalizePagination } from "./pagination";

test("pagination helper tests", async (t) => {
  await t.test("returns defaults when no input is provided", () => {
    const result = normalizePagination();
    assert.deepStrictEqual(result, {
      page: 1,
      pageSize: 20,
      limit: 20,
      offset: 0,
    });
  });

  await t.test("returns defaults when empty input object is provided", () => {
    const result = normalizePagination({});
    assert.deepStrictEqual(result, {
      page: 1,
      pageSize: 20,
      limit: 20,
      offset: 0,
    });
  });

  await t.test("parses numeric values correctly", () => {
    const result = normalizePagination({ page: 2, pageSize: 15 });
    assert.deepStrictEqual(result, {
      page: 2,
      pageSize: 15,
      limit: 15,
      offset: 15,
    });
  });

  await t.test("parses string values correctly", () => {
    const result = normalizePagination({ page: "3", pageSize: "10" });
    assert.deepStrictEqual(result, {
      page: 3,
      pageSize: 10,
      limit: 10,
      offset: 20,
    });
  });

  await t.test("uses defaults for invalid non-integer inputs", () => {
    const result = normalizePagination({ page: "abc", pageSize: 2.5 });
    assert.deepStrictEqual(result, {
      page: 1,
      pageSize: 20,
      limit: 20,
      offset: 0,
    });
  });

  await t.test("enforces minimum page of 1", () => {
    const result = normalizePagination({ page: -5, pageSize: 10 });
    assert.deepStrictEqual(result, {
      page: 1,
      pageSize: 10,
      limit: 10,
      offset: 0,
    });
  });

  await t.test("enforces minimum page size of 1", () => {
    const result = normalizePagination({ page: 1, pageSize: 0 });
    assert.deepStrictEqual(result, {
      page: 1,
      pageSize: 20,
      limit: 20,
      offset: 0,
    });
  });

  await t.test("clamps page size to maximum of 100", () => {
    const result = normalizePagination({ page: 1, pageSize: 500 });
    assert.deepStrictEqual(result, {
      page: 1,
      pageSize: 100,
      limit: 100,
      offset: 0,
    });
  });
});
