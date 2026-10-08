// URL-encoded request body, the format Netlify Forms expects from a fetch submission.
export function encodeForm(data: Record<string, string>): string {
  return Object.entries(data)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
}
