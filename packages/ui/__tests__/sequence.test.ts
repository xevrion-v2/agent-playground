import { sequence } from "../src/sequence";

describe("sequence", () => {
  it("starts from 0 by default", () => {
    const seq = sequence();
    expect(seq.next()).toBe(0);
  });

  it("increments by 1 by default", () => {
    const seq = sequence();
    expect(seq.next()).toBe(0);
    expect(seq.next()).toBe(1);
    expect(seq.next()).toBe(2);
  });

  it("accepts a custom start value", () => {
    const seq = sequence(10);
    expect(seq.next()).toBe(10);
    expect(seq.next()).toBe(11);
  });

  it("accepts a custom step value", () => {
    const seq = sequence(0, 5);
    expect(seq.next()).toBe(0);
    expect(seq.next()).toBe(5);
    expect(seq.next()).toBe(10);
  });

  it("supports negative step", () => {
    const seq = sequence(10, -1);
    expect(seq.next()).toBe(10);
    expect(seq.next()).toBe(9);
  });

  it("produces an infinite sequence (not an array)", () => {
    const seq = sequence();
    for (let i = 0; i < 1000; i++) {
      seq.next();
    }
    expect(seq.next()).toBe(1000);
  });
});
