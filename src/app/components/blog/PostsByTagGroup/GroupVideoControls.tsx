"use client";

import { BlogPost } from "@prisma/client";
import { useVideoPlayer } from "../../VideoPlayer/utils/useVideoPlayer";
import { FaPlay, FaPlus } from "react-icons/fa";
import { Button } from "../../widgets/Button";
import { VideoItem } from "../../VideoPlayer/types";

export function GroupVideoControls ({ posts }: { posts: BlogPost[] }) {
  const { 
    addVideos,
    addAndPlayVideos,
    youtubeIdRegistry,
  } = useVideoPlayer();

  const videos = getVideosFromPosts(posts);

  const allVideosAdded = videos.every(({ youtubeId }) => youtubeIdRegistry.has(youtubeId));

  const handleAddAndPlayAllInGroup = () => {
    !allVideosAdded && addAndPlayVideos(videos);
  };

  const handleAddAllInGroup = () => {
    !allVideosAdded && addVideos(videos);
  };
    
  return (
    <div className="flex items-center gap-3 text-sm translate-y-[2px]">
      <Button 
        isDisabled={allVideosAdded}
        onClick={handleAddAndPlayAllInGroup}>
        <FaPlay />
      </Button>

      <Button 
        isDisabled={allVideosAdded}
        onClick={handleAddAllInGroup}>
        <FaPlus />
      </Button>
    </div>
  )
};

function getVideosFromPosts (posts: BlogPost[]): VideoItem[] {
  return posts.reduce((acc: VideoItem[], curr) => {
    const { youtubeId, title, playOnYoutubeOnly } = curr;
    if ( !youtubeId || playOnYoutubeOnly ) { return acc; }
    return [...acc, { youtubeId, title, played:false }];
  }, [] as VideoItem[]);
}