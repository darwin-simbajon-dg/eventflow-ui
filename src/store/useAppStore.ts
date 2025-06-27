import { create } from 'zustand';

type AppState = {
    showLogin: boolean;
    showHeader: boolean;
    showTabs: boolean;
    showProfile: boolean;
    showEvents: boolean;
    userAuthenticated: boolean;
    isAdmin: boolean;
    isStudent: boolean;
    loading: boolean;
    events: any[];
    data: any;
  
    setState: (partial: Partial<AppState>) => void;
  };

  export const useAppStore = create<AppState>((set) => ({
    showLogin: true,
    showHeader: false,
    showTabs: false,
    showProfile: false,
    showEvents: false,
    userAuthenticated: false,
    isAdmin: false,
    isStudent: false,
    loading: false,
    events: [],
    data: null,
  
    setState: (partial) => set(partial),
  }));