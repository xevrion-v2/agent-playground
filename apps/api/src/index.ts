import { parseInteger } from './utils/integerParser';

// Re-export the helper at the root of the API package as requested
// The issue description mentions exporting at $path which corresponds to the API entry point
export { parseInteger };

// Existing exports
export * from './routes/users';

// Example usage (can be removed in production if not needed)
// const result = parseInteger("123"); // 123
// const invalid = parseInteger("12.5"); // null