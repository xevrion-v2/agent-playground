import { describe, it } from "node:test";
import assert from "node:assert";
import {
  InfiniteSequence,
  naturalNumbers,
  evenNumbers,
  oddNumbers,
} from "./index.js";

describe("InfiniteSequence", () => {
  describe("constructor & iterator", () => {
    it("defaults to start=0, step=1", () => {
      const seq = new InfiniteSequence();
      assert.deepStrictEqual(seq.take(5), [0, 1, 2, 3, 4]);
    });

    it("accepts custom start and step", () => {
      const seq = new InfiniteSequence(10, 5);
      assert.deepStrictEqual(seq.take(4), [10, 15, 20, 25]);
    });

    it("supports negative steps", () => {
      const seq = new InfiniteSequence(10, -3);
      assert.deepStrictEqual(seq.take(4), [10, 7, 4, 1]);
    });

    it("is iterable via for...of with break", () => {
      const result: number[] = [];
      const seq = new InfiniteSequence(0, 1);
      for (const val of seq) {
        if (result.length >= 3) break;
        result.push(val);
      }
      assert.deepStrictEqual(result, [0, 1, 2]);
    });
  });

  describe("take(n)", () => {
    it("returns empty array for n=0", () => {
      assert.deepStrictEqual(new InfiniteSequence().take(0), []);
    });

    it("throws RangeError for negative n", () => {
      assert.throws(() => new InfiniteSequence().take(-1), RangeError);
    });

    it("returns correct count for n > 0", () => {
      const seq = new InfiniteSequence(2, 3);
      assert.strictEqual(seq.take(3).length, 3);
      assert.deepStrictEqual(seq.take(3), [2, 5, 8]);
    });
  });

  describe("find(predicate, maxIterations)", () => {
    it("finds the first matching element", () => {
      const seq = new InfiniteSequence(0, 1);
      assert.strictEqual(seq.find((x) => x === 42), 42);
    });

    it("throws when predicate never matches within limit", () => {
      const seq = new InfiniteSequence(0, 1);
      assert.throws(
        () => seq.find((x) => x > 100, 50),
        /iteration limit/
      );
    });

    it("throws RangeError for negative maxIterations", () => {
      assert.throws(
        () => new InfiniteSequence().find((x) => x > 0, -1),
        RangeError
      );
    });

    it("works with custom step", () => {
      const seq = new InfiniteSequence(0, 5);
      assert.strictEqual(seq.find((x) => x === 20), 20);
    });
  });

  describe("iterate(max)", () => {
    it("returns same result as take(max)", () => {
      const seq = new InfiniteSequence(1, 1);
      assert.deepStrictEqual(seq.iterate(5), seq.take(5));
    });

    it("throws RangeError for non-positive max", () => {
      assert.throws(() => new InfiniteSequence().iterate(0), RangeError);
      assert.throws(() => new InfiniteSequence().iterate(-5), RangeError);
    });
  });

  describe("skip(n)", () => {
    it("skips first n elements", () => {
      const seq = new InfiniteSequence(0, 1);
      assert.deepStrictEqual(seq.skip(3).take(3), [3, 4, 5]);
    });

    it("skips 0 elements when n=0", () => {
      const seq = new InfiniteSequence(10, 2);
      assert.deepStrictEqual(seq.skip(0).take(2), [10, 12]);
    });

    it("throws RangeError for negative n", () => {
      assert.throws(() => new InfiniteSequence().skip(-1), RangeError);
    });
  });

  describe("filter(predicate, limit)", () => {
    it("filters even numbers", () => {
      const seq = new InfiniteSequence(0, 1);
      assert.deepStrictEqual(seq.filter((x) => x % 2 === 0, 5), [
        0, 2, 4, 6, 8,
      ]);
    });

    it("returns empty array for limit=0", () => {
      assert.deepStrictEqual(
        new InfiniteSequence().filter((x) => x > 0, 0),
        []
      );
    });
  });
});

describe("Factory functions", () => {
  it("naturalNumbers() starts at 0, step 1", () => {
    assert.deepStrictEqual(naturalNumbers().take(5), [0, 1, 2, 3, 4]);
  });

  it("evenNumbers() starts at 0, step 2", () => {
    assert.deepStrictEqual(evenNumbers().take(4), [0, 2, 4, 6]);
  });

  it("oddNumbers() starts at 1, step 2", () => {
    assert.deepStrictEqual(oddNumbers().take(4), [1, 3, 5, 7]);
  });
});
