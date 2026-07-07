const { toCamelCase, toSnakeCase, toKebabCase, toPascalCase } = require('./case-converter');

describe('toCamelCase', () => {
  test('converts space-separated words', () => {
    expect(toCamelCase('hello world')).toBe('helloWorld');
  });

  test('converts hyphenated words', () => {
    expect(toCamelCase('hello-world')).toBe('helloWorld');
  });

  test('converts underscore-separated words', () => {
    expect(toCamelCase('hello_world')).toBe('helloWorld');
  });

  test('handles single word', () => {
    expect(toCamelCase('hello')).toBe('hello');
  });

  test('handles mixed separators', () => {
    expect(toCamelCase('hello-world_test case')).toBe('helloWorldTestCase');
  });

  test('handles null', () => {
    expect(toCamelCase(null)).toBe('');
  });

  test('handles undefined', () => {
    expect(toCamelCase(undefined)).toBe('');
  });

  test('handles empty string', () => {
    expect(toCamelCase('')).toBe('');
  });

  test('handles whitespace only', () => {
    expect(toCamelCase('   ')).toBe('');
  });

  test('handles non-string inputs', () => {
    expect(toCamelCase(123)).toBe('');
  });

  test('handles already camelCase', () => {
    expect(toCamelCase('helloWorld')).toBe('helloWorld');
  });

  test('handles single character', () => {
    expect(toCamelCase('a')).toBe('a');
  });

  test('handles uppercase input', () => {
    expect(toCamelCase('HELLO WORLD')).toBe('helloWorld');
  });
});

describe('toSnakeCase', () => {
  test('converts space-separated words', () => {
    expect(toSnakeCase('hello world')).toBe('hello_world');
  });

  test('converts camelCase', () => {
    expect(toSnakeCase('helloWorld')).toBe('hello_world');
  });

  test('handles null', () => {
    expect(toSnakeCase(null)).toBe('');
  });

  test('handles empty string', () => {
    expect(toSnakeCase('')).toBe('');
  });

  test('handles mixed separators', () => {
    expect(toSnakeCase('Hello-World Test')).toBe('hello_world_test');
  });
});

describe('toKebabCase', () => {
  test('converts space-separated words', () => {
    expect(toKebabCase('hello world')).toBe('hello-world');
  });

  test('handles null', () => {
    expect(toKebabCase(null)).toBe('');
  });

  test('handles empty string', () => {
    expect(toKebabCase('')).toBe('');
  });

  test('converts snake_case', () => {
    expect(toKebabCase('hello_world')).toBe('hello-world');
  });
});

describe('toPascalCase', () => {
  test('converts space-separated words', () => {
    expect(toPascalCase('hello world')).toBe('HelloWorld');
  });

  test('handles null', () => {
    expect(toPascalCase(null)).toBe('');
  });

  test('handles empty string', () => {
    expect(toPascalCase('')).toBe('');
  });

  test('handles single word', () => {
    expect(toPascalCase('hello')).toBe('Hello');
  });

  test('handles mixed case words', () => {
    expect(toPascalCase('hello world')).toBe('HelloWorld');
  });
});
