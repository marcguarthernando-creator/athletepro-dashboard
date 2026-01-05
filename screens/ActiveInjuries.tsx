import React from 'react';
import { mockPlayers } from '../services/mockPlayers';

interface ActiveInjury {
    id: string;
    playerName: string;
    photo: string;
    injuryName: string;
    treatment: string;
    estimatedReturn: string;
    severity: 'low' | 'medium' | 'high';
    daysActive: number;
}

const ActiveInjuries: React.FC = () => {
    // Mocking active injuries based on players with status 'Duda' or 'Baja'
    const activeInjuries: ActiveInjury[] = mockPlayers
        .filter(p => p.status === 'Duda' || p.status === 'Baja')
        .map(p => {
            const isBaja = p.status === 'Baja';
            return {
                id: p.id,
                playerName: p.name,
                photo: p.photo,
                injuryName: isBaja ? 'Esguince de Tobillo Grado II' : 'Sobrecarga Muscular Isquiotibiales',
                treatment: isBaja ? 'Fisioterapia diaria + Fortalecimiento excéntrico' : 'Descarga Miofascial + Movilidad',
                estimatedReturn: isBaja ? '2-3 semanas' : '3-5 días',
                severity: isBaja ? 'high' : 'medium',
                daysActive: isBaja ? 12 : 3
            };
        });

    return (
        <div className="flex-1 flex flex-col h-full bg-[#0a0d10] overflow-y-auto p-8">
            <header className="mb-10">
                <h1 className="text-3xl font-black text-white uppercase tracking-tight mb-2">Lesiones Activas</h1>
                <p className="text-gray-500 text-sm">Seguimiento de procesos de rehabilitación y tiempos de recuperación</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {activeInjuries.map((injury) => (
                    <div key={injury.id} className="bg-[#161b22] border border-white/5 rounded-3xl overflow-hidden shadow-2xl hover:border-primary/30 transition-all group relative">
                        {/* Severity Indicator */}
                        <div className={`absolute top-0 right-0 px-4 py-1.5 rounded-bl-2xl text-[10px] font-black uppercase tracking-widest ${injury.severity === 'high' ? 'bg-rose-500/20 text-rose-500' : 'bg-amber-500/20 text-amber-500'
                            }`}>
                            Prioridad: {injury.severity === 'high' ? 'Alta' : 'Media'}
                        </div>

                        <div className="p-6">
                            {/* Profile Section */}
                            <div className="flex items-center gap-5 mb-8">
                                <div className="relative">
                                    <img src={injury.photo} alt={injury.playerName} className="w-20 h-20 rounded-2xl object-cover border-2 border-white/5" />
                                    <div className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-4 border-[#161b22] ${injury.severity === 'high' ? 'bg-rose-500' : 'bg-amber-500'
                                        }`}></div>
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-white uppercase leading-none mb-1">{injury.playerName}</h2>
                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">En tratamiento desde hace {injury.daysActive} días</p>
                                </div>
                            </div>

                            {/* Injury Details */}
                            <div className="space-y-6">
                                <div className="bg-background-dark/50 p-4 rounded-2xl border border-white/5">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="material-symbols-outlined text-rose-500 text-lg">emergency</span>
                                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Lesión Activa</p>
                                    </div>
                                    <p className="text-sm font-bold text-white uppercase">{injury.injuryName}</p>
                                </div>

                                <div className="bg-background-dark/50 p-4 rounded-2xl border border-white/5">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="material-symbols-outlined text-primary text-lg">medical_services</span>
                                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Tratamiento Actual</p>
                                    </div>
                                    <p className="text-xs font-medium text-gray-300 leading-relaxed italic">{injury.treatment}</p>
                                </div>

                                <div className="bg-primary/5 p-4 rounded-2xl border border-primary/20 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary">event_repeat</span>
                                        <div>
                                            <p className="text-[9px] text-primary/70 font-black uppercase tracking-tighter">Est. Vuelta (RTP)</p>
                                            <p className="text-sm font-black text-primary uppercase">{injury.estimatedReturn}</p>
                                        </div>
                                    </div>
                                    <div className="h-10 w-px bg-primary/20"></div>
                                    <div className="flex flex-col items-center">
                                        <span className="text-[10px] text-gray-500 font-black uppercase">Progreso</span>
                                        <span className="text-sm font-black text-white">
                                            {injury.severity === 'high' ? '45%' : '80%'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActiveInjuries;
