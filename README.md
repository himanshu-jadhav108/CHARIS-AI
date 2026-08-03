# CHARIS — Sovereign AI Luxury Gift Concierge

> **The Art of Giving, Elevated by Intelligence.**

CHARIS is an ultra-exclusive, Apple-level luxury AI gift concierge that pairs the warmth of a Mayfair private concierge with sovereign artificial intelligence to discover 1-of-1 meaningful luxury gifts through natural conversation.

---

## Key Features

- **Sovereign AI Concierge**: Conversational dialogue agent with real-time preference extraction and memory retention.
- **50 Vaulted Luxury Products**: Pre-seeded database featuring fine horology, haute joaillerie, bespoke experiences, rare vintages, and niche perfumerie.
- **Hybrid AI Recommendation Engine**: Vector cosine similarity + attribute scoring matrix delivering top 3 recommendations with tailored luxury rationales and emotional meanings.
- **AI Gift Message Generator**: Calligraphic gift card writer supporting 6 luxury tones (Luxury, Romantic, Professional, Family, Friend, Heartfelt).
- **VIP Dashboard**: Session history tracking, recipient dossiers, and saved gifts vault.
- **Luxury Design System**: Custom glassmorphism, champagne gold glows, deep burgundy accents, and Framer Motion micro-interactions.

---

## Tech Stack

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **UI Components**: React 18, Tailwind CSS, Lucide Icons, Glassmorphism design system
- **State & Data**: Zustand, React Query
- **Animations**: Framer Motion, Canvas Confetti

### Backend
- **Framework**: FastAPI (Python 3.11+)
- **ORM & DB**: SQLAlchemy, SQLite (`charis_luxury.db`)
- **AI Recommendation Engine**: Sentence-Transformers / Cosine attribute matcher, Pydantic v2
- **Server**: Uvicorn

---

## Quick Start

### 1. Backend Setup & Startup
```bash
# Navigate to backend
cd backend

# Create virtual environment & install requirements
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt

# Run database seed & start FastAPI backend
python app/main.py
```
The FastAPI backend will start at: `http://localhost:8000` (Swagger docs at `http://localhost:8000/docs`).

### 2. Frontend Setup & Startup
```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start Next.js development server
npm run dev
```
The Next.js frontend will start at: `http://localhost:3000`.

---

## Documentation Links

- [Architecture Diagram & Overview](file:///d:/Projects/Charis%20AI/docs/ARCHITECTURE.md)
- [REST API Specifications](file:///d:/Projects/Charis%20AI/docs/API_DOCUMENTATION.md)
- [Folder Structure Breakdown](file:///d:/Projects/Charis%20AI/docs/FOLDER_STRUCTURE.md)
- [Deployment Guide (Vercel & Render)](file:///d:/Projects/Charis%20AI/docs/DEPLOYMENT_GUIDE.md)
