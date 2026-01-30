import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const QUESTIONS = [
    // Stress (1-21)
    { id: 1, area_es: "Estrés General", area_en: "General Stress", es: "Todo fue demasiado para mí", en: "Everything was too much for me" },
    { id: 2, area_es: "", area_en: "", es: "Me sentí agotado", en: "I felt wrung out" },
    { id: 3, area_es: "", area_en: "", es: "Me sentí sobrecargado físicamente", en: "I felt physically overloaded" },

    { id: 4, area_es: "Estrés Emocional", area_en: "Emotional Stress", es: "Me sentí frustrado", en: "I felt frustrated" },
    { id: 5, area_es: "", area_en: "", es: "Me sentí desanimado y triste", en: "I felt discouraged and sad" },
    { id: 6, area_es: "", area_en: "", es: "Me sentí emocionalmente agotado", en: "I felt emotionally exhausted" },

    { id: 7, area_es: "Estrés Social", area_en: "Social Stress", es: "Tuve discusiones con otros", en: "I had arguments with others" },
    { id: 8, area_es: "", area_en: "", es: "Me sentí solo", en: "I felt lonely" },
    { id: 9, area_es: "", area_en: "", es: "Me sentí presionado por otros", en: "I felt pressured by others" },

    { id: 10, area_es: "Conflictos / Presión", area_en: "Conflicts / Pressure", es: "Tuve que tomar decisiones importantes", en: "I had to make important decisions" },
    { id: 11, area_es: "", area_en: "", es: "Tuve conflictos con mis metas personales", en: "I had conflicts with my personal goals" },
    { id: 12, area_es: "", area_en: "", es: "Sentí que el tiempo se me escapaba", en: "I felt that time was slipping away" },

    { id: 13, area_es: "Fatiga", area_en: "Fatigue", es: "Me sentí cansado", en: "I felt tired" },
    { id: 14, area_es: "", area_en: "", es: "Me sentí con poca energía", en: "I felt low in energy" },
    { id: 15, area_es: "", area_en: "", es: "Me sentí débil", en: "I felt weak" },

    { id: 16, area_es: "Quejas Somáticas", area_en: "Somatic Complaints", es: "Tuve dolores musculares", en: "I had muscular pain" },
    { id: 17, area_es: "", area_en: "", es: "Tuve dolores de cabeza", en: "I had headaches" },
    { id: 18, area_es: "", area_en: "", es: "Tuve problemas de estómago", en: "I had stomach problems" },

    { id: 19, area_es: "Éxito", area_en: "Success", es: "Tuve éxito", en: "I was successful" },
    { id: 20, area_es: "", area_en: "", es: "Estuve orgulloso de mi rendimiento", en: "I was proud of my performance" },
    { id: 21, area_es: "", area_en: "", es: "Me sentí en control", en: "I felt in control" },

    // Recovery (22-36)
    { id: 22, area_es: "Recuperación Social", area_en: "Social Recovery", es: "Pasé tiempo con gente que me gusta", en: "I spent time with people I like" },
    { id: 23, area_es: "", area_en: "", es: "Hice cosas divertidas con otros", en: "I did fun things with others" },
    { id: 24, area_es: "", area_en: "", es: "Recibí apoyo de otros", en: "I received support from others" },

    { id: 25, area_es: "Recuperación Física", area_en: "Physical Recovery", es: "Me sentí físicamente relajado", en: "I felt physically relaxed" },
    { id: 26, area_es: "", area_en: "", es: "Mis músculos se sintieron recuperados", en: "My muscles felt recovered" },
    { id: 27, area_es: "", area_en: "", es: "Me tomé tiempo para la recuperación física", en: "I took time for physical recovery" },

    { id: 28, area_es: "Bienestar General", area_en: "General Well-being", es: "Me sentí bien", en: "I felt good" },
    { id: 29, area_es: "", area_en: "", es: "Me sentí en forma", en: "I felt fit" },
    { id: 30, area_es: "", area_en: "", es: "Estuve de buen humor", en: "I was in a good mood" },

    { id: 31, area_es: "Calidad del Sueño", area_en: "Sleep Quality", es: "Dormí profundamente", en: "I slept deeply" },
    { id: 32, area_es: "", area_en: "", es: "Me desperté sintiéndome descansado", en: "I woke up feeling rested" },
    { id: 33, area_es: "", area_en: "", es: "Me dormí fácilmente", en: "I fell asleep easily" },

    { id: 34, area_es: "Autorregulación", area_en: "Self-Regulation", es: "Me ocupé de mis problemas", en: "I took care of my problems" },
    { id: 35, area_es: "", area_en: "", es: "Hice algo solo para mí", en: "I did something just for myself" },
    { id: 36, area_es: "", area_en: "", es: "Me tomé tiempo para relajarme", en: "I took time for relax" },
];

const PlayerRestQ = () => {
    const { language } = useLanguage();
    const isEs = language === 'es' || !language;
    const [scores, setScores] = useState<Record<number, number>>({});

    const handleScoreChange = (id: number, val: number) => {
        setScores(prev => ({ ...prev, [id]: val }));
    };

    const handleSubmit = () => {
        console.log("RESTQ Scores:", scores);
        alert(isEs ? "Cuestionario guardado." : "Questionnaire saved.");
    };

    // Grouping helper
    const sections = [];
    for (let i = 0; i < QUESTIONS.length; i += 3) {
        sections.push(QUESTIONS.slice(i, i + 3));
    }

    return (
        <div className="flex-1 bg-background-dark p-6 md:p-10 text-white overflow-y-auto w-full pb-40">
            <div className="max-w-6xl mx-auto w-full">
                <header className="mb-10 text-center md:text-left animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="flex items-center justify-center md:justify-start gap-4 mb-3">
                        <span className="material-symbols-outlined text-3xl text-cyan-400">poll</span>
                        <h1 className="text-2xl font-black uppercase tracking-tighter text-white">
                            {isEs ? "CUESTIONARIO RESTQ-SPORT-36" : "RESTQ-SPORT-36 QUESTIONNAIRE"}
                        </h1>
                    </div>
                    <p className="text-blue-200/80 text-sm font-bold tracking-wide uppercase leading-relaxed max-w-4xl text-justify md:text-left">
                        {isEs
                            ? "Instrucciones: Por favor, indica la frecuencia con la que has tenido las siguientes sensaciones durante los últimos 3 días/noches. (0=Nunca, 1=Rara vez, 2=A veces, 3=A menudo, 4=Muy a menudo, 5=Casi siempre, 6=Siempre)."
                            : "Instructions: Please indicate how often you have had the following feelings during the last 3 days/nights. (0=Never, 1=Seldom, 2=Sometimes, 3=Often, 4=Very often, 5=Almost always, 6=Always)."
                        }
                    </p>
                </header>

                <div className="space-y-6">
                    {sections.map((group, groupIdx) => {
                        const head = group[0];
                        const areaName = isEs ? head.area_es : head.area_en;
                        const isRecovery = head.id >= 22;
                        const isRecoveryStart = head.id === 22;

                        return (
                            <React.Fragment key={groupIdx}>
                                {/* Major Section Divider for Recovery */}
                                {isRecoveryStart && (
                                    <div className="py-8 flex items-center gap-4 justify-center">
                                        <div className="h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent w-full opacity-50"></div>
                                        <span className="whitespace-nowrap font-black text-2xl uppercase tracking-widest text-cyan-400 glow-text">
                                            {isEs ? "RECUPERACIÓN" : "RECOVERY"}
                                        </span>
                                        <div className="h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent w-full opacity-50"></div>
                                    </div>
                                )}

                                {/* Area Card */}
                                <div className={`border rounded-3xl overflow-hidden shadow-xl transition-all hover:border-cyan-500/30 ${isRecovery ? 'bg-[#161b22] border-cyan-900/30' : 'bg-[#161b22] border-white/5'}`}>
                                    {/* Area Header */}
                                    <div className={`p-4 border-b flex justify-between items-center ${isRecovery ? 'bg-cyan-950/30 border-cyan-900/30' : 'bg-[#0d1117] border-white/5'}`}>
                                        <h3 className={`text-lg font-black uppercase tracking-wider ${isRecovery ? 'text-cyan-400' : 'text-blue-300'}`}>
                                            {areaName}
                                        </h3>
                                        <span className="text-xs font-bold bg-black/40 px-3 py-1 rounded-full text-white/50">
                                            {group[0].id}-{group[2].id}
                                        </span>
                                    </div>

                                    {/* Questions List */}
                                    <div className="divide-y divide-white/5">
                                        {group.map((q) => (
                                            <div key={q.id} className="p-3 md:p-4 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-center hover:bg-white/5 transition-colors group">
                                                {/* Statement */}
                                                <p className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
                                                    <span className="inline-block w-8 text-right mr-3 font-mono text-gray-500 font-bold opacity-50">
                                                        {q.id}.
                                                    </span>
                                                    {isEs ? q.es : q.en}
                                                </p>

                                                {/* Buttons 0-6 */}
                                                <div className="flex gap-1 md:gap-2 justify-center">
                                                    {[0, 1, 2, 3, 4, 5, 6].map((score) => {
                                                        const isSelected = scores[q.id] === score;

                                                        // Color logic: "Play with colors".
                                                        // We'll use a gradient logic or just vibrant blue selection.
                                                        // Gradient: 0 (Gray/Green) -> 3 (Blue) -> 6 (Purple/Red)? 
                                                        // RESTQ: High score in Stress is BAD, High in Recovery is GOOD.
                                                        // So unified color might be safer, or context dependent. 
                                                        // User asked for "Blue tones". Let's stick to Blue/Cyan for all to be safe and consistent.

                                                        return (
                                                            <button
                                                                key={score}
                                                                onClick={() => handleScoreChange(q.id, score)}
                                                                className={`
                                                                    w-8 h-8 md:w-9 md:h-9 rounded-xl flex items-center justify-center font-black text-xs md:text-base transition-all border 
                                                                    ${isSelected
                                                                        ? 'bg-cyan-500 text-black border-cyan-400 scale-110 shadow-[0_0_15px_rgba(6,182,212,0.5)] z-10'
                                                                        : 'bg-[#0d1117] text-gray-500 border-white/10 hover:border-cyan-500/50 hover:text-cyan-400 hover:bg-cyan-950/20'
                                                                    }
                                                                `}
                                                            >
                                                                {score}
                                                            </button>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </React.Fragment>
                        );
                    })}
                </div>

                <div className="mt-12 flex justify-end pb-8">
                    <button
                        onClick={handleSubmit}
                        className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-black uppercase tracking-widest rounded-3xl hover:brightness-110 transition-all shadow-2xl shadow-cyan-600/20 transform hover:-translate-y-1 text-base flex items-center gap-4"
                    >
                        <span className="material-symbols-outlined text-xl">save</span>
                        {isEs ? "Guardar Respuestas" : "Save Answers"}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default PlayerRestQ;
