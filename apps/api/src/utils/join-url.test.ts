import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { joinUrl } from "./join-url.js";

describe("joinUrl", () => {
  it("joins URL segments while normalizing duplicate boundary slashes", () => {
    assert.equal(
      joinUrl("https://api.example.com/", "/v1/", "/users"),
      "https://api.example.com/v1/users",
    );
  });

  it("preserves a leading slash for absolute paths", () => {
    assert.equal(joinUrl("/api/", "/v1/", "users"), "/api/v1/users");
  });

  it("skips empty segments without adding extra separators", () => {
    assert.equal(joinUrl("https://api.example.com", "", "v1", "", "users"), "https://api.example.com/v1/users");
  });

  it("returns an empty string when every segment is empty", () => {
    assert.equal(joinUrl("", "", ""), "");
  });
});
