import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mockPlayers } from '../services/mockPlayers';

import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import PlayerStatsReportModal from './PlayerStatsReportModal';

const MedicalDashboard: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { t } = useLanguage();
    const userEmail = user?.email || localStorage.getItem('userEmail');

    const [selectedTeam, setSelectedTeam] = React.useState('Primer Equipo');
    const teams = ['Primer Equipo', 'Junior', 'Cadete', 'Infantil'];

    // Sort players by dorsal number (ascending)
    const sortedPlayers = React.useMemo(() => {
        let players = [...mockPlayers].sort((a, b) => (a.number || 0) - (b.number || 0));

        if (selectedTeam === 'Primer Equipo') {
            const allowedIds = ['3', '6', '11', '12']; // David Acosta, Dylan Bordon, Rafa Rodriguez, Xabier Lopez
            players = players.filter(p => allowedIds.includes(p.id));
        }

        return players;
    }, [selectedTeam]);

    const [selectedReportPlayer, setSelectedReportPlayer] = React.useState<any>(null);
    const [showReportModal, setShowReportModal] = React.useState(false);

    // Logic to determine base path for navigation links
    const isFisio = userEmail?.includes('fisio');
    const isPrepa = userEmail?.includes('prepa');
    const basePath = isFisio ? '/fisio' : isPrepa ? '/prepa' : '/medical';

    const disponibles = sortedPlayers.filter(p => p.status === 'Disponible').length;
    const dudas = sortedPlayers.filter(p => p.status === 'Duda').length;
    const bajas = sortedPlayers.filter(p => p.status === 'Baja').length;

    return (
        <div className="flex-1 flex flex-col h-full overflow-y-auto relative p-6 md:p-10">
            <header className="mb-10 flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6">
                {/* Title Section */}
                <div className="flex-shrink-0">
                    <h1 className="text-4xl font-black text-white mb-2 tracking-tight uppercase">{t('medicalDashboard.title')}</h1>
                    <p className="text-text-secondary text-base font-medium">{t('medicalDashboard.subtitle')} • <span className="text-primary/80">CB BALONCESTO</span></p>
                </div>

                {/* Stats Blocks (Middle) */}
                <div className="flex-1 w-full xl:w-auto flex justify-start xl:justify-center">
                    <div className="flex gap-4 overflow-x-auto pb-2 xl:pb-0">
                        <div className="bg-surface-dark border border-surface-border p-3 rounded-xl flex flex-col items-center min-w-[90px] shadow-lg">
                            <span className="text-2xl font-black text-emerald-400">{disponibles}</span>
                            <span className="text-[10px] text-text-secondary uppercase font-black tracking-widest mt-1">{t('medicalDashboard.available')}</span>
                        </div>
                        <div className="bg-surface-dark border border-surface-border p-3 rounded-xl flex flex-col items-center min-w-[90px] shadow-lg">
                            <span className="text-2xl font-black text-amber-400">{dudas}</span>
                            <span className="text-[10px] text-text-secondary uppercase font-black tracking-widest mt-1">{t('medicalDashboard.doubt')}</span>
                        </div>
                        <div className="bg-surface-dark border border-surface-border p-3 rounded-xl flex flex-col items-center min-w-[90px] shadow-lg">
                            <span className="text-2xl font-black text-rose-500">{bajas}</span>
                            <span className="text-[10px] text-text-secondary uppercase font-black tracking-widest mt-1">{t('medicalDashboard.risk')}</span>
                        </div>
                    </div>
                </div>

                {/* Team Selector (Right) */}
                <div className="flex-shrink-0 w-full xl:w-auto flex justify-end">
                    <div className="relative z-20 w-full xl:w-auto">
                        <select
                            value={selectedTeam}
                            onChange={(e) => setSelectedTeam(e.target.value)}
                            className="w-full xl:w-auto bg-[#161b22] text-white border border-white/10 rounded-xl px-4 py-2 pr-10 text-xs font-bold uppercase tracking-wider outline-none focus:border-primary appearance-none cursor-pointer hover:bg-white/5 transition-colors shadow-lg"
                        >
                            {teams.map(team => (
                                <option key={team} value={team}>{team}</option>
                            ))}
                        </select>
                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">expand_more</span>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedPlayers.map(player => {
                    // Split name for 2-line display (Name / Surname)
                    const nameParts = player.name.trim().split(' ');
                    const firstName = nameParts[0];
                    const lastName = nameParts.slice(1).join(' ');

                    return (
                        <div key={player.id} className="bg-surface-dark border border-surface-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all group shadow-xl hover:shadow-primary/5">
                            <div className="p-4 flex items-center gap-4">
                                <div
                                    className="relative cursor-pointer hover:scale-105 transition-transform"
                                    onClick={() => navigate(`${basePath}/players/${player.id}`)}
                                >
                                    <img src={player.photo} alt={player.name} className="w-16 h-16 rounded-full object-cover border-2 border-surface-border text-xs" />
                                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-surface-dark shadow-md
                                    ${player.risk === 'low' ? 'bg-emerald-500' : player.risk === 'medium' ? 'bg-amber-500' : 'bg-rose-500'}
                                `}></div>
                                </div>
                                <div
                                    className="cursor-pointer group/name"
                                    onClick={() => navigate(`${basePath}/players/${player.id}`)}
                                >
                                    <div className="flex flex-col">
                                        <span className="text-white font-bold text-lg leading-tight group-hover/name:text-primary transition-colors block">{firstName}</span>
                                        <span className="text-white font-bold text-lg leading-tight group-hover/name:text-primary transition-colors block">{lastName}</span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-[10px] bg-background-dark px-2 py-0.5 rounded text-text-secondary font-bold">#{player.number}</span>
                                        <span className="text-[10px] text-text-secondary uppercase font-medium">{player.position}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-background-dark/50 p-4 border-t border-surface-border/50">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-xs text-text-secondary font-medium uppercase tracking-wider">{t('medicalDashboard.readiness')}</span>
                                    <span className={`text-xs font-bold ${player.readiness > 80 ? 'text-primary' : player.readiness > 60 ? 'text-amber-400' : 'text-rose-400'}`}>
                                        {player.readiness}%
                                    </span>
                                </div>
                                <div className="h-1.5 w-full bg-surface-border rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${player.readiness > 80 ? 'bg-primary' : player.readiness > 60 ? 'bg-amber-400' : 'bg-rose-400'}`}
                                        style={{ width: `${player.readiness}%` }}
                                    ></div>
                                </div>

                                <div className="mt-4 flex justify-between items-center">
                                    <div className="flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-sm text-text-secondary">medical_services</span>
                                        <span className={`text-[11px] font-bold uppercase tracking-tight
                                        ${player.status === 'Disponible' ? 'text-emerald-400' : player.status === 'Duda' ? 'text-amber-400' : 'text-rose-400'}
                                    `}>
                                            {player.status === 'Disponible' ? t('medicalDashboard.available') :
                                                player.status === 'Duda' ? t('medicalDashboard.doubt') :
                                                    player.status === 'Baja' ? t('medicalDashboard.risk') : player.status}
                                        </span>
                                    </div>
                                    <span className="text-[10px] text-text-secondary opacity-50 italic">{player.lastAssessment}</span>
                                </div>
                            </div>

                            <div className="px-4 py-3 bg-primary/5 border-t border-primary/10 flex justify-center">
                                <button
                                    onClick={() => {
                                        setSelectedReportPlayer(player);
                                        setShowReportModal(true);
                                    }}
                                    className="text-[10px] text-primary font-bold uppercase tracking-widest hover:underline cursor-pointer"
                                >
                                    {isFisio ? t('medicalDashboard.viewPhysioReport') : isPrepa ? t('medicalDashboard.viewAthleticProfile') : t('medicalDashboard.viewReport')}
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>


            <PlayerStatsReportModal
                isOpen={showReportModal}
                onClose={() => setShowReportModal(false)}
                player={selectedReportPlayer}
            />
        </div >
    );
};

export default MedicalDashboard;
