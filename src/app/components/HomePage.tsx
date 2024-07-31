import { use } from 'react';

import { fetchHomepageData } from '../requests/fetchHomepageData';
import { ClientRouterWrapper } from './layout/ClientRouterWrapper';
import { PostsByTagGroup } from './blog/PostsByTagGroup/PostsByTagGroup';
import { TagNavigation } from './blog/tags/TagNavigation';
import { PostViewWrapper } from './blog/PostViewWrapper';
import { HomePageDefault } from './blog/HomePageDefault';

interface Props {
  selectedTagName: string;
  tagGroupNames: string[];
}

export function HomePage ({ selectedTagName, tagGroupNames }: Props) {
  const fetchPromise = fetchHomepageData({ tagGroupNames, selectedTagName });
  const { allTags, blogPosts, groupedPosts } = use(fetchPromise);
  
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
}