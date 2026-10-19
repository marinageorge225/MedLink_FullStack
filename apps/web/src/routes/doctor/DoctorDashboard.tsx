import React from 'react';
import { Calendar, Users, CheckCircle, Clock } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const DoctorDashboard: React.FC = () => {
  const appointmentsQueue = [
    {
      id: '1',
      patientName: 'John Doe',
      time: '10:30 AM',
      type: 'Follow-up Consultation',
      status: 'CONFIRMED',
    },
    {
      id: '2',
      patientName: 'Alice Johnson',
      time: '11:15 AM',
      type: 'New Patient Intake',
      status: 'PENDING',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Doctor Practice Overview</h1>
          <p className="text-sm text-slate-500">Manage patient queue and daily appointments</p>
        </div>
        <Button className="bg-teal-700 hover:bg-teal-800">
          Set Availability Slots
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500 font-medium">Today's Visits</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">8</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500 font-medium">Pending Requests</p>
          <p className="text-2xl font-bold text-amber-600 mt-1">3</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500 font-medium">Total Patients</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">142</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500 font-medium">Consultation Rating</p>
          <p className="text-2xl font-bold text-teal-700 mt-1">4.9 ★</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-bold text-slate-900">Today's Patient Schedule</h2>
        </div>
        <div className="divide-y divide-slate-100">
          {appointmentsQueue.map((item) => (
            <div key={item.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{item.patientName}</h3>
                  <p className="text-xs text-slate-500">{item.type} • {item.time}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  Patient History
                </Button>
                <Button size="sm" className="bg-teal-700 hover:bg-teal-800">
                  Start Consultation
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
