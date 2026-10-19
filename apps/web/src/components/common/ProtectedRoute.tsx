import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { UserRole } from '@medlink/shared';

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Redirect to respective dashboard if role doesn't match
    if (user.role === UserRole.PATIENT) return <Navigate to="/patient" replace />;
    if (user.role === UserRole.DOCTOR) return <Navigate to="/doctor" replace />;
    if (user.role === UserRole.ADMIN) return <Navigate to="/admin" replace />;
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
