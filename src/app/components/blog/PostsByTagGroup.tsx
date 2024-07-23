import { PostsByTagGroupResult } from "@/src/lib/fetchPostsByTagGroup";
import { BlogListItem } from "./BlogListItem";
import { PostCollectionWrapper } from "./PostCollectionWrapper";
import { ViewMoreByTagButton } from "./ViewMoreByTagButton";

export function PostsByTagGroup ({ tag, posts }: PostsByTagGroupResult) {
  return (
    <>
      <header className="flex">
        <h2 className="text-2xl font-bold mb-4 flex-grow">{tag.name.replace(/_/g, ' ')}</h2>
        <ViewMoreByTagButton tagName={tag.name} />
      </header>

      <PostCollectionWrapper>
        {posts.map((post) => (
          <BlogListItem key={post.id} blogPost={post} />
        ))}
      </PostCollectionWrapper>
    </>
  );
}

