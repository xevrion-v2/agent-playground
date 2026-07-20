import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { infiniteSequence } from "./index";

function take(iterator: Iterator<number>, count: number): number[] {
  const values: number[] = [];

  for (let index = 0; index < count; index += 1) {
    const next = iterator.next();
    assert.equal(next.done, false);
    values.push(next.value);
  }

  return values;
}

describe("infiniteSequence", () => {
  it("starts at zero and increments by one by default", () => {
    assert.deepEqual(take(infiniteSequence(), 5), [0, 1, 2, 3, 4]);
  });

  it("supports custom start and step values", () => {
    assert.deepEqual(take(infiniteSequence({ start: 10, step: 5 }), 4), [10, 15, 20, 25]);
  });

  it("supports descending sequences", () => {
    assert.deepEqual(take(infiniteSequence({ start: 3, step: -1 }), 4), [3, 2, 1, 0]);
  });
});
