import { describe, it, expect } from "vitest";
import { sequence, take } from "../sequence";

describe("sequence", () => {
  it("produces an infinite sequence starting from the seed", () => {
    const naturals = sequence(1, (n: number) => n + 1);
    const result = [...take(naturals, 5)];
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it("works with multiplication steps", () => {
    const powersOfTwo = sequence(1, (n: number) => n * 2);
    const result = [...take(powersOfTwo, 5)];
    expect(result).toEqual([1, 2, 4, 8, 16]);
  });

  it("works with strings", () => {
    const prefixes = sequence("A", (s: string) => String.fromCharCode(s.charCodeAt(0) + 1));
    const result = [...take(prefixes, 3)];
    expect(result).toEqual(["A", "B", "C"]);
  });

  it("can produce a Fibonacci-like sequence via sequence", () => {
    // Use a tuple as state: [current, next]
    const fib = sequence(
      [0, 1] as [number, number],
      ([a, b]: [number, number]) => [b, a + b] as [number, number]
    );
    const result = [...take(fib, 8)].map(([a]) => a);
    expect(result).toEqual([0, 1, 1, 2, 3, 5, 8, 13]);
  });

  it("is lazy and does not compute beyond what is taken", () => {
    let callCount = 0;
    const seq = sequence(0, (n: number) => {
      callCount++;
      return n + 1;
    });
    const result = [...take(seq, 3)];
    expect(result).toEqual([0, 1, 2]);
    // step should have been called 2 times (step is called on the subsequent
    // iterations, not on the first yield of seed)
    expect(callCount).toBe(2);
  });
});

describe("take", () => {
  it("returns the first N elements", () => {
    const arr = [10, 20, 30, 40, 50];
    expect([...take(arr, 3)]).toEqual([10, 20, 30]);
  });

  it("returns all elements when count exceeds length", () => {
    const arr = [1, 2];
    expect([...take(arr, 5)]).toEqual([1, 2]);
  });

  it("returns nothing when count is 0", () => {
    expect([...take([1, 2, 3], 0)]).toEqual([]);
  });

  it("works with Set", () => {
    const set = new Set(["a", "b", "c"]);
    expect([...take(set, 2)]).toEqual(["a", "b"]);
  });

  it("works with strings", () => {
    expect([...take("hello", 3)]).toEqual(["h", "e", "l"]);
  });
});
