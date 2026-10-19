import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterInput, UserRole } from '@medlink/shared';
import { apiClient } from '../../lib/api-client';
import { useAuthStore } from '../../stores/auth.store';
import { Button } from '../../components/ui/Button';
import { Stethoscope, Lock, Mail, User, AlertCircle } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const loginToStore = useAuthStore((state) => state.login);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: UserRole.PATIENT,
    },
  });

  const onSubmit = async (data: RegisterInput) => {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      const res: any = await apiClient.post('/auth/register', data);
      const token = res.data?.accessToken || res.accessToken;
      const user = res.data?.user || res.user;

      loginToStore(token, user);

      if (user.role === 'DOCTOR') navigate('/doctor');
      else navigate('/patient');
    } catch (err: any) {
      setErrorMessage(err.message || 'Registration failed. Please check inputs.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl border border-slate-200 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-cyan-50 text-cyan-600 rounded-xl mb-2">
            <Stethoscope className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Create an Account</h1>
          <p className="text-sm text-slate-500">Join MedLink healthcare ecosystem</p>
        </div>

        {errorMessage && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-sm text-rose-700">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">First Name</label>
              <input
                {...register('firstName')}
                type="text"
                placeholder="Jane"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              />
              {errors.firstName && (
                <p className="text-xs text-rose-600">{errors.firstName.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Last Name</label>
              <input
                {...register('lastName')}
                type="text"
                placeholder="Doe"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              />
              {errors.lastName && (
                <p className="text-xs text-rose-600">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                {...register('email')}
                type="email"
                placeholder="jane.doe@example.com"
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

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Account Type</label>
            <select
              {...register('role')}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none bg-white"
            >
              <option value={UserRole.PATIENT}>Patient</option>
              <option value={UserRole.DOCTOR}>Doctor / Specialist</option>
            </select>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>

        <div className="text-center text-xs text-slate-500">
          Already have an account?{' '}
          <Link to="/auth/login" className="text-cyan-700 font-semibold hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};
