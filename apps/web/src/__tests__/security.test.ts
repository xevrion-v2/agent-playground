import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

describe("next.config.mjs security headers", () => {
  it("should have poweredByHeader set to false", () => {
    const configPath = resolve(__dirname, "../../../next.config.mjs");
    const configContent = readFileSync(configPath, "utf-8");
    expect(configContent).toContain("poweredByHeader");
    expect(configContent).toContain("false");
  });

  it("should not expose X-Powered-By header configuration", () => {
    const configPath = resolve(__dirname, "../../../next.config.mjs");
    const configContent = readFileSync(configPath, "utf-8");
    expect(configContent).not.toContain("poweredByHeader: true");
  });
});
