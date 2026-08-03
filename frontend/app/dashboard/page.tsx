'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Crown, Sparkles, Plus, Clock, Bookmark, Calendar, ArrowRight, UserPlus, Heart, BookOpen, Compass, Award } from 'lucide-react';
import { GlassCard } from '@/components/common/GlassCard';
import { ThemeSelector } from '@/components/ThemeSelector';
import { useAuthStore } from '@/stores/useAuthStore';
import { useBookmarkStore } from '@/stores/useBookmarkStore';
import { fetchRecipientsApi, createRecipientApi } from '@/services/api';

interface RecipientProfileData {
  id: string;
  name: string;
  relationship: string;
  lifestyle: string;
  birthday: string;
  anniversary?: string;
  profession: string;
  interests: string[];
  hobbies: string[];
  favourite_brands: string[];
  favourite_colours: string[];
  luxury_style: string;
  last_gift: string;
  notes: string;
  avatar_color: string;
  timeline: { year: string; gift: string; occasion: string }[];
}

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuthStore();
  const router = useRouter();

  // Enforce route guard check on mount
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/auth');
    }
  }, [isAuthenticated, authLoading, router]);

  const { bookmarkedProducts } = useBookmarkStore();
  const [recipientModalOpen, setRecipientModalOpen] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState<RecipientProfileData | null>(null);
  
  // Form fields for new recipient
  const [newRecName, setNewRecName] = useState('');
  const [newRecRel, setNewRecRel] = useState('Partner');

  const [recipients, setRecipients] = useState<RecipientProfileData[]>([]);
  const [loadingRec, setLoadingRec] = useState(true);

  // Sync and lazily seed registered recipients from PostgreSQL
  useEffect(() => {
    if (!authLoading && isAuthenticated && user) {
      const token = user.access_token || 'active_session_token';
      fetchRecipientsApi(token).then(async (data) => {
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
            ] : r.relationship === 'Father' ? [
              { year: '2024', gift: 'Montblanc Meisterstück Gold-Coated Fountain Pen', occasion: 'Promotion' },
              { year: '2025', gift: 'Titan Edge Ceramic Ultra-Thin Timepiece', occasion: "Father's Day" }
            ] : [
              { year: '2024', gift: 'Le Creuset Signature Cast Iron French Oven Set', occasion: 'Griha Pravesh' },
              { year: '2025', gift: 'Hermès Custom Calfskin Leather Sketchbook', occasion: 'Anniversary' }
            ]
          }));
          setRecipients(mapped);
          setLoadingRec(false);
        } else {
          // Empty DB: Seed premium demo profiles
          const demoPersonas = [
            {
              name: 'Ananya Sharma',
              relationship: 'Mother',
              lifestyle: 'Luxury Tea Collector • Loves Gardening',
              birthday: '2026-10-14',
              anniversary: '2026-11-20',
              favourite_brands: ['Forest Essentials', 'Sabyasachi', 'Fortnum & Mason'],
              favourite_colours: ['Emerald Green', 'Marigold Yellow'],
              hobbies: ['Rare Rose Breeding', 'Gourmet Tea Blending'],
              luxury_preference: 'Understated Organic Luxury',
              personal_notes: 'Values handcrafted detailing and subtle floral aromas.'
            },
            {
              name: 'Rajiv Malhotra',
              relationship: 'Father',
              lifestyle: 'Entrepreneur & Fine Horology Enthusiast',
              birthday: '2026-12-03',
              favourite_brands: ['Vacheron Constantin', 'Montblanc', 'Titan Edge'],
              favourite_colours: ['Royal Navy Blue', 'Champagne Gold'],
              hobbies: ['Watch Customization', 'Playing Squash'],
              luxury_preference: 'Mechanical Precision & Heritage Icons',
              personal_notes: 'Appreciates clean structural lines and transatlantic precision.'
            },
            {
              name: 'Meera Khanna',
              relationship: 'Wife',
              lifestyle: 'Architect & Contemporary Art Collector',
              birthday: '2026-01-22',
              anniversary: '2026-02-18',
              favourite_brands: ['Hermès', 'Le Creuset', 'Cartier'],
              favourite_colours: ['Matte Black', 'Crimson Red'],
              hobbies: ['Clay Sculpting', 'Charcoal Sketching'],
              luxury_preference: 'Avant-Garde Architectural Design',
              personal_notes: 'Fascinated by bold geometric proportions and functional art pieces.'
            }
          ];

          const created = [];
          for (const d of demoPersonas) {
            try {
              const res = await createRecipientApi(d, token);
              created.push({
                id: res.id,
                name: res.name,
                relationship: res.relationship,
                lifestyle: res.lifestyle,
                birthday: res.birthday,
                anniversary: res.anniversary || '',
                profession: res.relationship === 'Mother' ? 'Botanist & Tea Sommelier' : res.relationship === 'Father' ? 'Tech Founder & Investor' : 'Principal Interior Architect',
                interests: res.hobbies || [],
                hobbies: res.hobbies || [],
                favourite_brands: res.favourite_brands || [],
                favourite_colours: res.favourite_colours || [],
                luxury_style: res.luxury_preference,
                last_gift: res.relationship === 'Mother' ? 'Luxury Tea Collection' : res.relationship === 'Father' ? 'Titan Edge Watch' : 'Heritage Painting',
                notes: res.personal_notes,
                avatar_color: res.relationship === 'Mother' ? 'bg-emerald-800' : res.relationship === 'Father' ? 'bg-amber-700' : 'bg-purple-800',
                timeline: res.relationship === 'Mother' ? [
                  { year: '2024', gift: 'Pure Silver Tea Strainer & Rare Darjeeling Blend', occasion: "Mother's Day" },
                  { year: '2025', gift: 'Sabyasachi Banarasi Monogrammed Silk Scarf', occasion: 'Diwali Celebration' }
                ] : res.relationship === 'Father' ? [
                  { year: '2024', gift: 'Montblanc Meisterstück Gold-Coated Fountain Pen', occasion: 'Promotion' },
                  { year: '2025', gift: 'Titan Edge Ceramic Ultra-Thin Timepiece', occasion: "Father's Day" }
                ] : [
                  { year: '2024', gift: 'Le Creuset Signature Cast Iron French Oven Set', occasion: 'Griha Pravesh' },
                  { year: '2025', gift: 'Hermès Custom Calfskin Leather Sketchbook', occasion: 'Anniversary' }
                ]
              });
            } catch (err) {
              console.error("Failed to seed recipient in db", err);
            }
          }
          setRecipients(created);
          setLoadingRec(false);
        }
      }).catch((err) => {
        console.error("Error loading recipients", err);
        setLoadingRec(false);
      });
    }
  }, [authLoading, isAuthenticated, user]);

  const upcomingOccasions = [
    { name: "Ananya's Royal Tea Curation", daysLeft: 6, target: "Ananya Sharma" },
    { name: "Rajiv's Milestone Jubilee", daysLeft: 18, target: "Rajiv Malhotra" }
  ];

  const handleAddRecipient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRecName || !user) return;
    
    const token = user.access_token || 'active_session_token';
    const payload = {
      name: newRecName,
      relationship: newRecRel,
      lifestyle: 'Custom preference dossier profile',
      luxury_preference: 'Sophisticated Curation',
      personal_notes: 'Added fresh contact.'
    };

    try {
      const res = await createRecipientApi(payload, token);
      const newRec: RecipientProfileData = {
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
      };
      setRecipients([...recipients, newRec]);
      setNewRecName('');
      setRecipientModalOpen(false);
    } catch (err) {
      console.error("Failed to save recipient to db", err);
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
      
      {/* Top Welcome Banner */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border-gold-400/40 shadow-luxury flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden bg-gradient-to-r from-burgundy-900/60 via-obsidian-900 to-obsidian-950">
        
        {/* Approved Logo Watermark inside Banner */}
        <div className="absolute -right-10 -bottom-10 opacity-5 h-48 w-48 pointer-events-none">
          <img src="/logo.png" alt="Watermark" className="h-full w-full object-contain" />
        </div>

        <div className="space-y-3 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-burgundy-800 border border-gold-400/40 text-gold-300 text-[10px] font-mono tracking-widest uppercase">
            <Crown className="h-3.5 w-3.5 text-gold-400" />
            <span>{user?.tier || 'Charis VIP Sovereign Member'}</span>
          </div>

          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-silk-100">
            Welcome Back, <span className="gold-text-gradient">{user?.full_name || 'Alexander von Montgomery'}</span>
          </h1>

          <p className="text-xs sm:text-sm text-silk-300/75 max-w-xl font-light">
            Your private luxury client lounge is active. Review your saved gift records, manage recipient profiles, or initiate a new curating consultation below.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto relative z-10">
          <button
            onClick={() => setRecipientModalOpen(true)}
            className="px-6 py-3.5 rounded-full bg-obsidian-850 border border-gold-400/30 text-gold-300 text-xs font-mono uppercase tracking-widest hover:bg-burgundy-800/50 transition-colors flex items-center justify-center space-x-2"
          >
            <UserPlus className="h-4 w-4" />
            <span>Add Someone Special</span>
          </button>

          <Link
            href="/consult"
            className="px-8 py-3.5 rounded-full bg-gold-gradient text-obsidian-950 font-bold text-xs uppercase tracking-widest hover:opacity-95 transition-opacity flex items-center justify-center space-x-2 shadow-gold-glow"
          >
            <Plus className="h-4 w-4" />
            <span>Begin Consultation</span>
          </Link>
        </div>
      </div>

      {/* Theme Customizer Panel */}
      <ThemeSelector />

      {/* Mid Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Upcoming Occasions & Recipient Registry */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Upcoming Occasions (Proactive AI Prompts) */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-gold-400" />
              <h3 className="font-serif-luxury text-xl font-bold text-silk-100">Upcoming Special Occasions</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {upcomingOccasions.map((occ, idx) => (
                <GlassCard key={idx} className="p-5 border-gold-400/20 flex flex-col justify-between relative overflow-hidden bg-gradient-to-r from-burgundy-950/20 to-transparent">
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono text-gold-400 bg-burgundy-800/80 px-2 py-0.5 rounded border border-gold-400/30">
                      DIARY ALERT
                    </span>
                    <h4 className="font-serif-luxury text-base font-bold text-silk-100">{occ.name}</h4>
                    <p className="text-xs text-silk-300/70">{occ.target} • In {occ.daysLeft} Days</p>
                  </div>
                  <Link
                    href="/consult"
                    className="mt-4 text-xs font-mono text-gold-300 flex items-center space-x-1.5 hover:underline"
                  >
                    <span>Proactively Curate Ideas</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* People You Care About Section */}
          <div className="space-y-4">
            <h3 className="font-serif-luxury text-xl font-bold text-silk-100 flex items-center space-x-2">
              <Crown className="h-5 w-5 text-gold-400" />
              <span>People You Care About</span>
            </h3>

            {recipients.length === 0 ? (
              <GlassCard className="p-10 text-center space-y-4 border-gold-400/20">
                <div className="h-16 w-16 rounded-full bg-burgundy-900/40 border border-gold-400/30 flex items-center justify-center mx-auto text-gold-400">
                  <Heart className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-serif-luxury text-lg font-bold text-silk-100">Establish Gifting Profiles</h4>
                  <p className="text-xs text-silk-300/70 max-w-sm mx-auto">
                    CHARIS remembers the people who matter most to you. Create your first recipient profile and let your AI concierge track birthdays, preferences, and meaningful moments.
                  </p>
                </div>
                <button
                  onClick={() => setRecipientModalOpen(true)}
                  className="px-6 py-2.5 rounded-full bg-gold-gradient text-obsidian-950 font-bold text-xs uppercase tracking-widest hover:opacity-95"
                >
                  Create Your First Recipient
                </button>
              </GlassCard>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recipients.map((rec) => (
                  <GlassCard key={rec.id} className="p-6 border-gold-400/20 space-y-4 hover:border-gold-400/40 flex flex-col justify-between">
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className={`h-11 w-11 rounded-full ${rec.avatar_color} flex items-center justify-center text-silk-100 font-serif-luxury font-bold border border-gold-400/30`}>
                          {rec.name.split(' ').map(n=>n[0]).join('')}
                        </div>
                        <div>
                          <h4 className="font-serif-luxury text-base font-bold text-silk-100">{rec.name}</h4>
                          <span className="text-[9px] font-mono text-gold-400 uppercase tracking-widest bg-burgundy-900/30 px-2 py-0.5 rounded border border-gold-400/20">{rec.relationship}</span>
                        </div>
                      </div>

                      <p className="text-xs text-silk-300/70 leading-relaxed italic">
                        "{rec.lifestyle}"
                      </p>

                      <div className="grid grid-cols-2 gap-2 text-[10px] font-mono border-t border-gold-400/10 pt-3">
                        <div>
                          <span className="text-silk-300/40 uppercase block">Birthday</span>
                          <span className="text-silk-200">{rec.birthday}</span>
                        </div>
                        <div>
                          <span className="text-silk-300/40 uppercase block">Last Gift</span>
                          <span className="text-gold-300">{rec.last_gift}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2 pt-4">
                      <Link
                        href={`/consult?recipient=${rec.id}`}
                        className="flex-1 py-2.5 rounded-xl bg-gold-gradient text-obsidian-950 font-bold font-mono text-[10px] text-center hover:opacity-95 transition-opacity"
                      >
                        Continue
                      </Link>
                      <button
                        onClick={() => setSelectedRecipient(rec)}
                        className="flex-1 py-2.5 rounded-xl bg-obsidian-850 border border-gold-400/20 text-silk-200 hover:text-gold-300 font-mono text-[10px] transition-colors"
                      >
                        View Profile
                      </button>
                    </div>

                  </GlassCard>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Wishlist & Gifting Registry Log */}
        <div className="space-y-8">
          
          {/* Saved Gifts Vault */}
          <GlassCard className="p-6 border-gold-400/30 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gold-400/20">
              <div className="flex items-center space-x-2">
                <Bookmark className="h-5 w-5 text-gold-400" />
                <h3 className="font-serif-luxury text-base font-bold text-silk-100">Saved Gifts Vault</h3>
              </div>
              <span className="text-xs font-mono text-gold-300 font-bold">{bookmarkedProducts.length} Saved</span>
            </div>

            {bookmarkedProducts.length === 0 ? (
              <div className="text-center py-6 text-xs text-silk-300/40 space-y-2">
                <Sparkles className="h-6 w-6 text-gold-400/40 mx-auto" />
                <p>No saved gifts yet. Start a consultation to save recommendations.</p>
                <Link href="/catalog" className="text-gold-400 font-mono underline block pt-2">
                  Browse Vault Catalog →
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {bookmarkedProducts.map((p) => (
                  <div key={p.id} className="flex items-center space-x-3 p-2.5 rounded-xl bg-obsidian-850 border border-gold-400/20">
                    <img src={p.image} alt={p.name} className="h-10 w-10 rounded-lg object-cover border border-gold-400/30" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif-luxury text-xs font-bold text-silk-100 truncate">{p.name}</h4>
                      <span className="text-[10px] font-mono text-gold-400">₹{p.price.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </GlassCard>

          {/* Gifting Registry Log */}
          <GlassCard className="p-6 border-gold-400/30 space-y-4">
            <div className="flex items-center space-x-2 pb-3 border-b border-gold-400/20">
              <Clock className="h-5 w-5 text-gold-400" />
              <h3 className="font-serif-luxury text-base font-bold text-silk-100">Gifting Registry Log</h3>
            </div>

            <div className="space-y-4">
              {recipients.map((rec) => (
                <div key={rec.id} className="text-xs space-y-1 pb-3 border-b border-gold-400/10 last:border-b-0 last:pb-0">
                  <div className="flex justify-between font-serif-luxury font-semibold text-silk-100">
                    <span>{rec.name}</span>
                    <span className="gold-text-gradient">{rec.relationship}</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-silk-300/50 font-mono">
                    <span>{rec.last_gift}</span>
                    <span>{rec.birthday}</span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

        </div>

      </div>

      {/* Recipient Profile Page Modal with vertical Gift Timeline */}
      {selectedRecipient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-md overflow-y-auto">
          <div className="my-8 w-full max-w-2xl">
            <GlassCard className="p-8 sm:p-10 border-gold-400/40 space-y-8 relative">
              
              <button
                onClick={() => setSelectedRecipient(null)}
                className="absolute top-6 right-6 text-silk-300/60 hover:text-silk-100 font-mono text-xs uppercase"
              >
                Close ×
              </button>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className={`h-16 w-16 rounded-full ${selectedRecipient.avatar_color} flex items-center justify-center text-silk-100 font-serif-luxury text-2xl font-bold border border-gold-400/30 shrink-0`}>
                  {selectedRecipient.name.split(' ').map(n=>n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-silk-100">
                    {selectedRecipient.name}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className="text-[10px] font-mono text-gold-400 bg-burgundy-900/30 px-2 py-0.5 rounded border border-gold-400/20">
                      {selectedRecipient.relationship}
                    </span>
                    <span className="text-[10px] font-mono text-silk-300/60 bg-obsidian-850 px-2 py-0.5 rounded">
                      {selectedRecipient.profession}
                    </span>
                  </div>
                </div>
              </div>

              {/* Profile Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs border-t border-b border-gold-400/20 py-6">
                <div className="space-y-3">
                  <div>
                    <span className="text-[9px] font-mono text-silk-300/40 uppercase block">Luxury Preference Style</span>
                    <span className="text-silk-200 font-serif-luxury italic">"{selectedRecipient.luxury_style}"</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-silk-300/40 uppercase block">Interests & Fields</span>
                    <span className="text-silk-200">{selectedRecipient.interests.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-silk-300/40 uppercase block">Hobbies</span>
                    <span className="text-silk-200">{selectedRecipient.hobbies.join(', ')}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="text-[9px] font-mono text-silk-300/40 uppercase block">Favourite Brands</span>
                    <span className="text-gold-300">{selectedRecipient.favourite_brands.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-silk-300/40 uppercase block">Favourite Colors</span>
                    <span className="text-silk-200">{selectedRecipient.favourite_colours.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-silk-300/40 uppercase block">Personal Memory Notes</span>
                    <span className="text-silk-200 font-light">{selectedRecipient.notes}</span>
                  </div>
                </div>
              </div>

              {/* Vertical Gift Timeline */}
              <div className="space-y-4">
                <h4 className="font-serif-luxury text-lg font-bold text-silk-100 flex items-center space-x-2">
                  <Award className="h-4.5 w-4.5 text-gold-400" />
                  <span>Historical Curation Timeline</span>
                </h4>

                <div className="relative border-l border-gold-400/20 ml-3.5 pl-6 space-y-6">
                  {selectedRecipient.timeline.map((item, idx) => (
                    <div key={idx} className="relative">
                      {/* Timeline dot */}
                      <span className="absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full bg-burgundy-900 border-2 border-gold-400/60 shadow-gold-glow" />
                      
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-gold-400 font-bold">{item.year}</span>
                        <h5 className="font-serif-luxury text-sm font-semibold text-silk-100">{item.gift}</h5>
                        <p className="text-[10px] text-silk-300/50 uppercase font-mono">{item.occasion}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Link
                  href={`/consult?recipient=${selectedRecipient.id}`}
                  className="px-6 py-2.5 rounded-xl bg-gold-gradient text-obsidian-950 font-bold text-xs uppercase tracking-widest shadow-gold-glow"
                >
                  Initiate Current Consultation
                </Link>
              </div>

            </GlassCard>
          </div>
        </div>
      )}

      {/* Add Someone Special Modal */}
      {recipientModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-md">
          <GlassCard className="max-w-md w-full p-6 sm:p-8 border-gold-400/40 space-y-5">
            <h3 className="font-serif-luxury text-xl font-bold text-silk-100">Add Someone Special</h3>
            
            <form onSubmit={handleAddRecipient} className="space-y-4 text-xs">
              <div>
                <label className="font-mono text-[10px] text-gold-400 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={newRecName}
                  onChange={(e) => setNewRecName(e.target.value)}
                  placeholder="E.g., Ananya Sharma"
                  className="w-full bg-obsidian-850 rounded-xl border border-gold-400/20 px-3.5 py-2.5 text-silk-100 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="font-mono text-[10px] text-gold-400 block mb-1">Relationship</label>
                <select
                  value={newRecRel}
                  onChange={(e) => setNewRecRel(e.target.value)}
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
                  onClick={() => setRecipientModalOpen(false)}
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
      )}

    </div>
  );
}
