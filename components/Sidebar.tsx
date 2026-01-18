
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth(); // Use Auth Context

  // Fallback to localStorage for username/image if not in metadata, but use Context for logic
  const userEmail = user?.email || localStorage.getItem('userEmail');

  const isDoctor = userEmail?.includes('medico') || userEmail?.includes('marcguarthernando');
  const isFisio = userEmail?.includes('fisio');
  const isPrepa = userEmail?.includes('prepa');
  // If none of the above but authenticated as staff, default to Medical for now or check metadata
  const isMedicalStaff = isDoctor || isFisio || isPrepa || user?.user_metadata?.role === 'medical_staff';

  const isActive = (path: string) => location.pathname === path ? "bg-primary/10 text-primary border border-primary/20" : "text-text-secondary hover:bg-surface-dark hover:text-white";

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  const [profileImg, setProfileImg] = React.useState(localStorage.getItem('doctorImage') || "https://ui-avatars.com/api/?name=Dr+Sergio&background=00E5FF&color=0a192f");
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || "Dr. Berjón");

  React.useEffect(() => {
    const handleStorageChange = () => {
      const img = localStorage.getItem('doctorImage');
      const name = localStorage.getItem('userName');
      if (img) setProfileImg(img);
      setUserName(name || "Dr. Berjón");
    };
    window.addEventListener('storage', handleStorageChange);
    handleStorageChange();
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50 w-48 bg-background-dark border-r border-surface-border 
        flex flex-col justify-between p-2 h-full transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center justify-center p-4 border-b border-surface-border/50">
            <div className="flex flex-row items-center gap-2">
              <img src="/healthtrack-logo.png" alt="Health Track" className="h-8 w-auto object-contain" />
              <div className="h-6 w-px bg-surface-border"></div>
              <div className="flex flex-col items-center">
                <img src="/escudo-cbc.png" alt="CB BALONCESTO" className="h-10 w-10 object-cover rounded-full" />
              </div>
            </div>
          </div>

          <nav className="flex flex-col gap-1 overflow-y-auto max-h-[100vh]">
            {isMedicalStaff ? (
              <div className="flex flex-col gap-1 overflow-y-auto max-h-[75vh] custom-scrollbar pr-1">
                <Link to={isDoctor ? "/medical/dashboard" : isFisio ? "/fisio/dashboard" : "/prepa/dashboard"} className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group ${isActive(isDoctor ? "/medical/dashboard" : isFisio ? "/fisio/dashboard" : "/prepa/dashboard")}`}>
                  <span className="material-symbols-outlined">dashboard</span>
                  <p className="text-sm font-medium leading-normal tracking-tighter">DASHBOARD EQUIPO</p>
                </Link>
                <Link to={isDoctor ? "/medical/players" : isFisio ? "/fisio/players" : "/prepa/players"} className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group ${isActive(isDoctor ? "/medical/players" : isFisio ? "/fisio/players" : "/prepa/players")}`}>
                  <span className="material-symbols-outlined">groups</span>
                  <p className="text-sm font-medium leading-normal tracking-wide">JUGADORES</p>
                </Link>
                <Link to={isDoctor ? "/medical/daily-forms" : isFisio ? "/fisio/daily-forms" : "/prepa/daily-forms"} className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group ${isActive(isDoctor ? "/medical/daily-forms" : isFisio ? "/fisio/daily-forms" : "/prepa/daily-forms")}`}>
                  <span className="material-symbols-outlined">assignment</span>
                  <p className="text-sm font-medium leading-normal tracking-tighter uppercase">Cuestionarios</p>
                </Link>
                <Link to={isDoctor ? "/medical/active-injuries" : isFisio ? "/fisio/active-injuries" : "/prepa/active-injuries"} className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group ${isActive(isDoctor ? "/medical/active-injuries" : isFisio ? "/fisio/active-injuries" : "/prepa/active-injuries")}`}>
                  <span className="material-symbols-outlined">emergency</span>
                  <p className="text-sm font-medium leading-normal tracking-tighter uppercase">Lesiones Activas</p>
                </Link>

                <Link to={isDoctor ? "/medical/stats" : isFisio ? "/fisio/stats" : "/prepa/stats"} className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group ${isActive(isDoctor ? "/medical/stats" : isFisio ? "/fisio/stats" : "/prepa/stats")}`}>
                  <span className="material-symbols-outlined">monitoring</span>
                  <p className="text-sm font-medium leading-normal tracking-tighter uppercase">Estadística de Lesiones</p>
                </Link>

                <div className="my-2 border-t border-surface-border/50"></div>

                {isDoctor ? (
                  <>
                    <Link to="/medical/report" className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group ${isActive("/medical/report")}`}>
                      <span className="material-symbols-outlined">description</span>
                      <p className="text-sm font-medium leading-normal uppercase">Parte Médico</p>
                    </Link>
                  </>
                ) : isFisio ? (
                  <Link to="/fisio/report" className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group ${isActive("/fisio/report")}`}>
                    <span className="material-symbols-outlined">description</span>
                    <p className="text-sm font-medium leading-normal uppercase">Parte Fisio</p>
                  </Link>
                ) : (
                  <Link to="/prepa/gym" className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group ${isActive("/prepa/gym")}`}>
                    <span className="material-symbols-outlined">fitness_center</span>
                    <p className="text-sm font-medium leading-normal uppercase">Entrenamiento GYM</p>
                  </Link>
                )}
              </div>
            ) : (
              <>
                <Link to="/" className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group ${isActive("/")}`}>
                  <span className="material-symbols-outlined">dashboard</span>
                  <p className="text-sm font-medium leading-normal">Dashboard</p>
                </Link>
                <Link to="/load" className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group ${isActive("/load")}`}>
                  <span className="material-symbols-outlined">analytics</span>
                  <p className="text-sm font-medium leading-normal">Load Analysis</p>
                </Link>
                <Link to="/sleep" className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group ${isActive("/sleep")}`}>
                  <span className="material-symbols-outlined">bedtime</span>
                  <p className="text-sm font-medium leading-normal">Sleep Analysis</p>
                </Link>
                <Link to="/trends" className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group ${isActive("/trends")}`}>
                  <span className="material-symbols-outlined">show_chart</span>
                  <p className="text-sm font-medium leading-normal">HRV Trends</p>
                </Link>
                <Link to="/questionnaire" className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group ${isActive("/questionnaire")}`}>
                  <span className="material-symbols-outlined">ecg_heart</span>
                  <p className="text-sm font-medium leading-normal">Wellbeing Check</p>
                </Link>
                <Link to="/performance" className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group ${isActive("/performance")}`}>
                  <span className="material-symbols-outlined">monitoring</span>
                  <p className="text-sm font-medium leading-normal">All-Time Profile</p>
                </Link>
              </>
            )}

          </nav>
        </div>

        <div className="flex items-center gap-3 px-1 py-4 mt-auto border-t border-surface-border/30">
          <div
            onClick={() => navigate(isDoctor ? '/medical/profile-settings' : isFisio ? '/fisio/profile-settings' : isPrepa ? '/prepa/profile-settings' : '/player/profile')}
            className="flex flex-1 items-center gap-3 cursor-pointer hover:bg-white/5 p-2 rounded-xl transition-all group/info overflow-hidden"
          >
            <div className="size-8 min-w-8 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border border-primary/20 group-hover/info:border-primary/50 transition-colors">
              <img alt="User profile" className="w-full h-full object-cover" src={profileImg} />
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              {isDoctor || (!isFisio && !isPrepa) ? (
                <p className="text-white text-[13px] font-black leading-tight tracking-tight group-hover/info:text-primary transition-colors truncate whitespace-nowrap">
                  {userName}
                </p>
              ) : (
                <div className="flex flex-col leading-none group-hover/info:text-primary transition-colors">
                  <span className="text-white text-[11px] font-bold uppercase tracking-tight truncate">{userName.split(' ')[0]}</span>
                  <span className="text-white text-[13px] font-black uppercase tracking-tight truncate">{userName.split(' ').slice(1).join(' ')}</span>
                </div>
              )}
              <p className="text-text-secondary text-[9px] uppercase font-black tracking-widest opacity-60 mt-0.5 whitespace-nowrap truncate">
                {isDoctor ? "Jefe Médico" : isFisio ? "Fisioterapeuta" : isPrepa ? "Preparador Físico" : "Pro Athlete"}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="p-2.5 rounded-xl hover:bg-rose-500/10 text-text-secondary hover:text-rose-500 transition-all group/logout"
            title="Cerrar Sesión"
          >
            <span className="material-symbols-outlined text-lg">logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
