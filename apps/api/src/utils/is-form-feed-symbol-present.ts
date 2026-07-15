const FORM_FEED_SYMBOL = "\f";

export function isFormFeedSymbolPresent(value: string): boolean {
  return value.includes(FORM_FEED_SYMBOL);
}
