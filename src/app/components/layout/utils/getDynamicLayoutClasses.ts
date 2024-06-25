interface ClassDefinitions {
  videoPlayerClasses: string;
  contentContainerClasses: string;
  wrapperClasses: string;
}

interface Props {
  isPlayerOpen: boolean;
}

export function getDynamicLayoutClasses(props: Props): ClassDefinitions {

  const { isPlayerOpen } = props;
  
  const videoPlayerClasses = isPlayerOpen 
    ? 'w-full md:w-1/2 fixed md:static top-0 left-0 h-1/2 md:h-full bg-gray-900'
    : 'hidden';

  const containerClassesBase = 'transition-transform duration-300 ease-in-out';

  const contentContainerClasses = isPlayerOpen 
    ? `w-full md:w-1/2 mt-1/2 md:mt-0 overflow-y-scroll 
        h-1/2 md:h-full ${containerClassesBase} md:translate-x-0`
    : `w-full md:w-full h-full ${containerClassesBase} md:translate-x-0`;

  const wrapperClasses = isPlayerOpen 
    ? 'md:flex md:h-screen w-full' 
    : 'w-full';

  return { 
    videoPlayerClasses, 
    contentContainerClasses, 
    wrapperClasses     
  };
}
