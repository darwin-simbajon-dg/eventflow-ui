// import { useEffect, useState } from 'react';
// import { eventBus, initialEventPayload } from './eventBus'; // ✅ Import initial values from eventBus
// import type { EventPayload } from './eventBus';

// export function useEventSubscriber() : EventPayload {
//   const [event, setEvent] = useState<EventPayload>(eventBus.getState() || initialEventPayload); // Initialize with current state or initial values

//   useEffect(() => {
//    const unsubscribe = eventBus.subscribe(setEvent);
//    return () => unsubscribe();
//   }, []);

//   return event;
// }

