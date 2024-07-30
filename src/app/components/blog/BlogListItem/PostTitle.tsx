import Link from "next/link";
import { BlogPost } from "@prisma/client";
import { getYoutubeVideoUrl } from "../../VideoPlayer/utils/getYoutubeUrls";
import clsx from "clsx";

interface Props {
  post: BlogPost;
  isFeatured?: boolean;
}

export function PostTitle ({ post, isFeatured }: Props) {
  const { title, youtubeId, blogId, externalSourceLink } = post;
  
  const itemLink = youtubeId ? getYoutubeVideoUrl(youtubeId)  
    : blogId ? `/${blogId}` 
    : externalSourceLink || '';

  const isInternalLink = !!blogId;  

  return (
    <h3 className={clsx('line-clamp-2', {
      'text-lg': !isFeatured,
      'text-xl font-bold': isFeatured
    })}>

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
  );
}
