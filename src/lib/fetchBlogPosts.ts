import { BlogPost } from '@prisma/client';
import { fetchIt } from './fetchIt';

interface GetBlogPostQueryParams {
  tag?: string;
}

export async function fetchBlogPosts({ tag }: GetBlogPostQueryParams) {
  return await fetchIt<BlogPost[]>({
    queryName: 'queryBlogPosts',
    params: tag ? { tag } : undefined
  });
}
