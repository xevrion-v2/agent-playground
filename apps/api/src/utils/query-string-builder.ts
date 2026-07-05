type QueryStringValue = boolean | number | string | null | undefined;

export function buildQueryString(
  params: Record<string, QueryStringValue>,
): string {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value === null || value === undefined || value === "") {
      continue;
    }

    searchParams.set(key, String(value));
  }

  const queryString = searchParams.toString();

  return queryString.length > 0 ? `?${queryString}` : "";
}
