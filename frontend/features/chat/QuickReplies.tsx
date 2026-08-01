'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

interface QuickRepliesProps {
  replies: string[];
  onSelect: (reply: string) => void;
}

export const QuickReplies: React.FC<QuickRepliesProps> = ({ replies, onSelect }) => {
  if (!replies || replies.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 py-3 px-2">
      {replies.map((reply, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(reply)}
          className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-obsidian-850 border border-gold-400/30 text-silk-200 text-xs font-mono hover:bg-burgundy-800/60 hover:text-gold-300 hover:border-gold-400/60 transition-all duration-300 shadow-luxury"
        >
          <Sparkles className="h-3 w-3 text-gold-400" />
          <span>{reply}</span>
        </button>
      ))}
    </div>
  );
};
