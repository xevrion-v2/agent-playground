/**
 * Lazily generate an infinite numeric sequence with a safe `take` helper.
 */
export function* infiniteSequence(start = 0, step = 1): Generator<number, never, undefined> {
  if (step === 0) {
    throw new Error("step must be non-zero");
  }
  let value = start;
  while (true) {
    yield value;
    value += step;
  }
}

/** Collect the first `count` values without unbounded loops in callers. */
export function take<T>(iterable: Iterable<T>, count: number): T[] {
  if (!Number.isInteger(count) || count < 0) {
    throw new Error("count must be a non-negative integer");
  }
  const out: T[] = [];
  for (const item of iterable) {
    out.push(item);
    if (out.length >= count) {
      break;
    }
  }
  return out;
}

export function naturals(): Generator<number, never, undefined> {
  return infiniteSequence(1, 1);
}
