
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './screens/Login';
import Layout from './components/Layout';
import PlayerWellness from './screens/player/PlayerWellness'; // Fixed path
import DailyCheckin from './screens/Questionnaire'; // Mapped to existing file
import MedicalDashboard from './screens/MedicalDashboard';
import TeamDashboard from './screens/TeamDashboard';
import PlayerMedicalProfile from './screens/PlayerMedicalProfile';
import ActiveInjuries from './screens/ActiveInjuries';
import StaffQuestionnaires from './screens/StaffQuestionnaires';
import MedicalStats from './screens/MedicalStats';
import ExportReport from './screens/ExportReport';

// Placeholders for missing dashboards
const FisioDashboard = TeamDashboard;
const PrepaDashboard = TeamDashboard;

const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background-dark text-primary font-display animate-pulse">
        CARGANDO SISTEMA DE ALTO RENDIMIENTO...
      </div>
    );
  }

  if (!session) return <Navigate to="/login" replace />;

  return children;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* Medical / Doctor Routes */}
          <Route path="/medical/*" element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route path="dashboard" element={<TeamDashboard />} /> {/* Stats & Calendar */}
                  <Route path="team" element={<TeamDashboard />} />
                  <Route path="players" element={<MedicalDashboard />} /> {/* Player Grid */}
                  <Route path="player/:id" element={<PlayerMedicalProfile />} />
                  <Route path="players/:id" element={<PlayerMedicalProfile />} />
                  <Route path="injuries" element={<ActiveInjuries />} />
                  <Route path="active-injuries" element={<ActiveInjuries />} />
                  <Route path="daily-forms" element={<StaffQuestionnaires />} />
                  <Route path="stats" element={<MedicalStats />} />
                  <Route path="report" element={<ExportReport />} />
                  <Route path="*" element={<div className="p-10 text-white">404 - Medical Page Not Found</div>} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          } />

          {/* Player Routes */}
          <Route path="/player/*" element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route path="wellness" element={<PlayerWellness />} />
                  <Route path="checkin" element={<DailyCheckin />} />
                  <Route path="*" element={<div className="p-10 text-white">404 - Player Page Not Found</div>} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          } />

          {/* Fisio Routes - specific dashboard or reuse Medical/Team */}
          <Route path="/fisio/*" element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route path="dashboard" element={<TeamDashboard />} />
                  <Route path="players" element={<TeamDashboard />} />
                  <Route path="active-injuries" element={<ActiveInjuries />} />
                  <Route path="daily-forms" element={<StaffQuestionnaires />} />
                  <Route path="stats" element={<MedicalStats />} />
                  <Route path="*" element={<div className="p-10 text-white">404 - Fisio Page Not Found</div>} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          } />

          {/* Prepa Routes */}
          <Route path="/prepa/*" element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route path="dashboard" element={<PrepaDashboard />} />
                  <Route path="*" element={<div className="p-10 text-white">404 - Prepa Page Not Found</div>} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<div className="p-10 text-white bg-red-900">404 - GLOBAL ROUTE NOT FOUND</div>} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;
