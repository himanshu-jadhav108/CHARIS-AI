import os
import json
from PIL import Image

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FRAMES_DIR = os.path.join(BASE_DIR, "public", "videos", "frames")
CHAPTERS = ["01", "02", "03", "04"]
TARGET_COUNT = 75  # 75 frames per chapter
TARGET_SIZE = (1280, 720)

metadata = {}

for ch in CHAPTERS:
    ch_dir = os.path.join(FRAMES_DIR, ch)
    if not os.path.exists(ch_dir):
        print(f"Directory {ch_dir} does not exist!")
        continue

    # Find all jpg frames
    all_files = sorted([f for f in os.listdir(ch_dir) if f.endswith(".jpg")])
    orig_count = len(all_files)
    print(f"Chapter {ch}: found {orig_count} JPG frames. Converting to {TARGET_COUNT} WebP frames...")

    # Calculate step indices
    selected_indices = [round(i * (orig_count - 1) / (TARGET_COUNT - 1)) for i in range(TARGET_COUNT)]

    new_frames = []
    for new_idx, old_idx in enumerate(selected_indices):
        old_filename = all_files[old_idx]
        old_path = os.path.join(ch_dir, old_filename)

        new_filename = f"frame_{new_idx + 1:04d}.webp"
        new_path = os.path.join(ch_dir, new_filename)

        with Image.open(old_path) as img:
            img_resized = img.resize(TARGET_SIZE, Image.Resampling.LANCZOS)
            img_resized.save(new_path, "WEBP", quality=82)

        new_frames.append(new_filename)

    # Remove all old JPG frames
    for f in all_files:
        os.remove(os.path.join(ch_dir, f))

    metadata[ch] = {
        "frameCount": TARGET_COUNT,
        "fps": 24,
        "pattern": f"/videos/frames/{ch}/frame_%04d.webp"
    }

    print(f"Chapter {ch}: conversion complete. Removed {orig_count} JPGs, created {TARGET_COUNT} WebPs.")

# Save updated metadata.json
meta_path = os.path.join(FRAMES_DIR, "metadata.json")
with open(meta_path, "w") as f:
    json.dump(metadata, f, indent=2)

print("metadata.json updated successfully!")
