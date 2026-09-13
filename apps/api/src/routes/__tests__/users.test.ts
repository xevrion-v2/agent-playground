import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

const usersSource = fs.readFileSync(
  path.resolve(__dirname, "../users.ts"),
  "utf-8"
);

describe("users.ts JSDoc documentation", () => {
  it("should have a JSDoc comment on the GET / handler", () => {
    // JSDoc comments start with /** and end with */
    // The GET handler should be preceded by a JSDoc block
    const jsdocPattern = /\/\*\*[\s\S]*?\*\/\s*\n\s*router\.get\s*\(\s*["']\/["']/;
    expect(jsdocPattern.test(usersSource)).toBe(true);
  });

  it("should have a JSDoc comment on the POST / handler", () => {
    // The POST handler should be preceded by a JSDoc block
    const jsdocPattern = /\/\*\*[\s\S]*?\*\/\s*\n\s*router\.post\s*\(\s*["']\/["']/;
    expect(jsdocPattern.test(usersSource)).toBe(true);
  });

  it("should document the response schema in the GET handler JSDoc", () => {
    // The GET handler JSDoc should mention the response structure
    const getJsdoc = usersSource.match(
      /\/\*\*[\s\S]*?\*\/\s*\n\s*router\.get\s*\(\s*["']\/["']/
    );
    const jsdocText = getJsdoc ? getJsdoc[0] : "";
    expect(jsdocText).toContain("@route");
    expect(jsdocText.toLowerCase()).toMatch(/user|listing|list/);
  });

  it("should document the response schema in the POST handler JSDoc", () => {
    // The POST handler JSDoc should mention the response structure
    const postJsdoc = usersSource.match(
      /\/\*\*[\s\S]*?\*\/\s*\n\s*router\.post\s*\(\s*["']\/["']/
    );
    const jsdocText = postJsdoc ? postJsdoc[0] : "";
    expect(jsdocText).toContain("@route");
    expect(jsdocText.toLowerCase()).toMatch(/user|creat/);
  });
});
