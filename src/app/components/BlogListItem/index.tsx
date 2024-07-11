import Image from 'next/image';
import { PrismaTypes } from '@/lib/prisma';

const THUMBNAIL_SIZE = 250;

import { VideoPlayerBlogItemControls } from './BlogListItemVideoControls';
import { getYoutubeThumbnaillUrl } from '../VideoPlayer/utils/getYoutubeUrls';

export function BlogListItem({ blogPost }: { blogPost: PrismaTypes.BlogPostProps }) {
  const { title, body, imgUrl, externalSourceLink, youtubeId, blogId } = blogPost;

  const itemLink = youtubeId ? `//youtube.com/watch?v=${youtubeId}` 
    : blogId ? `/${blogId}` 
    : externalSourceLink || '';

  const blogImage = imgUrl ? imgUrl
    : youtubeId ? getYoutubeThumbnaillUrl(youtubeId) 
    : null;

  const linkTarget = blogId ? '_self' : '_blank';

  return (
    <div className="blog-list-item flex flex-col items-start gap-4">
      <div className="blog-thumbnail-container w-full flex-shrink-0 border border-gray-600">
        {!!blogImage && (
          <Image 
            className="blog-thumbnail w-full object-cover" 
            src={blogImage} 
            alt={title} 
            width={THUMBNAIL_SIZE} 
            height={THUMBNAIL_SIZE} 
          />
        )}
      </div>

      <div className="flex-grow">
        <header className="mb-2">
          <h3 className="text-xl font-bold">
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

        <div className="mb-4">
          {body}
        </div>

        {!!youtubeId && (
          <VideoPlayerBlogItemControls youtubeId={youtubeId} title={title} />
        )}
      </div>
    </div>
  );
}
