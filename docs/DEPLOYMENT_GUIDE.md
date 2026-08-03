# CHARIS Deployment Guide

## Deploying Frontend to Vercel

1. Push your monorepo repository to GitHub.
2. Log into [Vercel](https://vercel.com) and click **Add New Project**.
3. Select the repository and set **Root Directory** to `frontend`.
4. Build settings:
   - Framework Preset: `Next.js`
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. Environment Variables:
   - `NEXT_PUBLIC_API_BASE_URL`: URL of deployed backend (e.g. `https://charis-backend.onrender.com/api`)
6. Deploy!

## Deploying Backend to Render

1. Log into [Render](https://render.com) and click **New Web Service**.
2. Connect your GitHub repository.
3. Configuration:
   - Root Directory: `backend`
   - Environment: `Python 3`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. Set Environment Variables:
   - `DATABASE_URL`: `sqlite:///./charis_luxury.db`
5. Deploy!
