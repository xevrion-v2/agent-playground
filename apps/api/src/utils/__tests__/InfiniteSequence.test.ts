import { InfiniteSequence } from "./InfiniteSequence";

describe("InfiniteSequence", () => {
  it("wraps around when no seed is provided", () => {
    const seq = new InfiniteSequence([1, 2, 3]);
    const result = seq.take(6);
    expect(result).toEqual([1, 2, 3, 1, 2, 3]);
  });

  it("uses seed to generate new items", () => {
    const seq = new InfiniteSequence([1], (i) => i + 1);
    const result = seq.take(5);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it("supports manual iteration", () => {
    const seq = new InfiniteSequence(["a", "b"]);
    const iter = seq[Symbol.iterator]();
    expect(iter.next().value).toBe("a");
    expect(iter.next().value).toBe("b");
    expect(iter.next().value).toBe("a");
  });

  it("handles empty initial items with seed", () => {
    const seq = new InfiniteSequence<number>([], (i) => i * 2);
    const result = seq.take(4);
    expect(result).toEqual([0, 2, 4, 6]);
  });
});
