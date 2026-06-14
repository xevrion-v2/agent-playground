/**
 * 无限序列生成器和辅助函数
 *
 * 提供无穷序列生成和有限消费的纯函数工具集。
 */

/**
 * 自然数序列: 1, 2, 3, 4, ...
 */
export function* naturalNumbers(start: number = 1): Generator<number> {
  let n = start;
  while (true) {
    yield n++;
  }
}

/**
 * 偶数序列: 2, 4, 6, 8, ...
 */
export function* evenNumbers(): Generator<number> {
  let n = 2;
  while (true) {
    yield n;
    n += 2;
  }
}

/**
 * 奇数序列: 1, 3, 5, 7, ...
 */
export function* oddNumbers(): Generator<number> {
  let n = 1;
  while (true) {
    yield n;
    n += 2;
  }
}

/**
 * 斐波那契数列: 0, 1, 1, 2, 3, 5, 8, 13, ...
 */
export function* fibonacciSequence(): Generator<number> {
  let a = 0;
  let b = 1;
  yield a;
  yield b;
  while (true) {
    const next = a + b;
    yield next;
    a = b;
    b = next;
  }
}

/**
 * 循环序列: 从一个数组中不断循环取值
 *
 * @param items 要循环的元素数组
 */
export function* cycleSequence<T>(items: T[]): Generator<T> {
  if (items.length === 0) return;
  while (true) {
    for (const item of items) {
      yield item;
    }
  }
}

/**
 * 从生成器中取出前 N 个元素
 *
 * @param gen 任意生成器
 * @param n 要取的元素个数
 * @returns 前 N 个元素的数组
 */
export function take<T>(gen: Generator<T>, n: number): T[] {
  const result: T[] = [];
  for (let i = 0; i < n; i++) {
    const { value, done } = gen.next();
    if (done) break;
    result.push(value);
  }
  return result;
}

/**
 * 从生成器中取值，直到条件不满足
 *
 * @param gen 任意生成器
 * @param predicate 判断函数
 * @returns 所有满足条件的元素
 */
export function takeWhile<T>(
  gen: Generator<T>,
  predicate: (value: T) => boolean,
): T[] {
  const result: T[] = [];
  for (const value of gen) {
    if (!predicate(value)) break;
    result.push(value);
  }
  return result;
}

/**
 * 跳过生成器的前 N 个元素
 *
 * @param gen 任意生成器
 * @param n 要跳过的元素个数
 * @returns 去掉前 N 个元素后的生成器
 */
export function skip<T>(
  gen: Generator<T>,
  n: number,
): Generator<T> {
  for (let i = 0; i < n; i++) {
    gen.next();
  }
  return gen;
}
