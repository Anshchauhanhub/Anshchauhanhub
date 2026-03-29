import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = 'https://ansh99-ragagent.hf.space/ai-chat';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([
                { text: "👋 Hi! I'm Ansh's RAG-powered AI assistant. I have direct access to his projects, skills, and experience via my knowledge base. How can I help you today?", sender: 'bot' }
            ]);
        }
    }, [isOpen]);

    useEffect(scrollToBottom, [messages]);

    const simulateTyping = async (text) => {
        setIsTyping(true);
        setMessages(prev => [...prev, { text, sender: 'bot' }]);
        setIsTyping(false);
    };

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg = input.trim();
        setMessages(prev => [...prev, { text: userMsg, sender: 'user' }]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMsg })
            });

            if (!response.ok) throw new Error('API Error');

            const data = await response.json();
            const botResponse = data.result || data.response || data.answer || data.message || 
                               "I'm sorry, I couldn't find an answer in my RAG knowledge base.";
            
            await simulateTyping(botResponse);
        } catch (error) {
            setMessages(prev => [...prev, { 
                text: "⚠️ Connection Error: I'm having trouble reaching my RAG agent. Try again in a few seconds!", 
                sender: 'bot' 
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)] border border-white/20 text-white z-[998] hover:scale-110 active:scale-95 transition-all group overflow-hidden"
            >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                {isOpen ? <X size={28} className="relative z-10" /> : <MessageSquare size={28} className="relative z-10" />}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 100 }}
                        className="fixed bottom-24 right-8 w-[400px] max-w-[calc(100vw-40px)] h-[560px] max-h-[calc(100vh-140px)] bg-black border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[999] flex flex-col overflow-hidden backdrop-blur-2xl"
                    >
                        {/* Header */}
                        <div className="bg-zinc-900/50 p-5 flex justify-between items-center border-b border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                                    <Sparkles className="text-emerald-400" size={20} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-sm tracking-tight">RAG Assistant</h4>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-[10px] text-emerald-400 font-medium uppercase tracking-widest">Online</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 scroll-smooth bg-black">
                            {messages.map((msg, i) => (
                                <motion.div 
                                    initial={{ opacity: 0, x: msg.sender === 'user' ? 20 : -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    key={i} 
                                    className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                                        msg.sender === 'user' 
                                            ? 'bg-zinc-800 border border-white/10 text-white rounded-2xl rounded-tr-sm shadow-lg' 
                                            : 'bg-zinc-900/50 border border-white/5 text-slate-200 rounded-2xl rounded-tl-sm shadow-xl'
                                    }`}>
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-zinc-900/50 border border-white/5 p-4 rounded-2xl rounded-tl-sm text-slate-300 text-sm flex items-center gap-3 shadow-xl">
                                        <div className="flex gap-1">
                                            <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                            <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                            <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
                                        </div>
                                        <span className="font-medium text-emerald-400/80">Querying RAG...</span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-5 border-t border-white/5 bg-zinc-950 flex gap-3">
                            <div className="relative flex-1">
                                <input 
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask anything about Ansh..."
                                    className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl px-5 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-white/30 transition-all placeholder:text-slate-600"
                                />
                            </div>
                            <button 
                                onClick={handleSend}
                                className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:scale-110 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale"
                                disabled={!input.trim() || isLoading}
                            >
                                <Send size={20} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Chatbot;
