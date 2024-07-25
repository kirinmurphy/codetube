"use client"; 

import { useRef, useState } from 'react';
import clsx from 'clsx';

import { TagWithCount } from '@/src/lib/fetchTagsFacet';
import { HandleTagSelectionProps, SearchableTag } from "./SearchableTag";
import { useCallbackOnExternalEventTrigger } from '@/src/lib/useCallbackOnExternalEventTrigger';
import { useVideoPlayer } from '../../VideoPlayer/utils/useVideoPlayer';
import { VideoPlayerDisplayState } from '../../VideoPlayer/types';
import { Button, ButtonType } from '../../widgets/Button';
import { useRouter } from 'next/navigation';
import { getTagPath } from '../utils/getTagPath';

interface Props {
  allTags: TagWithCount[];
  tagName: string;
}

export function TagNavigation ({ allTags, tagName }: Props) {

  const router = useRouter();

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

  const pushNewRoute = ({ newPath }: { newPath: string }) => {
    router.push(newPath, { scroll: false });
    setIsFilterOpenInMobile(false);
  }

  const handleTagSelection = ({ tagName, isActiveTag }: HandleTagSelectionProps) => {
    const newPath = isActiveTag ? '/' : getTagPath(tagName);
    pushNewRoute({ newPath });
  }

  const handleClearFilter = () => {
    pushNewRoute({ newPath: '/' });
  }

  const dropdownArrow = isFilterOpenInMobile ? '▲' : '▼';

  return (
    <div ref={tagListRef} className="relative flex flex-col">
      <header className={clsx('flex justify-end 900mq:hidden', {
        '900mq:!flex': isSplitScreen
      })}>
        <div onClick={handleFilterToggle} className="flex gap-1 cursor-pointer">
          Filter
          <span className="inline-block transform scale-y-50">{dropdownArrow}</span>
        </div>
      </header>

      <div
        className={clsx('hidden 900mq:flex flex-col gap-2', {
          '900mq:!hidden': isSplitScreen && !isFilterOpenInMobile,
          '!flex absolute top-10 right-0 z-10 p-6 bg-black rounded-lg shadow-md': isFilterOpenInMobile
        })}
      >
        {!!tagName && (
          <Button type={ButtonType.Text} onClick={handleClearFilter}>
            View All
          </Button>
        )}
        {allTags.map(tagOption => (
          <div key={tagOption.id}>
            <SearchableTag 
              tag={tagOption} 
              currentTagName={tagName} 
              handleTagSelection={handleTagSelection} 
            />
          </div>
        ))}
      </div>
    </div>
  );
}
