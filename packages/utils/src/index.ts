export function* infiniteSequence(start = 0, step = 1): Generator<number> {
  let i = start;
  while (true) {
    yield i;
    i += step;
  }
}
