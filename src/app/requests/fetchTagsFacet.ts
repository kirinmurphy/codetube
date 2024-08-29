import { fetchIt } from '@/src/lib/fetchIt';

export const VIEW_ALL_TAG_NAME = 'view_all';

const viewAllTag: TagWithCount = {
  id: 0,
  name: VIEW_ALL_TAG_NAME,
  readableName: 'view all',
  count: 0,  
};

export interface TagWithCount {
  id: number;
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
