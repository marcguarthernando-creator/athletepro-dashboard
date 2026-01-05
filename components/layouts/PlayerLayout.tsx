import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';

interface PlayerLayoutProps {
    children?: React.ReactNode;
}

const PlayerLayout: React.FC<PlayerLayoutProps> = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    // In a real app, this would come from auth context
    const playerName = "Nombre Apellido";

    const isActive = (path: string) => location.pathname === path ? "bg-primary/10 text-primary border-l-4 border-primary" : "text-text-secondary hover:bg-surface-dark hover:text-white border-l-4 border-transparent";

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userEmail');
        navigate('/login');
    };

    return (
        <div className="flex h-screen w-full bg-background-dark text-white overflow-hidden font-display">
            {/* Sidebar */}
            <aside className="w-64 flex-none border-r border-surface-border bg-background-dark hidden md:flex flex-col justify-between h-full relative z-20">
                <div className="flex flex-col h-full">
                    {/* Sidebar Header with Logos */}
                    <div className="flex flex-col items-center justify-center p-6 border-b border-surface-border/50">
                        <div className="flex flex-row items-center gap-4">
                            <img src="/healthtrack-logo.png" alt="Health Track" className="h-10 w-auto object-contain" />
                            <div className="h-8 w-px bg-surface-border"></div>
                            <img src="/escudo-cbc.png" alt="CBC" className="h-12 w-auto object-contain" />
                        </div>
                    </div>

                    {/* Navigation Items */}
                    <nav className="flex flex-col py-6 overflow-y-auto flex-1">

                        <Link to="/player/wellness" className={`flex items-center gap-4 px-6 py-4 transition-colors ${isActive("/player/wellness")}`}>
                            <span className="material-symbols-outlined text-xl">checklist</span>
                            <span className="font-medium text-sm tracking-wide">CUESTIONARIO PRE ENTRENAMIENTO</span>
                        </Link>

                        <Link to="/player/gym" className={`flex items-center gap-4 px-6 py-4 transition-colors ${isActive("/player/gym")}`}>
                            <span className="material-symbols-outlined text-xl">fitness_center</span>
                            <span className="font-medium text-sm tracking-wide">ENTRENAMIENTO GYM</span>
                        </Link>

                        <Link to="/player/rpe" className={`flex items-center gap-4 px-6 py-4 transition-colors ${isActive("/player/rpe")}`}>
                            <span className="material-symbols-outlined text-xl">speed</span>
                            <span className="font-medium text-sm tracking-wide">CUESTIONARIO POST ENTRENAMIENTO</span>
                        </Link>

                        <Link to="/player/calendar" className={`flex items-center gap-4 px-6 py-4 transition-colors ${isActive("/player/calendar")}`}>
                            <span className="material-symbols-outlined text-xl">calendar_month</span>
                            <span className="font-medium text-sm tracking-wide">CALENDARIO</span>
                        </Link>

                        <Link to="/player/playbook" className={`flex items-center gap-4 px-6 py-4 transition-colors ${isActive("/player/playbook")}`}>
                            <span className="material-symbols-outlined text-xl">menu_book</span>
                            <span className="font-medium text-sm tracking-wide">PLAYBOOK</span>
                        </Link>

                        <Link to="/player/medical" className={`flex items-center gap-4 px-6 py-4 transition-colors ${isActive("/player/medical")}`}>
                            <span className="material-symbols-outlined text-xl">medical_services</span>
                            <span className="font-medium text-sm tracking-wide">CONSULTA MÉDICA</span>
                        </Link>

                    </nav>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                <header className="h-20 flex items-center justify-end px-8 border-b border-surface-border bg-background-dark shrink-0">
                    {/* Right: Welcome + User + Logout */}
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-4">
                            <span className="text-white text-lg font-light">
                                Bienvenido <span className="font-bold">{playerName}</span>
                            </span>
                            <div className="h-10 w-10 rounded-full bg-surface-border overflow-hidden border border-primary/30">
                                <img src="https://ui-avatars.com/api/?name=Nombre+Apellido&background=00E5FF&color=0a192f" alt="Avatar" className="h-full w-full object-cover" />
                            </div>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-text-secondary hover:text-danger transition-colors text-sm font-medium"
                        >
                            <span className="material-symbols-outlined text-lg">logout</span>
                            <span>Cerrar sesión</span>
                        </button>
                    </div>
                </header>

                {/* Content Container */}
                <main className="flex-1 overflow-y-auto bg-background-light/5 p-8 relative">
                    {children || <Outlet />}
                </main>
            </div>
        </div>
    );
};

export default PlayerLayout;
