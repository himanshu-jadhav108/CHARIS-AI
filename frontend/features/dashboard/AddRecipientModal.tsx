'use client';

import React from 'react';
import { GlassCard } from '@/components/common/GlassCard';

interface AddRecipientModalProps {
  isOpen: boolean;
  name: string;
  relationship: string;
  onNameChange: (val: string) => void;
  onRelationshipChange: (val: string) => void;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const AddRecipientModal: React.FC<AddRecipientModalProps> = ({
  isOpen,
  name,
  relationship,
  onNameChange,
  onRelationshipChange,
  onClose,
  onSubmit
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-md">
      <GlassCard className="max-w-md w-full p-6 sm:p-8 border-gold-400/40 space-y-5">
        <h3 className="font-serif-luxury text-xl font-bold text-silk-100">Add Someone Special</h3>
        
        <form onSubmit={onSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-mono text-[10px] text-gold-400 block mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="E.g., Ananya Sharma"
              className="w-full bg-obsidian-850 rounded-xl border border-gold-400/20 px-3.5 py-2.5 text-silk-100 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="font-mono text-[10px] text-gold-400 block mb-1">Relationship</label>
            <select
              value={relationship}
              onChange={(e) => onRelationshipChange(e.target.value)}
              className="w-full bg-obsidian-850 rounded-xl border border-gold-400/20 px-3.5 py-2.5 text-silk-100 focus:outline-none"
            >
              <option value="Wife">Wife</option>
              <option value="Husband">Husband</option>
              <option value="Father">Father</option>
              <option value="Mother">Mother</option>
              <option value="Partner">Partner</option>
              <option value="Key Partner">Key Partner</option>
            </select>
          </div>

          <div className="flex space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl bg-obsidian-850 border border-gold-400/20 text-silk-300 hover:text-silk-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-gold-gradient text-obsidian-950 font-bold uppercase tracking-wider shadow-gold-glow"
            >
              Save Recipient
            </button>
          </div>
        </form>
      </GlassCard>
    </div>
  );
};
