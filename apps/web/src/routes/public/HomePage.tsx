import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Calendar, Users, HeartPulse, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const HomePage: React.FC = () => {
  const specialties = [
    { title: 'Cardiology', icon: HeartPulse, count: '18 Specialists' },
    { title: 'Dermatology', icon: Users, count: '24 Specialists' },
    { title: 'Pediatrics', icon: Users, count: '15 Specialists' },
    { title: 'Neurology', icon: Shield, count: '12 Specialists' },
  ];

  return (
    <div className="space-y-16 py-12">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-50 border border-cyan-200 rounded-full text-xs font-semibold text-cyan-800">
          <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
          Modern Healthcare Platform
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto">
          Connect with trusted doctors,{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-teal-500">
            schedule visits effortlessly.
          </span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          MedLink connects patients with board-certified physicians for seamless clinic and telehealth appointments, digital prescriptions, and direct consultation chat.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Link to="/auth/register">
            <Button size="lg" className="shadow-lg shadow-cyan-600/20 gap-2">
              Book an Appointment <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link to="/auth/login">
            <Button variant="outline" size="lg">
              Doctor Sign In
            </Button>
          </Link>
        </div>
      </section>

      {/* Specialties Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Explore Medical Specialties</h2>
          <p className="text-sm text-slate-500">Find top specialists matched to your healthcare needs</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {specialties.map((spec) => {
            const Icon = spec.icon;
            return (
              <div
                key={spec.title}
                className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow group flex items-start space-x-4 cursor-pointer"
              >
                <div className="p-3 bg-cyan-50 group-hover:bg-cyan-600 text-cyan-700 group-hover:text-white rounded-xl transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 group-hover:text-cyan-700 transition-colors">
                    {spec.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">{spec.count}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Feature highlights */}
      <section className="bg-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">Instant Online Booking</h3>
              <p className="text-sm text-slate-600">
                Choose your doctor, pick an open slot, and get instant booking confirmations and reminders.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">Verified Physicians</h3>
              <p className="text-sm text-slate-600">
                Every doctor is vetted and verified with verified credentials before accepting appointments.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">Integrated Records</h3>
              <p className="text-sm text-slate-600">
                Access your prescriptions, diagnoses, and payment history securely anytime.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
