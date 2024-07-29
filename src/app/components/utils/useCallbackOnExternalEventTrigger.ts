import { 
  RefObject 
} from 'react';

import { 
  useTriggerOverride, 
  TriggerOverrideCallbackType,
} from './useTriggerOverride';

export function useCallbackOnExternalEventTrigger<T extends HTMLElement>(
  ref: RefObject<T>, 
  callback: TriggerOverrideCallbackType
): void {
  
  useTriggerOverride<T>({ 
    eventType: 'mouseup', 
    ref: ref, 
    condition: ({ ref, event }) => {
      return !!ref.current && !ref.current.contains(event.target as Node);
    }, 
    conditionalCallback: callback
  });
}
