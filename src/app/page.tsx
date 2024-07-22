import { fetchTagsFacet } from '@/src/lib/fetchTagsFacet';
import { fetchBlogPosts } from '@/src/lib/fetchBlogPosts';
import { BlogListItem } from './components/blog/BlogListItem/index';
import { SearchableTag } from './components/blog/tags/SearchableTag';
import ClientWrapper from './components/layout/ClientWrapper';
import { fetchPostsByTagGroup } from '@/src/lib/fetchPostsByTagGroup';
import { BlogPost, Tag } from '@prisma/client';

interface PostsByTagGroupResult {
  tag: Tag;
  posts: BlogPost[];
}

interface Props {
  searchParams: { [key: string]: string }
}

export default async function Home({ searchParams = {} }: Props) {
  const { tag = '' } = searchParams;
  const hasUserFilter = tag !== '';

  const tagGroupNames = ['react_19', 'nextjs', 'css', 'browser_basics'];
    
  try {
    const [allTags, blogPosts, groupedPosts] = await Promise.all([
      fetchTagsFacet(),
      hasUserFilter ? fetchBlogPosts({ tag }) : Promise.resolve(null),
      hasUserFilter ? Promise.resolve(null) : fetchPostsByTagGroup({ tagNames: tagGroupNames, maxItemsPerTag: 4 })
    ]);

    if (!allTags || (!blogPosts && !groupedPosts)) return <></>;

    return (
      <ClientWrapper initialTag={tag}>
        <div className="w-full flex flex-row gap-2 flex-wrap mb-6">
          {allTags.map(tagOption => (
            <SearchableTag 
              key={tagOption.id} 
              tag={tagOption} 
              currentTagName={tag} 
            />
          ))}
        </div>

        {hasUserFilter && blogPosts && (
          blogPosts.map((blogPost: BlogPost) => (
            <div key={blogPost.id} 
              className={`
                [&:not(:last-of-type)]:mb-5 
                [&:not(:last-of-type)]:pb-5 
                [&:not(:last-of-type)]:border-b 
                border-gray-600
              `}>
              <BlogListItem blogPost={blogPost} />
            </div>
          ))
        )}

        {!hasUserFilter && groupedPosts && (
          groupedPosts.map(({ tag, posts }: PostsByTagGroupResult) => (
            <div key={tag.id} className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{tag.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {posts.map((post) => (
                  <BlogListItem key={post.id} blogPost={post} />
                ))}
              </div>
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
