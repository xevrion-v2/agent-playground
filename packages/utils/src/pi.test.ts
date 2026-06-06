import { calculatePI } from "./pi";

describe("PI Calculation", () => {
  it("should return PI with 10 decimal places", () => {
    const result = calculatePI(10);
    expect(result).toBe("3.1415926535");
  });

  it("should return PI with 50 decimal places", () => {
    const result = calculatePI(50);
    expect(result.length).toBe(52); // "3." + 50 digits
    expect(result).toContain("3.1415926535");
  });
});
