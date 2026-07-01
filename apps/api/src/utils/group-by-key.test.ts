import { groupByKey } from "./group-by-key";

describe("groupByKey", () => {
  it("groups items by derived string key", () => {
    const items = [
      { type: "fruit", name: "apple" },
      { type: "veg", name: "carrot" },
      { type: "fruit", name: "banana" },
    ];
    const result = groupByKey(items, (item) => item.type);
    expect(result.fruit).toHaveLength(2);
    expect(result.veg).toHaveLength(1);
    expect(result.fruit[0].name).toBe("apple");
    expect(result.fruit[1].name).toBe("banana");
    expect(result.veg[0].name).toBe("carrot");
  });

  it("returns empty object for empty array", () => {
    const result = groupByKey([], () => "key");
    expect(result).toEqual({});
  });

  it("handles numeric keys", () => {
    const items = [{ id: 1 }, { id: 2 }, { id: 1 }];
    const result = groupByKey(items, (item) => item.id);
    expect(result[1]).toHaveLength(2);
    expect(result[2]).toHaveLength(1);
  });

  it("preserves insertion order within groups", () => {
    const items = [
      { group: "a", val: 1 },
      { group: "b", val: 2 },
      { group: "a", val: 3 },
    ];
    const result = groupByKey(items, (item) => item.group);
    expect(result.a).toEqual([
      { group: "a", val: 1 },
      { group: "a", val: 3 },
    ]);
    expect(result.b).toEqual([{ group: "b", val: 2 }]);
  });

  it("handles single item", () => {
    const items = [{ category: "x", value: 42 }];
    const result = groupByKey(items, (item) => item.category);
    expect(result.x).toEqual([{ category: "x", value: 42 }]);
  });

  it("works with symbol keys", () => {
    const sym = Symbol("test");
    const items = [{ key: sym, value: 1 }];
    const result = groupByKey(items, (item) => item.key);
    expect(result[sym]).toEqual([{ key: sym, value: 1 }]);
  });
});
