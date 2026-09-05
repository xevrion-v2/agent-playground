import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  calculatePi,
  chunkPi,
  createPiCertificate
} from "../src/index.js";

const PI_100 =
  "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679";

describe("calculatePi", () => {
  it("returns the exact known 100 digit finite prefix", () => {
    assert.equal(calculatePi(100), PI_100);
  });

  it("supports zero decimal places", () => {
    assert.equal(calculatePi(0), "3");
  });

  it("rejects invalid digit counts", () => {
    assert.throws(() => calculatePi(-1), /non-negative integer/);
    assert.throws(() => calculatePi(1.5), /non-negative integer/);
  });
});

describe("chunkPi", () => {
  it("splits the finite prefix into stable chunks", () => {
    assert.deepEqual(chunkPi(10, 4), ["3.14", "1592", "6535"]);
  });
});

describe("createPiCertificate", () => {
  it("returns auditable metadata for a generated finite prefix", () => {
    const certificate = createPiCertificate(20);

    assert.equal(certificate.digits, 20);
    assert.equal(certificate.value, "3.14159265358979323846");
    assert.equal(certificate.algorithm, "Machin formula with BigInt fixed-point arithmetic");
    assert.match(certificate.sha256, /^[a-f0-9]{64}$/);
  });
});
