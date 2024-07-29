import { PrismaTypes } from '@/src/lib/prisma';
import { VideoPlayerBlogItemControls } from './BlogListItemVideoControls';
import { PostImage } from './PostImage';
import { PostTitle } from './PostTitle';

interface Props {
  blogPost: PrismaTypes.BlogPostProps;
  isFeatured?: boolean;
}

export function BlogListItem({ blogPost, isFeatured }: Props) {
  const { body, youtubeId } = blogPost;

  return (
    <div className="flex flex-col items-start gap-2">
      <div>
        <PostImage post={blogPost} />

        {!!youtubeId && (
          <div className="flex mt-1">
            <VideoPlayerBlogItemControls post={blogPost} />
          </div>
        )}
      </div>

      <div>
        <header className="mb-2">
          <PostTitle post={blogPost} />
        </header>

        {isFeatured && (
          <div className="mb-4">
            {body}
          </div> 
        )}
      </div>
    </div>
  );
}
