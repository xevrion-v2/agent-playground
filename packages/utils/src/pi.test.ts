import { calculatePI } from "./pi"

describe("PI Calculation", () => {
  it("should return PI with 10 decimal places", () => {
    const result = calculatePI(10)
    expect(result).toBe("3.1415926535")
  })

  it("should return PI with 50 decimal places", () => {
    const result = calculatePI(50)
    expect(result.length).toBe(52) // "3." + 50 digits
    expect(result).toBe(
      "3.14159265358979323846264338327950288419716939937510",
    )
  })

  it("should return PI with 100 decimal places", () => {
    const result = calculatePI(100)
    expect(result.length).toBe(102)
    expect(result).toBe(
      "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679",
    )
  })

  it("should handle edge case of 0 digits", () => {
    expect(calculatePI(0)).toBe("3")
  })
})
