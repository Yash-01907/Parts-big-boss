import { useSyncExternalStore } from 'react';
// Types
interface User {
  id: string;
  name?: string;
  email: string;
  type: 'customer' | 'merchant';
  token?: string;
  phone?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  activeAuthTab: 'customer' | 'merchant';
}

// Initial State
let authState: AuthState = {
  user: null,
  isAuthenticated: false,
  activeAuthTab: 'customer',
};

// hydrate for caching login
export const hydrate = (user: User | null) => {
  authState = {
    ...authState,
    user,
    isAuthenticated: !!user,
  };
  emitChange();
};

const listeners = new Set<() => void>();
// const listeners = new Set();


// Store Implementation
export const authStore = {
  get: () => authState,
  
  setAuthTab: (tab: 'customer' | 'merchant') => {
    authState = { ...authState, activeAuthTab: tab };
    emitChange();
  },

  login: (user: User) => {
    authState = {
      ...authState,
      user,
      isAuthenticated: true,
    };
    emitChange();
  },

  logout: () => {
    authState = {
      ...authState,
      user: null,
      isAuthenticated: false,
    };
    emitChange();
  },

  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }
};

// Helper
function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

// Server Snapshot
// Server Snapshot
const serverSnapshot: AuthState = {
  user: null,
  isAuthenticated: false,
  activeAuthTab: 'customer',
};

const getServerSnapshot = (): AuthState => serverSnapshot;

// Hook
export function useAuthStore() {
  return useSyncExternalStore(authStore.subscribe, authStore.get, getServerSnapshot);
}
