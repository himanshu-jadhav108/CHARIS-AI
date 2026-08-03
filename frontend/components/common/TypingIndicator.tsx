import React from 'react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-center space-x-2 p-4 rounded-2xl bg-obsidian-850/80 border border-gold-400/20 max-w-xs shadow-luxury">
      <div className="flex items-center space-x-1.5">
        <span className="h-2 w-2 rounded-full bg-gold-400 animate-bounce" style={{ animationDelay: '0ms' }} />
        <span className="h-2 w-2 rounded-full bg-gold-400 animate-bounce" style={{ animationDelay: '200ms' }} />
        <span className="h-2 w-2 rounded-full bg-gold-400 animate-bounce" style={{ animationDelay: '400ms' }} />
      </div>
      <span className="text-xs text-gold-300/80 tracking-widest uppercase font-serif-luxury ml-2">
        CHARIS Concierge Thinking...
      </span>
    </div>
  );
};
