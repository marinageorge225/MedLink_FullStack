import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginInput } from '@medlink/shared';
import { apiClient } from '../../lib/api-client';
import { useAuthStore } from '../../stores/auth.store';
import { Button } from '../../components/ui/Button';
import { Stethoscope, Lock, Mail, AlertCircle } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const loginToStore = useAuthStore((state) => state.login);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      const res: any = await apiClient.post('/auth/login', data);
      const token = res.data?.accessToken || res.accessToken;
      const user = res.data?.user || res.user;

      loginToStore(token, user);

      if (user.role === 'ADMIN') navigate('/admin');
      else if (user.role === 'DOCTOR') navigate('/doctor');
      else navigate('/patient');
    } catch (err: any) {
      setErrorMessage(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl border border-slate-200 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-cyan-50 text-cyan-600 rounded-xl mb-2">
            <Stethoscope className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Sign in to MedLink</h1>
          <p className="text-sm text-slate-500">Access your healthcare portal</p>
        </div>

        {errorMessage && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-sm text-rose-700">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                {...register('email')}
                type="email"
                placeholder="doctor@medlink.com"
                className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              />
            </div>
            {errors.email && (
              <p className="text-xs text-rose-600">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                {...register('password')}
                type="password"
                placeholder="••••••••"
                className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              />
            </div>
            {errors.password && (
              <p className="text-xs text-rose-600">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        <div className="text-center text-xs text-slate-500">
          Don't have an account?{' '}
          <Link to="/auth/register" className="text-cyan-700 font-semibold hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};
