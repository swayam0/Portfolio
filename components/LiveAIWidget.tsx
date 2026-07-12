'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const SUGGESTED_PROMPTS = [
  "What's his tech stack?",
  "Tell me about Soul Academy",
  "Is he open to freelance?"
];

export default function LiveAIWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Swayam_AI initialized. Ask me anything about his work, stack, or availability." }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;
    
    const userMessage: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });

      const data = await response.json();
      
      if (data.error) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: `Error: ${data.error}`
        }]);
      } else {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.reply || "Error: Unable to parse response."
        }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Error: Connection to AI core failed."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-[320px] md:w-[380px] h-[450px] bg-[#09090b] border border-outline-variant/50 rounded-lg shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Terminal Header */}
            <div className="bg-[#18181b] border-b border-outline-variant/30 p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[16px]">terminal</span>
                <span className="font-label-mono text-xs text-on-surface-variant tracking-wider">swayam_ai.exe</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-on-surface-variant hover:text-error transition-colors">
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 font-label-mono text-sm no-scrollbar">
              {messages.map((msg, i) => (
                <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <span className={`text-[10px] mb-1 opacity-50 ${msg.role === 'user' ? 'text-[#eab308]' : 'text-primary'}`}>
                    {msg.role === 'user' ? 'guest@web' : 'sys@ai'}
                  </span>
                  <div className={`max-w-[85%] rounded p-2 ${
                    msg.role === 'user' 
                      ? 'bg-[#18181b] border border-outline-variant/30 text-on-surface' 
                      : 'text-primary'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex flex-col items-start">
                  <span className="text-[10px] mb-1 opacity-50 text-primary">sys@ai</span>
                  <div className="text-primary animate-pulse">Processing...</div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-outline-variant/30 bg-[#09090b]">
              <div className="flex flex-wrap gap-2 mb-3">
                {SUGGESTED_PROMPTS.map(prompt => (
                  <button
                    key={prompt}
                    onClick={() => handleSend(prompt)}
                    className="text-[10px] font-label-mono px-2 py-1 border border-primary/30 rounded text-primary hover:bg-primary/10 transition-colors whitespace-nowrap"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }}
                className="flex items-center gap-2"
              >
                <span className="text-primary font-label-mono opacity-50">{'>'}</span>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about my work..."
                  className="flex-1 bg-transparent border-none outline-none text-primary font-label-mono text-sm placeholder:text-primary/30"
                />
                <button type="submit" disabled={!inputValue.trim() || isLoading} className="text-primary disabled:opacity-30">
                  <span className="material-symbols-outlined text-[18px]">send</span>
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 ${
          isOpen ? 'bg-[#18181b] border border-outline-variant text-on-surface' : 'bg-primary text-[#052e16]'
        }`}
      >
        <span className="material-symbols-outlined">
          {isOpen ? 'keyboard_arrow_down' : 'chat'}
        </span>
      </button>
    </div>
  );
}
