import { PostsByTagGroupResult, FilteredTagGroupResponse } from "@/src/app/requests/fetchPostsByTagGroup";
import { TagWithCount } from "@/src/app/requests/fetchTagsFacet";
import { PostsByTagGroup } from "./PostsByTagGroup/PostsByTagGroup";
import { FeaturedPost } from "./FeaturedPost";

interface HomePageDefaultProps {
  allTags: TagWithCount[];
  groupedPosts: PostsByTagGroupResult;
}

export function HomePageDefault ({ allTags, groupedPosts }: HomePageDefaultProps) {
  return (
    <>
      {groupedPosts.featuredPosts.length > 0 && (
        <div className="mb-8">
          <FeaturedPost posts={groupedPosts.featuredPosts} />
        </div>
      )}

      {groupedPosts.tagGroups.map((props: FilteredTagGroupResponse) => (
        props.posts.length > 0 && (
          <div key={props.tag.id} className="mb-12">
            <PostsByTagGroup 
              {...props} 
              tagWithCount={allTags.find(tag => tag.name === props.tag.name)}
              allowViewMore={true} 
            />
          </div>
        )
      ))}
    </>

  );
}
