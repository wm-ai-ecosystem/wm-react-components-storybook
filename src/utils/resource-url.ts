export function prefixPrefabResourceUrl(
  source: string | undefined,
  prefabName?: string
): string | undefined {
  if (!source) return source;
  const trimmed = source.trim();

  // Skip if absolute http(s) URL or starts with data: or blob:
  const lower = trimmed.toLowerCase();
  if (
    lower.startsWith("http://") ||
    lower.startsWith("https://") ||
    lower.startsWith("data:") ||
    lower.startsWith("blob:")
  ) {
    return source;
  }

  // Only process if starts with resources/ and prefabName exists
  if (!prefabName) return source;
  if (!trimmed.startsWith("resources/")) return source;

  // If already prefixed with prefabName/, avoid double prefixing
  const prefabPrefix = `${prefabName}/`;
  if (trimmed.startsWith(prefabPrefix)) return source;

  // concadinating the prefabName with scr path like  Port_In_PreCheck + /resources/images/imagelists/bring_your_phone.png
  return `${prefabName}/${trimmed}`;
}
