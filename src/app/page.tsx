import { BlogPost } from '@prisma/client';
import { fetchTagsFacet } from '@/src/lib/fetchTagsFacet';
import { fetchBlogPosts } from '@/src/lib/fetchBlogPosts';
import { fetchPostsByTagGroup, PostsByTagGroupResult } from '@/src/lib/fetchPostsByTagGroup';

import ClientWrapper from './components/layout/ClientWrapper';
import { PostsByTagGroup } from './components/blog/PostsByTagGroup';
import { TagNavigation } from './components/blog/tags/TagNavigation';
import { PostCollectionWrapper } from './components/blog/PostCollectionWrapper';
import { BlogListItem } from './components/blog/BlogListItem';

const HOMEPAGE_TAG_GROUP_NAMES = ['react_19', 'nextjs', 'css', 'browser_basics'];


interface Props {
  searchParams: { [key: string]: string }
}

export default async function Home({ searchParams = {} }: Props) {
  const { tag = '' } = searchParams;
  const hasUserFilter = tag !== '';
    
  try {
    const [allTags, blogPosts, groupedPosts] = await Promise.all([
      fetchTagsFacet(),
      hasUserFilter ? fetchBlogPosts({ tag }) : Promise.resolve(null),
      hasUserFilter ? Promise.resolve(null) 
        : fetchPostsByTagGroup({ tagNames: HOMEPAGE_TAG_GROUP_NAMES, maxItemsPerTag: 4 })
    ]);

    if (!allTags || (!blogPosts && !groupedPosts)) return <></>;

    return (
      <ClientWrapper initialTag={tag}>
        <TagNavigation allTags={allTags} tagName={tag} />

        {blogPosts && (
          <PostCollectionWrapper>
            {blogPosts.map((blogPost: BlogPost) => (
              <BlogListItem key={blogPost.id} blogPost={blogPost} />
            ))}
          </PostCollectionWrapper>
        )}

        {groupedPosts && (
          groupedPosts.map((props: PostsByTagGroupResult) => (
            <div key={props.tag.id} className="mb-8">
              <PostsByTagGroup {...props} />
            </div>
          ))
        )}
      </ClientWrapper>
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return <div>Error loading data: {errorMessage}</div>;
  }
}
