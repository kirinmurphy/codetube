import { BlogPost } from '@prisma/client';
import { fetchIt } from '@/src/lib/fetchIt';
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

export async function fetchPostsByTagGroup(props: GetPostsByTagGroupQueryParams) {
  const { tagNames, maxItemsPerTag } = props;
  
  return await fetchIt<PostsByTagGroupResult>({
    queryName: 'queryPostsByTagGroup',
    params: { 
      tagNames: tagNames.join(','),
      maxItemsPerTag: maxItemsPerTag.toString()
    }
  });
}
