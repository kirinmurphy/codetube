import prisma from '@/lib/prisma';
import { BlogListItem } from './components/BlogListItem/index';

import { getBlogPostQuery } from '../lib/getBlogPostQuery';

interface Props {
  searchParams: { [key: string]: string  }
}

export default async function Home ({ searchParams }: Props) {
  const tag = searchParams.tag;
  const blogPosts = await prisma.blogPost.findMany(getBlogPostQuery({ tag }))
    
  return (
    <>
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
