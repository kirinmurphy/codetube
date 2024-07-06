import { VideoPlayerDisplayState } from "../../VideoPlayer/types";

interface ClassDefinitions {
  videoPlayerClasses: string;
  contentContainerClasses: string;
  pageWrapperClasses: string;
}

interface Props {
  displayState: VideoPlayerDisplayState;
}

export const VIDEO_PLAYER_BG = 'bg-gray-500';

const containerClassesBase = 'transition-transform duration-300 ease-in-out';

const videoPlayerClasses = {
  [VideoPlayerDisplayState.Closed]: 'hidden',
  [VideoPlayerDisplayState.SplitScreen]: `
    w-full h-1/2 fixed top-0 left-0 overflow-hidden bg-gray-800 
    900mq:w-[calc(100%-400px)] 900mq:static 900mq:h-full  
    1250mq:w-1/2`,
  [VideoPlayerDisplayState.FullScreen]: `w-full h-full fixed top-0 left-0 overflow-hidden bg-gray-800`,
  [VideoPlayerDisplayState.Mini]: `w-full h-[85px] fixed bottom-0 left-0 overflow-hidden bg-gray-800`,
};

const contentContainerClasses = {
  [VideoPlayerDisplayState.Closed]: `
    w-full h-full ${containerClassesBase}  
    900mq:translate-x-0`,
  [VideoPlayerDisplayState.SplitScreen]: `
    w-full fixed bottom-0 left-0 h-1/2 overflow-y-scroll ${containerClassesBase} 
    900mq:w-[400px] 900mq:relative 900mq:h-full 900mq:translate-x-0 
    1250mq:w-1/2`,
  [VideoPlayerDisplayState.FullScreen]: `w-full h-full ${containerClassesBase}`, 
  [VideoPlayerDisplayState.Mini]: `w-full h-full mb-[85px] ${containerClassesBase}`,
};

const pageWrapperClasses = {
  [VideoPlayerDisplayState.Closed]: 'w-full',
  [VideoPlayerDisplayState.SplitScreen]: 'w-full 900mq:flex 900mq:h-screen',
  [VideoPlayerDisplayState.FullScreen]: 'w-full',
  [VideoPlayerDisplayState.Mini]: 'w-full',
};

export function getDynamicLayoutClasses(props: Props): ClassDefinitions {

  const { displayState } = props;  

  return { 
    videoPlayerClasses: videoPlayerClasses[displayState], 
    contentContainerClasses: contentContainerClasses[displayState], 
    pageWrapperClasses: pageWrapperClasses[displayState],
  };
}
