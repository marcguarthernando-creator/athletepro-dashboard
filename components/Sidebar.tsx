import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t, language, setLanguage } = useLanguage();

  // Fallback to localStorage for username/image if not in metadata, but use Context for logic
  const userEmail = user?.email || localStorage.getItem('userEmail');

  const isDoctor = userEmail?.includes('medico') || userEmail?.includes('marcguarthernando');
  const isFisio = userEmail?.includes('fisio') || userEmail?.includes('healthtrack1939');
  const isPrepa = userEmail?.includes('prepa') || userEmail?.includes('m.guart');
  // If none of the above but authenticated as staff, default to Medical for now or check metadata
  const isMedicalStaff = isDoctor || isFisio || isPrepa || user?.user_metadata?.role === 'medical_staff';
  const isPlayer = !isMedicalStaff;

  const isActive = (path: string) => location.pathname === path ? "bg-primary/10 text-primary border border-primary/20" : "text-text-secondary hover:bg-surface-dark hover:text-white";

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  const [profileImg, setProfileImg] = React.useState(localStorage.getItem('doctorImage') || "https://ui-avatars.com/api/?name=User&background=00E5FF&color=0a192f");
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || "User");

  React.useEffect(() => {
    const handleStorageChange = () => {
      const img = localStorage.getItem('doctorImage');
      const name = localStorage.getItem('userName');
      if (img) setProfileImg(img);
      setUserName(name || "User");
    };
    window.addEventListener('storage', handleStorageChange);
    handleStorageChange();

    // Custom event for immediate updates within the same window
    const handleProfileUpdate = () => handleStorageChange();
    window.addEventListener('profile-updated', handleProfileUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('profile-updated', handleProfileUpdate);
    };
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

      {/* Sidebar Container - Always Collapsible */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50 bg-background-dark border-r border-surface-border 
        flex flex-col justify-between p-2 h-full transition-all duration-300 ease-in-out group/sidebar
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        md:w-[88px] md:hover:w-64
      `}>

        <div className="flex flex-col gap-6">
          {/* Header - Always Collapsible */}
          <div className="flex flex-col items-center justify-center p-4 border-b border-surface-border/50 transition-all duration-300 overflow-hidden whitespace-nowrap h-[73px]">
            <div className="flex flex-row items-center gap-2 transition-all duration-300">
              {/* Logo logic: Show only shield when collapsed, full when expanded */}
              <div className="md:w-8 md:overflow-hidden md:group-hover/sidebar:w-auto md:group-hover/sidebar:overflow-visible transition-all duration-300 flex items-center justify-center">
                <img src="/escudo-cbc.png" alt="CB BALONCESTO" className="h-10 w-10 min-w-10 object-cover rounded-full" />
              </div>
              <div className="flex items-center gap-2 md:opacity-0 md:w-0 md:group-hover/sidebar:w-auto md:group-hover/sidebar:opacity-100 transition-all duration-300 overflow-hidden">
                <div className="h-6 w-px bg-surface-border"></div>
                <img src="/healthtrack-logo.png" alt="Health Track" className="h-8 w-auto object-contain" />
              </div>
            </div>
          </div>

          <nav className="flex flex-col gap-1 overflow-y-auto max-h-[100vh] overflow-x-hidden">
            {isMedicalStaff ? (
              <div className="flex flex-col gap-1 overflow-y-auto max-h-[75vh] custom-scrollbar pr-1">
                <Link to={isDoctor ? "/medical/dashboard" : isFisio ? "/fisio/dashboard" : "/prepa/dashboard"} className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group ${isActive(isDoctor ? "/medical/dashboard" : isFisio ? "/fisio/dashboard" : "/prepa/dashboard")}`}>
                  <span className="material-symbols-outlined shrink-0">dashboard</span>
                  <p className={`text-sm font-medium leading-normal tracking-tighter whitespace-nowrap transition-all duration-300 md:opacity-0 md:w-0 md:group-hover/sidebar:w-auto md:group-hover/sidebar:opacity-100 overflow-hidden`}>{t('sidebar.dashboard')}</p>
                </Link>
                <Link to={isDoctor ? "/medical/players" : isFisio ? "/fisio/players" : "/prepa/players"} className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group ${isActive(isDoctor ? "/medical/players" : isFisio ? "/fisio/players" : "/prepa/players")}`}>
                  <span className="material-symbols-outlined shrink-0">groups</span>
                  <p className={`text-sm font-medium leading-normal tracking-wide whitespace-nowrap transition-all duration-300 md:opacity-0 md:w-0 md:group-hover/sidebar:w-auto md:group-hover/sidebar:opacity-100 overflow-hidden`}>{t('sidebar.players')}</p>
                </Link>
                <Link to={isDoctor ? "/medical/daily-forms" : isFisio ? "/fisio/daily-forms" : "/prepa/daily-forms"} className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group ${isActive(isDoctor ? "/medical/daily-forms" : isFisio ? "/fisio/daily-forms" : "/prepa/daily-forms")}`}>
                  <span className="material-symbols-outlined shrink-0">assignment</span>
                  <p className={`text-sm font-medium leading-normal tracking-tighter uppercase whitespace-nowrap transition-all duration-300 md:opacity-0 md:w-0 md:group-hover/sidebar:w-auto md:group-hover/sidebar:opacity-100 overflow-hidden`}>{t('sidebar.questionnaires')}</p>
                </Link>
                <Link to={isDoctor ? "/medical/active-injuries" : isFisio ? "/fisio/active-injuries" : "/prepa/active-injuries"} className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group ${isActive(isDoctor ? "/medical/active-injuries" : isFisio ? "/fisio/active-injuries" : "/prepa/active-injuries")}`}>
                  <span className="material-symbols-outlined shrink-0">emergency</span>
                  <p className={`text-sm font-medium leading-normal tracking-tighter uppercase whitespace-nowrap transition-all duration-300 md:opacity-0 md:w-0 md:group-hover/sidebar:w-auto md:group-hover/sidebar:opacity-100 overflow-hidden`}>{t('sidebar.activeInjuries')}</p>
                </Link>

                <Link to={isDoctor ? "/medical/stats" : isFisio ? "/fisio/stats" : "/prepa/stats"} className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group ${isActive(isDoctor ? "/medical/stats" : isFisio ? "/fisio/stats" : "/prepa/stats")}`}>
                  <span className="material-symbols-outlined shrink-0">monitoring</span>
                  <p className={`text-sm font-medium leading-normal tracking-tighter uppercase whitespace-nowrap transition-all duration-300 md:opacity-0 md:w-0 md:group-hover/sidebar:w-auto md:group-hover/sidebar:opacity-100 overflow-hidden`}>{t('sidebar.injuryStats')}</p>
                </Link>

                <div className="my-2 border-t border-surface-border/50"></div>

                {(isDoctor || isPrepa) ? (
                  <>
                    {isDoctor ? (
                      <Link to="/medical/report" className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group ${isActive("/medical/report")}`}>
                        <span className="material-symbols-outlined shrink-0">description</span>
                        <p className={`text-sm font-medium leading-normal uppercase whitespace-nowrap transition-all duration-300 md:opacity-0 md:w-0 md:group-hover/sidebar:w-auto md:group-hover/sidebar:opacity-100 overflow-hidden`}>{t('sidebar.medicalReport')}</p>
                      </Link>
                    ) : (
                      <Link to="/prepa/gym" className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group ${isActive("/prepa/gym")}`}>
                        <span className="material-symbols-outlined shrink-0">fitness_center</span>
                        <p className={`text-sm font-medium leading-normal uppercase whitespace-nowrap transition-all duration-300 md:opacity-0 md:w-0 md:group-hover/sidebar:w-auto md:group-hover/sidebar:opacity-100 overflow-hidden`}>ENTRENAMIENTO GYM</p>
                      </Link>
                    )}

                    <div className="my-2 border-t border-surface-border/50"></div>

                    <Link to={isDoctor ? "/medical/knowledge" : "/prepa/knowledge"} className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group ${isActive(isDoctor ? "/medical/knowledge" : "/prepa/knowledge")}`}>
                      <span className="material-symbols-outlined shrink-0">menu_book</span>
                      <p className={`text-sm font-medium leading-normal uppercase whitespace-nowrap transition-all duration-300 md:opacity-0 md:w-0 md:group-hover/sidebar:w-auto md:group-hover/sidebar:opacity-100 overflow-hidden`}>{t('sidebar.knowledge')}</p>
                    </Link>
                  </>
                ) : isFisio ? (
                  <>
                    <Link to="/fisio/report" className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group ${isActive("/fisio/report")}`}>
                      <span className="material-symbols-outlined shrink-0">description</span>
                      <p className={`text-sm font-medium leading-normal uppercase whitespace-nowrap transition-all duration-300 md:opacity-0 md:w-0 md:group-hover/sidebar:w-auto md:group-hover/sidebar:opacity-100 overflow-hidden`}>{t('sidebar.physioReport')}</p>
                    </Link>
                    <div className="my-2 border-t border-surface-border/50"></div>
                    <Link to="/fisio/knowledge" className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group ${isActive("/fisio/knowledge")}`}>
                      <span className="material-symbols-outlined shrink-0">menu_book</span>
                      <p className={`text-sm font-medium leading-normal uppercase whitespace-nowrap transition-all duration-300 md:opacity-0 md:w-0 md:group-hover/sidebar:w-auto md:group-hover/sidebar:opacity-100 overflow-hidden`}>{t('sidebar.knowledge')}</p>
                    </Link>
                  </>
                ) : null}
              </div>
            ) : (
              /* PLAYER MENU - Collapsible */
              <div className="flex flex-col gap-1 overflow-y-auto max-h-[75vh] custom-scrollbar pr-1">
                <Link to="/player/pre-training" className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group ${isActive("/player/pre-training")}`}>
                  <span className="material-symbols-outlined shrink-0">assignment</span>
                  <p className={`text-sm font-medium leading-normal whitespace-nowrap transition-all duration-300 md:opacity-0 md:w-0 md:group-hover/sidebar:w-auto md:group-hover/sidebar:opacity-100 overflow-hidden`}>CUESTIONARIO WBQ</p>
                </Link>
                <Link to="/player/gym" className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group ${isActive("/player/gym")}`}>
                  <span className="material-symbols-outlined shrink-0">fitness_center</span>
                  <p className={`text-sm font-medium leading-normal whitespace-nowrap transition-all duration-300 md:opacity-0 md:w-0 md:group-hover/sidebar:w-auto md:group-hover/sidebar:opacity-100 overflow-hidden`}>ENTRENAMIENTO GYM</p>
                </Link>
                <Link to="/player/post-training" className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group ${isActive("/player/post-training")}`}>
                  <span className="material-symbols-outlined shrink-0">fact_check</span>
                  <p className={`text-sm font-medium leading-normal whitespace-nowrap transition-all duration-300 md:opacity-0 md:w-0 md:group-hover/sidebar:w-auto md:group-hover/sidebar:opacity-100 overflow-hidden`}>CUESTIONARIO sRPE</p>
                </Link>
                <Link to="/player/playbook" className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group ${isActive("/player/playbook")}`}>
                  <span className="material-symbols-outlined shrink-0">menu_book</span>
                  <p className={`text-sm font-medium leading-normal whitespace-nowrap transition-all duration-300 md:opacity-0 md:w-0 md:group-hover/sidebar:w-auto md:group-hover/sidebar:opacity-100 overflow-hidden`}>PLAYBOOK</p>
                </Link>
                <Link to="/player/calendar" className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group ${isActive("/player/calendar")}`}>
                  <span className="material-symbols-outlined shrink-0">calendar_today</span>
                  <p className={`text-sm font-medium leading-normal whitespace-nowrap transition-all duration-300 md:opacity-0 md:w-0 md:group-hover/sidebar:w-auto md:group-hover/sidebar:opacity-100 overflow-hidden`}>CALENDARIO EQUIPO</p>
                </Link>

                <Link to="/player/restq" className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group ${isActive("/player/restq")}`}>
                  <span className="material-symbols-outlined shrink-0">poll</span>
                  <p className={`text-sm font-medium leading-normal whitespace-nowrap transition-all duration-300 md:opacity-0 md:w-0 md:group-hover/sidebar:w-auto md:group-hover/sidebar:opacity-100 overflow-hidden`}>RESTQ-SPORT-36</p>
                </Link>
              </div>
            )}

          </nav>
        </div>

        <div className="flex flex-col gap-2 px-2 pb-2 mt-auto">
          {/* Language Switcher - Always Collapsible */}
          <div className="flex justify-center transition-all duration-300 md:group-hover/sidebar:justify-start md:px-2">
            <div className="flex gap-1 bg-black/20 rounded-lg p-1">
              <button
                onClick={() => setLanguage('es')}
                className={`text-[10px] px-2 py-0.5 rounded-md font-bold transition-colors ${language === 'es' ? 'bg-primary text-background-dark shadow-sm' : 'text-text-secondary hover:text-white'}`}
              >
                ES
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`text-[10px] px-2 py-0.5 rounded-md font-bold transition-colors ${language === 'en' ? 'bg-primary text-background-dark shadow-sm' : 'text-text-secondary hover:text-white'}`}
              >
                EN
              </button>
            </div>
          </div>

        </div>

        {/* Profile Section - Always Collapsible */}
        <div className="flex items-center gap-3 px-1 py-4 border-t border-surface-border/30 overflow-hidden">
          <div
            onClick={() => navigate(isDoctor ? '/medical/profile-settings' : isFisio ? '/fisio/profile-settings' : isPrepa ? '/prepa/profile-settings' : '/player/profile-settings')}
            className={`flex flex-1 items-center gap-3 cursor-pointer hover:bg-white/5 p-2 rounded-xl transition-all group/info overflow-hidden whitespace-nowrap justify-center md:justify-start`}
          >
            <div className="size-8 min-w-8 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border border-primary/20 group-hover/info:border-primary/50 transition-colors shrink-0">
              <img alt="User profile" className="w-full h-full object-cover" src={profileImg} />
            </div>
            <div className="flex flex-col flex-1 min-w-0 transition-all duration-300 md:opacity-0 md:w-0 md:group-hover/sidebar:w-auto md:group-hover/sidebar:opacity-100 overflow-hidden">
              <div className="flex flex-col">
                <p className="text-white text-[13px] font-black leading-tight tracking-tight group-hover/info:text-primary transition-colors truncate whitespace-nowrap">
                  {userName}
                </p>
              </div>
              <p className="text-text-secondary text-[9px] uppercase font-black tracking-widest opacity-60 mt-0.5 whitespace-nowrap truncate">
                {isDoctor ? t('sidebar.headMedical') : isFisio ? t('sidebar.physiotherapist') : isPrepa ? t('sidebar.physicalTrainer') : "JUGADOR"}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className={`p-2.5 rounded-xl hover:bg-rose-500/10 text-text-secondary hover:text-rose-500 transition-all group/logout shrink-0 md:hidden md:group-hover/sidebar:block`}
            title={t('sidebar.logout')}
          >
            <span className="material-symbols-outlined text-lg">logout</span>
          </button>
        </div >
      </aside >
    </>
  );
};

export default Sidebar;
