"use client";

import React from "react";
import { FaPlay, FaPlus, FaMinusCircle } from "react-icons/fa";

import { Button } from '../../widgets/Button';
import { useVideoPlayer } from "../../VideoPlayer/utils/useVideoPlayer";

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
    <div className="w-full flex justify-between gap-2">
      {!alreadyAddedVideo && (
        <>
          <PlayerButton onClick={handleAddAndPlay}>
            <FaPlay />
          </PlayerButton>

          <PlayerButton onClick={handleAddToQueue}>
            <FaPlus />
          </PlayerButton>
        </>
      )}

      {alreadyAddedVideo && (
        <>
          {!isActiveVideo && (
            <PlayerButton onClick={handlePlayAfterAdd}>
              <FaPlay />
            </PlayerButton>            
          )}        

          <PlayerButton onClick={handleRemoveFromPlayer}>
            <FaMinusCircle />
          </PlayerButton>
        </>
      )}
    </div>
  );
}

interface PlayerButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

function PlayerButton ({ children, onClick }: PlayerButtonProps) {
  return (
    <Button className="flex-1 justify-center py-2" onClick={onClick}>
      {children}
    </Button>
  );
}
