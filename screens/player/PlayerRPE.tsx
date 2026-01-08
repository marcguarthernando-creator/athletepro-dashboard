import React, { useState } from 'react';

const PlayerRPE: React.FC = () => {
    const [selectedRPE, setSelectedRPE] = useState<number | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const rpeScale = [
        { val: 1, label: "Very Easy", color: "bg-[#d5f0e4]", icon: "sentiment_very_satisfied" },
        { val: 2, label: "Easy", color: "bg-[#d5f0e4]", icon: "sentiment_satisfied" },
        { val: 3, label: "Moderate", color: "bg-[#e0f3e6]", icon: "sentiment_neutral" },
        { val: 4, label: "Somewhat Hard", color: "bg-[#fdf9e2]", icon: "sentiment_neutral" },
        { val: 5, label: "Hard", color: "bg-[#feeeda]", icon: "sentiment_dissatisfied" },
        { val: 6, label: "Harder", color: "bg-[#fee3cd]", icon: "sentiment_dissatisfied" },
        { val: 7, label: "Very Hard", color: "bg-[#fadbd8]", icon: "mood_bad" },
        { val: 8, label: "Very Hard +", color: "bg-[#f5c6cb]", icon: "mood_bad" },
        { val: 9, label: "Near Maximal", color: "bg-[#f1b0b7]", icon: "skull" },
        { val: 10, label: "Maximal", color: "bg-[#ed969e]", icon: "skull" },
    ];

    const handleSubmit = () => {
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-5xl text-primary">check_circle</span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">¡Sesión Registrada!</h2>
                <p className="text-text-secondary mb-8">Tu nivel de esfuerzo ha sido guardado correctamente.</p>
                <button
                    onClick={() => { setIsSubmitted(false); setSelectedRPE(null); }}
                    className="bg-primary hover:bg-primary-hover text-background-dark font-bold py-3 px-8 rounded-full shadow-lg transition-transform active:scale-95"
                >
                    ENVIAR OTRO
                </button>
            </div>
        );
    }

    return (
        <div className="w-full max-w-2xl mx-auto flex flex-col gap-8 pb-12">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-white mb-2">Session RPE</h1>
                <p className="text-text-secondary">Considering the session as a whole, how hard was it?</p>
            </div>

            <div className="flex flex-col gap-2">
                {rpeScale.map((item) => (
                    <button
                        key={item.val}
                        onClick={() => setSelectedRPE(item.val)}
                        className={`w-full flex items-center justify-between px-6 py-4 rounded-lg transition-all
                            ${selectedRPE === item.val ? 'ring-4 ring-primary z-10 scale-[1.02]' : 'hover:scale-[1.01]'}
                            ${item.color} text-surface-darker font-bold
                        `}
                    >
                        <span className="text-lg">{item.val}</span>
                        <span className="text-base uppercase tracking-wide">{item.label}</span>
                        <span className="material-symbols-outlined">{item.icon}</span>
                    </button>
                ))}
            </div>

            <div className="mt-4">
                <button
                    disabled={selectedRPE === null}
                    onClick={handleSubmit}
                    className="w-full bg-primary disabled:bg-surface-border disabled:text-text-secondary hover:bg-primary-hover text-background-dark font-bold py-4 px-8 rounded-xl shadow-lg transition-all uppercase tracking-widest"
                >
                    ENVIAR
                </button>
            </div>
        </div>
    );
};

export default PlayerRPE;
