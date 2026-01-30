import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { TeamProvider } from './contexts/TeamContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Login from './screens/Login';
import Layout from './components/Layout';
import TeamDashboard from './screens/TeamDashboard';
import MedicalDashboard from './screens/MedicalDashboard';
import PlayerMedicalProfile from './screens/PlayerMedicalProfile';
import ActiveInjuries from './screens/ActiveInjuries';
import StaffQuestionnaires from './screens/StaffQuestionnaires';
import MedicalStats from './screens/MedicalStats';
import ExportReport from './screens/ExportReport';
import PlayerWellness from './screens/player/PlayerWellness';
import Questionnaire from './screens/Questionnaire';
import ProfileSettings from './screens/ProfileSettings';
import Knowledge from './screens/Knowledge';
import GymTraining from './screens/GymTraining';
import PlayerPreTraining from './screens/player/PlayerPreTraining';
import PlayerPostTraining from './screens/player/PlayerPostTraining';
import PlayerPlaybook from './screens/player/PlayerPlaybook';
import PlayerCalendar from './screens/player/PlayerCalendar';
import PlayerRestQ from './screens/player/PlayerRestQ';
import { PlayerGym } from './screens/player/PlayerScreens';

// Fallbacks/Aliases
const PrepaDashboard = TeamDashboard;
const DailyCheckin = Questionnaire;

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <LanguageProvider>
        <TeamProvider>
          <HashRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
// ...

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
                      <Route path="knowledge" element={<Knowledge />} />
                      <Route path="profile-settings" element={<ProfileSettings />} />
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
                      <Route path="pre-training" element={<PlayerPreTraining />} />
                      <Route path="gym" element={<PlayerGym />} />
                      <Route path="post-training" element={<PlayerPostTraining />} />
                      <Route path="playbook" element={<PlayerPlaybook />} />
                      <Route path="calendar" element={<PlayerCalendar />} />
                      <Route path="restq" element={<PlayerRestQ />} />
                      <Route path="profile-settings" element={<ProfileSettings />} />
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
                      <Route path="players" element={<MedicalDashboard />} />
                      <Route path="player/:id" element={<PlayerMedicalProfile />} />
                      <Route path="players/:id" element={<PlayerMedicalProfile />} />
                      <Route path="active-injuries" element={<ActiveInjuries />} />
                      <Route path="daily-forms" element={<StaffQuestionnaires />} />
                      <Route path="stats" element={<MedicalStats />} />
                      <Route path="report" element={<ExportReport />} />
                      <Route path="knowledge" element={<Knowledge />} />
                      <Route path="profile-settings" element={<ProfileSettings />} />
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
                      <Route path="players" element={<MedicalDashboard />} />
                      <Route path="player/:id" element={<PlayerMedicalProfile />} />
                      <Route path="players/:id" element={<PlayerMedicalProfile />} />
                      <Route path="active-injuries" element={<ActiveInjuries />} />
                      <Route path="daily-forms" element={<StaffQuestionnaires />} />
                      <Route path="stats" element={<MedicalStats />} />
                      <Route path="gym" element={<GymTraining />} />
                      <Route path="knowledge" element={<Knowledge />} />
                      <Route path="profile-settings" element={<ProfileSettings />} />
                      <Route path="*" element={<div className="p-10 text-white">404 - Prepa Page Not Found</div>} />
                    </Routes>
                  </Layout>
                </ProtectedRoute>
              } />

              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="*" element={<div className="p-10 text-white bg-red-900">404 - GLOBAL ROUTE NOT FOUND</div>} />
            </Routes>
          </HashRouter>
        </TeamProvider>
      </LanguageProvider>
    </AuthProvider>
  );
};

export default App;
