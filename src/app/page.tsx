import prisma from '@/lib/prisma';
import { BlogListItem } from './components/BlogListItem/index';

export default async function Home() {
  const blogPosts = await prisma.blogPost.findMany();
    
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
