import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { calculatePiPrefix, formatPiChunks } from "./index.js"

const PI_100 =
  "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679"

describe("calculatePiPrefix", () => {
  it("returns the integer prefix with zero decimal digits", () => {
    assert.equal(calculatePiPrefix(0), "3")
  })

  it("returns known prefixes for small requested precisions", () => {
    assert.equal(calculatePiPrefix(1), "3.1")
    assert.equal(calculatePiPrefix(5), "3.14159")
    assert.equal(calculatePiPrefix(10), "3.1415926535")
  })

  it("matches the known 100 digit decimal prefix", () => {
    assert.equal(calculatePiPrefix(100), PI_100)
  })

  it("can compute a longer deterministic prefix", () => {
    const pi = calculatePiPrefix(1000)

    assert.equal(pi.length, 1002)
    assert.equal(pi.slice(0, PI_100.length), PI_100)
  })

  it("rejects invalid digit counts", () => {
    assert.throws(() => calculatePiPrefix(-1), /non-negative/)
    assert.throws(() => calculatePiPrefix(1.5), /integer/)
    assert.throws(() => calculatePiPrefix(Number.NaN), /integer/)
    assert.throws(() => calculatePiPrefix(100_001), /<= 100000/)
  })
})

describe("formatPiChunks", () => {
  it("formats output into stable groups and lines", () => {
    assert.equal(
      formatPiChunks("3.14159265358979323846", {
        groupSize: 5,
        lineWidth: 14,
      }),
      "3.14159 26535\n89793 23846",
    )
  })

  it("validates formatter options", () => {
    assert.throws(() => formatPiChunks("3.14", { lineWidth: 4 }), /lineWidth/)
    assert.throws(() => formatPiChunks("3.14", { groupSize: 0 }), /groupSize/)
  })
})
