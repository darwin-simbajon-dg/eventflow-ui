// import merge from 'lodash.merge';
// import type { UserData } from '../types/UserData';

// const STORAGE_KEY = "event-payload";

// // src/eventBus.ts
// export type EventPayload = {
//     showLogin?: boolean;
//     showHeader?: boolean;
//     showTabs?: boolean;
//     showProfile?: boolean;
//     showEvents?: boolean;
//     userAuthenticated?: boolean;
//     isAdmin?: boolean;
//     isStudent?: boolean;
//     loading?: boolean;
//     userData: UserData;
//     events?: Array<{
//       id: string;
//       title: string;
//       createdDate: string;
//       description?: string;
//       imageUrl?: string;
//     }>;
//     data?: any;
//   };
  
//   // const defaultState: EventPayload = {
//   //   showLogin: true,
//   //   showHeader: false,
//   //   showTabs: false,
//   //   showProfile: false,
//   //   showEvents: false,
//   //   loading: false,
//   //   isAdmin: false,
//   //   isStudent: false,
//   //   userData: {
//   //     username: '',
//   //     userId: '',
//   //     role: '',
//   //     studentNumber: '',
//   //   },
//   //   userAuthenticated: false,
//   //   events: [],
//   //   data: null,
//   // };

//   // const initialState: EventPayload = merge({}, defaultState, loadFromStorage());

// // ✅ Load saved state from localStorage
// // function loadFromStorage(): EventPayload {
// //   const stored = localStorage.getItem(STORAGE_KEY);
// //   if (!stored) return {};
// //   try {
// //     return JSON.parse(stored);
// //   } catch {
// //     return {};
// //   }
// // }

// function saveToStorage(payload: EventPayload) {
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
// }

//   type Listener = (state: EventPayload) => void;
  
//   // class EventBus {
//   //   private state: EventPayload = initialState;
//   //   private listeners = new Set<Listener>();

//   //   getState(): EventPayload {
//   //     return this.state;
//   //   }

//   //   emit(update: Partial<EventPayload>) {
//   //     this.state = merge({}, this.state, update);
//   //     saveToStorage(this.state);
//   //     this.listeners.forEach((listener) => listener(this.state));
//   //   }

//   //   subscribe(callback: Listener) {
//   //     this.listeners.add(callback);
//   //     // Return an unsubscribe function
//   //     callback(this.state)
//   //     return () => {
//   //       this.listeners.delete(callback);
//   //     };
//   //   }
//   // }

//   // export const eventBus = new EventBus();
//   // export const initialEventPayload = initialState;


  
  