import { BlogPost } from '@prisma/client';
import { fetchIt } from './fetchIt';
import { TagWithCount } from './fetchTagsFacet';

export interface FilteredTagGroupResponse {
  tag: TagWithCount;
  posts: BlogPost[];
}

export interface PostsByTagGroupResult {
  featuredPosts: BlogPost[];
  tagGroups: FilteredTagGroupResponse[];
}

interface GetPostsByTagGroupQueryParams {
  tagNames: string[];
  maxItemsPerTag: number;
}

export async function fetchPostsByTagGroup({ tagNames, maxItemsPerTag }: GetPostsByTagGroupQueryParams) {
  return await fetchIt<PostsByTagGroupResult>({
    queryName: 'queryPostsByTagGroup',
    params: { 
      tagNames: tagNames.join(','),
      maxItemsPerTag: maxItemsPerTag.toString()
    }
  });
}
