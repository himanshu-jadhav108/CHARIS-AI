import os
import shutil

src = r"d:\Projects\Charis AI\docs\Logo\Charis_AI Logo.png"
dst_dir = r"d:\Projects\Charis AI\frontend\public"
dst = os.path.join(dst_dir, "logo.png")

if not os.path.exists(dst_dir):
    os.makedirs(dst_dir)

try:
    shutil.copy(src, dst)
    print("Logo successfully copied to frontend/public/logo.png")
except Exception as e:
    print(f"Error copying logo: {e}")
