interface GetBlogPostQueryParams {
  tag?: string;
}

export async function fetchBlogPosts({ tag }: GetBlogPostQueryParams) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:8888';
  const url = new URL('/.netlify/functions/fetchBlogPosts', baseUrl);
  
  if (tag) {
    url.searchParams.append('tag', tag);
  }

  console.log('Fetching from URL:', url.toString());

  try {
    const response = await fetch(url.toString());
    // console.log('Response status:', response.status);
    // console.log('Response headers:', response.headers);

    const text = await response.text();
    // console.log('Response text:', text);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = JSON.parse(text);
    return data;
  } catch (error) {
    console.error('Error in fetchBlogPosts:', error);
    throw error;
  }
}
