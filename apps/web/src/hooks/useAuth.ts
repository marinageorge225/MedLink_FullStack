import { useAuthStore } from '../stores/auth.store';

export const useAuth = () => {
  const { user, token, isAuthenticated, login, logout } = useAuthStore();
  return {
    user,
    token,
    isAuthenticated,
    isPatient: user?.role === 'PATIENT',
    isDoctor: user?.role === 'DOCTOR',
    isAdmin: user?.role === 'ADMIN',
    login,
    logout,
  };
};
