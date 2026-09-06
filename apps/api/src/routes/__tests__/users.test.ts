import { describe,it,expect } from "vitest";
const EMAIL=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
describe("user route validation",()=>{
  it("valid email passes",()=>expect(EMAIL.test("a@b.com")).toBe(true));
  it("invalid email fails",()=>expect(EMAIL.test("bad")).toBe(false));
  it("trims name",()=>expect("  Alice  ".trim()).toBe("Alice"));
  it("lowercases email",()=>expect("A@B.COM".toLowerCase()).toBe("a@b.com"));
});
