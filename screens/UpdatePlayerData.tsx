import React, { useState, useMemo } from 'react';
import { mockPlayers } from '../services/mockPlayers';
import { playerMedicalData } from '../services/playerMedicalData';

interface DataVersion {
    date: string;
    data: any;
}

const UpdatePlayerData: React.FC = () => {
    const [selectedPlayerId, setSelectedPlayerId] = useState('');
    const [updateStatus, setUpdateStatus] = useState<null | 'success' | 'error'>(null);

    // Form state
    const [formData, setFormData] = useState<any>({
        biometrics: { weight: '', height: '', age: '', wingspan: '' },
        anthropometry: { fat: '', muscle: '', bone: '', residual: '' },
        somatotype: { endo: '', meso: '', ecto: '' }
    });

    const player = useMemo(() => mockPlayers.find(p => p.id === selectedPlayerId), [selectedPlayerId]);

    const handlePlayerSelect = (id: string) => {
        setSelectedPlayerId(id);
        const p = mockPlayers.find(pl => pl.id === id);
        if (p) {
            const currentData = playerMedicalData[p.name.toUpperCase()];
            if (currentData) {
                setFormData({
                    biometrics: { ...currentData.biometrics },
                    anthropometry: { ...currentData.anthropometry },
                    somatotype: { ...currentData.anthropometry?.somatotype || {} }
                });
            }
        }
    };

    const handleUpdate = () => {
        if (!selectedPlayerId) return;
        setUpdateStatus('success');
        setTimeout(() => setUpdateStatus(null), 3000);
        // Logic to simulate persistence
        console.log("Updating player data:", formData);
    };

    // Mock history
    const history: DataVersion[] = [
        { date: '26/12/2025 20:30', data: {} },
        { date: '15/11/2025 10:15', data: {} },
        { date: '01/10/2025 09:00', data: {} }
    ];

    return (
        <div className="flex-1 flex flex-col h-full bg-[#0a0d10] overflow-y-auto p-8 custom-scrollbar">
            <header className="mb-10 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-white uppercase tracking-tight mb-2">Actualizar Datos</h1>
                    <p className="text-gray-500 text-sm">Modificación manual de métricas y consulta de históricos</p>
                </div>
                {selectedPlayerId && (
                    <button
                        onClick={handleUpdate}
                        className="bg-primary/20 text-primary border border-primary/30 hover:bg-primary hover:text-background-dark px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center gap-2 shadow-lg shadow-primary/10"
                    >
                        <span className="material-symbols-outlined text-lg">sync</span>
                        Actualizar Datos
                    </button>
                )}
            </header>

            {updateStatus === 'success' && (
                <div className="mb-8 bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl flex items-center gap-3 animate-bounce">
                    <span className="material-symbols-outlined text-emerald-500">check_circle</span>
                    <p className="text-emerald-500 font-bold text-sm uppercase tracking-widest">¡Datos actualizados correctamente!</p>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Form */}
                <div className="lg:col-span-8 space-y-8">
                    {/* Player Selection */}
                    <div className="bg-[#161b22] border border-white/5 rounded-3xl p-8 shadow-2xl">
                        <div className="flex items-center gap-2 mb-6">
                            <span className="material-symbols-outlined text-primary">person_search</span>
                            <h3 className="text-sm font-black text-white uppercase tracking-widest">Selección de Jugador</h3>
                        </div>
                        <select
                            value={selectedPlayerId}
                            onChange={(e) => handlePlayerSelect(e.target.value)}
                            className="w-full bg-background-dark border border-white/10 rounded-xl px-4 py-4 text-white font-bold text-lg outline-none focus:border-primary/50 transition-colors appearance-none"
                        >
                            <option value="">Elegir jugador para actualizar...</option>
                            {mockPlayers.map(p => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                        </select>

                        {/* History Dropdown (Selective versions) */}
                        {selectedPlayerId && (
                            <div className="mt-6 pt-6 border-t border-white/5 space-y-3">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-amber-500 text-sm">history</span>
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Consultar versiones anteriores</label>
                                </div>
                                <select
                                    className="w-full bg-background-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white text-xs font-bold outline-none focus:border-primary/50 transition-colors appearance-none cursor-pointer"
                                >
                                    <option value="">Cargar datos de una fecha anterior...</option>
                                    {history.map((version, i) => (
                                        <option key={i} value={version.date}>
                                            {version.date} - Ver versión {history.length - i}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>

                    {!selectedPlayerId ? (
                        <div className="bg-[#161b22]/50 border-2 border-dashed border-white/5 rounded-3xl p-20 flex flex-col items-center justify-center text-center">
                            <span className="material-symbols-outlined text-6xl text-gray-700 mb-4 font-thin">edit_note</span>
                            <p className="text-gray-500 font-bold uppercase tracking-widest">Selecciona un jugador para editar sus datos</p>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {/* Biometrics */}
                            <div className="bg-[#161b22] border border-white/5 rounded-3xl p-8 shadow-2xl">
                                <div className="flex items-center gap-2 mb-8">
                                    <span className="material-symbols-outlined text-primary">monitor_weight</span>
                                    <h3 className="text-sm font-black text-white uppercase tracking-widest">Datos Biométricos</h3>
                                </div>
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                                    {[
                                        { label: 'Peso (KG)', key: 'weight', path: 'biometrics' },
                                        { label: 'Altura (CM)', key: 'height', path: 'biometrics' },
                                        { label: 'Edad', key: 'age', path: 'biometrics' },
                                        { label: 'Envergadura', key: 'wingspan', path: 'biometrics' }
                                    ].map(field => (
                                        <div key={field.key} className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">{field.label}</label>
                                            <input
                                                type="text"
                                                value={formData[field.path][field.key]}
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    [field.path]: { ...formData[field.path], [field.key]: e.target.value }
                                                })}
                                                className="w-full bg-background-dark border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-bold outline-none focus:border-primary/50 transition-colors"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Anthropometry */}
                            <div className="bg-[#161b22] border border-white/5 rounded-3xl p-8 shadow-2xl">
                                <div className="flex items-center gap-2 mb-8">
                                    <span className="material-symbols-outlined text-primary">body_system</span>
                                    <h3 className="text-sm font-black text-white uppercase tracking-widest">Antropometría (%)</h3>
                                </div>
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                                    {[
                                        { label: 'Grasa', key: 'fat', path: 'anthropometry' },
                                        { label: 'Músculo', key: 'muscle', path: 'anthropometry' },
                                        { label: 'Hueso', key: 'bone', path: 'anthropometry' },
                                        { label: 'Residual', key: 'residual', path: 'anthropometry' }
                                    ].map(field => (
                                        <div key={field.key} className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">{field.label}</label>
                                            <input
                                                type="text"
                                                value={formData[field.path][field.key]}
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    [field.path]: { ...formData[field.path], [field.key]: e.target.value }
                                                })}
                                                className="w-full bg-background-dark border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-bold outline-none focus:border-primary/50 transition-colors"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Somatotype */}
                            <div className="bg-[#161b22] border border-white/5 rounded-3xl p-8 shadow-2xl">
                                <div className="flex items-center gap-2 mb-8">
                                    <span className="material-symbols-outlined text-primary">analytics</span>
                                    <h3 className="text-sm font-black text-white uppercase tracking-widest">Somatototipo</h3>
                                </div>
                                <div className="grid grid-cols-3 gap-6">
                                    {[
                                        { label: 'Endomorfia', key: 'endo' },
                                        { label: 'Mesomorfia', key: 'meso' },
                                        { label: 'Ectomorfia', key: 'ecto' }
                                    ].map(field => (
                                        <div key={field.key} className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">{field.label}</label>
                                            <input
                                                type="text"
                                                value={formData.somatotype[field.key]}
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    somatotype: { ...formData.somatotype, [field.key]: e.target.value }
                                                })}
                                                className="w-full bg-background-dark border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-bold outline-none focus:border-primary/50 transition-colors"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column: History & Metadata */}
                <div className="lg:col-span-4 space-y-8">
                    {/* Metadata Card */}
                    {player && (
                        <div className="bg-primary/5 border border-primary/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
                            <div className="flex items-center gap-4 mb-6">
                                <img src={player.photo} className="w-16 h-16 rounded-2xl object-cover border-2 border-primary/20" alt="" />
                                <div>
                                    <h4 className="text-lg font-black text-white uppercase leading-none mb-1">{player.name}</h4>
                                    <p className="text-[10px] text-primary font-black uppercase tracking-widest">#{player.number} • {player.position}</p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                                    <span className="text-gray-500">Última actualización</span>
                                    <span className="text-white">Hoy, 20:30h</span>
                                </div>
                                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                                    <span className="text-gray-500">Responsable</span>
                                    <span className="text-white">Dr. Martínez</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UpdatePlayerData;
