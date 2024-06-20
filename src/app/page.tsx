import prisma from '@/lib/prisma';
import { BlogListItem } from './components/BlogListItem';

export default async function Home() {
  const blogPosts = await prisma.blogPost.findMany();
  // await prisma.blogPost.deleteMany({})
  
  
  return (
    <>
      {blogPosts && blogPosts.map(props => (
        <div key={props.id} className="[&:not(:last-of-type)]:mb-6">
          <BlogListItem blogPost={props} />
        </div>
      ))}
    </>
  );
}
