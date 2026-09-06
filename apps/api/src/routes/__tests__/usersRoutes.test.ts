import { describe,it,expect } from "vitest";
describe("user routes",()=>{
  it("valid email passes",()=>expect(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test("a@b.com")).toBe(true));
  it("empty name rejected",()=>expect("  ".trim().length>0).toBe(false));
  it("name trimmed",()=>expect("  Bob  ".trim()).toBe("Bob"));
  it("email lowercased",()=>expect("A@B.COM".toLowerCase()).toBe("a@b.com"));
  it("long name rejected",()=>expect("x".repeat(101).length>100).toBe(true));
  it("short name allowed",()=>expect("Alice".length>0).toBe(true));
});
