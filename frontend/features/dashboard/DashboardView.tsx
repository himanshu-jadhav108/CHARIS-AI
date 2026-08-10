'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles } from 'lucide-react';
import { ThemeSelector } from '@/components/ThemeSelector';
import { useAuthStore } from '@/stores/useAuthStore';
import { useBookmarkStore } from '@/stores/useBookmarkStore';
import { fetchRecipientsApi, createRecipientApi } from '@/services/api';
import { RecipientProfileData } from './types';
import { DashboardHeader } from './DashboardHeader';
import { OccasionsDiary } from './OccasionsDiary';
import { RecipientRegistry } from './RecipientRegistry';
import { SavedGiftsVault } from './SavedGiftsVault';
import { RecipientDetailModal } from './RecipientDetailModal';
import { AddRecipientModal } from './AddRecipientModal';

export const DashboardView: React.FC = () => {
  const { user, isAuthenticated, isLoading: authLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/auth');
    }
  }, [isAuthenticated, authLoading, router]);

  const { bookmarkedProducts } = useBookmarkStore();
  const [recipientModalOpen, setRecipientModalOpen] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState<RecipientProfileData | null>(null);
  
  const [newRecName, setNewRecName] = useState('');
  const [newRecRel, setNewRecRel] = useState('Partner');

  const [recipients, setRecipients] = useState<RecipientProfileData[]>([]);

  useEffect(() => {
    if (!authLoading && isAuthenticated && user) {
      const token = user.access_token || 'active_session_token';
      fetchRecipientsApi(token).then((data) => {
        if (data && data.length > 0) {
          const mapped = data.map((r: any) => ({
            id: r.id,
            name: r.name,
            relationship: r.relationship,
            lifestyle: r.lifestyle || 'Custom preference dossier profile',
            birthday: r.birthday || 'TBD',
            anniversary: r.anniversary || '',
            profession: r.lifestyle ? r.lifestyle.split('•')[0].trim() : 'Refined Society',
            interests: r.hobbies || [],
            hobbies: r.hobbies || [],
            favourite_brands: r.favourite_brands || [],
            favourite_colours: r.favourite_colours || [],
            luxury_style: r.luxury_preference || 'Sophisticated Curation',
            last_gift: r.relationship === 'Mother' ? 'Luxury Tea Collection' : r.relationship === 'Father' ? 'Titan Edge Watch' : r.relationship === 'Wife' ? 'Heritage Painting' : 'None yet',
            notes: r.personal_notes || '',
            avatar_color: r.relationship === 'Mother' ? 'bg-emerald-800' : r.relationship === 'Father' ? 'bg-amber-700' : 'bg-purple-800',
            timeline: r.relationship === 'Mother' ? [
              { year: '2024', gift: 'Pure Silver Tea Strainer & Rare Darjeeling Blend', occasion: "Mother's Day" },
              { year: '2025', gift: 'Sabyasachi Banarasi Monogrammed Silk Scarf', occasion: 'Diwali Celebration' }
            ] : [
              { year: '2024', gift: 'Montblanc Meisterstück Gold-Coated Fountain Pen', occasion: 'Promotion' },
              { year: '2025', gift: 'Titan Edge Ceramic Ultra-Thin Timepiece', occasion: "Father's Day" }
            ]
          }));
          setRecipients(mapped);
        }
      }).catch((err) => console.error("Error loading recipients", err));
    }
  }, [authLoading, isAuthenticated, user]);

  const handleAddRecipient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRecName || !user) return;
    
    const token = user.access_token || 'active_session_token';
    try {
      const res = await createRecipientApi({
        name: newRecName,
        relationship: newRecRel,
        lifestyle: 'Custom preference dossier profile',
        luxury_preference: 'Sophisticated Curation',
        personal_notes: 'Added fresh contact.'
      }, token);

      setRecipients(prev => [...prev, {
        id: res.id,
        name: res.name,
        relationship: res.relationship,
        lifestyle: res.lifestyle,
        birthday: 'TBD',
        profession: 'Not specified',
        interests: [],
        hobbies: [],
        favourite_brands: [],
        favourite_colours: [],
        luxury_style: res.luxury_preference,
        last_gift: 'None yet',
        notes: res.personal_notes,
        avatar_color: 'bg-indigo-850',
        timeline: []
      }]);
      setNewRecName('');
      setRecipientModalOpen(false);
    } catch (err) {
      console.error("Failed to save recipient", err);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-3">
        <Sparkles className="h-8 w-8 text-gold-400 animate-spin" />
        <p className="text-xs font-mono text-gold-300">Establishing Secure VIP Lounge...</p>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <DashboardHeader user={user} onOpenAddModal={() => setRecipientModalOpen(true)} />
      <ThemeSelector />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <OccasionsDiary />
          <RecipientRegistry
            recipients={recipients}
            onOpenAddModal={() => setRecipientModalOpen(true)}
            onSelectRecipient={setSelectedRecipient}
          />
        </div>
        <SavedGiftsVault bookmarkedProducts={bookmarkedProducts} recipients={recipients} />
      </div>

      <RecipientDetailModal recipient={selectedRecipient} onClose={() => setSelectedRecipient(null)} />
      <AddRecipientModal
        isOpen={recipientModalOpen}
        name={newRecName}
        relationship={newRecRel}
        onNameChange={setNewRecName}
        onRelationshipChange={setNewRecRel}
        onClose={() => setRecipientModalOpen(false)}
        onSubmit={handleAddRecipient}
      />
    </div>
  );
};
