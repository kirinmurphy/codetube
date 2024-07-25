import { PostsByTagGroupResult } from "@/src/lib/fetchPostsByTagGroup";
import { BlogListItem } from "../BlogListItem";
import { PostCollectionWrapper } from "../PostCollectionWrapper";
import { ViewMoreByTagButton } from "./ViewMoreByTagButton";
import { TagWithCount } from "@/src/lib/fetchTagsFacet";

interface Props extends PostsByTagGroupResult {
  tagWithCount?: TagWithCount;
  allowViewMore?: boolean;
}

export function PostsByTagGroup (props: Props) {
  const { tag, posts, tagWithCount, allowViewMore = false } = props;

  const hasMore = !!tagWithCount && posts.length < tagWithCount.count;
  const showViewMore = allowViewMore && hasMore;
  
  return (
    <>
      <header className="flex">
        <h2 className="text-3xl font-bold mb-4 flex-grow 900mq:mb-6">
          {tag.name.replace(/_/g, ' ')}
        </h2>
        
        {showViewMore && <ViewMoreByTagButton tagName={tag.name} />}
      </header>

      <PostCollectionWrapper>
        {posts.map((post) => (
          <BlogListItem key={post.id} blogPost={post} />
        ))}
      </PostCollectionWrapper>
    </>
  );
}

