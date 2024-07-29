import Link from "next/link";
import { BlogPost } from "@prisma/client";
import { getYoutubeVideoUrl } from "../../VideoPlayer/utils/getYoutubeUrls";

export function PostTitle ({ post }: { post: BlogPost }) {
  const { title, youtubeId, blogId, externalSourceLink } = post;
  const itemLink = youtubeId ? getYoutubeVideoUrl(youtubeId)  
    : blogId ? `/${blogId}` 
    : externalSourceLink || '';

  const isInternalLink = !!blogId;  

  return (
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
  );
}
