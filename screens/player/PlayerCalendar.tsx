import React from 'react';

const PlayerCalendar = () => {
    // Placeholder Calendar ID or logic
    const CALENDAR_SRC = "https://calendar.google.com/calendar/embed?src=en.spanish%23holiday%40group.v.calendar.google.com&ctz=Europe%2FMadrid";

    return (
        <div className="flex-1 bg-background-dark p-6 md:p-8 text-white w-full h-full flex flex-col min-h-[80vh]">
            <header className="mb-6 flex items-center gap-3">
                <span className="material-symbols-outlined text-3xl text-primary">calendar_today</span>
                <h1 className="text-3xl font-black uppercase tracking-tight">Calendario de Equipo</h1>
            </header>

            <div className="flex-1 bg-surface rounded-2xl border border-white/5 shadow-2xl overflow-hidden relative min-h-[500px]">
                <iframe
                    src={CALENDAR_SRC}
                    style={{ border: 0 }}
                    width="100%"
                    height="100%"
                    title="Google Calendar"
                    className="absolute inset-0 w-full h-full bg-white"
                ></iframe>
            </div>

            <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-start gap-3">
                <span className="material-symbols-outlined text-blue-400">info</span>
                <div>
                    <p className="text-sm font-bold text-blue-200 uppercase tracking-wide mb-1">Configuración del Calendario</p>
                    <p className="text-xs text-blue-300/70">
                        Este calendario muestra los eventos del equipo. Para vincular tu propio Google Calendar, edita el componente <code>PlayerCalendar.tsx</code> y actualiza la URL <code>src</code>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PlayerCalendar;
