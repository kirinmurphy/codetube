"use client";

import React from "react";
import YouTube from "react-youtube";
import { useVideoPlayer } from "./useVideoPlayer";

export function VideoPlayer () {
  const { videoCollection, activeVideo } = useVideoPlayer();
  console.log('av',activeVideo);

  return (
    <>
      {videoCollection.length > 0 && (
        <>
          <div className="w-full p4">
            <ul>
              {videoCollection.map(({ youtubeId, title }) => (
                <li key={youtubeId}>{title}</li>
              ))}
            </ul>
          </div>

          {!!activeVideo && (
            <div className="w-full">
              <YouTube
                className="w-full"
                videoId={activeVideo?.youtubeId}
                opts={{
                  playerVars: {
                    autoplay: 1,
                    controls: 0,
                    showinfo: 0,
                    rel: 0,
                    loop: 1,
                  },
                }}
              />
            </div>    
          )}
        </>
      )}
    </>
  );
}
