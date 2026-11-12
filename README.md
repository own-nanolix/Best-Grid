# Best Grid brand site

A 30-page brand system for Best Grid (a consultancy for grid access and connection for energy projects, Spain),
built from the Behance case study "Best Grid | Structuring Complexity" by Pablo Aeme
(https://www.behance.net/gallery/247652913/Best-Grid): the mark and word-mark, colour, type, icons, charts, motion,
seven landing pages, the dashboard, the mobile app, the node explorer, campaign artwork and the physical brand.
Everything is drawn in code (inline SVG and CSS); there are no photographs and no image files in the pages. Site
words are English; brand copy stays Spanish exactly as the designer printed it.

- Next.js 16 (App Router), React 19, JavaScript, Tailwind v4, framer-motion.
- Every page is static. `npm run build` writes plain HTML, CSS and JS to `out/`.
- Live link: needs a Vercel import by the owner (no Vercel project is known for this repo yet).
- GitHub: https://github.com/own-nanolix/Best-Grid (branch `main`).

## Run it

```bash
npm install
npm run dev                  # http://localhost:3000 (the build team used: npx next dev -p 3105)
```

## Build, check, preview

```bash
npm run build                # static export to out/ (also runs scripts/flatten-prefetch.mjs)
node tools/check.mjs         # checks the 30 pages in out/ against pages.json (add --strict to fail on problems)
node tools/serve-out.mjs     # serves out/ on http://localhost:4173
node tools/audit.mjs         # needs serve-out running: overflow, contrast, names, links, ids at 1440 and 390 px
node tools/export-svg.mjs    # needs serve-out running: writes every graphic to export/svg/ (add --dry to only check)
```

To audit or export from the dev server instead: `node tools/audit.mjs --base=http://localhost:3105 logo color`.
Stop the dev server before `npm run build`.

## Where things are

| Path | What it is |
|---|---|
| `pages.json` | The 30 pages in presenter order, with the minimum number of exportable SVGs each |
| `src/app/globals.css` | Tokens, type, buttons, cards, device frames, mockup kit, motion utilities |
| `src/app/(site)/<id>/page.jsx` | One route per page |
| `src/components/pages/<id>/` | Everything only that page uses |
| `src/components/site` | Dock, index overlay, toast, icon sprite, icon paths, reveal, counters, copy value |
| `src/components/ui` | Buttons, chips, cards, tabs, toggle, field, spec tables, split rows, landing nav and footer, device frames |
| `src/components/art` | The mark and word-mark, key art, node grid, device screens, the mockup kit |
| `src/lib` | Page list, motion tokens, chart helpers, brand copy and figures (`brand.js`) |
| `export/svg/` | Every graphic and mockup as a standalone SVG (419 files) |
| `SOURCE.md`, `LAYOUTS.md`, `BRIEF.md` | What the case study shows, the layout of every page, the builders' brief |
| `REPORT.md`, `STATE.md` | The final report and the build log with decisions |
| `STANDING-ORDERS.md` | The owner's standing orders for the build |
| `rule/` | The original instructions (not edited) |
| `reference/` | The case-study images: local only, never committed, never used in the site |

Use the dock at the bottom of every page to step through (or Shift+Left / Shift+Right) and to open the index.
Add `?export=1` to any address to switch all animation off.
