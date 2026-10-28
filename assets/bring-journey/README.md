# Original journey assets

The component uses quality-90 WebP delivery copies of the five source PNGs.
Original dimensions and alpha channels are preserved; originals remain here.
Regenerate with `python scripts/optimize-journey-images.py` (Pillow required).
Journey images are lazy loaded. A responsive picture source prevents mobile
from requesting the desktop-only notebook image.

Source: Figma Design Semantics, file uvfHFOjGL8d37o6ryQesoz, section 347:8.

- magnifying-glass-source.png: original image 81, node 347:14; authored 21.94-degree rotation is retained in the layout.
- puzzle-pieces-source.png: original image 85, node 347:19.
- notebook-source.png: original image 91, node 347:34; authored 8.22-degree rotation and desktop cream detail from the parent composition are retained in the layout.
- hanging-shapes-source.png: original image 87, node 347:24.
- interface-blocks-source.png: original image 89, node 347:29.
- ribbon-original.svg: original Vector 4 silhouette, node 347:12, saved unchanged.

The transparent source images were supplied by Figma design context. Node-render exports included the artboard background and were not used. No illustration was generated, recoloured, or edited.

paper-top.webp and paper-bottom.webp are the two original embedded transparent WebP files recovered byte-for-byte from what_i_bring_interactive_prototype_FIXED.zip. mobile-ribbon-prototype.svg retains the filled mobile ribbon path from that same approved prototype. Its mask guide is used by the React component.

The former assets/what I bring to table.webp remains in place for comparison and rollback.

## Reveal correction

The desktop artwork remains the original SVG, unchanged. desktop-reveal-map.png encodes travel distance constrained to the connected filled silhouette in two colour channels. The SVG colour-matrix filter thresholds those channels as scroll progress advances. This replaces the oversized centreline stroke that exposed neighbouring bends prematurely. The map is a reveal aid, not replacement artwork.

mobile-ribbon-refined.svg is the lighter, varying-width mobile-only ribbon, with a pointed ending. mobile-reveal-map.png uses the same connected reveal strategy. The desktop notebook remains unchanged and is removed from mobile layout with display:none; the mobile composition is 850px tall.

Regenerate these three derived files from the repository root with `python scripts/generate-journey-masks.py` (requires Pillow). The script also verifies connected revealed regions at 15, 30, 50, 70, 85 and 100 percent. Original illustrations, original desktop SVG and approved paper-edge images are not modified.
