"use client";

import React from "react";

export function YoutubePlayerAddButton () {
  const addToVideoPlayer = () => {
    alert('add to video player');
  };

  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={addToVideoPlayer}>
      Add to video player
    </button>
  );
}