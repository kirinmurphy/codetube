import { fetchTagsFacet } from '@/src/app/requests/fetchTagsFacet';
import { fetchBlogPosts } from '@/src/app/requests/fetchBlogPosts';
import { fetchPostsByTagGroup } from '@/src/app/requests/fetchPostsByTagGroup';

import { ClientRouterWrapper } from './components/layout/ClientRouterWrapper';
import { PostsByTagGroup } from './components/blog/PostsByTagGroup/PostsByTagGroup';
import { TagNavigation } from './components/blog/tags/TagNavigation';
import { PostViewWrapper } from './components/blog/PostViewWrapper';
import { HomePageDefault } from './components/blog/HomePageDefault';

const HOMEPAGE_TAG_GROUP_NAMES = [
  'new_react_stuff', 
  'browser_basics', 
  'nextjs', 
  'css'
];

interface Props {
  searchParams: Record<string, string>;
}

export default async function Home ({ searchParams = {} }: Props) {
  const selectedTagName = searchParams?.tag || '';
  const hasUserFilter = selectedTagName !== '';
    
  try {
    const [allTags, blogPosts, groupedPosts] = await Promise.all([
      fetchTagsFacet(),
      hasUserFilter 
        ? fetchBlogPosts({ tag: selectedTagName }) 
        : Promise.resolve(null),
      !hasUserFilter 
        ? fetchPostsByTagGroup({ tagNames: HOMEPAGE_TAG_GROUP_NAMES, maxItemsPerTag: 4 })
        : Promise.resolve(null)
    ]);

    if (!allTags || (!blogPosts && !groupedPosts)) return <></>;

    const selectedTag = allTags
      .filter(tagOption => tagOption.name === selectedTagName)[0] || {};

    return (
      <ClientRouterWrapper initialTag={selectedTagName}>
        <PostViewWrapper
          tagNavigation={
            <TagNavigation allTags={allTags} tagName={selectedTagName} />
          }
        >
          {blogPosts && (
            <PostsByTagGroup tag={selectedTag} posts={blogPosts} />
          )}

          {groupedPosts?.tagGroups && (
            <HomePageDefault allTags={allTags} groupedPosts={groupedPosts} />
          )}
        </PostViewWrapper>
      </ClientRouterWrapper>
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return <div>Error loading data: {errorMessage}</div>;
  }
}
