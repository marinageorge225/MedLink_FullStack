import { create } from 'zustand';
import { UserRole } from '@medlink/shared';

interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
}

const getInitialUser = (): AuthUser | null => {
  try {
    const raw = localStorage.getItem('medlink_user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const useAuthStore = create<AuthState>((set) => ({
  user: getInitialUser(),
  token: localStorage.getItem('medlink_token'),
  isAuthenticated: !!localStorage.getItem('medlink_token'),

  login: (token, user) => {
    localStorage.setItem('medlink_token', token);
    localStorage.setItem('medlink_user', JSON.stringify(user));
    set({ token, user, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('medlink_token');
    localStorage.removeItem('medlink_user');
    set({ token: null, user: null, isAuthenticated: false });
  },
}));
