import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RootLayout } from './layouts/RootLayout';
import { PatientLayout } from './layouts/PatientLayout';
import { DoctorLayout } from './layouts/DoctorLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { ProtectedRoute } from './components/common/ProtectedRoute';

import { HomePage } from './routes/public/HomePage';
import { LoginPage } from './routes/auth/LoginPage';
import { RegisterPage } from './routes/auth/RegisterPage';
import { PatientDashboard } from './routes/patient/PatientDashboard';
import { DoctorDashboard } from './routes/doctor/DoctorDashboard';
import { AdminDashboard } from './routes/admin/AdminDashboard';
import { UserRole } from '@medlink/shared';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes with Main Navbar */}
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />

          {/* Protected Patient Portal */}
          <Route element={<ProtectedRoute allowedRoles={[UserRole.PATIENT, UserRole.ADMIN]} />}>
            <Route path="/patient" element={<PatientLayout />}>
              <Route index element={<PatientDashboard />} />
              <Route path="prescriptions" element={<div className="bg-white p-6 rounded-2xl border border-slate-200">Prescriptions List</div>} />
              <Route path="chat" element={<div className="bg-white p-6 rounded-2xl border border-slate-200">Consultation Chat</div>} />
              <Route path="profile" element={<div className="bg-white p-6 rounded-2xl border border-slate-200">Patient Medical Profile</div>} />
            </Route>
          </Route>

          {/* Protected Doctor Portal */}
          <Route element={<ProtectedRoute allowedRoles={[UserRole.DOCTOR, UserRole.ADMIN]} />}>
            <Route path="/doctor" element={<DoctorLayout />}>
              <Route index element={<DoctorDashboard />} />
              <Route path="patients" element={<div className="bg-white p-6 rounded-2xl border border-slate-200">Patient Queue</div>} />
              <Route path="prescriptions" element={<div className="bg-white p-6 rounded-2xl border border-slate-200">Digital Prescription Pad</div>} />
              <Route path="chat" element={<div className="bg-white p-6 rounded-2xl border border-slate-200">Doctor Patient Chat</div>} />
              <Route path="availability" element={<div className="bg-white p-6 rounded-2xl border border-slate-200">Availability Management</div>} />
            </Route>
          </Route>

          {/* Protected Admin Portal */}
          <Route element={<ProtectedRoute allowedRoles={[UserRole.ADMIN]} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="doctors" element={<div className="bg-white p-6 rounded-2xl border border-slate-200">Doctor Approvals</div>} />
              <Route path="users" element={<div className="bg-white p-6 rounded-2xl border border-slate-200">All System Users</div>} />
              <Route path="payments" element={<div className="bg-white p-6 rounded-2xl border border-slate-200">Platform Financial Logs</div>} />
              <Route path="settings" element={<div className="bg-white p-6 rounded-2xl border border-slate-200">Platform Settings</div>} />
            </Route>
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
