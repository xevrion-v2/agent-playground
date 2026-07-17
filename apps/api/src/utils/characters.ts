const NAMED_CHARACTERS = new Map<string, string>([
  ["null", "\0"],
  ["nul", "\0"],
  ["\\0", "\0"],
  ["space", " "],
  ["tab", "\t"],
  ["\\t", "\t"],
  ["newline", "\n"],
  ["line-feed", "\n"],
  ["\\n", "\n"],
  ["carriage-return", "\r"],
  ["\\r", "\r"],
  ["form-feed", "\f"],
  ["\\f", "\f"],
  ["vertical-tab", "\v"],
  ["\\v", "\v"],
  ["backspace", "\b"],
  ["\\b", "\b"]
]);

export type CharacterCheckResult = {
  character: string;
  codePoint: string;
  present: boolean;
};

export function resolveControlOrSpacingCharacter(input: string): string {
  const normalized = input.trim().toLowerCase();
  const namedCharacter = NAMED_CHARACTERS.get(normalized);

  if (namedCharacter !== undefined) {
    return namedCharacter;
  }

  const codePointMatch = normalized.match(/^(?:u\+|0x)([0-9a-f]{1,6})$/u);

  if (codePointMatch) {
    const codePoint = Number.parseInt(codePointMatch[1], 16);

    if (Number.isFinite(codePoint) && codePoint <= 0x10ffff) {
      return String.fromCodePoint(codePoint);
    }
  }

  const unicodeEscapeMatch = normalized.match(/^\\u\{?([0-9a-f]{1,6})\}?$/u);

  if (unicodeEscapeMatch) {
    const codePoint = Number.parseInt(unicodeEscapeMatch[1], 16);

    if (Number.isFinite(codePoint) && codePoint <= 0x10ffff) {
      return String.fromCodePoint(codePoint);
    }
  }

  const characters = [...input];

  if (characters.length === 1) {
    return characters[0];
  }

  throw new Error("character must be a single character, named control character, or code point");
}

export function isControlOrSpacingCharacter(character: string): boolean {
  const codePoint = character.codePointAt(0);

  if (codePoint === undefined) {
    return false;
  }

  return codePoint <= 0x1f || (codePoint >= 0x7f && codePoint <= 0x9f) || /\s/u.test(character);
}

export function isCharacterPresent(value: string, characterInput = "null"): CharacterCheckResult {
  const character = resolveControlOrSpacingCharacter(characterInput);

  if (!isControlOrSpacingCharacter(character)) {
    throw new Error("character must resolve to a control or spacing character");
  }

  const codePoint = character.codePointAt(0);

  return {
    character,
    codePoint: `U+${codePoint?.toString(16).toUpperCase().padStart(4, "0")}`,
    present: value.includes(character)
  };
}
