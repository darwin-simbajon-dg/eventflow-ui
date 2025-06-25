import { useEffect, useState } from 'react';
import { eventBus, initialEventPayload } from './eventBus'; // ✅ Import initial values from eventBus
import type { EventPayload } from './eventBus';

export function useEventSubscriber() {
  const [event, setEvent] = useState<EventPayload>(initialEventPayload); // ✅ use initial values

  useEffect(() => {
    const handler = (payload: EventPayload) => {
      setEvent((prev) => ({ ...prev, ...payload }));
    };

    eventBus.on('updateUI', handler);
    return () => {
      eventBus.off('updateUI', handler);
    };
  }, []);

  return event;
}
