import { fetchIt } from '@/src/lib/fetchIt';

export const VIEW_ALL_TAG_NAME = 'all_posts';

const viewAllTag: TagWithCount = {
  id: 0,
  name: VIEW_ALL_TAG_NAME,
  readableName: 'all posts',
  count: 0,  
};

export interface TagWithCount {
  id: number | null;
  name: string;
  readableName: string;
  count: number;
}

export async function fetchTagsFacet(): Promise<TagWithCount[]> {
  const { data: tags, error } = await fetchIt<TagWithCount[]>({ 
    queryName: 'queryTagsFacet' 
  });

  if ( error ) {
    console.error('FETCH TAGS FAIL: ', error.message)
    return [];
  }

  return [viewAllTag, ...(tags || [])];
}
