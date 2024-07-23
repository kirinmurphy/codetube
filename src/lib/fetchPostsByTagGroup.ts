import { BlogPost, Tag } from '@prisma/client';
import { fetchIt } from './fetchIt';

export interface PostsByTagGroupResult {
  tag: Tag;
  posts: BlogPost[];
}

interface GetPostsByTagGroupQueryParams {
  tagNames: string[];
  maxItemsPerTag: number;
}

export async function fetchPostsByTagGroup({ tagNames, maxItemsPerTag }: GetPostsByTagGroupQueryParams) {
  return await fetchIt<PostsByTagGroupResult[]>({
    queryName: 'queryPostsByTagGroup',
    params: { 
      tagNames: tagNames.join(','),
      maxItemsPerTag: maxItemsPerTag.toString()
    }
  });
}
