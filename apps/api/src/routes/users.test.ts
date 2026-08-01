import { isValidEmail, normalizeName, normalizeEmail } from "./users";

describe("isValidEmail", () => {
  it("accepts valid emails", () => {
    expect(isValidEmail("a@b.com")).toBe(true);
    expect(isValidEmail("user@example.co.uk")).toBe(true);
    expect(isValidEmail("test+label@domain.io")).toBe(true);
  });

  it("rejects invalid emails", () => {
    expect(isValidEmail("")).toBe(false);
    expect(isValidEmail("notanemail")).toBe(false);
    expect(isValidEmail("@b.com")).toBe(false);
    expect(isValidEmail(123)).toBe(false);
    expect(isValidEmail(null)).toBe(false);
    expect(isValidEmail(undefined)).toBe(false);
  });
});

describe("normalizeName", () => {
  it("trims and title-cases", () => {
    expect(normalizeName("  john  doe  ")).toBe("John Doe");
    expect(normalizeName("ALICE")).toBe("Alice");
  });

  it("rejects non-strings", () => {
    expect(normalizeName(123)).toBeNull();
    expect(normalizeName("")).toBeNull();
    expect(normalizeName("   ")).toBeNull();
  });
});

describe("normalizeEmail", () => {
  it("lowercases and trims", () => {
    expect(normalizeEmail("  USER@Example.COM  ")).toBe("user@example.com");
  });
});
