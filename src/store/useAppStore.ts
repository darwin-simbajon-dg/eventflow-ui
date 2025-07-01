import { create } from 'zustand';
import type { UserData } from '../types/UserData';
import { persist } from 'zustand/middleware';
import type { ModalOptions } from '../types/ModalOptions';

type AppState = {
    showLogin: boolean;
    showHeader: boolean;
    showTabs: boolean;
    showProfile: boolean;
    showEvents: boolean;
    showScanner: boolean;
    showRegister: boolean;
    showEventForm?: boolean; // Optional property for edit event form
    userAuthenticated: boolean;
    isAdmin: boolean;
    isStudent: boolean;
    isEdit: boolean;
    isCreate: boolean;
    userData: UserData | null;
    loading: boolean;
    events: any[];
    data: any;
    selectedEvent: any | null;
    showModal: boolean;
    modalOptions: ModalOptions | null;
    config: {
      apiBaseUrl: string;
      signalRUrl: string;
    } | null;
    setConfig: (config: any) => void;
    openModal: (options: ModalOptions) => void;
    closeModal: () => void;
    setSelectedEvent: (event: any) => void;
    setState: (partial: Partial<AppState>) => void;
  };

  export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      showLogin: true,
      showHeader: false,
      showTabs: false,
      showProfile: false,
      showEvents: false,
      showEventForm: false, 
      showScanner: false,
      showRegister: false,
      userAuthenticated: false,
      userData: null,
      isEdit: false,
      isCreate: false,
      isAdmin: false,
      isStudent: false,
      loading: false,
      events: [],
      data: null,
      selectedEvent: null,
      showModal: false,
      modalOptions: null,
      config: null,
      setConfig: (config) => set({ config }),
      setSelectedEvent: (event: any) => set({ selectedEvent: event }),
      setState: (newState) => set((state) => ({ ...state, ...newState })),     
      openModal: (options) => set({ showModal: true, modalOptions: options }),
      closeModal: () => set({ showModal: false, modalOptions: null }),
    }),
    {
      name: 'app-store', // Key in localStorage
      partialize: (state) => 
        Object.fromEntries(
          Object.entries(state).filter(([key]) => key !== 'events')
        ),
    }
  )

);