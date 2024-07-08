import { VideoPlayerDisplayState } from "../../VideoPlayer/types";

interface ClassDefinitions {
  videoPlayerClasses: string;
  contentContainerClasses: string;
  pageWrapperClasses: string;
}

interface Props {
  displayState: VideoPlayerDisplayState;
}

const containerClassesBase = 'w-full transition-transform duration-300 ease-in-out';

const videoPlayerClassesBase = 'w-full fixed left-0 overflow-x-hidden overflow-y-auto bg-gray-800';

const videoPlayerClasses = {
  [VideoPlayerDisplayState.Closed]: 'hidden',
  [VideoPlayerDisplayState.SplitScreen]: `
    ${videoPlayerClassesBase} h-1/2 top-0  
    900mq:w-[calc(100%-400px)] 900mq:static 900mq:h-full  
    1250mq:w-1/2`,
  [VideoPlayerDisplayState.FullScreen]: `${videoPlayerClassesBase} h-full top-0`,
  [VideoPlayerDisplayState.Mini]: `w-full h-[85px] fixed left-0 overflow-hidden bottom-0 bg-gray-800`,
};

const contentContainerClasses = {
  [VideoPlayerDisplayState.Closed]: `
    h-full ${containerClassesBase}  
    900mq:translate-x-0`,
  [VideoPlayerDisplayState.SplitScreen]: `
    fixed bottom-0 left-0 h-1/2 overflow-y-scroll ${containerClassesBase} 
    900mq:w-[400px] 900mq:relative 900mq:h-full 900mq:translate-x-0 
    1250mq:w-1/2`,
  [VideoPlayerDisplayState.FullScreen]: `h-full ${containerClassesBase}`, 
  [VideoPlayerDisplayState.Mini]: `h-full mb-[85px] ${containerClassesBase}`,
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
