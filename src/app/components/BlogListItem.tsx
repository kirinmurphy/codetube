import { PrismaTypes } from '@/lib/prisma';

import Image from 'next/image';

export function BlogListItem({ blogPost }: { blogPost: PrismaTypes.BlogPostProps }) {
  const { title, body, imgUrl, sourceLink } = blogPost;

  const isYoutubeLink = checkYoutubeLink(sourceLink);
    
  return (
    <div className="flex flex-col md:flex-row items-start gap-4">
      <div className="w-[200px] flex-shrink-0">
        <Image 
          className="object-cover" 
          src={imgUrl} 
          alt={title} 
          width={200} 
          height={200} 
        />
      </div>

      <div className="flex-grow">
        <header className="mb-2">
          <h3 className="text-xl font-bold">
            {sourceLink && 
              <a href={sourceLink} target="_blank" rel="noreferrer">
                {title}
              </a>
            }

            {!sourceLink &&  
              <span>{title}</span>
            }
          </h3>
          {isYoutubeLink && <div>It&apos;s a youtube linkk.</div>}
        </header>

        <div>
          {body}
        </div>
      </div>
    </div>
  );
}

function checkYoutubeLink(url: string): boolean {
  return /youtube\.com|youtu\.be/.test(url);
}
