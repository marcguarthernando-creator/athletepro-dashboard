import React, { useState, useEffect } from 'react';

interface GymProgram {
    date: string;
    selectedPlayers: string[];
    isRestDay: boolean;
    phase: string;
    exercises: {
        id: string;
        name: string;
        sets: string;
        description: string;
        rpe?: string;
        completed?: boolean;
    }[];
}

const PlayerGym: React.FC = () => {
    // For demo purposes, we'll assume the currently logged-in player is always '1' (Alejandro Guerra)
    // In a real app, this would come from auth context
    const currentPlayerId = '1';
    const today = new Date().toISOString().split('T')[0];

    const [todaysWorkout, setTodaysWorkout] = useState<GymProgram | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWorkout = () => {
            // Retrieve programs from localStorage
            const programs: GymProgram[] = JSON.parse(localStorage.getItem('gym_programs') || '[]');

            // Find program for today that includes this player
            const program = programs.find(p =>
                p.date === today && p.selectedPlayers.includes(currentPlayerId)
            );

            setTodaysWorkout(program || null);
            setLoading(false);
        };

        fetchWorkout();
    }, [today]);

    const handleCheckExercise = (exerciseId: string) => {
        if (!todaysWorkout) return;

        // In a real app we would update the backend
        // Here we just update local state visually
        // Note: This won't persist to the 'gym_programs' in localStorage as that's the "template"
        // We would need a separate 'player_workout_progress' storage

        // For visual feedback only in this demo:
        const updatedExercises = todaysWorkout.exercises.map(ex =>
            ex.id === exerciseId ? { ...ex, completed: !ex.completed } : ex
        );
        setTodaysWorkout({ ...todaysWorkout, exercises: updatedExercises });
    };

    if (loading) {
        return <div className="text-white text-center p-10">Cargando entrenamiento...</div>;
    }

    if (!todaysWorkout) {
        return (
            <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-500">
                <div className="w-24 h-24 bg-surface-dark border border-surface-border rounded-full flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-4xl text-text-secondary">fitness_center</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">No tienes entrenamiento programado hoy</h2>
                <p className="text-text-secondary max-w-md">
                    Tu preparador físico no ha asignado ninguna sesión de gimnasio para ti en esta fecha.
                </p>
                <div className="mt-8 p-4 bg-primary/5 rounded-xl border border-primary/10">
                    <p className="text-xs text-primary font-bold uppercase tracking-widest">Disfruta del descanso o consulta al staff</p>
                </div>
            </div>
        );
    }

    if (todaysWorkout.isRestDay) {
        return (
            <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center py-20 text-center animate-in zoom-in duration-500">
                <div className="w-32 h-32 bg-emerald-500/10 rounded-full flex items-center justify-center mb-8 border border-emerald-500/20 shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                    <span className="material-symbols-outlined text-6xl text-emerald-500">spa</span>
                </div>
                <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-4">Rest Day</h1>
                <p className="text-lg text-emerald-400 font-medium max-w-lg">
                    Hoy es día de recuperación. Céntrate en tu descanso, nutrición y sueño para volver más fuerte mañana.
                </p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-8 pb-12">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Entrenamiento de Gimnasio</h1>
                    <p className="text-text-secondary text-sm">Sesión programada para hoy</p>
                </div>
                <div className="px-4 py-2 bg-primary/10 rounded-full border border-primary/20 text-primary text-sm font-medium flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">fitness_center</span>
                    Fase: {todaysWorkout.phase}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-bottom-4 duration-500">
                {todaysWorkout.exercises.map((ex, index) => (
                    <div
                        key={ex.id}
                        className={`p-6 rounded-xl border transition-all flex flex-col gap-4 relative overflow-hidden group
                            ${ex.completed
                                ? 'bg-emerald-500/5 border-emerald-500/30'
                                : 'bg-surface-dark border-surface-border hover:border-primary/50'
                            }
                        `}
                    >
                        <div className="flex justify-between items-start z-10">
                            <div className="flex items-center gap-3">
                                <div className={`size-8 rounded-lg flex items-center justify-center font-black text-sm
                                    ${ex.completed ? 'bg-emerald-500 text-white' : 'bg-white/5 text-white'}
                                `}>
                                    {index + 1}
                                </div>
                                <h3 className={`font-bold text-lg ${ex.completed ? 'text-emerald-400' : 'text-white'}`}>
                                    {ex.name}
                                </h3>
                            </div>
                            <span className="text-xs bg-primary text-background-dark font-bold px-2 py-1 rounded">
                                {ex.sets}
                            </span>
                        </div>

                        {ex.description && (
                            <div className="text-text-secondary text-sm bg-black/20 p-3 rounded-lg z-10 border border-white/5">
                                <p>{ex.description}</p>
                            </div>
                        )}

                        <div className="mt-auto pt-4 border-t border-white/5 z-10">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Registrar carga (kg)"
                                    className="bg-background-dark text-white text-sm px-3 py-2 rounded border border-surface-border w-full outline-none focus:border-primary/50 transition-colors"
                                    disabled={ex.completed}
                                />
                                <button
                                    onClick={() => handleCheckExercise(ex.id)}
                                    className={`transition-colors text-white rounded px-3 flex items-center justify-center
                                        ${ex.completed
                                            ? 'bg-emerald-500 hover:bg-emerald-600'
                                            : 'bg-surface-border hover:bg-primary hover:text-background-dark'
                                        }
                                    `}
                                >
                                    <span className="material-symbols-outlined text-sm">
                                        {ex.completed ? 'undo' : 'check'}
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Background decoration for completed state */}
                        {ex.completed && (
                            <div className="absolute -right-4 -bottom-4 opacity-10 pointer-events-none">
                                <span className="material-symbols-outlined text-9xl text-emerald-500">check_circle</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {todaysWorkout.exercises.length > 0 && todaysWorkout.exercises.every(e => e.completed) && (
                <div className="bg-emerald-500 text-white p-6 rounded-2xl text-center shadow-[0_0_40px_rgba(16,185,129,0.3)] animate-in zoom-in duration-300">
                    <h3 className="text-2xl font-black uppercase italic tracking-tight mb-1">¡Entrenamiento Completado!</h3>
                    <p className="text-sm font-medium opacity-90">Gran trabajo hoy. No olvides registrar tu recuperación.</p>
                </div>
            )}
        </div>
    );
};

export default PlayerGym;
