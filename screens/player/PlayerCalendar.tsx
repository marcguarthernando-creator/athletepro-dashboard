import React, { useState } from 'react';

const PlayerCalendar: React.FC = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);

    const handleConnect = () => {
        setIsSyncing(true);
        // Simulate OAuth flow
        setTimeout(() => {
            setIsSyncing(false);
            setIsConnected(true);
        }, 2000);
    };

    return (
        <div className="w-full max-w-4xl mx-auto py-8 px-4 h-full flex flex-col">
            <div className="flex items-center justify-between mb-8 border-b border-surface-border/50 pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Mi Calendario</h1>
                    <p className="text-text-secondary">Gestiona tus entrenamientos y consultas médicas desde un solo lugar.</p>
                </div>

                <div className="flex items-center gap-4">
                    {isConnected ? (
                        <div className="flex items-center gap-3 bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
                            <img src="https://www.gstatic.com/images/branding/product/1x/calendar_2020q4_48dp.png" alt="Google Calendar" className="w-5 h-5" />
                            <span className="text-primary text-sm font-medium">Sincronizado con Google</span>
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                        </div>
                    ) : (
                        <button
                            onClick={handleConnect}
                            disabled={isSyncing}
                            className={`flex items-center gap-3 bg-white hover:bg-neutral-100 text-neutral-800 font-bold py-2.5 px-6 rounded-full shadow-lg transition-all transform active:scale-95 ${isSyncing ? 'opacity-70 cursor-wait' : ''}`}
                        >
                            {isSyncing ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-neutral-800 border-t-transparent rounded-full animate-spin"></div>
                                    <span>CONECTANDO...</span>
                                </>
                            ) : (
                                <>
                                    <img src="https://www.gstatic.com/images/branding/product/1x/calendar_2020q4_48dp.png" alt="Google Calendar" className="w-5 h-5" />
                                    <span>VINCULAR GOOGLE CALENDAR</span>
                                </>
                            )}
                        </button>
                    )}
                </div>
            </div>

            <div className="flex-1 bg-surface-dark border border-surface-border rounded-2xl overflow-hidden shadow-2xl relative min-h-[500px]">
                {!isConnected ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center bg-background-dark/80 backdrop-blur-sm z-10">
                        <div className="w-24 h-24 bg-surface-border/30 rounded-full flex items-center justify-center mb-6">
                            <span className="material-symbols-outlined text-5xl text-text-secondary">calendar_today</span>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-4">¿Quieres ver tus eventos aquí?</h2>
                        <p className="text-text-secondary max-w-md mb-8">
                            Vincula tu cuenta de Google Calendar para sincronizar automáticamente tus sesiones de entrenamiento,
                            descansos y citas médicas directamente en el portal.
                        </p>
                        <button
                            onClick={handleConnect}
                            className="text-primary font-bold hover:underline underline-offset-8 flex items-center gap-2"
                        >
                            Comenzar configuración <span className="material-symbols-outlined">arrow_forward</span>
                        </button>
                    </div>
                ) : (
                    <div className="p-8 h-full flex flex-col animate-in fade-in duration-700">
                        <div className="grid grid-cols-7 gap-px bg-surface-border/50 rounded-xl overflow-hidden mb-8 border border-surface-border/50">
                            {['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'].map(day => (
                                <div key={day} className="bg-surface-dark/50 p-4 text-center text-xs font-bold text-primary tracking-widest">{day}</div>
                            ))}
                            {Array.from({ length: 35 }).map((_, i) => (
                                <div key={i} className="bg-surface-dark min-h-[100px] p-2 hover:bg-surface-border/10 transition-colors border border-surface-border/20 group">
                                    <span className={`text-xs ${i === 15 ? 'bg-primary text-background-dark font-bold rounded-full w-6 h-6 flex items-center justify-center' : 'text-text-secondary'}`}>
                                        {((i + 25) % 31) + 1}
                                    </span>
                                    {i === 15 && (
                                        <div className="mt-2 text-[10px] bg-primary/20 text-primary border border-primary/30 p-1.5 rounded-md flex flex-col gap-0.5">
                                            <span className="font-bold">ENTRENAMIENTO GYM</span>
                                            <span className="opacity-80">09:00 - 10:30</span>
                                        </div>
                                    )}
                                    {i === 17 && (
                                        <div className="mt-2 text-[10px] bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 p-1.5 rounded-md flex flex-col gap-0.5">
                                            <span className="font-bold">CONSULTA MÉDICA</span>
                                            <span className="opacity-80">12:15 - 13:00</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PlayerCalendar;
