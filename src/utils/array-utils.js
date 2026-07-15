function chunk(items, size) {
  if (!Array.isArray(items) || size <= 0 || !Number.isFinite(size)) return [];
  const out = [];
  for (let i = 0; i < items.length; i += size) {
    out.push(items.slice(i, i + size));
  }
  return out;
}

function unique(items) {
  if (!Array.isArray(items)) return [];
  return [...new Set(items)];
}

function shuffle(items) {
  if (!Array.isArray(items)) return [];
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function groupBy(items, keyFn) {
  if (!Array.isArray(items) || typeof keyFn !== "function") return {};
  const out = {};
  for (const item of items) {
    const key = String(keyFn(item));
    if (!out[key]) out[key] = [];
    out[key].push(item);
  }
  return out;
}

module.exports = { chunk, unique, shuffle, groupBy };
