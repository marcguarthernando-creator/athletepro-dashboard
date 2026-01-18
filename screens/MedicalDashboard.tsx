import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mockPlayers } from '../services/mockPlayers';

import { useAuth } from '../contexts/AuthContext';
import PlayerStatsReportModal from './PlayerStatsReportModal';

const MedicalDashboard: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const userEmail = user?.email || localStorage.getItem('userEmail');
    const [selectedReportPlayer, setSelectedReportPlayer] = React.useState<any>(null);
    const [showReportModal, setShowReportModal] = React.useState(false);

    // Logic to determine base path for navigation links
    const isFisio = userEmail?.includes('fisio');
    const isPrepa = userEmail?.includes('prepa');
    const basePath = isFisio ? '/fisio' : isPrepa ? '/prepa' : '/medical';

    const disponibles = mockPlayers.filter(p => p.status === 'Disponible').length;
    const dudas = mockPlayers.filter(p => p.status === 'Duda').length;
    const bajas = mockPlayers.filter(p => p.status === 'Baja').length;

    return (
        <div className="flex-1 flex flex-col h-full overflow-y-auto relative p-6 md:p-10">
            <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h1 className="text-4xl font-black text-white mb-2 tracking-tight uppercase">JUGADORES</h1>
                    <p className="text-text-secondary text-base font-medium">Estado de salud de la plantilla • <span className="text-primary/80">CB BALONCESTO</span></p>
                </div>
                <div className="flex gap-4">
                    <div className="bg-surface-dark border border-surface-border p-4 rounded-xl flex flex-col items-center min-w-[110px] shadow-lg">
                        <span className="text-3xl font-black text-emerald-400">{disponibles}</span>
                        <span className="text-[10px] text-text-secondary uppercase font-black tracking-widest mt-1">Disponibles</span>
                    </div>
                    <div className="bg-surface-dark border border-surface-border p-4 rounded-xl flex flex-col items-center min-w-[110px] shadow-lg">
                        <span className="text-3xl font-black text-amber-400">{dudas}</span>
                        <span className="text-[10px] text-text-secondary uppercase font-black tracking-widest mt-1">En Duda</span>
                    </div>
                    <div className="bg-surface-dark border border-surface-border p-4 rounded-xl flex flex-col items-center min-w-[110px] shadow-lg">
                        <span className="text-3xl font-black text-rose-500">{bajas}</span>
                        <span className="text-[10px] text-text-secondary uppercase font-black tracking-widest mt-1">En Riesgo</span>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {mockPlayers.map(player => (
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
                                <h3 className="text-white font-bold text-lg leading-tight group-hover/name:text-primary transition-colors">{player.name}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[10px] bg-background-dark px-2 py-0.5 rounded text-text-secondary font-bold">#{player.number}</span>
                                    <span className="text-[10px] text-text-secondary uppercase font-medium">{player.position}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-background-dark/50 p-4 border-t border-surface-border/50">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-xs text-text-secondary font-medium uppercase tracking-wider">Readiness</span>
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
                                        {player.status}
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
                                {isFisio ? 'Ver Informe Fisio' : isPrepa ? 'Ver Perfil Atlético' : 'Ver Informe Médico'}
                            </button>
                        </div>
                    </div>
                ))}
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
