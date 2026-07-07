import { parsePagination } from "./pagination";
import { describe, it } from "node:test";
import assert from "node:assert";

describe("parsePagination", () => {
  it("parses valid page and limit", () => {
    const result = parsePagination({ page: "2", limit: "10" });
    assert.equal(result.page, 2);
    assert.equal(result.limit, 10);
  });

  it("defaults page to 1", () => {
    const result = parsePagination({});
    assert.equal(result.page, 1);
  });

  it("defaults limit to 10", () => {
    const result = parsePagination({});
    assert.equal(result.limit, 10);
  });

  it("clamps page to minimum 1", () => {
    const result = parsePagination({ page: "-5" });
    assert.equal(result.page, 1);
  });

  it("clamps limit to maximum 100", () => {
    const result = parsePagination({ limit: "999" });
    assert.equal(result.limit, 100);
  });

  it("handles invalid page", () => {
    const result = parsePagination({ page: "abc" });
    assert.equal(result.page, 1);
  });
});
