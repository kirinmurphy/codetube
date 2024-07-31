import Image from 'next/image';

const THUMBNAIL_SIZE = 250;

import { getYoutubeThumbnaillUrl } from '../../VideoPlayer/utils/getYoutubeUrls';
import { BlogPost } from '@prisma/client';

export function PostImage ({ post }: { post: BlogPost }) {
  const { title, imgUrl, youtubeId } = post;


  const blogImage = imgUrl ? imgUrl
    : youtubeId ? getYoutubeThumbnaillUrl(youtubeId) 
    : null;
    
  return (
    <div className="w-full flex-shrink-0 border border-gray-600">
      {!!blogImage && (
        <Image 
          className="w-full object-cover" 
          src={blogImage} 
          alt={title} 
          width={THUMBNAIL_SIZE} 
          height={Math.floor(THUMBNAIL_SIZE * .6)}  
        />
      )}
    </div>
  );
}
