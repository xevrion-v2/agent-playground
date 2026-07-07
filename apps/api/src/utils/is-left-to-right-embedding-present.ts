const LEFT_TO_RIGHT_EMBEDDING = "\u202a";

export function isLeftToRightEmbeddingPresent(input: string): boolean {
  return input.includes(LEFT_TO_RIGHT_EMBEDDING);
}
