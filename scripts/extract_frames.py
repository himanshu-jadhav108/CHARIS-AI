import os
import subprocess
import json
import sys
import shutil

# Paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC_VIDEOS_DIR = os.path.join(BASE_DIR, "public", "videos")
FRONTEND_PUBLIC_DIR = os.path.join(BASE_DIR, "frontend", "public")
DST_VIDEOS_DIR = os.path.join(FRONTEND_PUBLIC_DIR, "videos")
FRAMES_DIR = os.path.join(DST_VIDEOS_DIR, "frames")
LOGO_SRC = os.path.join(BASE_DIR, "docs", "Logo", "Charis_AI Logo.png")
LOGO_DST = os.path.join(FRONTEND_PUBLIC_DIR, "logo.png")

VIDEOS = ["01.mp4", "02.mp4", "03.mp4", "04.mp4"]
TARGET_FPS = 24  # Cinematic framerate, balances performance and quality
QUALITY = 5      # 1-31 scale (FFmpeg q:v). 2-5 is high quality, small size.

def check_ffmpeg():
    """Verify if FFmpeg is installed and accessible in the path."""
    try:
        subprocess.run(["ffmpeg", "-version"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        return True
    except FileNotFoundError:
        return False

def setup_assets_and_extract():
    print(f"Base Directory: {BASE_DIR}")
    print(f"Source Videos: {SRC_VIDEOS_DIR}")
    print(f"Destination Videos: {DST_VIDEOS_DIR}")
    print(f"Frames Directory: {FRAMES_DIR}")
    print(f"Logo Source: {LOGO_SRC}")
    print(f"Logo Destination: {LOGO_DST}\n")

    # 1. Ensure directories exist
    os.makedirs(DST_VIDEOS_DIR, exist_ok=True)
    os.makedirs(FRAMES_DIR, exist_ok=True)

    # 2. Copy Logo
    if os.path.exists(LOGO_SRC):
        try:
            shutil.copy(LOGO_SRC, LOGO_DST)
            print("[Logo] Successfully copied logo to frontend/public/logo.png")
        except Exception as e:
            print(f"[Logo] Error copying logo: {e}")
    else:
        print(f"[Logo] Warning: Logo source not found at {LOGO_SRC}")

    # 3. Copy MP4 Videos to frontend/public/videos/ (if root source folder exists)
    if os.path.exists(SRC_VIDEOS_DIR):
        for video_file in VIDEOS:
            src_path = os.path.join(SRC_VIDEOS_DIR, video_file)
            dst_path = os.path.join(DST_VIDEOS_DIR, video_file)
            
            if os.path.exists(src_path):
                try:
                    # Only copy if destination doesn't exist or is older/different size
                    if not os.path.exists(dst_path) or os.path.getsize(src_path) != os.path.getsize(dst_path):
                        shutil.copy(src_path, dst_path)
                        print(f"[Video] Copied {video_file} to frontend/public/videos/")
                    else:
                        print(f"[Video] {video_file} already exists in destination. Skipping copy.")
                except Exception as e:
                    print(f"[Video] Error copying {video_file}: {e}")
            else:
                print(f"[Video] Error: Source video {video_file} not found in {SRC_VIDEOS_DIR}!")
    else:
        print("[Video] Root source videos folder not found. Processing files directly from frontend/public/videos/")

    print("")

    # 4. Check for FFmpeg to extract frames
    if not check_ffmpeg():
        print("---")
        print("Warning: FFmpeg is not installed or not in your system PATH.")
        print("Frame extraction skipped. The website will automatically run in autoplay video mode.")
        print("To enable full 60 FPS scroll scrubbing, please install FFmpeg and run this script again.")
        print("---")
        return

    # 5. Extract Frames
    print("Starting frame extraction...")
    metadata = {}

    for video_file in VIDEOS:
        chapter_name = os.path.splitext(video_file)[0] # "01", "02", etc.
        video_path = os.path.join(DST_VIDEOS_DIR, video_file)
        
        if not os.path.exists(video_path):
            print(f"Warning: Video file {video_file} not found in {DST_VIDEOS_DIR}. Skipping frame extraction.")
            continue

        chapter_frames_dir = os.path.join(FRAMES_DIR, chapter_name)
        os.makedirs(chapter_frames_dir, exist_ok=True)

        print(f"[{chapter_name}] Extracting frames from {video_file}...")
        
        # FFmpeg command to extract frames at TARGET_FPS with width scaled to 1920
        cmd = [
            "ffmpeg",
            "-y",
            "-i", video_path,
            "-r", str(TARGET_FPS),
            "-vf", "scale=1920:-1",
            "-q:v", str(QUALITY),
            os.path.join(chapter_frames_dir, "frame_%04d.jpg")
        ]

        try:
            subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=True)
        except subprocess.CalledProcessError as e:
            print(f"Error extracting frames for {video_file}: {e.stderr.decode('utf-8', errors='ignore')}")
            continue

        # Count extracted frames
        frame_files = [f for f in os.listdir(chapter_frames_dir) if f.endswith(".jpg")]
        frame_files.sort()
        frame_count = len(frame_files)
        
        metadata[chapter_name] = {
            "frameCount": frame_count,
            "fps": TARGET_FPS,
            "pattern": f"/videos/frames/{chapter_name}/frame_%04d.jpg"
        }
        
        print(f"[{chapter_name}] Successfully extracted {frame_count} frames.\n")

    # Write metadata.json
    metadata_path = os.path.join(FRAMES_DIR, "metadata.json")
    with open(metadata_path, "w") as f:
        json.dump(metadata, f, indent=2)

    print(f"Frame extraction complete! Metadata saved to {metadata_path}")

if __name__ == "__main__":
    setup_assets_and_extract()
