import prisma from '@/lib/prisma';
import { BlogListItem } from './components/BlogListItem';

export default async function Home() {
  const blogPosts = await prisma.blogPost.findMany();
    
  return (
    <>
      {blogPosts && blogPosts.map(props => (
        <div key={props.id} className="[&:not(:last-of-type)]:mb-10">
          <BlogListItem blogPost={props} />
        </div>
      ))}
    </>
  );
}
