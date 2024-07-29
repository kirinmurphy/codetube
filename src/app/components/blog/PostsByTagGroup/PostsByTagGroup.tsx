import { FilteredTagGroupResponse } from "@/src/lib/fetchPostsByTagGroup";
import { BlogListItem } from "../BlogListItem";
import { PostCollectionWrapper } from "../PostCollectionWrapper";
import { ViewMoreByTagButton } from "./ViewMoreByTagButton";
import { TagWithCount } from "@/src/lib/fetchTagsFacet";
import { GroupVideoControls } from "./GroupVideoControls";

interface Props extends FilteredTagGroupResponse {
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
        <div className="mb-4 flex-grow flex gap-5 items-center 900mq:mb-6">
          <h2 className="text-3xl font-bold ">
            {tag.name.replace(/_/g, ' ')}
          </h2>

          <GroupVideoControls posts={posts} />
        </div>
        
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

