interface ClassDefinitions {
  videoPlayerClasses: string;
  contentContainerClasses: string;
  pageWrapperClasses: string;
}

interface Props {
  isPlayerOpen: boolean;
}

export const VIDEO_PLAYER_BG = 'bg-gray-900';

export function getDynamicLayoutClasses(props: Props): ClassDefinitions {

  const { isPlayerOpen } = props;
  
  const videoPlayerClasses = isPlayerOpen 
    ? `w-full fixed top-0 left-0 overflow-hidden h-1/2   
      md:w-1/2 md:static md:h-full ${VIDEO_PLAYER_BG}`
    : 'hidden';

  const containerClassesBase = 'transition-transform duration-300 ease-in-out';

  const contentContainerClasses = isPlayerOpen 
    ? `w-full fixed bottom-0 left-0 h-1/2 md:w-1/2 md:relative md:h-full overflow-y-scroll 
        ${containerClassesBase} md:translate-x-0`
    : `w-full md:w-full h-full ${containerClassesBase} md:translate-x-0`;

  const pageWrapperClasses = isPlayerOpen 
    ? 'md:flex md:h-screen w-full' 
    : 'w-full';

  return { 
    videoPlayerClasses, 
    contentContainerClasses, 
    pageWrapperClasses     
  };
}
