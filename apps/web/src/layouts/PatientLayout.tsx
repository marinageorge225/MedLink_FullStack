import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Calendar, User, FileText, MessageSquare } from 'lucide-react';

export const PatientLayout: React.FC = () => {
  const links = [
    { label: 'Appointments', href: '/patient', icon: Calendar },
    { label: 'My Prescriptions', href: '/patient/prescriptions', icon: FileText },
    { label: 'Chat', href: '/patient/chat', icon: MessageSquare },
    { label: 'Medical Profile', href: '/patient/profile', icon: User },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 space-y-1">
          <div className="p-4 bg-cyan-700 text-white rounded-xl mb-4">
            <h2 className="font-bold text-base">Patient Portal</h2>
            <p className="text-xs text-cyan-100">Manage your care & visits</p>
          </div>
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.href}
                to={link.href}
                end={link.href === '/patient'}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-cyan-50 text-cyan-800 font-semibold'
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
