import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

// Local Translations
const TEXTS = {
    es: {
        title: "CUESTIONARIO sRPE",
        subtitle: "VALORACIÓN DEL ESFUERZO PERCIBIDO",
        q_rpe: "VALORANDO LA SESIÓN EN GENERAL, ¿CÓMO DE DURA HA SIDO?",
        physio_q: "¿NECESITAS TRATAMIENTO CON EL FISIOTERAPEUTA?",
        doctor_q: "¿NECESITAS REVISIÓN CON EL MÉDICO?",

        labels: {
            0: "Reposo",
            1: "Muy Suave",
            2: "Suave",
            3: "Moderado",
            4: "Algo Duro",
            5: "Duro",
            6: "Más Duro",
            7: "Muy Duro",
            8: "Extremadamente Duro",
            9: "Casi Máximo",
            10: "Máximo / Extenuación"
        },

        opt_yes: "SÍ",
        opt_no: "NO",
        placeholder_comment: "Describe brevemente el motivo...",
        submit: "ENVIAR CUESTIONARIO",
        alert_saved: "Cuestionario sRPE guardado."
    },
    en: {
        title: "sRPE QUESTIONNAIRE",
        subtitle: "SESSION RATING OF PERCEIVED EXERTION",
        q_rpe: "CONSIDERING THE SESSION AS A WHOLE, HOW HARD WAS IT?",
        physio_q: "DO YOU NEED PHYSIOTHERAPY TREATMENT?",
        doctor_q: "DO YOU NEED TO SEE THE DOCTOR?",

        labels: {
            0: "Rest",
            1: "Very Easy",
            2: "Easy",
            3: "Moderate",
            4: "Somewhat Hard",
            5: "Hard",
            6: "Hard +",
            7: "Very Hard",
            8: "Extremely Hard",
            9: "Near Maximal",
            10: "Maximal / Exhaustion"
        },

        opt_yes: "YES",
        opt_no: "NO",
        placeholder_comment: "Briefly describe the reason...",
        submit: "SUBMIT QUESTIONNAIRE",
        alert_saved: "sRPE Questionnaire saved."
    }
}

const PlayerPostTraining = () => {
    const { language } = useLanguage();
    const langCode = (language === 'es' || language === 'en') ? language : 'es';
    const T = TEXTS[langCode];

    const [formData, setFormData] = useState({
        rpe: null as number | null,
        requestPhysio: false,
        physioComment: '',
        requestDoctor: false,
        doctorComment: '',
    });

    // Borg CR10 Scale Config - Matches WBQ Transparent Style
    // Styles for unselected / selected states based on color families
    const getScaleStyle = (val: number, isSelected: boolean) => {
        // Green (0-2)
        if (val <= 2) {
            return isSelected
                ? 'bg-emerald-500 text-black font-black border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)] scale-[1.02]'
                : 'bg-emerald-500/10 text-emerald-500/70 border-emerald-500/20 hover:bg-emerald-500/20 hover:text-emerald-400';
        }
        // Yellow/Amber/Orange (3-6)
        if (val <= 6) {
            return isSelected
                ? 'bg-amber-400 text-black font-black border-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.4)] scale-[1.02]'
                : 'bg-amber-400/10 text-amber-400/70 border-amber-400/20 hover:bg-amber-400/20 hover:text-amber-300';
        }
        // Red (7-10)
        return isSelected
            ? 'bg-rose-600 text-white font-black border-rose-500 shadow-[0_0_20px_rgba(225,29,72,0.4)] scale-[1.02]'
            : 'bg-rose-600/10 text-rose-500/70 border-rose-600/20 hover:bg-rose-600/20 hover:text-rose-400';
    };

    const handleSubmit = () => {
        console.log("Submitting sRPE:", formData);
        alert(T.alert_saved);
    };

    return (
        <div className="flex-1 bg-background-dark p-6 md:p-10 text-white overflow-y-auto w-full pb-40">
            <div className="max-w-5xl mx-auto w-full">
                <header className="mb-10 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-4 mb-3">
                        {/* Changed Icon to Cyan to match WBQ/App Logo */}
                        <span className="material-symbols-outlined text-4xl text-cyan-400">fact_check</span>
                        <h1 className="text-4xl font-black uppercase tracking-tighter text-white">{T.title}</h1>
                    </div>
                    <p className="text-gray-400 text-sm font-bold tracking-wide uppercase">{T.subtitle}</p>
                </header>

                <div className="flex flex-col gap-8">

                    {/* RPE SCALE */}
                    <div className="bg-[#161b22] p-8 rounded-3xl border border-white/5 shadow-2xl">
                        <label className="text-base font-black text-white uppercase tracking-wider block mb-8 text-center bg-[#0d1117] py-4 rounded-xl border border-white/5">
                            {T.q_rpe}
                        </label>

                        <div className="flex flex-col gap-3">
                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((val) => (
                                <button
                                    key={val}
                                    onClick={() => setFormData({ ...formData, rpe: val })}
                                    className={`w-full py-4 px-8 rounded-xl flex items-center justify-between transition-all border ${getScaleStyle(val, formData.rpe === val)}`}
                                >
                                    <span className="text-2xl font-black">{val}</span>

                                    {/* Label */}
                                    <span className="text-lg font-bold uppercase tracking-widest text-right">
                                        {/* @ts-ignore - Index access */}
                                        {T.labels[val]}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="my-2 border-t border-white/10"></div>

                    {/* MEDICAL REQUESTS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Physio Request */}
                        <div className="bg-[#161b22] p-6 rounded-2xl border border-white/5 space-y-4 shadow-xl">
                            <div className="flex flex-col gap-4">
                                <label className="text-sm font-black text-white uppercase tracking-wider leading-relaxed min-h-[40px]">{T.physio_q}</label>
                                <div className="flex grid grid-cols-2 gap-2 bg-black/40 p-1.5 rounded-xl">
                                    <button
                                        onClick={() => setFormData({ ...formData, requestPhysio: true })}
                                        className={`py-2 rounded-lg text-xs font-black uppercase transition-all ${formData.requestPhysio ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' : 'text-gray-500 hover:text-white'}`}
                                    >
                                        {T.opt_yes}
                                    </button>
                                    <button
                                        onClick={() => setFormData({ ...formData, requestPhysio: false })}
                                        className={`py-2 rounded-lg text-xs font-black uppercase transition-all ${!formData.requestPhysio ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'}`}
                                    >
                                        {T.opt_no}
                                    </button>
                                </div>
                            </div>

                            {formData.requestPhysio && (
                                <textarea
                                    value={formData.physioComment}
                                    onChange={(e) => setFormData({ ...formData, physioComment: e.target.value })}
                                    placeholder={T.placeholder_comment}
                                    className="w-full bg-[#0d1117] border border-white/10 rounded-xl p-4 text-sm text-white focus:border-cyan-500 outline-none transition-colors h-32 resize-none animate-in fade-in slide-in-from-top-2 placeholder:text-gray-600 font-medium"
                                />
                            )}
                        </div>

                        {/* Doctor Request */}
                        <div className="bg-[#161b22] p-6 rounded-2xl border border-white/5 space-y-4 shadow-xl">
                            <div className="flex flex-col gap-4">
                                <label className="text-sm font-black text-white uppercase tracking-wider leading-relaxed min-h-[40px]">{T.doctor_q}</label>
                                <div className="flex grid grid-cols-2 gap-2 bg-black/40 p-1.5 rounded-xl">
                                    <button
                                        onClick={() => setFormData({ ...formData, requestDoctor: true })}
                                        className={`py-2 rounded-lg text-xs font-black uppercase transition-all ${formData.requestDoctor ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' : 'text-gray-500 hover:text-white'}`}
                                    >
                                        {T.opt_yes}
                                    </button>
                                    <button
                                        onClick={() => setFormData({ ...formData, requestDoctor: false })}
                                        className={`py-2 rounded-lg text-xs font-black uppercase transition-all ${!formData.requestDoctor ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'}`}
                                    >
                                        {T.opt_no}
                                    </button>
                                </div>
                            </div>

                            {formData.requestDoctor && (
                                <textarea
                                    value={formData.doctorComment}
                                    onChange={(e) => setFormData({ ...formData, doctorComment: e.target.value })}
                                    placeholder={T.placeholder_comment}
                                    className="w-full bg-[#0d1117] border border-white/10 rounded-xl p-4 text-sm text-white focus:border-cyan-500 outline-none transition-colors h-32 resize-none animate-in fade-in slide-in-from-top-2 placeholder:text-gray-600 font-medium"
                                />
                            )}
                        </div>
                    </div>

                    {/* Submit Button changed to Blue/Cyan */}
                    <button
                        onClick={handleSubmit}
                        className="w-full py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black uppercase tracking-widest rounded-2xl hover:brightness-110 transition-all mt-4 text-lg shadow-xl shadow-cyan-500/20 transform hover:-translate-y-1"
                    >
                        {T.submit}
                    </button>

                </div>
            </div>
        </div>
    );
};

export default PlayerPostTraining;
