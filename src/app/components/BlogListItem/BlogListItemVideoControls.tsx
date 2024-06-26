"use client";

import React from "react";
import { FaPlay, FaPlus, FaMinusCircle } from "react-icons/fa";

import { Button } from '../widgets/Button';
import { useVideoPlayer } from "../mediaPlayer/useVideoPlayer";

interface Props {
  youtubeId: string;
  title: string;
}

export function VideoPlayerBlogItemControls (props: Props) {
  const { youtubeId, title } = props;

  const { 
    videoCollection, 
    addVideo, 
    addVideoAndPlay, 
    removeVideo     
  } = useVideoPlayer();

  const idHasBeenAdded = videoCollection
    .some((item) => item.youtubeId === youtubeId);

  const handlePlay = () => {
    addVideoAndPlay({ youtubeId, title, played: true });
  };

  const handleAddToQueue = () => {
    addVideo({ youtubeId, title, played: false });
  };

  const handleRemoveFromPlayer = () => {
    removeVideo(youtubeId);
  };

  return (
    <>
      {!idHasBeenAdded && (
        <div className="flex items-center gap-2">
          <Button onClick={handlePlay}>
            <FaPlay /> Play
          </Button>

          <Button onClick={handleAddToQueue}>
            <FaPlus /> Add
          </Button>
        </div>
      )}

      {idHasBeenAdded && (
        <Button onClick={handleRemoveFromPlayer}>
          <FaMinusCircle /> Remove
        </Button>
      )}
    </>
  );
}
