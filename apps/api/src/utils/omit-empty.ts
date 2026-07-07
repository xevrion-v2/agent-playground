/**
 * 从对象中移除值为 null、undefined 或空字符串的键
 * 纯函数，不修改原对象
 */
export function omitEmpty<T extends Record<string, unknown>>(obj: T): Partial<T> {
  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (value !== null && value !== undefined && value !== "") {
      result[key] = value;
    }
  }

  return result as Partial<T>;
}
