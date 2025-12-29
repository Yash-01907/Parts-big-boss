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
}

// Initial State
let authState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const listeners = new Set<() => void>();

// Store Implementation
export const authStore = {
  get: () => authState,
  
  login: (user: User) => {
    authState = {
      user,
      isAuthenticated: true,
    };
    emitChange();
  },

  logout: () => {
    authState = {
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
const getServerSnapshot = (): AuthState => ({
  user: null,
  isAuthenticated: false,
});

// Hook
export function useAuthStore() {
  return useSyncExternalStore(authStore.subscribe, authStore.get, getServerSnapshot);
}
