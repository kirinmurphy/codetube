"use client";

import React from "react";
import { FaPlay, FaPlus, FaMinusCircle } from "react-icons/fa";

import { Button } from '../widgets/Button';
import { useVideoPlayer } from "../VideoPlayer/utils/useVideoPlayer";

interface Props {
  youtubeId: string;
  title: string;
}

export function VideoPlayerBlogItemControls (props: Props) {
  const { youtubeId, title } = props;

  const { 
    videoCollection, 
    activeVideo,
    addVideo, 
    addVideoAndPlay, 
    removeVideo,
    playVideo     
  } = useVideoPlayer();

  const alreadyAddedVideo = videoCollection
    .find((item) => item.youtubeId === youtubeId);

  const isActiveVideo = activeVideo?.youtubeId === youtubeId;

  const handleAddAndPlay = () => {
    addVideoAndPlay({ youtubeId, title, played: true });
  };

  const handlePlayAfterAdd = () => {
    playVideo({ video: alreadyAddedVideo! });
  }

  const handleAddToQueue = () => {
    addVideo({ youtubeId, title, played: false });
  };

  const handleRemoveFromPlayer = () => {
    removeVideo(youtubeId);
  };

  return (
    <div className="flex items-center gap-2">
      {!alreadyAddedVideo && (
        <>
          <Button onClick={handleAddAndPlay}>
            <FaPlay />
          </Button>

          <Button onClick={handleAddToQueue}>
            <FaPlus />
          </Button>
        </>
      )}

      {alreadyAddedVideo && (
        <>
          {!isActiveVideo && (
            <Button onClick={handlePlayAfterAdd}>
              <FaPlay />
            </Button>            
          )}        

          <Button onClick={handleRemoveFromPlayer}>
            <FaMinusCircle />
          </Button>
        </>
      )}
    </div>
  );
}
