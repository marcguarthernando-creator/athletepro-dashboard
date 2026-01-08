
import React from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './screens/Dashboard';
import TrainingLoad from './screens/TrainingLoad';
import SleepAnalysis from './screens/SleepAnalysis';
import Trends from './screens/Trends';
import Questionnaire from './screens/Questionnaire';
import Journal from './screens/Journal';
import PerformanceProfile from './screens/PerformanceProfile';
import ExportReport from './screens/ExportReport';
import Lab from './screens/Lab';
import AICoach from './screens/AICoach';

import Login from './screens/Login';
import PlayerLayout from './components/layouts/PlayerLayout';
import PlayerWellness from './screens/player/PlayerWellness';
import PlayerGym from './screens/player/PlayerGym';
import PlayerRPE from './screens/player/PlayerRPE';
import MedicalDashboard from './screens/MedicalDashboard';
import MedicalStats from './screens/MedicalStats';
import PlayerMedicalProfile from './screens/PlayerMedicalProfile';
import PlayerMedicalReport from './screens/PlayerMedicalReport';
import PlayerCalendar from './screens/player/PlayerCalendar';
import PlayerPlaybook from './screens/player/PlayerPlaybook';
import PlayerMedical from './screens/player/PlayerMedical';
import TeamDashboard from './screens/TeamDashboard';
import StaffQuestionnaires from './screens/StaffQuestionnaires';
import ActiveInjuries from './screens/ActiveInjuries';
import MedicalForm from './screens/MedicalForm';
import FisioForm from './screens/FisioForm';
import GymForm from './screens/GymForm';
import UpdatePlayerData from './screens/UpdatePlayerData';
import UserProfileSettings from './screens/UserProfileSettings';
import PlayerFisioReport from './screens/PlayerFisioReport';

const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const isAuth = localStorage.getItem('isAuthenticated') === 'true';
  const userEmail = localStorage.getItem('userEmail');
  const location = useLocation();

  if (!isAuth) return <Navigate to="/login" replace />;

  const isPlayer = userEmail === 'jugador@cbc.com' || userEmail === 'jugadores@cbc.com';

  if (isPlayer && !location.pathname.startsWith('/player')) {
    return <Navigate to="/player/wellness" replace />;
  }

  if (userEmail === 'medico@cbc.com' && !location.pathname.startsWith('/medical')) {
    return <Navigate to="/medical" replace />;
  }

  if (userEmail === 'fisio@cbc.com' && !location.pathname.startsWith('/fisio')) {
    return <Navigate to="/fisio" replace />;
  }

  if (userEmail === 'prepa@cbc.com' && !location.pathname.startsWith('/prepa')) {
    return <Navigate to="/prepa" replace />;
  }

  return children;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Player Routes */}
        <Route
          path="/player/*"
          element={
            <ProtectedRoute>
              <PlayerLayout>
                <Routes>
                  <Route path="calendar" element={<PlayerCalendar />} />
                  <Route path="playbook" element={<PlayerPlaybook />} />
                  <Route path="medical" element={<PlayerMedical />} />
                  <Route path="wellness" element={<PlayerWellness />} />
                  <Route path="gym" element={<PlayerGym />} />
                  <Route path="rpe" element={<PlayerRPE />} />
                  <Route path="*" element={<Navigate to="wellness" replace />} />
                </Routes>
              </PlayerLayout>
            </ProtectedRoute>
          }
        />

        {/* Doctor Routes */}
        <Route
          path="/medical/*"
          element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route path="/" element={<Navigate to="/medical/dashboard" replace />} />
                  <Route path="/players" element={<MedicalDashboard />} />
                  <Route path="/players/:id" element={<PlayerMedicalProfile />} />
                  <Route path="/dashboard" element={<TeamDashboard />} />
                  <Route path="/daily-forms" element={<StaffQuestionnaires />} />
                  <Route path="/active-injuries" element={<ActiveInjuries />} />
                  <Route path="/stats" element={<MedicalStats />} />
                  <Route path="/report/:id" element={<PlayerMedicalReport />} />
                  <Route path="/report" element={<MedicalForm />} />
                  <Route path="/update-data" element={<UpdatePlayerData />} />
                  <Route path="/profile-settings" element={<UserProfileSettings />} />
                  <Route path="*" element={<Navigate to="/medical/dashboard" replace />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Fisio Routes */}
        <Route
          path="/fisio/*"
          element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route path="/" element={<Navigate to="/fisio/dashboard" replace />} />
                  <Route path="/players" element={<MedicalDashboard />} />
                  <Route path="/players/:id" element={<PlayerMedicalProfile />} />
                  <Route path="/dashboard" element={<TeamDashboard />} />
                  <Route path="/daily-forms" element={<StaffQuestionnaires />} />
                  <Route path="/active-injuries" element={<ActiveInjuries />} />
                  <Route path="/stats" element={<MedicalStats />} />
                  <Route path="/report/:id" element={<PlayerFisioReport />} />
                  <Route path="/report" element={<FisioForm />} />
                  <Route path="/profile-settings" element={<UserProfileSettings />} />
                  <Route path="*" element={<Navigate to="/fisio/dashboard" replace />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Prepa Routes */}
        <Route
          path="/prepa/*"
          element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route path="/" element={<Navigate to="/prepa/dashboard" replace />} />
                  <Route path="/players" element={<MedicalDashboard />} />
                  <Route path="/players/:id" element={<PlayerMedicalProfile />} />
                  <Route path="/dashboard" element={<TeamDashboard />} />
                  <Route path="/daily-forms" element={<StaffQuestionnaires />} />
                  <Route path="/active-injuries" element={<ActiveInjuries />} />
                  <Route path="/stats" element={<MedicalStats />} />
                  <Route path="/gym" element={<GymForm />} />
                  <Route path="/profile-settings" element={<UserProfileSettings />} />
                  <Route path="*" element={<Navigate to="/prepa/dashboard" replace />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Admin/Staff Routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/load" element={<TrainingLoad />} />
                  <Route path="/sleep" element={<SleepAnalysis />} />
                  <Route path="/trends" element={<Trends />} />
                  <Route path="/questionnaire" element={<Questionnaire />} />
                  <Route path="/journal" element={<Journal />} />
                  <Route path="/performance" element={<PerformanceProfile />} />
                  <Route path="/export" element={<ExportReport />} />
                  <Route path="/lab" element={<Lab />} />
                  <Route path="/coach" element={<AICoach />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </HashRouter>
  );
};

export default App;
