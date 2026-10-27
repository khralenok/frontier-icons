# 🤠 Frontier Icons

Frontier Icons is a curated set of SVG icons inspired by the Old West. Unlike generic icon libraries built for standard interfaces, this collection emphasizes thematic storytelling while maintaining modern design clarity.

Each icon uses consistent stroke weight and rounded terminals, making them suitable for both rugged, stylized UIs (e.g. games) and clean, minimal web applications.

![Frontier Icons library preview](https://github.com/khralenok/frontier-icons/blob/main/cover.webp)

## ✨ Collection

The collection contains **91 SVG icons**, covering the subjects listed in `task.md` plus a standalone moon, handcuffs, feather, blocked mine, cigar, town clock, human skull, bone, and coffin. The sheriff star is consolidated into `sheriff-badge` (searchable under either name):

- Tools & utility: mining tools, lantern, water well, gold pan, and supplies
- Clothing & gear: hats, boots, saddle, bandana, poncho, vest, gloves, and spurs
- Animals & nature: horses, cattle, buffalo, coyote, vulture, scorpion, plants, moon, and landscapes
- Buildings & transport: saloon, jail, bank, ranch, stable, windmill, trains, and wagons
- Frontier objects: badges, wanted poster, signs, money bag, playing cards, and equipment

## 🚀 Features
Consistent Linework — Uniform stroke width across all icons
Open Source — Free for personal and commercial use
Scalable (SVG) — Resolution-independent and easy to style with CSS

## 🛠 Usage

### Icon gallery

Requires Node.js 20.19+ or 22.12+.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. The gallery supports search (press `/`), adjustable previews, SVG customization, copying, individual downloads, and a ZIP of the original collection with its MIT license.

```sh
npm run build
npm run preview
```

The production site is generated in `dist/`. For hosting under a subpath, build with `npm run build -- --base=/frontier-icons/`.

SVG files in `svg/` are discovered automatically at build time. Add a new SVG there and optionally add search aliases in `src/search-aliases.ts`. The existing artwork stays untouched; customization only affects exported copies. The hero illustration lives in `img/hero-illustration.png`.

After saving icons from Illustrator, run:

```sh
npm run normalize:icons
npm run check:icons
```

These commands require Python 3. Normalization preserves path geometry and converts exported presentation to the library's `currentColor`, inherited stroke width, and 64×64 defaults. Filled details remain filled. The check command reports files that still need cleanup without modifying them. See [ICON_GUIDELINES.md](ICON_GUIDELINES.md) for drawing and review guidance.

### Deploy to GitHub Pages

In the GitHub repository, open **Settings → Pages → Build and deployment** and select **GitHub Actions** as the source. Push to `main` to build and deploy the gallery, or run **Deploy to GitHub Pages** manually from the Actions tab.

The workflow installs dependencies from `package-lock.json`, builds the site using the Pages base path, and deploys `dist/`. The gallery will be available at https://khralenok.github.io/frontier-icons/ after a successful deployment.

### Use the SVGs

Clone the repository:

```
git clone https://github.com/khralenok/frontier-icons.git
```

Or download individual SVG files directly from the repo.
