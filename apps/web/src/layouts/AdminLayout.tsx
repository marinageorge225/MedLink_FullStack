import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { ShieldCheck, BarChart3, UserCheck, CreditCard, Settings } from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const links = [
    { label: 'Platform Overview', href: '/admin', icon: BarChart3 },
    { label: 'Doctor Approvals', href: '/admin/doctors', icon: UserCheck },
    { label: 'User Management', href: '/admin/users', icon: ShieldCheck },
    { label: 'Payment Logs', href: '/admin/payments', icon: CreditCard },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 space-y-1">
          <div className="p-4 bg-slate-900 text-white rounded-xl mb-4">
            <h2 className="font-bold text-base">Admin Console</h2>
            <p className="text-xs text-slate-400">System management & security</p>
          </div>
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.href}
                to={link.href}
                end={link.href === '/admin'}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-slate-200 text-slate-900 font-semibold'
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
