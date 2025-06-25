// import { EventEmitter } from 'events';

// const eventBus = new EventEmitter();
// eventBus.setMaxListeners(20);

// export type EventPayload = {
//   showLogin?: boolean;
//   showHeader?: boolean;
//   showTabs?: boolean;
//   userAuthenticated?: boolean;
//   data?: any;
// };

// export { eventBus}

// src/eventBus.ts
export type EventPayload = {
    showLogin?: boolean;
    showHeader?: boolean;
    showTabs?: boolean;
    showProfile?: boolean;
    showEvents?: boolean;
    userAuthenticated?: boolean;
    data?: any;
  };
  
  export const initialEventPayload: EventPayload = {
    showLogin: true,
    showHeader: false,
    showTabs: false,
    showProfile: false,
    showEvents: true,
    userAuthenticated: false,
    data: null,
  };
  
  type EventCallback = (payload: EventPayload) => void;
  
  class EventBus {
    private listeners: Record<string, Set<EventCallback>> = {};
  
    on(eventName: string, callback: EventCallback) {
      if (!this.listeners[eventName]) {
        this.listeners[eventName] = new Set();
      }
      this.listeners[eventName].add(callback);
    }
  
    off(eventName: string, callback: EventCallback) {
      this.listeners[eventName]?.delete(callback);
    }
  
    emit(eventName: string, payload: EventPayload) {
      this.listeners[eventName]?.forEach((callback) => callback(payload));
    }
  }
  
  export const eventBus = new EventBus();
  