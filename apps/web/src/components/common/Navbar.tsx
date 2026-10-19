import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Stethoscope, User, LogOut, Shield, Calendar } from 'lucide-react';
import { Button } from '../ui/Button';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 text-cyan-700 font-bold text-xl tracking-tight">
          <div className="p-2 bg-cyan-100 text-cyan-700 rounded-xl">
            <Stethoscope className="w-5 h-5" />
          </div>
          <span>MedLink</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-600">
          <Link to="/" className="hover:text-cyan-600 transition-colors">
            Home
          </Link>
          {isAuthenticated && user?.role === 'PATIENT' && (
            <Link to="/patient" className="hover:text-cyan-600 flex items-center gap-1">
              <Calendar className="w-4 h-4" /> Patient Portal
            </Link>
          )}
          {isAuthenticated && user?.role === 'DOCTOR' && (
            <Link to="/doctor" className="hover:text-cyan-600 flex items-center gap-1">
              <Stethoscope className="w-4 h-4" /> Doctor Portal
            </Link>
          )}
          {isAuthenticated && user?.role === 'ADMIN' && (
            <Link to="/admin" className="hover:text-cyan-600 flex items-center gap-1">
              <Shield className="w-4 h-4" /> Admin Portal
            </Link>
          )}
        </nav>

        <div className="flex items-center space-x-3">
          {isAuthenticated ? (
            <div className="flex items-center space-x-3">
              <span className="text-xs font-semibold px-2.5 py-1 bg-cyan-50 text-cyan-700 rounded-full border border-cyan-200 uppercase">
                {user?.role}
              </span>
              <span className="text-sm text-slate-700 font-medium hidden sm:inline">
                {user?.email}
              </span>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-rose-600 hover:bg-rose-50">
                <LogOut className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/auth/login">
                <Button variant="ghost" size="sm">
                  <User className="w-4 h-4 mr-1.5" /> Login
                </Button>
              </Link>
              <Link to="/auth/register">
                <Button variant="primary" size="sm">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
