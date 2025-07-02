export function buildQueryString(filters: Record<string, string | null | undefined>) {
  const params = Object.entries(filters)
    .filter(([, value]) => value)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`)
    .join('&');
  return params ? `?${params}` : '';
} 