"""Create web delivery copies; retain the original Figma PNGs unchanged.

Run from the repository root: python scripts/optimize-journey-images.py
Requires Pillow. Dimensions and the alpha channel must remain unchanged.
"""
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1] / "assets" / "bring-journey"
for source in sorted(root.glob("*-source.png")):
    original = Image.open(source).convert("RGBA")
    destination = source.with_suffix(".webp")
    original.save(destination, "WEBP", quality=90, method=6, exact=True)
    optimized = Image.open(destination).convert("RGBA")
    assert original.size == optimized.size
    assert original.getchannel("A").tobytes() == optimized.getchannel("A").tobytes()
    print(f"{source.name}: {source.stat().st_size:,} -> {destination.stat().st_size:,} bytes")
