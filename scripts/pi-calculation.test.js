const assert = require("node:assert/strict");

const {
  calculatePiByNilakantha,
  calculatePiWithDigits,
} = require("./pi-calculation.js");

{
  const result = calculatePiByNilakantha(0);
  assert.equal(result, 3);
}

{
  const result = calculatePiByNilakantha(1);
  assert.equal(result, 3 + 4 / (2 * 3 * 4));
}

{
  const lowPrecision = Number.parseFloat(calculatePiWithDigits({ termCount: 20, digits: 6 }));
  assert.ok(Math.abs(lowPrecision - Math.PI) < 1e-3);
}

{
  const betterPrecision = Number.parseFloat(calculatePiWithDigits({ termCount: 2000, digits: 9 }));
  assert.ok(Math.abs(betterPrecision - Math.PI) < 1e-6);
}

{
  const exactDigits = calculatePiWithDigits({ termCount: 500, digits: 8 });
  assert.equal(typeof exactDigits, "string");
  assert.equal(exactDigits.split(".")[0], "3");
  assert.equal(exactDigits.length, 10);
}

{
  const highPrecisionDigits = calculatePiWithDigits({ digits: 20 });
  assert.equal(highPrecisionDigits, "3.14159265358979323846");
}

{
  assert.throws(
    () => calculatePiByNilakantha(-1),
    { message: "termCount must be a non-negative integer" },
  );
  assert.throws(
    () => calculatePiWithDigits({ digits: -2 }),
    { message: "digits must be a non-negative integer" },
  );
}
