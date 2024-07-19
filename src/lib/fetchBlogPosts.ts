interface GetBlogPostQueryParams {
  tag?: string;
}

export async function fetchBlogPosts({ tag }: GetBlogPostQueryParams) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:8888';
  const url = new URL('/.netlify/functions/queryBlogPosts', baseUrl);
  
  if (tag) {
    url.searchParams.append('tag', tag);
  }

  try {
    const response = await fetch(url.toString());
    const text = await response.text();

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} ${text}`);
    }

    return JSON.parse(text);

  } catch (error) {
    console.error('Error in fetchBlogPosts:', error);
    throw error;
  }
}
