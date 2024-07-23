import { PostsByTagGroupResult } from "@/src/lib/fetchPostsByTagGroup";
import { BlogListItem } from "../BlogListItem";
import { PostCollectionWrapper } from "../PostCollectionWrapper";
import { ViewMoreByTagButton } from "./ViewMoreByTagButton";

interface Props extends PostsByTagGroupResult {
  allowViewMore?: boolean;
}

export function PostsByTagGroup (props: Props) {
  const { tag, posts, allowViewMore = false } = props;
  
  return (
    <>
      <header className="flex">
        <h2 className="text-2xl font-bold mb-4 flex-grow">{tag.name.replace(/_/g, ' ')}</h2>
        {allowViewMore && <ViewMoreByTagButton tagName={tag.name} />}
      </header>

      <PostCollectionWrapper>
        {posts.map((post) => (
          <BlogListItem key={post.id} blogPost={post} />
        ))}
      </PostCollectionWrapper>
    </>
  );
}

