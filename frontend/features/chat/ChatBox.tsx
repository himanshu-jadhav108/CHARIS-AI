'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Crown, Sparkles, RefreshCw } from 'lucide-react';
import { useConsultStore } from '@/stores/useConsultStore';
import { QuickReplies } from './QuickReplies';
import { TypingIndicator } from '@/components/common/TypingIndicator';
import { chatBubbleVariants } from '@/animations/framer';

export const ChatBox: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { messages, quickReplies, isLoading, sendMessage, resetConsultation } = useConsultStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    const text = inputText;
    setInputText('');
    sendMessage(text);
  };

  const handleQuickReplySelect = (reply: string) => {
    if (isLoading) return;
    sendMessage(reply);
  };

  return (
    <div className="flex flex-col h-[75vh] glass-panel rounded-3xl border-gold-400/30 shadow-luxury overflow-hidden relative">
      
      {/* Top Concierge Header */}
      <div className="px-6 py-4 bg-obsidian-950/90 border-b border-gold-400/20 flex items-center justify-between z-10">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-burgundy-800 border border-gold-400/40 flex items-center justify-center text-gold-400 shadow-gold-glow">
            <Crown className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-serif-luxury font-bold text-silk-100 text-sm">CHARIS Sovereign Concierge</h3>
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p className="text-[10px] font-mono text-gold-300/80">Mayfair Private Client Intelligence</p>
          </div>
        </div>

        <button
          onClick={resetConsultation}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-obsidian-850 border border-gold-400/20 text-xs text-silk-300/70 hover:text-gold-300 hover:border-gold-400/40 transition-colors"
          title="New Consultation"
        >
          <RefreshCw className="h-3 w-3" />
          <span>New Session</span>
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <AnimatePresence initial={false}>
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <motion.div
                key={msg.id}
                initial="hidden"
                animate="visible"
                variants={chatBubbleVariants}
                className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}
              >
                {/* Avatar */}
                <div
                  className={`h-9 w-9 rounded-full shrink-0 flex items-center justify-center text-xs font-bold border ${
                    isUser
                      ? 'bg-burgundy-700 text-silk-100 border-gold-400/40'
                      : 'bg-obsidian-850 text-gold-400 border-gold-400/40'
                  }`}
                >
                  {isUser ? 'YOU' : <Crown className="h-4 w-4" />}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[80%] sm:max-w-[70%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-burgundy-800/90 text-silk-100 border border-gold-400/30 rounded-tr-none shadow-burgundy-glow'
                      : 'bg-obsidian-850/90 text-silk-200 border border-gold-400/20 rounded-tl-none font-light shadow-luxury'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span className="text-[9px] font-mono text-silk-300/40 block mt-2 text-right">
                    {msg.timestamp}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <TypingIndicator />
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies Bar */}
      {quickReplies.length > 0 && !isLoading && (
        <div className="border-t border-gold-400/10 bg-obsidian-950/60 backdrop-blur-md">
          <QuickReplies replies={quickReplies} onSelect={handleQuickReplySelect} />
        </div>
      )}

      {/* Input Bar */}
      <form onSubmit={handleSubmit} className="p-4 bg-obsidian-950/90 border-t border-gold-400/20">
        <div className="flex items-center space-x-3 bg-obsidian-850 rounded-2xl border border-gold-400/30 p-2 focus-within:border-gold-400/60 transition-colors">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Tell CHARIS about recipient's style, occasion, or budget..."
            className="flex-1 bg-transparent px-3 py-2 text-xs sm:text-sm text-silk-100 placeholder-silk-300/40 focus:outline-none"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="p-3 rounded-xl bg-gold-gradient text-obsidian-950 font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90 transition-opacity shadow-gold-glow"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>

    </div>
  );
};
