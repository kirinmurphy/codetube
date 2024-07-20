import { fetchTagsFacet } from '@/src/lib/fetchTagsFacet';
import { fetchBlogPosts } from '@/src/lib/fetchBlogPosts';
import { BlogListItem } from './components/blog/BlogListItem/index';
import { SearchableTag } from './components/blog/tags/SearchableTag';
import { PrismaTypes } from '@/src/lib/prisma';

interface Props {
  searchParams: { [key: string]: string }
}

export default async function Home({ searchParams = {} }: Props) {
  console.log('searchParams', searchParams);
  const { tag = '' } = searchParams;
    
  try {
    const [blogPosts, allTags] = await Promise.all([
      fetchBlogPosts({ tag }),
      fetchTagsFacet()
    ]);

    if (!blogPosts || !allTags) return <></>;

    return (
      <>
        <div className="w-full flex flex-row gap-2 flex-wrap mb-6">
          {allTags.map(tag => (
            <SearchableTag key={tag.id} tag={tag} />
          ))}
        </div>

        {blogPosts.map((props: PrismaTypes.BlogPostProps) => (
          <div key={props.id} 
            className={`
              [&:not(:last-of-type)]:mb-5 
              [&:not(:last-of-type)]:pb-5 
              [&:not(:last-of-type)]:border-b 
              border-gray-600
            `}>
            <BlogListItem blogPost={props} />
          </div>
        ))}
      </>
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return <div>Error loading data: {errorMessage}</div>;
  }
}
