import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

// Local Translations Object
const TEXTS = {
    es: {
        title: "CUESTIONARIO WBQ",
        subtitle: "WELLNESS QUESTIONNAIRE - COMPLETE ANTES DEL ENTRENAMIENTO",
        q_sick: "¿TE ENCUENTRAS ENFERMO HOY?",
        opt_no: "No",
        opt_yes: "Sí",
        q_sleep_hrs: "¿CUÁNTAS HORAS HAS DORMIDO?",
        q_sleep_qual: "¿QUÉ TAL HAS DORMIDO?",
        q_fatigue: "¿TE SIENTES CANSADO?",
        q_soreness: "¿TIENES DOLOR MUSCULAR?",
        q_stress: "¿NIVEL DE ESTRÉS?",
        q_mood: "¿ESTADO DE ÁNIMO?",

        labels: {
            rested: "Muy Descansado",
            insomnia: "Insomnio",
            not_tired: "Nada Cansado",
            tired: "Muy Cansado",
            not_sore: "Sin Dolor",
            sore: "Muy Dolorido",
            relaxed: "Muy Relajado",
            stressed: "Muy Estresado",
            positive: "Muy Positivo",
            annoyed: "Muy Molesto"
        },

        physio_q: "¿NECESITAS TRATAMIENTO CON EL FISIOTERAPEUTA?",
        doctor_q: "¿NECESITAS REVISIÓN CON EL MÉDICO?",
        placeholder_comment: "Describe brevemente el motivo...",
        submit: "ENVIAR CUESTIONARIO",
        alert_saved: "Cuestionario guardado correctamente."
    },
    en: {
        title: "WBQ QUESTIONNAIRE",
        subtitle: "WELLNESS QUESTIONNAIRE - COMPLETE BEFORE TRAINING",
        q_sick: "DO YOU FEEL SICK TODAY?",
        opt_no: "No",
        opt_yes: "Yes",
        q_sleep_hrs: "HOW MANY HOURS DID YOU SLEEP?",
        q_sleep_qual: "HOW DID YOU SLEEP LAST NIGHT?",
        q_fatigue: "DO YOU FEEL TIRED TODAY?",
        q_soreness: "DO YOU FEEL SORE TODAY?",
        q_stress: "WHAT IS YOUR STRESS LEVEL?",
        q_mood: "WHAT IS YOUR MOOD STATE?",

        labels: {
            rested: "Very Rested",
            insomnia: "Insomnia",
            not_tired: "Not Tired",
            tired: "Very Tired",
            not_sore: "Not Sore",
            sore: "Very Sore",
            relaxed: "Very Relaxed",
            stressed: "Highly Stressed",
            positive: "Very Positive",
            annoyed: "Highly Annoyed"
        },

        physio_q: "DO YOU NEED PHYSIOTHERAPY TREATMENT?",
        doctor_q: "DO YOU NEED TO SEE THE DOCTOR?",
        placeholder_comment: "Briefly describe the reason...",
        submit: "SUBMIT QUESTIONNAIRE",
        alert_saved: "Questionnaire saved successfully."
    }
};

const WBQScale = ({
    label,
    value,
    onChange,
    minLabel,
    maxLabel,
}: {
    label: string;
    value: number | null;
    onChange: (val: number) => void;
    minLabel: string;
    maxLabel: string;
}) => {

    // Define styles for each level (Backgrounds)
    const getStyle = (num: number, isSelected: boolean) => {
        // 1-2 Green
        if (num <= 2) {
            return isSelected
                ? 'bg-emerald-500 text-black border-emerald-400 font-black scale-[1.02] shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                : 'bg-emerald-500/20 text-emerald-400 border-white/5 hover:bg-emerald-500/30';
        }
        // 3-5 Amber
        if (num <= 5) {
            return isSelected
                ? 'bg-amber-400 text-black border-amber-300 font-black scale-[1.02] shadow-[0_0_15px_rgba(251,191,36,0.4)]'
                : 'bg-amber-400/20 text-amber-400 border-white/5 hover:bg-amber-400/30';
        }
        // 6-7 Red
        return isSelected
            ? 'bg-rose-500 text-white border-rose-400 font-black scale-[1.02] shadow-[0_0_15px_rgba(244,63,94,0.4)]'
            : 'bg-rose-500/20 text-rose-400 border-white/5 hover:bg-rose-500/30';
    };

    return (
        <div className="bg-[#161b22] p-5 rounded-3xl border border-white/5 space-y-3 shadow-2xl">
            <label className="text-base font-black text-white uppercase tracking-wider block">{label}</label>
            <div className="flex flex-col gap-2">
                {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                    <button
                        key={num}
                        onClick={() => onChange(num)}
                        className={`w-full py-2 px-6 rounded-xl text-left text-sm font-bold transition-all border ${getStyle(num, value === num)}`}
                    >
                        <div className="flex justify-between items-center">
                            <span className="text-base">{num}</span>
                            {num === 1 && <span className="text-xs uppercase font-extrabold tracking-widest opacity-90">{minLabel}</span>}
                            {num === 7 && <span className="text-xs uppercase font-extrabold tracking-widest opacity-90">{maxLabel}</span>}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

const PlayerPreTraining = () => {
    const { language } = useLanguage();
    const langCode = (language === 'es' || language === 'en') ? language : 'es';
    const T = TEXTS[langCode];

    const [formData, setFormData] = useState({
        feelingSick: null as boolean | null,
        sleepHours: '',
        sleepQuality: null as number | null,
        fatigue: null as number | null,
        soreness: null as number | null,
        stress: null as number | null,
        mood: null as number | null,

        requestPhysio: false,
        physioComment: '',
        requestDoctor: false,
        doctorComment: '',
    });

    const handleSubmit = () => {
        console.log("Submitting WBQ:", formData);
        alert(T.alert_saved);
    };

    return (
        <div className="flex-1 bg-background-dark p-6 md:p-10 text-white overflow-y-auto w-full pb-40">
            <div className="max-w-5xl mx-auto w-full">
                <header className="mb-10 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-4 mb-3">
                        <span className="material-symbols-outlined text-3xl text-cyan-400">assignment</span>
                        <h1 className="text-2xl font-black uppercase tracking-tighter text-white">{T.title}</h1>
                    </div>
                    <p className="text-gray-400 text-xs font-bold tracking-wide uppercase">{T.subtitle}</p>
                </header>

                <div className="grid grid-cols-1 gap-6">

                    {/* 1. Sickness */}
                    <div className="bg-[#161b22] p-5 rounded-3xl border border-white/5 shadow-2xl">
                        <label className="text-base font-black text-white uppercase tracking-wider block mb-4">{T.q_sick}</label>
                        <div className="grid grid-cols-2 gap-6">
                            <button
                                onClick={() => setFormData({ ...formData, feelingSick: false })}
                                className={`py-3 rounded-2xl font-black text-base transition-all border ${formData.feelingSick === false
                                    ? 'bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.3)] scale-[1.02]'
                                    : 'bg-emerald-500/10 text-emerald-500/50 border-white/5 hover:bg-emerald-500/20'
                                    }`}
                            >
                                {T.opt_no}
                            </button>
                            <button
                                onClick={() => setFormData({ ...formData, feelingSick: true })}
                                className={`py-3 rounded-2xl font-black text-base transition-all border ${formData.feelingSick === true
                                    ? 'bg-rose-500 text-white shadow-[0_0_20px_rgba(244,63,94,0.3)] scale-[1.02]'
                                    : 'bg-rose-500/10 text-rose-500/50 border-white/5 hover:bg-rose-500/20'
                                    }`}
                            >
                                {T.opt_yes}
                            </button>
                        </div>
                    </div>

                    {/* 2. Sleep Hours */}
                    <div className="bg-[#161b22] p-5 rounded-3xl border border-white/5 shadow-2xl">
                        <label className="text-base font-black text-white uppercase tracking-wider block mb-4">{T.q_sleep_hrs}</label>
                        <div className="flex flex-col gap-2">
                            {['≥ 8 h', '7-8 h', '6-7 h', '≤ 6 h'].map((opt, idx) => {
                                let styleClass = '';
                                const isSelected = formData.sleepHours === opt;

                                if (idx === 0) styleClass = isSelected ? 'bg-emerald-500 text-black' : 'bg-emerald-500/20 text-emerald-400';
                                else if (idx === 1) styleClass = isSelected ? 'bg-emerald-400 text-black' : 'bg-emerald-400/20 text-emerald-300';
                                else if (idx === 2) styleClass = isSelected ? 'bg-amber-400 text-black' : 'bg-amber-400/20 text-amber-400';
                                else styleClass = isSelected ? 'bg-rose-500 text-white' : 'bg-rose-500/20 text-rose-400';

                                return (
                                    <button
                                        key={opt}
                                        onClick={() => setFormData({ ...formData, sleepHours: opt })}
                                        className={`w-full py-2 px-6 rounded-xl text-left font-bold text-base transition-all border border-transparent ${styleClass} ${isSelected ? 'scale-[1.01] shadow-lg brightness-110 font-black' : 'hover:brightness-110 opacity-90'
                                            }`}
                                    >
                                        {opt}
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {/* Scales */}
                    <WBQScale
                        label={T.q_sleep_qual}
                        value={formData.sleepQuality}
                        onChange={(val) => setFormData({ ...formData, sleepQuality: val })}
                        minLabel={T.labels.rested}
                        maxLabel={T.labels.insomnia}
                    />

                    <WBQScale
                        label={T.q_fatigue}
                        value={formData.fatigue}
                        onChange={(val) => setFormData({ ...formData, fatigue: val })}
                        minLabel={T.labels.not_tired}
                        maxLabel={T.labels.tired}
                    />

                    <WBQScale
                        label={T.q_soreness}
                        value={formData.soreness}
                        onChange={(val) => setFormData({ ...formData, soreness: val })}
                        minLabel={T.labels.not_sore}
                        maxLabel={T.labels.sore}
                    />

                    <WBQScale
                        label={T.q_stress}
                        value={formData.stress}
                        onChange={(val) => setFormData({ ...formData, stress: val })}
                        minLabel={T.labels.relaxed}
                        maxLabel={T.labels.stressed}
                    />

                    <WBQScale
                        label={T.q_mood}
                        value={formData.mood}
                        onChange={(val) => setFormData({ ...formData, mood: val })}
                        minLabel={T.labels.positive}
                        maxLabel={T.labels.annoyed}
                    />


                    <div className="my-6 border-t border-white/10"></div>

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

                    <button
                        onClick={handleSubmit}
                        className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black uppercase tracking-widest rounded-2xl hover:brightness-110 transition-all mt-6 text-base shadow-xl shadow-cyan-500/20 transform hover:-translate-y-1"
                    >
                        {T.submit}
                    </button>

                </div>
            </div>
        </div>
    );
};

export default PlayerPreTraining;
