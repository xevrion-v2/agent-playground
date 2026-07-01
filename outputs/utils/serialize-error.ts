export interface SerializedError {
  name?: string;
  message: string;
  stack?: string;
}

export function serializeError(value: unknown): SerializedError {
  if (value instanceof Error) {
    return {
      name: value.name,
      message: value.message,
      stack: value.stack,
    };
  }

  return { message: String(value) };
}
