import { PrismaTypes } from '@/src/lib/prisma';


import { VideoPlayerBlogItemControls } from './BlogListItemVideoControls';
import { getYoutubeVideoUrl } from '../../VideoPlayer/utils/getYoutubeUrls';
import Link from 'next/link';
import { PostImage } from './PostImage';

export function BlogListItem({ blogPost }: { blogPost: PrismaTypes.BlogPostProps }) {
  const {
     title,
     body,
     externalSourceLink,
     youtubeId,
     blogId,
     playOnYoutubeOnly
   } = blogPost;

  const itemLink = youtubeId ? getYoutubeVideoUrl(youtubeId)  
    : blogId ? `/${blogId}` 
    : externalSourceLink || '';

  const isInternalLink = !!blogId;  

  const showComment = false;

  return (
    <div className="flex flex-col items-start gap-2">
      <div>
        <PostImage post={blogPost} />
        
        {!!youtubeId && (
          <div className="flex mt-1">
            <VideoPlayerBlogItemControls 
              youtubeId={youtubeId} 
              title={title} 
              playOnYoutubeOnly={playOnYoutubeOnly} 
            />
          </div>
        )}
      </div>

      <div className="flex-grow">
        <header className="mb-2">
          <h3 className="text-lg line-clamp-2">

            {itemLink && 
              (isInternalLink ? (
                <Link href={itemLink}>
                  {title}
                </Link>
              ) : (
                <a href={itemLink} target="_blank" rel="noreferrer">
                  {title}
                </a>
              ))
            }

            {!itemLink &&  
              <span>{title}</span>
            }
          </h3>
        </header>

        {showComment && (
          <div className="mb-4">
            {body}
          </div> 
        )}

      </div>
    </div>
  );
}
