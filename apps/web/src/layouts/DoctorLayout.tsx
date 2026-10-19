import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Calendar, Users, FileEdit, MessageSquare, Clock } from 'lucide-react';

export const DoctorLayout: React.FC = () => {
  const links = [
    { label: 'Schedule & Appointments', href: '/doctor', icon: Calendar },
    { label: 'Patient Queue', href: '/doctor/patients', icon: Users },
    { label: 'Issue Prescriptions', href: '/doctor/prescriptions', icon: FileEdit },
    { label: 'Consultation Chat', href: '/doctor/chat', icon: MessageSquare },
    { label: 'Availability Slots', href: '/doctor/availability', icon: Clock },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 space-y-1">
          <div className="p-4 bg-teal-700 text-white rounded-xl mb-4">
            <h2 className="font-bold text-base">Doctor Workspace</h2>
            <p className="text-xs text-teal-100">Consultations & patients</p>
          </div>
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.href}
                to={link.href}
                end={link.href === '/doctor'}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-teal-50 text-teal-800 font-semibold'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </aside>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
