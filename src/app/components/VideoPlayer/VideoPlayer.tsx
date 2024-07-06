"use client";

import React from "react";
import YouTube from "react-youtube";
import { useVideoPlayer } from "./useVideoPlayer";
import { PlaylistItem } from "./PlaylistItem";
import { VideoDisplayStateActions } from "./VideoDisplayStateActions";

export function VideoPlayer () {
  const { 
    videoCollection, 
    activeVideo, 
    autoPlay, 
    playNextVideo,
    updatePlayState, 
  } = useVideoPlayer();

  return (
    <>
      {videoCollection.length > 0 && (
        <div className="w-full p-4 max-w-[1100px] mx-auto">

          <div className="w-full mb-4 flex justify-end">
            <VideoDisplayStateActions />
          </div>  

          {!!activeVideo && (
            <div className="w-full mb-4">
              <div className="relative pb-[56.25%] h-0 overflow-hidden">
                <YouTube
                  className="absolute top-0 left-0 w-full h-full"
                  iframeClassName="absolute top-0 left-0 w-full h-full"
                  videoId={activeVideo?.youtubeId}
                  onEnd={() => {
                    playNextVideo();
                  }}
                  onPlay={() => {
                    updatePlayState({ isPlaying: true });
                  }}
                  onPause={() => {
                    updatePlayState({ isPlaying: false });
                  }}                  
                  opts={{
                    playerVars: {
                      autoplay: autoPlay ? 1 : 0,
                      // controls: 0,
                      // showinfo: 0,
                      // rel: 0,
                      // loop: 1,
                    },
                  }}
                />
              </div>
            </div>    
          )}

          <div className="w-full">
            <ul>
              {videoCollection.map(video => (
                <li key={video.youtubeId}>
                  <PlaylistItem video={video} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
