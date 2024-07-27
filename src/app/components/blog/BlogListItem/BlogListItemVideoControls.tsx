"use client";

import React from "react";
import { FaPlay, FaPlus, FaMinusCircle, FaPause, FaExternalLinkAlt } from "react-icons/fa";

import { Button } from '../../widgets/Button';
import { useVideoPlayer } from "../../VideoPlayer/utils/useVideoPlayer";
import { getYoutubeVideoUrl } from "../../VideoPlayer/utils/getYoutubeUrls";

interface Props {
  youtubeId: string;
  title: string;
  playOnYoutubeOnly: boolean;
}

export function VideoPlayerBlogItemControls (props: Props) {
  const { playOnYoutubeOnly, ...videoProps } = props;
  return playOnYoutubeOnly 
    ? <ExternalYoutubeNavLink youtubeId={props.youtubeId} />
    : <VideoPlayerControls {...videoProps} />;
}

function ExternalYoutubeNavLink ({ youtubeId }: { youtubeId: string }) {
  const externalLink = getYoutubeVideoUrl(youtubeId); 
  return (
    <PlayerButton onClick={() => { window.open(externalLink, '_blank'); }}>
      <FaExternalLinkAlt /> 
      <span className="leading-none font-normal text-sm"> Only</span> 
    </PlayerButton>
  );
}

function VideoPlayerControls (props: Omit<Props, 'playOnYoutubeOnly'>) {
  const { youtubeId, title } = props;

  const { 
    videoCollection, 
    activeVideo,
    isPlaying,
    addVideo, 
    addVideoAndPlay, 
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
    addVideoAndPlay({ youtubeId, title, played: true });
  };

  const handlePlayAfterAdd = () => {
    if ( isActiveVideo ) { playActiveVideo(); }
    else  { playNewVideo({ video: alreadyAddedVideo! }); }
  }

  const handleAddToQueue = () => {
    addVideo({ youtubeId, title, played: false });
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
