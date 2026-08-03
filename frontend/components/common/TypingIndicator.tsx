import React, { useEffect, useState } from 'react';

const MESSAGES = [
  "Understanding recipient...",
  "Reviewing memories...",
  "Matching luxury products...",
  "Preparing recommendations...",
  "Generating your concierge experience..."
];

export const TypingIndicator: React.FC = () => {
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMsgIdx((prev) => (prev + 1) % MESSAGES.length);
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center space-x-3 p-4 rounded-2xl bg-obsidian-850/80 border border-gold-400/20 max-w-sm shadow-luxury">
      <div className="flex items-center space-x-1.5 shrink-0">
        <span className="h-2 w-2 rounded-full bg-gold-400 animate-bounce" style={{ animationDelay: '0ms' }} />
        <span className="h-2 w-2 rounded-full bg-gold-400 animate-bounce" style={{ animationDelay: '200ms' }} />
        <span className="h-2 w-2 rounded-full bg-gold-400 animate-bounce" style={{ animationDelay: '400ms' }} />
      </div>
      <span className="text-xs text-gold-300/80 tracking-wide uppercase font-serif-luxury ml-2 animate-pulse">
        {MESSAGES[msgIdx]}
      </span>
    </div>
  );
};
