import { fetchIt } from '@/src/lib/fetchIt';
import { BlogPost } from '@prisma/client';
import { VIEW_ALL_TAG_NAME } from './fetchTagsFacet';

interface GetBlogPostQueryParams {
  tag?: string;
}

export async function fetchBlogPosts({ tag }: GetBlogPostQueryParams) {
  const hasViewAllFilter = tag === VIEW_ALL_TAG_NAME;
  const filteredTag = hasViewAllFilter ? '' : tag;

  const { data: blogPosts, error } = await fetchIt<BlogPost[]>({
    queryName: 'queryBlogPosts',
    params: filteredTag ? { tag: filteredTag } : undefined
  });

  if ( error ) {
    console.error('FETCH BLOG POSTS FAIL: ', error.message)
    return null;
  }

  return blogPosts;
}
