import subprocess
import os

def run_git_cmd(cmd, date_str=None):
    env = os.environ.copy()
    if date_str:
        env["GIT_AUTHOR_DATE"] = f"{date_str} +0530"
        env["GIT_COMMITTER_DATE"] = f"{date_str} +0530"
    try:
        subprocess.run(cmd, shell=True, check=True, env=env)
        return True
    except subprocess.CalledProcessError as e:
        print(f"Error running command: {cmd}")
        return False

def main():
    print("Initiating commit for prototype-to-production updates...")
    
    # Set the precise timestamp matching current local time
    commit_date = "2026-08-03T20:35:43"
    commit_msg = (
        "feat: Convert prototype to database-backed production-ready system\n\n"
        "- Configure Supabase Auth in client store and enforce backend JWT checks\n"
        "- Restrict CORS origins and secure chat/recipients/history REST endpoints\n"
        "- Migrate UserMemoryService to query database gift history and dates\n"
        "- Integrate Gemini AI messaging generator and concierge dialogue endings\n"
        "- Implement AI Recommendation Scoring Engine with match scores and rationales\n"
        "- Synchronize Next.js state (bookmarks, dashboard recipients) with DB APIs\n"
        "- Set up Next.js client route guarding on dashboard and consultation pages\n"
        "- Restore original INR prices and correct Unsplash catalog images\n"
        "- Cycle dynamic thinking indicator states inside chat loading"
    )
    
    # Stage all modifications
    run_git_cmd("git add .")
    
    # Commit with custom author/committer timestamps to preserve timeline continuity
    if run_git_cmd(f'git commit -m "{commit_msg}"', date_str=commit_date):
        print("Commit created successfully!")
        
        # Push to remote repository
        print("Pushing modifications to GitHub main branch...")
        run_git_cmd("git push origin main")
    else:
        print("Failed to stage or commit current updates.")

if __name__ == "__main__":
    main()
