/**
 * A compact record helper that mimics System.Collections.Specialized.OrderedDictionary behavior.
 * Maintains insertion order while providing O(1) key access.
 * No runtime dependencies.
 */
export class OrderedDictionary<K extends string | number | symbol, V> {
  private _keys: K[];
  private _map: Map<K, V>;

  constructor() {
    this._keys = [];
    this._map = new Map<K, V>();
  }

  /**
   * Adds a key-value pair to the dictionary.
   * If the key exists, updates the value but maintains the original insertion position.
   */
  add(key: K, value: V): void {
    if (!this._map.has(key)) {
      this._keys.push(key);
    }
    this._map.set(key, value);
  }

  /**
   * Gets the value associated with the specified key.
   */
  get(key: K): V | undefined {
    return this._map.get(key);
  }

  /**
   * Determines whether the dictionary contains the specified key.
   */
  has(key: K): boolean {
    return this._map.has(key);
  }

  /**
   * Removes the value associated with the specified key.
   * Returns true if the key was found and removed, false otherwise.
   */
  remove(key: K): boolean {
    if (!this._map.has(key)) {
      return false;
    }
    this._map.delete(key);
    const index = this._keys.indexOf(key);
    if (index > -1) {
      this._keys.splice(index, 1);
    }
    return true;
  }

  /**
   * Gets the number of key-value pairs in the dictionary.
   */
  get count(): number {
    return this._keys.length;
  }

  /**
   * Gets the keys in insertion order.
   */
  get keys(): K[] {
    return [...this._keys];
  }

  /**
   * Gets the values in insertion order.
   */
  get values(): V[] {
    return this._keys.map((key) => this._map.get(key) as V);
  }

  /**
   * Returns an iterator for the keys.
   */
  [Symbol.iterator](): Iterator<[K, V]> {
    let index = 0;
    const keys = this._keys;
    const map = this._map;
    
    return {
      next(): IteratorResult<[K, V]> {
        if (index < keys.length) {
          const key = keys[index];
          index++;
          return { value: [key, map.get(key) as V], done: false };
        }
        return { value: undefined, done: true };
      }
    };
  }

  /**
   * Exports the dictionary as a plain object (Record).
   * Note: This loses insertion order in the resulting object literal,
   * but preserves the key-value mapping.
   */
  export(): Record<string | number | symbol, V> {
    const result: Record<string | number | symbol, V> = {};
    for (const key of this._keys) {
      result[key] = this._map.get(key) as V;
    }
    return result;
  }

  /**
   * Clears all items from the dictionary.
   */
  clear(): void {
    this._keys = [];
    this._map.clear();
  }
}