# Frontier icon drawing guidelines

Use the original hat, boot, barrel, pickaxe, seed, and saddle as visual references. The goal is a recognizable Western object with deliberate curves and open space.

- Use a `64 × 64` viewBox, a default stroke width of `2`, rounded caps and joins, `fill="none"`, and `stroke="currentColor"`.
- Keep visible strokes inside the canvas, normally with 6–8 units of breathing room. Adjust placement for optical balance rather than stretching every object to identical bounds.
- Make the silhouette recognizable first. Add only the interior marks needed to distinguish the subject. Avoid accidental tangencies, doubled edges, and lines showing through foreground objects.
- Aim for at least 4 units between independent strokes. Simplify details that collapse at 24px.
- Prefer side views for animals and long guns. Use a consistent shallow perspective for containers. Additional views should serve a distinct purpose: `train` is a steam-engine front; `locomotive` is the side view.
- Keep mechanical edges straight and use organic curves for animals, plants, leather, and fabric. Avoid constructing organic subjects entirely from angular polygons.
- Keep export size, color, and stroke width adjustable. Avoid fixed black/white fills, fixed path-level stroke widths, and background-colored masks.
- Review at 24, 32, and 64px on both the dark and light gallery surfaces. Compare visual weight with the reference icons and try identifying each icon without its label.
- Prefer one strong icon per concept. `sheriff-badge` also covers searches for “sheriff star”; do not add a second badge solely to vary its point count.

New files in `svg/` enter the gallery and downloadable pack automatically. Put synonyms in `src/search-aliases.ts`.

After Illustrator exports, run `npm run normalize:icons` (requires Python 3). This preserves geometry while restoring inherited color, stroke width, and canvas attributes. Run `npm run check:icons` to verify that cleanup is complete. Preserve intentionally filled dots with `fill="currentColor"` and `stroke="none"`.
