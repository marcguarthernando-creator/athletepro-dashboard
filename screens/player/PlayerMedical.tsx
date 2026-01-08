import React, { useState, useRef, useEffect } from 'react';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
}

const PlayerMedical: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "Hola, soy tu asistente médico virtual potenciado por Gemini. ¿En qué puedo ayudarte hoy? Puedes preguntarme sobre tus lesiones, nutrición o consejos de recuperación.",
            sender: 'ai',
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg: Message = {
            id: Date.now(),
            text: input,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const aiMsg: Message = {
                id: Date.now() + 1,
                text: getSimulatedResponse(input),
                sender: 'ai',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiMsg]);
            setIsTyping(false);
        }, 1500);
    };

    const getSimulatedResponse = (query: string) => {
        const q = query.toLowerCase();
        if (q.includes("rodilla")) return "Entiendo que tienes molestias en la rodilla. Basado en tus datos recientes, te recomiendo aplicar hielo 15 min y evitar ejercicios de alto impacto hoy. He avisado al equipo de fisioterapia para que te revisen mañana.";
        if (q.includes("sueño") || q.includes("dormir")) return "He notado que tus horas de sueño han bajado esta semana. Para optimizar tu recuperación, intenta mantener la habitación a 18-20°C y evita pantallas 30 minutos antes de acostarte.";
        if (q.includes("dieta") || q.includes("comer")) return "Para tu entrenamiento de alta intensidad de hoy, prioriza carbohidratos complejos y mantén una hidratación constante de al menos 2.5L de agua.";
        return "Gracias por tu consulta. Estoy analizando tus métricas de rendimiento y salud. ¿Podrías darme más detalles sobre cómo te sientes?";
    };

    return (
        <div className="w-full max-w-4xl mx-auto h-[calc(100vh-140px)] flex flex-col gap-4">
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary">psychology</span>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-white">Asistente Médico IA</h1>
                        <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                            <span className="text-[10px] text-emerald-500 font-bold tracking-wider uppercase">Powered by Gemini</span>
                        </div>
                    </div>
                </div>
                <button className="text-text-secondary hover:text-white transition-colors">
                    <span className="material-symbols-outlined">settings</span>
                </button>
            </div>

            <div className="flex-1 bg-surface-dark/30 border border-surface-border/50 rounded-2xl flex flex-col overflow-hidden backdrop-blur-sm">
                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 custom-scrollbar">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-lg
                                    ${msg.sender === 'user'
                                        ? 'bg-primary text-background-dark rounded-tr-none font-medium'
                                        : 'bg-surface-dark border border-surface-border text-white rounded-tl-none'}
                                `}>
                                    {msg.text}
                                </div>
                                <span className="text-[10px] text-text-secondary mt-1.5 px-1 uppercase tracking-tighter">
                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="bg-surface-dark border border-surface-border px-4 py-3 rounded-2xl rounded-tl-none">
                                <div className="flex gap-1">
                                    <div className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce"></div>
                                    <div className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                    <div className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <form onSubmit={handleSend} className="p-4 bg-background-dark/50 border-t border-surface-border/50">
                    <div className="relative flex items-center">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Escribe tu consulta médica..."
                            className="w-full bg-surface-dark border border-surface-border focus:border-primary/50 focus:ring-1 focus:ring-primary/20 rounded-xl px-4 py-3.5 pr-14 text-sm text-white placeholder:text-text-secondary transition-all outline-none"
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || isTyping}
                            className="absolute right-2 p-2 text-primary hover:bg-primary/10 rounded-lg transition-all disabled:opacity-50"
                        >
                            <span className="material-symbols-outlined text-2xl">send</span>
                        </button>
                    </div>
                    <p className="text-[10px] text-center text-text-secondary mt-3 uppercase tracking-widest opacity-50">
                        La IA puede proporcionar información útil, pero siempre consulta con el equipo médico del club.
                    </p>
                </form>
            </div>
        </div>
    );
};

export default PlayerMedical;
