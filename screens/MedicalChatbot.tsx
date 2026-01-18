import React, { useState, useRef, useEffect } from 'react';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    type?: 'text' | 'document';
}

interface MedicalChatbotProps {
    isOpen: boolean;
    onClose: () => void;
}

const MedicalChatbot: React.FC<MedicalChatbotProps> = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', role: 'assistant', content: 'Hola, soy tu asistente de IA médica. Puedo ayudarte a analizar las estadísticas de lesiones o generar informes. ¿Qué necesitas hoy?' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Simulate AI processing
        setTimeout(() => {
            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: generateMockResponse(input)
            };
            setMessages(prev => [...prev, aiResponse]);
            setIsTyping(false);
        }, 1500);
    };

    const generateMockResponse = (query: string): string => {
        const lowerQuery = query.toLowerCase();
        if (lowerQuery.includes('informe') || lowerQuery.includes('reporte')) {
            return 'He comenzado a generar el informe detallado basado en los datos actuales. Te notificaré cuando esté listo para descargar.';
        }
        if (lowerQuery.includes('lesion') || lowerQuery.includes('tobillo') || lowerQuery.includes('rodilla')) {
            return 'Basado en las estadísticas, las lesiones de tobillo representan el 45% del total esta temporada, siendo la recurrencia más alta en los bases.';
        }
        return 'Entendido. Estoy analizando los datos de la temporada para responderte con precisión. (Esta es una respuesta simulada del futuro Gem)';
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-y-0 right-0 w-full md:w-[450px] bg-[#0d1117] border-l border-white/10 shadow-2xl z-[100] transform transition-transform duration-300 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-[#161b22]">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                        <span className="material-symbols-outlined text-white text-xl">auto_awesome</span>
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-sm">AI Medical Assistant</h3>
                        <p className="text-[10px] text-green-400 font-medium flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-green-400"></span>
                            Online
                        </p>
                    </div>
                </div>
                <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors">
                    <span className="material-symbols-outlined text-gray-400">close</span>
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[#0d1117]">
                {messages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                                ? 'bg-indigo-600 text-white rounded-br-none'
                                : 'bg-[#161b22] text-gray-300 border border-white/5 rounded-bl-none'
                            }`}>
                            {msg.content}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-[#161b22] p-3 rounded-2xl rounded-bl-none border border-white/5 flex gap-1">
                            <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></span>
                            <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce delay-75"></span>
                            <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce delay-150"></span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-[#161b22] border-t border-white/10">
                <div className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Pregunta sobre las lesiones..."
                        className="w-full bg-[#0d1117] border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-gray-600"
                    />
                    <button
                        onClick={handleSend}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center hover:bg-indigo-500 transition-colors"
                    >
                        <span className="material-symbols-outlined text-white text-sm">send</span>
                    </button>
                </div>
                <p className="text-[10px] text-gray-600 text-center mt-2 flex items-center justify-center gap-1">
                    Powered by <span className="font-bold text-gray-500">Google Gemini</span> & AthletePro
                </p>
            </div>
        </div>
    );
};

export default MedicalChatbot;
