import { QueryError } from './QueryError';

interface FetchOptions {
  queryName: string;
  params?: Record<string, string>;
}

interface FetchResult<T> {
  data: T | null;
  error: Error | null;
}

export async function fetchIt<T>({ queryName, params }: FetchOptions): Promise<FetchResult<T>> {
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
      return {
        data: null,
        error: new QueryError(`HTTP error! status: ${response.status}`, text)
      };
    }

    return {
      data: JSON.parse(text) as T,
      error: null
    };
  } catch (error) {
    console.error(`Error fetching data from ${queryName}:`, error);
    return {
      data: null,
      error: error instanceof Error ? error : new Error(String(error))
    };
  }
}