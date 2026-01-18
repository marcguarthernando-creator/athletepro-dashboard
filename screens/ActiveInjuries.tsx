import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getActiveInjuries } from '../services/injuryService';
import { mockPlayers } from '../services/mockPlayers';

import InjuryEvolutionModal from './InjuryEvolutionModal';

interface ActiveInjury {
    id: string; // This is the player ID to navigate to profile
    injuryId: string;
    playerName: string;
    photo: string;
    injuryName: string;
    treatment: string;
    estimatedReturn: string;
    severity: 'low' | 'medium' | 'high';
    daysActive: number;
}

const ActiveInjuries: React.FC = () => {
    const navigate = useNavigate();
    const [activeInjuries, setActiveInjuries] = useState<ActiveInjury[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedInjury, setSelectedInjury] = useState<ActiveInjury | null>(null);

    useEffect(() => {
        // ... (fetch logic remains same)
        const fetchInjuries = async () => {
            try {
                const data = await getActiveInjuries();
                if (data && data.length > 0) {
                    setActiveInjuries(data);
                } else {
                    // Generate Mock Injuries if no DB data
                    const mockInjuries: ActiveInjury[] = [
                        {
                            id: '9', // Manuel Crujeiras (Baja)
                            injuryId: 'mock_1',
                            playerName: 'Manuel Crujeiras',
                            photo: '/default-avatar.jpg',
                            injuryName: 'Esguince Tobillo Grado II',
                            treatment: 'Fisioterapia diaria + Fortalecimiento excéntrico',
                            estimatedReturn: '2-3 Semanas',
                            severity: 'high',
                            daysActive: 12
                        },
                        {
                            id: '3', // David Acosta (Duda)
                            injuryId: 'mock_2',
                            playerName: 'David Acosta',
                            photo: '/default-avatar.jpg',
                            injuryName: 'Sobrecarga Muscular Isquiotibiales',
                            treatment: 'Descarga miofascial + Movilidad',
                            estimatedReturn: '3-5 Días',
                            severity: 'medium',
                            daysActive: 3
                        },
                        {
                            id: '7', // Emilis (Duda)
                            injuryId: 'mock_3',
                            playerName: 'Emilis Prekivicius',
                            photo: '/default-avatar.jpg',
                            injuryName: 'Tendinitis Rotuliana LEVE',
                            treatment: 'Ondas de choque + Reposo activo',
                            estimatedReturn: '1 Semana',
                            severity: 'medium',
                            daysActive: 5
                        }
                    ];
                    // Verify if these players exist in mockPlayers to attach correct photos if needed (using default for now as mockPlayers has default pointers)
                    const enhancedMocks = mockInjuries.map(injury => {
                        const original = mockPlayers.find(p => p.id === injury.id);
                        return original ? { ...injury, photo: original.photo } : injury;
                    });
                    setActiveInjuries(enhancedMocks);
                }
            } catch (error) {
                console.error("Failed to load active injuries", error);
            } finally {
                setLoading(false);
            }
        };

        fetchInjuries();
    }, []);

    return (
        <div className="flex-1 flex flex-col h-full bg-[#0a0d10] overflow-y-auto p-8 relative">
            {selectedInjury && (
                <InjuryEvolutionModal
                    injury={selectedInjury}
                    onClose={() => setSelectedInjury(null)}
                />
            )}

            <header className="mb-10">
                <h1 className="text-3xl font-black text-white uppercase tracking-tight mb-2">Lesiones Activas</h1>
                <p className="text-gray-500 text-sm">Seguimiento de procesos de rehabilitación y tiempos de recuperación</p>
            </header>

            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <span className="text-primary animate-pulse">Cargando lesiones...</span>
                </div>
            ) : activeInjuries.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-10 border border-white/5 rounded-3xl bg-[#161b22]">
                    <span className="material-symbols-outlined text-4xl text-emerald-500 mb-4">check_circle</span>
                    <p className="text-white font-bold uppercase">No hay lesiones activas</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {activeInjuries.map((injury) => (
                        <div key={injury.injuryId} className="bg-[#161b22] border border-white/5 rounded-3xl overflow-hidden shadow-2xl hover:border-primary/30 transition-all group relative">
                            {/* Severity Indicator */}
                            <div className={`absolute top-0 right-0 px-4 py-1.5 rounded-bl-2xl text-[10px] font-black uppercase tracking-widest ${injury.severity === 'high' ? 'bg-rose-500/20 text-rose-500' : 'bg-amber-500/20 text-amber-500'
                                }`}>
                                Prioridad: {injury.severity === 'high' ? 'Alta' : 'Media'}
                            </div>

                            <div className="p-6">
                                {/* Profile Section */}
                                <div className="flex items-center gap-5 mb-8">
                                    <div className="relative cursor-pointer group" onClick={() => navigate(`/medical/players/${injury.id}`, { state: { tab: 'injuries' } })}>
                                        <img src={injury.photo} alt={injury.playerName} className="w-20 h-20 rounded-2xl object-cover border-2 border-white/5 group-hover:border-primary transition-colors" />
                                        <div className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-4 border-[#161b22] ${injury.severity === 'high' ? 'bg-rose-500' : 'bg-amber-500'
                                            }`}></div>
                                    </div>
                                    <div className="cursor-pointer group" onClick={() => navigate(`/medical/players/${injury.id}`, { state: { tab: 'injuries' } })}>
                                        <h2 className="text-xl font-black text-white uppercase leading-none mb-1 group-hover:text-primary transition-colors">{injury.playerName}</h2>
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
                                        <p className="text-sm font-bold text-white uppercase cursor-pointer hover:text-rose-500 transition-colors" onClick={() => setSelectedInjury(injury)}>
                                            {injury.injuryName}
                                        </p>
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
            )}
        </div>
    );
};


export default ActiveInjuries;
