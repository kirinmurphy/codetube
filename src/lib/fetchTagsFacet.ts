export interface TagWithCount {
  id: number;
  name: string;
  readableName: string;
  count: number;
}

export async function fetchTagsFacet(): Promise<TagWithCount[]> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:8888';
  const url = new URL('/.netlify/functions/queryTagsFacet', baseUrl);

  try {
    const response = await fetch(url.toString());
    const text = await response.text();
  
    if (!response.ok) {
      throw new Error(`Faileddddd to fetch tags facet: ${response.status}, ${text}`); 
    }
  
    return JSON.parse(text);  

  } catch (error) {
    console.error('Error in fetchTagsFacet:', error);
    throw error;
  }
}
