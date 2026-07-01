/** Safe infinite-ish sequence generator with documented bounds. */
export function* naturals(start = 1) {
  if (!Number.isInteger(start) || start < 0) throw new RangeError("start must be non-negative integer");
  let n = start;
  while (true) yield n++;
}

export function take(iter, count) {
  const out = [];
  for (const v of iter) {
    out.push(v);
    if (out.length >= count) break;
  }
  return out;
}

if (import.meta.url === `file://${process.argv[1]?.replace(/\\/g, "/")}`) {
  console.log(take(naturals(), 5).join(","));
}
