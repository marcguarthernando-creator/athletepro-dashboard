import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockPlayers } from '../services/mockPlayers';

const GymForm: React.FC = () => {
    const navigate = useNavigate();
    const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [isRestDay, setIsRestDay] = useState(false);
    const [phase, setPhase] = useState('Hipertrofia');
    const [saving, setSaving] = useState(false);
    const [exercises, setExercises] = useState([
        { id: '1', name: '', sets: '', description: '' }
    ]);

    const handlePlayerToggle = (id: string) => {
        setSelectedPlayers(prev =>
            prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        if (selectedPlayers.length === mockPlayers.length) {
            setSelectedPlayers([]);
        } else {
            setSelectedPlayers(mockPlayers.map(p => p.id));
        }
    };

    const addExercise = () => {
        setExercises([...exercises, { id: Date.now().toString(), name: '', sets: '', description: '' }]);
    };

    const removeExercise = (id: string) => {
        setExercises(exercises.filter(e => e.id !== id));
    };

    const updateExercise = (id: string, field: string, value: string) => {
        setExercises(exercises.map(e => e.id === id ? { ...e, [field]: value } : e));
    };

    const handleSave = () => {
        if (selectedPlayers.length === 0) return alert('Selecciona al menos un jugador');
        setSaving(true);

        // Simulation of persistence in localStorage for the demo
        const workoutData = {
            date,
            selectedPlayers,
            isRestDay,
            phase,
            exercises
        };

        const existingPrograms = JSON.parse(localStorage.getItem('gym_programs') || '[]');
        localStorage.setItem('gym_programs', JSON.stringify([...existingPrograms, workoutData]));

        setTimeout(() => {
            setSaving(false);
            alert('Entrenamiento programado correctamente.');
        }, 1500);
    };

    return (
        <div className="flex-1 flex flex-col h-full bg-[#0a0d10] overflow-y-auto p-8 custom-scrollbar">
            <header className="mb-8 flex justify-between items-end max-w-4xl mx-auto w-full">
                <div>
                    <h1 className="text-3xl font-black text-white uppercase tracking-tight mb-2">Entrenamiento GYM</h1>
                    <p className="text-gray-500 text-sm">Programación de sesiones de fuerza y potencia</p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={() => setIsRestDay(!isRestDay)}
                        className={`px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center gap-2 border ${isRestDay
                                ? 'bg-rose-500 text-white border-rose-400'
                                : 'bg-white/5 text-white border-white/10 hover:bg-rose-500/10 hover:text-rose-500 hover:border-rose-500/30'
                            }`}
                    >
                        <span className="material-symbols-outlined text-sm">{isRestDay ? 'event_busy' : 'weekend'}</span>
                        {isRestDay ? 'REST DAY ACTIVO' : 'MARCAR REST DAY'}
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-primary/20 text-primary border border-primary/30 hover:bg-primary hover:text-background-dark px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(0,229,255,0.1)]"
                    >
                        <span className="material-symbols-outlined text-sm">{saving ? 'sync' : 'bolt'}</span>
                        {saving ? 'Publicando...' : 'Publicar Entreno'}
                    </button>
                </div>
            </header>

            <div className="max-w-4xl mx-auto w-full space-y-6">
                {/* Configuration Section */}
                <div className="bg-[#161b22] border border-white/5 rounded-3xl p-8 shadow-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="material-symbols-outlined text-primary">calendar_month</span>
                                <h3 className="text-sm font-black text-white uppercase tracking-widest">Fecha y Fase</h3>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Fecha Programada</label>
                                    <input
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        className="w-full bg-background-dark border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-primary/50 transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Fase Entrenamiento</label>
                                    <select
                                        value={phase}
                                        onChange={(e) => setPhase(e.target.value)}
                                        className="w-full bg-background-dark border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-primary/50 transition-colors appearance-none"
                                    >
                                        <option value="Hipertrofia">Hipertrofia</option>
                                        <option value="Fuerza Máxima">Fuerza Máxima</option>
                                        <option value="Potencia">Potencia</option>
                                        <option value="Acondicionamiento">Acondicionamiento</option>
                                        <option value="Recuperación">Recuperación</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">group</span>
                                    <h3 className="text-sm font-black text-white uppercase tracking-widest">Dirigido a:</h3>
                                </div>
                                <button
                                    onClick={handleSelectAll}
                                    className="text-[10px] font-black text-primary uppercase hover:underline"
                                >
                                    {selectedPlayers.length === mockPlayers.length ? 'Desmarcar Todos' : 'Seleccionar Equipo'}
                                </button>
                            </div>
                            <div className="bg-background-dark border border-white/10 rounded-2xl p-4 max-h-[120px] overflow-y-auto custom-scrollbar flex flex-wrap gap-2">
                                {mockPlayers.map(p => (
                                    <button
                                        key={p.id}
                                        onClick={() => handlePlayerToggle(p.id)}
                                        className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all border ${selectedPlayers.includes(p.id)
                                                ? 'bg-primary/20 text-primary border-primary/30'
                                                : 'bg-white/5 text-gray-500 border-white/5 hover:border-white/20'
                                            }`}
                                    >
                                        {p.name.split(' ')[0]}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {!isRestDay ? (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {exercises.map((ex, index) => (
                            <div key={ex.id} className="bg-[#161b22] border border-white/5 rounded-3xl p-8 shadow-2xl relative group">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="size-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-black text-sm">
                                            {index + 1}
                                        </div>
                                        <h3 className="text-sm font-black text-white uppercase tracking-widest">Ejercicio</h3>
                                    </div>
                                    <button
                                        onClick={() => removeExercise(ex.id)}
                                        className="text-gray-500 hover:text-rose-500 transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-lg">delete</span>
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Nombre del Ejercicio</label>
                                        <input
                                            type="text"
                                            value={ex.name}
                                            onChange={(e) => updateExercise(ex.id, 'name', e.target.value)}
                                            placeholder="Ej: Sentadilla Trasera"
                                            className="w-full bg-background-dark border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Series x Reps</label>
                                        <input
                                            type="text"
                                            value={ex.sets}
                                            onChange={(e) => updateExercise(ex.id, 'sets', e.target.value)}
                                            placeholder="Ej: 4 x 8-10"
                                            className="w-full bg-background-dark border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                    <div className="md:col-span-3 space-y-2">
                                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Pauta / Descripción (Opcional)</label>
                                        <textarea
                                            value={ex.description}
                                            onChange={(e) => updateExercise(ex.id, 'description', e.target.value)}
                                            placeholder="RPE 8, tempo 3-1-1, descanso 90s..."
                                            className="w-full bg-background-dark border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-primary/50 transition-colors h-20 resize-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}

                        <button
                            onClick={addExercise}
                            className="w-full py-4 border-2 border-dashed border-white/10 rounded-3xl text-gray-500 font-black uppercase text-xs tracking-[0.2em] hover:border-primary/30 hover:text-primary transition-all flex items-center justify-center gap-2"
                        >
                            <span className="material-symbols-outlined">add_circle</span>
                            Añadir Ejercicio
                        </button>
                    </div>
                ) : (
                    <div className="bg-rose-500/5 border border-rose-500/20 rounded-[3rem] p-16 text-center space-y-4 animate-in zoom-in duration-500 shadow-2xl">
                        <div className="size-24 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="material-symbols-outlined text-5xl text-rose-500">weekend</span>
                        </div>
                        <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">Day Off Programado</h2>
                        <p className="text-text-secondary max-w-md mx-auto text-sm leading-relaxed">
                            Al publicar este día como <span className="text-rose-400 font-bold">DESCANSO</span>, los jugadores seleccionados no verán ninguna rutina y recibirán un aviso de recuperación en su portal.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GymForm;
