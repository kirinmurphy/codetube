import { useEffect, RefObject } from 'react';

interface EventDataProps {
  triggeredHref: string | null;
}

interface ConditionProps<T> {
  ref: RefObject<T>;
  event: MouseEvent;
  eventData: EventDataProps;
}

export type TriggerOverrideCallbackType = (arg0: EventDataProps) => void;

interface UseTriggerOverrideProps<T extends HTMLElement> {
  eventType: 'click' | 'mousedown' | 'mouseup';
  ref: RefObject<T>;
  condition: (arg0: ConditionProps<T>) => boolean;
  conditionalCallback: TriggerOverrideCallbackType;
}

export function useTriggerOverride<T extends HTMLElement> (props: UseTriggerOverrideProps<T>): void {
  useEffect(() => {
    const { eventType, ref, condition, conditionalCallback } = props;

    const eventCallback = (event: MouseEvent) => {
      if (ref.current) {
        const target = event.target as HTMLElement;
      
        const eventData: EventDataProps = {
          triggeredHref: target.closest('a')?.getAttribute('href') ?? null
        };
    
        if (condition({ ref, event, eventData })) {
          event.preventDefault();
          event.stopPropagation();
          conditionalCallback(eventData);
        }  
      }
    };

    document.addEventListener(eventType, eventCallback);
    return () => {
      document.removeEventListener(eventType, eventCallback);
    };
  }, [props]);  
}
