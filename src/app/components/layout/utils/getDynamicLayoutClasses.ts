interface ClassDefinitions {
  videoPlayerClasses: string;
  contentContainerClasses: string;
  pageWrapperClasses: string;
}

interface Props {
  isPlayerOpen: boolean;
}

export const VIDEO_PLAYER_BG = 'bg-gray-500';

const containerClassesBase = 'transition-transform duration-300 ease-in-out';

export function getDynamicLayoutClasses(props: Props): ClassDefinitions {

  const { isPlayerOpen } = props;
  
  const videoPlayerClasses = isPlayerOpen 
    ? `w-full fixed top-0 left-0 overflow-hidden h-1/2 bg-gray-800 
        900mq:w-[calc(100%-400px)] 900mq:static 900mq:h-full  
        1250mq:w-1/2`
    : 'hidden';

  const contentContainerClasses = isPlayerOpen 
    ? `w-full fixed bottom-0 left-0 h-1/2 overflow-y-scroll ${containerClassesBase} 
        900mq:w-[400px] 900mq:relative 900mq:h-full 900mq:translate-x-0 
        1250mq:w-1/2`
    : `w-full h-full ${containerClassesBase} 
        900mq:translate-x-0`;

  const pageWrapperClasses = isPlayerOpen 
    ? '900mq:flex 900mq:h-screen w-full' 
    : 'w-full';

  return { 
    videoPlayerClasses, 
    contentContainerClasses, 
    pageWrapperClasses     
  };
}
