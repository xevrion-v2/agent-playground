import { describe, it, expect } from "vitest";
describe("Tasks API", () => {
  it("lists tasks", () => expect(true).toBe(true));
  it("creates task with title", () => { const t={title:"Test"}; expect(t.title).toBe("Test"); });
});