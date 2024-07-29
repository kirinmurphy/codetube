"use client";

import React from "react";
import { FaPlay, FaPlus, FaMinusCircle, FaPause, FaExternalLinkAlt } from "react-icons/fa";

import { Button } from '../../widgets/Button';
import { useVideoPlayer } from "../../VideoPlayer/utils/useVideoPlayer";
import { getYoutubeVideoUrl } from "../../VideoPlayer/utils/getYoutubeUrls";
import { BlogPost } from "@prisma/client";

interface Props {
  post: BlogPost;
}

export function VideoPlayerBlogItemControls ({ post }: Props) {
  const { playOnYoutubeOnly, youtubeId, title } = post;
  const isPlayerLink = youtubeId && !playOnYoutubeOnly;
  const isExternalLink = youtubeId && playOnYoutubeOnly;

  return (
    <div className="flex">
      {isPlayerLink && <VideoPlayerControls youtubeId={youtubeId} title={title} />}
      {isExternalLink && <ExternalYoutubeNavLink youtubeId={youtubeId} />}
    </div>
  ) 
}

function ExternalYoutubeNavLink ({ youtubeId }: { youtubeId: string }) {
  const externalLink = getYoutubeVideoUrl(youtubeId); 
  return (
    <PlayerButton onClick={() => { window.open(externalLink, '_blank'); }}>
      <FaExternalLinkAlt /> 
      <span className="leading-none font-normal text-sm"> only</span> 
    </PlayerButton>
  );
}

interface VideoPlayerControlsProps {
  youtubeId: string;
  title: string;
}

function VideoPlayerControls (props: VideoPlayerControlsProps) {
  const { youtubeId, title } = props;

  const { 
    videoCollection, 
    activeVideo,
    isPlaying,
    addVideos, 
    addAndPlayVideos, 
    removeVideo,
    playNewVideo,
    playActiveVideo,
    pauseVideo,     
  } = useVideoPlayer();

  const alreadyAddedVideo = videoCollection
    .find((item) => item.youtubeId === youtubeId);

  const isActiveVideo = activeVideo?.youtubeId === youtubeId;
  const isActiveVideoPlaying = isActiveVideo && isPlaying;

  const handleAddAndPlay = () => {
    const video = { youtubeId, title, played: true };
    addAndPlayVideos([video]);
  };

  const handlePlayAfterAdd = () => {
    if ( isActiveVideo ) { playActiveVideo(); }
    else  { playNewVideo({ video: alreadyAddedVideo! }); }
  }

  const handleAddToQueue = () => {
    const video = { youtubeId, title, played: false };
    addVideos([video]);
  };

  const handleRemoveFromPlayer = () => {
    removeVideo(youtubeId);
  };

  const handlePause = () => {
    pauseVideo();
  }

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
          {!isActiveVideoPlaying && (
            <PlayerButton onClick={handlePlayAfterAdd}>
              <FaPlay />
            </PlayerButton>            
          )}        

          {isActiveVideoPlaying && (
            <PlayerButton onClick={handlePause}>
              <FaPause />
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
