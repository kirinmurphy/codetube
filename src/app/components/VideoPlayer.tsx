"use client";

import React from "react";
import YouTube from "react-youtube";

export function VideoPlayer () {

  return (
    <div className="w-full h-[100vh] bg-black">
      <YouTube
        videoId="BgLTDT03QtU"
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
  );
}