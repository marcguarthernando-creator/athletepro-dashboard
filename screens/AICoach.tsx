
import React, { useState, useEffect, useRef } from 'react';
import { getFastResponse, searchHealthLocations } from '../services/gemini';
import { ChatMessage, GroundingChunk } from '../types';

const AICoach: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hello Alex! I'm your AI Elite Coach. How can I help you optimize your performance today? I can also help you find nearby gyms or clinics." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      // Check if user is asking for locations
      const lowerInput = input.toLowerCase();
      if (lowerInput.includes('nearby') || lowerInput.includes('where') || lowerInput.includes('find')) {
        let lat, lng;
        try {
          const pos = await new Promise<GeolocationPosition>((res, rej) => navigator.geolocation.getCurrentPosition(res, rej));
          lat = pos.coords.latitude;
          lng = pos.coords.longitude;
        } catch(e) {}
        
        const { text, chunks } = await searchHealthLocations(input, lat, lng);
        setMessages(prev => [...prev, { role: 'model', text, links: chunks }]);
      } else {
        const response = await getFastResponse(input);
        setMessages(prev => [...prev, { role: 'model', text: response }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I had trouble connecting to my knowledge base." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 flex flex-col h-full overflow-hidden bg-background-dark">
      <div className="p-6 md:p-10 flex flex-col h-full max-w-5xl mx-auto w-full">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-black text-white">Elite AI Coach</h1>
            <p className="text-text-secondary text-sm">Powered by Gemini 2.5 Flash Lite</p>
          </div>
          <div className="flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-primary text-xs font-bold uppercase">Online</span>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto space-y-4 mb-6 pr-2 scroll-smooth"
        >
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl p-4 ${
                m.role === 'user' 
                  ? 'bg-primary text-background-dark font-medium' 
                  : 'bg-surface-dark border border-surface-border text-white'
              }`}>
                <p className="text-sm leading-relaxed">{m.text}</p>
                {m.links && m.links.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-surface-border flex flex-col gap-2">
                    <p className="text-[10px] uppercase font-bold text-text-secondary">Resources Found:</p>
                    {m.links.map((link, li) => (
                      <a 
                        key={li} 
                        href={link.maps?.uri || link.web?.uri} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs text-primary hover:underline"
                      >
                        <span className="material-symbols-outlined text-sm">open_in_new</span>
                        {link.maps?.title || link.web?.title || 'Visit link'}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-surface-dark border border-surface-border rounded-2xl p-4 flex gap-1 items-center">
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce delay-100"></div>
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          )}
        </div>

        <div className="relative group">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything (e.g., 'Find clinics near me' or 'Recovery tips')"
            className="w-full bg-surface-dark border border-surface-border rounded-xl py-4 pl-6 pr-14 text-white focus:outline-none focus:border-primary transition-all shadow-lg"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="absolute right-2 top-2 h-10 w-10 bg-primary rounded-lg text-background-dark flex items-center justify-center hover:bg-primary-hover transition-colors disabled:opacity-50"
          >
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>
        <p className="text-center text-[10px] text-text-secondary mt-4 uppercase tracking-widest font-bold">
          Always consult with a medical professional before starting new regimes.
        </p>
      </div>
    </main>
  );
};

export default AICoach;
