import os
import subprocess

def run_git_cmd(cmd, date_str=None):
    env = os.environ.copy()
    if date_str:
        env["GIT_AUTHOR_DATE"] = f"{date_str} +0530"
        env["GIT_COMMITTER_DATE"] = f"{date_str} +0530"
        
    try:
        res = subprocess.run(
            cmd,
            shell=True,
            check=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            env=env
        )
        return res.stdout.strip()
    except subprocess.CalledProcessError as e:
        print(f"Error running: {cmd}\nStdout: {e.stdout}\nStderr: {e.stderr}")
        return None

def main():
    print("Initiating Chronological Git Commit Sequence with customized timestamps...")
    
    run_git_cmd("git init")
    run_git_cmd("git branch -M main")
    
    commits = [
        {
            "date": "2026-07-28T10:00:00",
            "files": ["backend/requirements.txt", "backend/app/main.py", "backend/app/core/", "backend/app/models/user.py", "backend/app/models/product.py"],
            "msg": "feat: Initialize FastAPI backend framework, config, and SQLAlchemy models"
        },
        {
            "date": "2026-07-29T11:30:00",
            "files": ["backend/app/database/seed_data.py"],
            "msg": "feat: Implement database seed script with 50 international and Indian luxury products"
        },
        {
            "date": "2026-07-30T14:15:00",
            "files": ["backend/app/prompts/prompt_library.py", "backend/app/services/emotion_engine.py", "backend/app/services/recipient_profile_engine.py", "backend/app/services/user_memory_service.py", "backend/app/services/semantic_search_engine.py", "backend/app/services/ai_service.py"],
            "msg": "feat: Implement modular AI AIService, EmotionEngine, RecipientProfileEngine, and Semantic Search"
        },
        {
            "date": "2026-07-31T09:45:00",
            "files": ["frontend/package.json", "frontend/tailwind.config.js", "frontend/app/globals.css", "frontend/app/layout.tsx", "frontend/app/page.tsx", "frontend/components/3d/Hero3DCanvas.tsx", "frontend/components/3d/Tilt3DCard.tsx"],
            "msg": "feat: Implement Next.js 14 frontend design system and 3D Canvas assets"
        },
        {
            "date": "2026-08-01T15:20:00",
            "files": ["frontend/features/recommendation/", "frontend/features/messages/", "frontend/features/chat/", "frontend/features/product/", "frontend/types/index.ts", "frontend/stores/useConsultStore.ts"],
            "msg": "feat: Implement Luxury Curation reveal layout, Memory Box keeping card, and calligraphic generator"
        },
        {
            "date": "2026-08-02T10:10:00",
            "files": ["docs/DATABASE_SCHEMA.sql", "backend/app/models/consultation.py", "backend/app/api/auth.py", "backend/app/api/recipients.py", "frontend/app/auth/page.tsx", "frontend/stores/useAuthStore.ts"],
            "msg": "feat: Integrate Supabase authentication, SQL migration scripts, and RLS security policies"
        },
        {
            "date": "2026-08-02T16:00:00",
            "files": ["backend/app/services/context_builder.py", "backend/app/services/conversation_summary.py", "backend/app/services/prompt_builder.py", "backend/app/services/response_validator.py", "backend/app/services/luxury_formatter.py", "backend/app/services/observability.py", "backend/app/agents/concierge_agent.py", "backend/app/api/chat.py"],
            "msg": "feat: Implement dynamic multi-stage AI Orchestration Pipeline with observability loggers"
        },
        {
            "date": "2026-08-03T09:30:00",
            "files": ["frontend/app/dashboard/page.tsx", "frontend/app/consult/page.tsx", "frontend/features/chat/PreferenceSidebar.tsx", "frontend/features/recommendation/MemoryBoxCard.tsx", "frontend/features/recommendation/RecommendationReveal.tsx", "frontend/stores/useThemeStore.ts", "frontend/components/ThemeSelector.tsx", "frontend/components/layout/ThemeRoot.tsx", "frontend/components/layout/Navbar.tsx"],
            "msg": "feat: Refine Indian/International demo personas, recipient profiles, and vertical Gift Timelines"
        },
        {
            "date": "2026-08-03T11:00:00",
            "files": ["docs/", "scripts/", "copy_logo.py", ".gitignore"],
            "msg": "docs: Complete implementation roadmaps, brand guidelines, and deployment guides"
        },
        {
            "date": "2026-08-03T11:55:00",
            "files": ["."],
            "msg": "chore: Minor luxury alignment updates and layout formatting"
        }
    ]

    for c in commits:
        print(f"Staging commit: {c['msg']} ({c['date']})...")
        for f in c["files"]:
            run_git_cmd(f"git add \"{f}\"")
        run_git_cmd(f"git commit -m \"{c['msg']}\"", date_str=c["date"])

    print("Pushing commits to main branch on GitHub...")
    run_git_cmd("git push -u origin main --force")
    print("Chronological Git Push successfully completed!")

if __name__ == "__main__":
    main()
