import { FilteredTagGroupResponse } from "@/src/app/requests/fetchPostsByTagGroup";
import { BlogListItem } from "../BlogListItem";
import { PostCollectionWrapper } from "../PostCollectionWrapper";
import { ViewMoreByTagButton } from "./ViewMoreByTagButton";
import { TagWithCount } from "@/src/app/requests/fetchTagsFacet";
import { GroupVideoControls } from "./GroupVideoControls";

interface Props extends FilteredTagGroupResponse {
  tagWithCount?: TagWithCount;
  allowViewMore?: boolean;
}

export function PostsByTagGroup (props: Props) {
  const { tag, posts, tagWithCount, allowViewMore = false } = props;

  const hasMore = !!tagWithCount && posts.length < tagWithCount.count;
  const showViewMore = allowViewMore && hasMore;
  
  return posts.length > 0 ? (
    <>
      <header className="flex items-center gap-4 mb-4 900mq:mb-6">
        <div className="flex-grow flex gap-5 items-center">
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
  ): <></>;
}

