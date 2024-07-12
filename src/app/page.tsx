import prisma from '@/lib/prisma';
import { BlogListItem } from './components/BlogListItem/index';

import { fetchTagsFacet } from '@/lib/fetchTagsFacet';
import { fetchBlogPosts } from '@/lib/fetchBlogPosts';

interface Props {
  searchParams: { [key: string]: string  }
}

export default async function Home ({ searchParams }: Props) {
  const { tag } = searchParams;
  
  const blogPosts = await fetchBlogPosts({ tag })
  const allTags = await fetchTagsFacet();

  if ( !blogPosts || !allTags ) return <></>;
  
  return (
    <>
      <div className="w-full">
        {allTags.map(tag => (
          <a key={tag.id} className="flex items-center gap-2 mb-2">
            <span className="text-lg">{tag.name}</span>
            <span className="text-sm">{tag.count}</span>
          </a>
        ))}
      </div>

      {blogPosts && blogPosts.map(props => (
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
}
