import React from 'react';
import { Calendar, Clock, User, PlusCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const PatientDashboard: React.FC = () => {
  const dummyAppointments = [
    {
      id: '1',
      doctorName: 'Dr. Sarah Smith',
      specialty: 'Cardiology',
      date: 'Tomorrow, 10:30 AM',
      status: 'CONFIRMED',
    },
    {
      id: '2',
      doctorName: 'Dr. Michael Chen',
      specialty: 'Dermatology',
      date: 'Oct 24, 2:00 PM',
      status: 'PENDING',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Your Health Dashboard</h1>
          <p className="text-sm text-slate-500">Track and schedule your consultations</p>
        </div>
        <Button className="gap-2">
          <PlusCircle className="w-4 h-4" /> Book New Appointment
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500 font-medium">Upcoming Visits</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">2</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500 font-medium">Active Prescriptions</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">3</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500 font-medium">Messages</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">1 New</p>
        </div>
      </div>

      {/* Upcoming Appointments list */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-bold text-slate-900">Upcoming Appointments</h2>
        </div>
        <div className="divide-y divide-slate-100">
          {dummyAppointments.map((appt) => (
            <div key={appt.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{appt.doctorName}</h3>
                  <p className="text-xs text-cyan-600 font-medium">{appt.specialty}</p>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {appt.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="px-2.5 py-1 text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
                  {appt.status}
                </span>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
