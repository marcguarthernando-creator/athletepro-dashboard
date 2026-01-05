import React, { useState } from 'react';

// Reusable Question Container
const QuestionContainer = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="w-full mb-6 bg-white overflow-hidden rounded-lg shadow-sm">
        <div className="bg-[#1e2329] p-3">
            <h3 className="text-white text-sm font-medium">{title}</h3>
        </div>
        <div className="flex flex-col">
            {children}
        </div>
    </div>
);

// Option Button
const OptionButton = ({
    label,
    value,
    currentValue,
    onClick,
    colorClass
}: {
    label: string,
    value: any,
    currentValue: any,
    onClick: () => void,
    colorClass: string
}) => (
    <button
        type="button"
        onClick={onClick}
        className={`w-full text-left px-4 py-3 text-sm transition-all flex items-center justify-between
            ${colorClass} text-neutral-800
            ${currentValue === value ? 'ring-2 ring-inset ring-black/20 font-bold brightness-95' : 'hover:brightness-95'}
        `}
    >
        <span>{label}</span>
        {currentValue === value && <span className="material-symbols-outlined text-base">check</span>}
    </button>
);

const PlayerWellness: React.FC = () => {
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSelect = (questionId: string, value: any) => {
        setAnswers(prev => ({ ...prev, [questionId]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send data to an API
        console.log('Form submitted:', answers);
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-5xl text-primary">check_circle</span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">¡Cuestionario Enviado!</h2>
                <p className="text-text-secondary mb-8">Tus respuestas han sido registradas correctamente.</p>
                <button
                    onClick={() => setIsSubmitted(false)}
                    className="bg-primary hover:bg-primary-hover text-background-dark font-bold py-3 px-8 rounded-full shadow-lg transition-transform active:scale-95"
                >
                    ENVIAR OTRO
                </button>
            </div>
        );
    }

    const scaleColors = [
        "bg-[#d5f0e4]", // 1 - Very good (Green)
        "bg-[#d5f0e4]", // 2
        "bg-[#e0f3e6]", // 3
        "bg-[#fdf9e2]", // 4 (Yellow)
        "bg-[#feeeda]", // 5 (Orange)
        "bg-[#fee3cd]", // 6
        "bg-[#fadbd8]", // 7 - Very bad (Red)
    ];

    const renderScale7 = (id: string, title: string, startLabel: string, endLabel: string) => (
        <QuestionContainer title={title}>
            {[1, 2, 3, 4, 5, 6, 7].map((val) => {
                let text = `${val}`;
                if (val === 1) text = `${val} (${startLabel})`;
                if (val === 7) text = `${val} (${endLabel})`;

                return (
                    <OptionButton
                        key={val}
                        label={text}
                        value={val}
                        currentValue={answers[id]}
                        onClick={() => handleSelect(id, val)}
                        colorClass={scaleColors[val - 1]}
                    />
                );
            })}
        </QuestionContainer>
    );

    return (
        <div className="w-full max-w-3xl mx-auto pb-12">
            <div className="text-center mb-6">
                <h1 className="text-xl font-bold text-white mb-1">New Well Being Questionnaire (WBQ)</h1>
                <p className="text-primary text-sm">00 - Nombre Apellido</p>
            </div>

            <form onSubmit={handleSubmit}>
                {/* 1. Do you feel sick today? */}
                <QuestionContainer title="Do you feel sick today?">
                    <OptionButton
                        label="No"
                        value="no"
                        currentValue={answers['sick']}
                        onClick={() => handleSelect('sick', 'no')}
                        colorClass="bg-[#d5f0e4]"
                    />
                    <OptionButton
                        label="Yes"
                        value="yes"
                        currentValue={answers['sick']}
                        onClick={() => handleSelect('sick', 'yes')}
                        colorClass="bg-[#fadbd8]"
                    />
                </QuestionContainer>

                {/* 2. How many hours did you sleep? */}
                <QuestionContainer title="How many hours did you sleep last night?">
                    <OptionButton
                        label="≥ 8 h"
                        value=">=8"
                        currentValue={answers['sleep_hours']}
                        onClick={() => handleSelect('sleep_hours', '>=8')}
                        colorClass="bg-[#d5f0e4]"
                    />
                    <OptionButton
                        label="7-8 h"
                        value="7-8"
                        currentValue={answers['sleep_hours']}
                        onClick={() => handleSelect('sleep_hours', '7-8')}
                        colorClass="bg-[#e0f3e6]"
                    />
                    <OptionButton
                        label="6-7 h"
                        value="6-7"
                        currentValue={answers['sleep_hours']}
                        onClick={() => handleSelect('sleep_hours', '6-7')}
                        colorClass="bg-[#feeeda]"
                    />
                    <OptionButton
                        label="≤ 6 h"
                        value="<=6"
                        currentValue={answers['sleep_hours']}
                        onClick={() => handleSelect('sleep_hours', '<=6')}
                        colorClass="bg-[#fadbd8]"
                    />
                </QuestionContainer>

                {/* 3. Sleep Quality */}
                {renderScale7("sleep_quality", "How did you sleep last night?", "very rested", "insomnia")}

                {/* 4. Fatigue */}
                {renderScale7("fatigue", "Do you feel tired today?", "not tired", "very tired")}

                {/* 5. Soreness */}
                {renderScale7("soreness", "Do you feel sore today?", "not sore at all", "very sore")}

                {/* 6. Stress */}
                {renderScale7("stress", "What is your stress level today?", "very relaxed", "highly stressed")}

                {/* 7. Mood */}
                {renderScale7("mood", "What is your mood state today?", "very positive mood", "highly annoyed")}

                <div className="flex justify-end pt-4">
                    <button type="submit" className="bg-primary hover:bg-primary-hover text-background-dark font-bold py-3 px-8 rounded-full shadow-lg transition-transform active:scale-95 flex items-center gap-2">
                        <span className="material-symbols-outlined">send</span>
                        <span>ENVIAR</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PlayerWellness;
