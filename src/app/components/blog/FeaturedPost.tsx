import { BlogPost } from "@prisma/client";
import { BlogListItem } from "./BlogListItem";

export function FeaturedPost ({ posts }: { posts: BlogPost[] }) {
  const featuredPostIndex = Math.floor(Math.random() * posts.length);
  const featuredPost = posts[featuredPostIndex];

  return (
    <div className="mb-8">
      <BlogListItem blogPost={featuredPost} isFeatured={true} />
    </div>
  );
}
