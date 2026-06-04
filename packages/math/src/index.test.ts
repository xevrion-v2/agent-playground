import test from "node:test";
import assert from "node:assert";
import { calculatePi } from "./index";

test("PI Calculation exact prefix", async (t) => {
  await t.test("should return 3 for 1 digit", () => {
    assert.strictEqual(calculatePi(1), "3");
  });

  await t.test("should return correct 10 digits of pi", () => {
    assert.strictEqual(calculatePi(10), "3.141592653");
  });

  await t.test("should return correct 100 digits of pi", () => {
    const expected = "3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067";
    assert.strictEqual(calculatePi(100), expected);
  });

  await t.test("should throw error for invalid digits input", () => {
    assert.throws(() => calculatePi(0), /Precision must be a positive integer/);
    assert.throws(() => calculatePi(-5), /Precision must be a positive integer/);
  });
});
