"use client"; 

import { useRef, useState } from 'react';
import clsx from 'clsx';

import { TagWithCount } from '@/src/lib/fetchTagsFacet';
import { SearchableTag } from "./SearchableTag";
import { useCallbackOnExternalEventTrigger } from '@/src/lib/useCallbackOnExternalEventTrigger';
import { useVideoPlayer } from '../../VideoPlayer/utils/useVideoPlayer';
import { VideoPlayerDisplayState } from '../../VideoPlayer/types';

interface Props {
  allTags: TagWithCount[];
  tagName: string;
}

export function TagNavigation ({ allTags, tagName }: Props) {

  const { displayState } = useVideoPlayer();

  const isSplitScreen = displayState === VideoPlayerDisplayState.SplitScreen;

  const [isFilterOpenInMobile, setIsFilterOpenInMobile] = useState(false);

  const tagListRef = useRef(null);

  useCallbackOnExternalEventTrigger(tagListRef, () => {
    setIsFilterOpenInMobile(false);
  });

  const handleFilterToggle = () => {
    setIsFilterOpenInMobile(!isFilterOpenInMobile);
  }

  const handleOnAfterClick = () => {
    setIsFilterOpenInMobile(false);
  }

  const dropdownArrow = isFilterOpenInMobile ? '▲' : '▼';

  return (
    <div className="relative flex flex-col">
      <header className={clsx('flex justify-end 900mq:hidden', {
        '900mq:!flex': isSplitScreen
      })}>
        <div onClick={handleFilterToggle}>Filter {dropdownArrow}</div>
      </header>

      <div ref={tagListRef} 
        className={clsx('hidden 900mq:block', {
          '900mq:!hidden': isSplitScreen && !isFilterOpenInMobile,
          '!block absolute top-10 right-0 z-10 bg-black p-4 rounded-lg shadow-md': isFilterOpenInMobile
        })}
      >
        {allTags.map(tagOption => (
          <div key={tagOption.id} className="">
            <SearchableTag 
              tag={tagOption} 
              currentTagName={tagName} 
              onAfterClick={handleOnAfterClick} 
            />
          </div>
        ))}
      </div>
    </div>
  );
}
