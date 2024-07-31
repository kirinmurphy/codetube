import { fetchTagsFacet } from './fetchTagsFacet';
import { fetchBlogPosts } from './fetchBlogPosts';
import { fetchPostsByTagGroup } from './fetchPostsByTagGroup';

interface Props {
  selectedTagName: string;
  tagGroupNames: string[];
}

export async function fetchHomepageData ({ selectedTagName, tagGroupNames } : Props) {
  const hasUserFilter = selectedTagName !== '';
  const [allTags, blogPosts, groupedPosts] = await Promise.all([
    fetchTagsFacet(),
    hasUserFilter 
      ? fetchBlogPosts({ tag: selectedTagName }) 
      : Promise.resolve(null),
    !hasUserFilter 
      ? fetchPostsByTagGroup({ tagNames: tagGroupNames, maxItemsPerTag: 4 })
      : Promise.resolve(null)
  ]);
  
  return { allTags, blogPosts, groupedPosts, hasUserFilter, selectedTagName };
};
