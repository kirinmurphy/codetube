import Image from 'next/image';
import { PrismaTypes } from '@/src/lib/prisma';

const THUMBNAIL_SIZE = 250;

import { VideoPlayerBlogItemControls } from './BlogListItemVideoControls';
import { getYoutubeThumbnaillUrl } from '../../VideoPlayer/utils/getYoutubeUrls';

export function BlogListItem({ blogPost }: { blogPost: PrismaTypes.BlogPostProps }) {
  const { title, body, imgUrl, externalSourceLink, youtubeId, blogId } = blogPost;

  const itemLink = youtubeId ? `//youtube.com/watch?v=${youtubeId}` 
    : blogId ? `/${blogId}` 
    : externalSourceLink || '';

  const blogImage = imgUrl ? imgUrl
    : youtubeId ? getYoutubeThumbnaillUrl(youtubeId) 
    : null;

  const linkTarget = blogId ? '_self' : '_blank';

  const showComment = false;

  return (
    <div className="flex flex-col items-start gap-2">
      <div>
        <div className="w-full flex-shrink-0 border border-gray-600">
          {!!blogImage && (
            <Image 
              className="w-full object-cover" 
              src={blogImage} 
              alt={title} 
              width={THUMBNAIL_SIZE} 
              height={THUMBNAIL_SIZE} 
            />
          )}
        </div>
                
        {!!youtubeId && (
          <div className="flex mt-1">
            <VideoPlayerBlogItemControls youtubeId={youtubeId} title={title} />
          </div>
        )}
      </div>

      <div className="flex-grow">
        <header className="mb-2">
          <h3 className="text-lg">
            {itemLink && 
              <a href={itemLink} target={linkTarget} rel="noreferrer">
                {title}
              </a>
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
