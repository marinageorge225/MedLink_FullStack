import React from 'react';
import { ShieldCheck, Users, Activity, Check, X } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const AdminDashboard: React.FC = () => {
  const pendingDoctors = [
    {
      id: 'doc-1',
      name: 'Dr. David Warner',
      specialty: 'Orthopedics',
      license: 'MD-ORTH-8831',
      appliedAt: '2 hours ago',
    },
    {
      id: 'doc-2',
      name: 'Dr. Elena Rostova',
      specialty: 'Pediatrics',
      license: 'MD-PED-5512',
      appliedAt: 'Yesterday',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Platform Administration</h1>
          <p className="text-sm text-slate-500">System overview, verifications, and platform governance</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500 font-medium">Registered Patients</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">1,248</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500 font-medium">Active Doctors</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">64</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500 font-medium">Pending Verifications</p>
          <p className="text-2xl font-bold text-amber-600 mt-1">2</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500 font-medium">Total Appointments</p>
          <p className="text-2xl font-bold text-cyan-700 mt-1">3,490</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-slate-900">Doctor Credential Approvals</h2>
            <p className="text-xs text-slate-500">Verify physician licenses before granting active platform access</p>
          </div>
        </div>
        <div className="divide-y divide-slate-100">
          {pendingDoctors.map((doc) => (
            <div key={doc.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div>
                <h3 className="font-semibold text-slate-900">{doc.name}</h3>
                <p className="text-xs text-slate-500">{doc.specialty} • License #{doc.license}</p>
                <p className="text-xs text-slate-400 mt-1">Submitted: {doc.appliedAt}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="text-rose-600 hover:bg-rose-50">
                  <X className="w-4 h-4 mr-1" /> Reject
                </Button>
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                  <Check className="w-4 h-4 mr-1" /> Approve Doctor
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
