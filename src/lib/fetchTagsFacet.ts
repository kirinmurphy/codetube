import { fetchIt } from './fetchIt';  

export interface TagWithCount {
  id: number;
  name: string;
  readableName: string;
  count: number;
}

export async function fetchTagsFacet(): Promise<TagWithCount[]> {
  return await fetchIt<TagWithCount[]>({ 
    queryName: 'queryTagsFacet' 
  });
}
