export interface TagWithCount {
  id: number;
  name: string;
  readableName: string;
  count: number;
}

export async function fetchTagsFacet(): Promise<TagWithCount[]> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:8888';
  const url = new URL('/.netlify/functions/fetchTagsFacet', baseUrl);

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error('Failed to fetch tags facet');
  }

  return response.json();
}
