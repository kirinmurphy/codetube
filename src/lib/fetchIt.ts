import { QueryError } from './QueryError';

interface FetchOptions {
  queryName: string;
  params?: Record<string, string>;
}

export async function fetchIt<T>({ queryName, params }: FetchOptions): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:8888';
  const url = new URL(`/.netlify/functions/${queryName}`, baseUrl);
  
  if (params) {
    const searchParams = new URLSearchParams(params);
    url.search = searchParams.toString();
  }


  console.log(`Fetching from URL: ${url.toString()}`); 

  try {
    const response = await fetch(url.toString());
    const text = await response.text();

    if (!response.ok) {
      throw new QueryError(`HTTP error! status: ${response.status}`, text);
    }

    return JSON.parse(text);
  } catch (error) {
    console.error(`Error fetchihng data from${queryName}:`, error);
    throw error;
  }
}
