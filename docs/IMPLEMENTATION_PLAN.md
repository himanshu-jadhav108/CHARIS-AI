# Implementation Plan - CHARIS: Sovereign Luxury AI Gift Concierge

Transform CHARIS from an AI gift recommender into an elite, production-ready **Sovereign Luxury AI Gift Concierge** powered by Google Gemini, 3D interactive Canvas modules (Three.js), and Supabase (PostgreSQL, Auth, RLS, Storage) backend integration.

---

## 1. System Architecture Upgrade

```mermaid
graph TD
    Client([Next.js 14 Web Client]) <--> SupabaseAuth[Supabase Auth - JWT Sessions]
    Client <--> API[FastAPI Web Service - Deployed on Render]
    
    subgraph Supabase Cloud Platform
        API <--> Postgres[(Supabase PostgreSQL Database)]
        API <--> Storage[Supabase Storage Buckets]
        Postgres --> RLS[Row Level Security Policies]
    end

    subgraph Core AI Concierge Services (FastAPI Backend)
        API --> ConciergeAgent[AI Concierge Agent]
        ConciergeAgent --> EmotionEngine[Emotion Engine]
        ConciergeAgent --> RecEngine[Curated Curation Engine]
        RecEngine <--> Postgres
    end
```

## 2. Completed Milestones

### 1. Swappable AIService & Gemini Provider Pattern
- **Abstractions**: Created `LLMProvider` base class and `GeminiProvider` implementation.
- **Roles Isolation**: Gemini handles natural dialogue flow, emotional intent interpretation, tailored explanations, and calligraphic card messages without direct DB queries.

### 2. Emotion Engine & Recipient Profiler
- **`EmotionEngine`**: Analyzes user statements across 14 emotional dimensions (*Gratitude, Love, Respect, Admiration, Friendship, Pride, Romance*, etc.) to adjust curating weights.
- **`RecipientProfileEngine`**: Tracks recipient characteristics across 12 vectors (*Lifestyle, Hobbies, Love Language, Luxury Preference, Favorite Colors*, etc.).

### 3. Signature Keepsake: Memory Box
- **Keepsake Card**: Renders custom rationales, unboxing protocols, and emotional narratives.
- **Actions**: High-res card download and link sharing built native.

### 4. 3D Canvas Moments & Visual Anticipation
- **Hero Box**: Rotating 3D gift box with gold ribbon and floating particles.
- **3D Card Hover**: Perspective tilt effect.
- **Anticipation Loader**: Sequential storytelling progress line before curated experiences reveal.

### 5. Supabase Postgres & Auth Migrations
- **SQL Schema**: Clean Postgres creation scripts with UUIDs, indices, and Row Level Security (RLS).
- **Authentication**: Integrated mock signup/login forms with remember-me, forgot password, and redirection protocols.
- **Recipient Selector**: Returning user interface mapping saved recipients directly into the concierge agent.

---

## 🚀 How to Launch Deployed Stack

1. **Supabase Setup**:
   Run the schema in `docs/DATABASE_SCHEMA.sql` in the Supabase SQL editor.
2. **Start FastAPI Backend**:
   ```bash
   cd backend
   .venv\Scripts\python.exe app/main.py
   ```
3. **Start Next.js Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```
