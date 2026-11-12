# STATE: Best Grid brand site

Spec: `rule/Brand-site.md` (master spec) and `rule/10-best-grid.md` (this project's link and layout direction).
Owner's later instructions: `STANDING-ORDERS.md` (they override the rule files where they conflict).
The same pipeline was run first on Tectra (`../project-2`), UpCanopy (`../project-3`) and Sahra (`../project-4`);
their fixes are applied here from the start.

## Project facts

- Next.js 16.4.6 (App Router, Turbopack), React 19.3.0, JavaScript only. App lives in `src/app`.
- Tailwind CSS 4.3.3 through the `@tailwindcss/turbopack` loader (plain CSS only; CSS Modules keep the default
  handling) and `@import "tailwindcss"` in `src/app/globals.css`. Import alias: `@/*` -> `./src/*`.
- framer-motion ^14.12.0. playwright (dev) added for the checks. Node v22.18.0.
- Remote: `origin` = https://github.com/own-nanolix/Best-Grid.git, branch `main`.
- BEHANCE_URL: https://www.behance.net/gallery/247652913/Best-Grid
- SITE_NAME: best-grid-brand-site
- BRAND: Best Grid. DESIGNER: Pablo Aeme. Brand copy is Spanish (Spain) and stays Spanish; site text is English.

## Layout direction (from `rule/10-best-grid.md`, section 2b)

- Mockup staging: catalogue plate: object on one side, spec callouts with leader lines and dimensions on the other.
- Mockup backdrop: a dark stage with one soft spotlight.
- Brand pages lean on: spec-sheet tables with oversized numerals (still a different grid on every page).
- Dashboard option A is: a command bar over a dense data table; B to E are four other structures.
- Landing pages lean on: alternating split rows of text and artwork (still seven different structures).

## Steps

- [x] 1. Check the project and the PC, tool files, `next.config` keys, `.gitignore` lines
- [x] 2. Extract the case study
- [x] 3. Study it and write `SOURCE.md`
- [ ] 4. `LAYOUTS.md`, `pages.json`, shared system, 30 stub routes, `BRIEF.md`; dev server started
- [ ] 5. Build team, two waves; check reports 30 of 30 `ok`
- [ ] 6. Review team; shared fixes applied
- [ ] 7. Verify in the browser; SVG export
- [ ] 8. `REPORT.md` and `README.md`
- [ ] 9. Final independent review, then one push (standing orders, points 5 and 6)

## Decisions

- The two rule files disagree on technology: `rule/10-best-grid.md` describes a single HTML file;
  `rule/Brand-site.md` describes this Next.js site and says it gives everything beyond the link, site name and
  layout direction. `Brand-site.md` is followed; from `10-best-grid.md` only the Behance link, the site name and
  section 2b apply.
- `next.config.mjs`: `output: 'export'`, `trailingSlash`, unoptimized images; `cacheComponents` and
  `partialPrefetching` are not used (they cannot be combined with `output: 'export'`); the Tailwind loader is
  limited to non-module CSS. `scripts/flatten-prefetch.mjs` runs as `postbuild`.
- Commits are local after every builder and fix; one push after the final review (standing orders).
- HERO_FEATURE = capacity at critical grid nodes (m17 phone dashboard plus the m16 technology tiles), built as a
  node explorer that uses only the published 2025 figures; 2023 and 2024 show an empty state.
- PRODUCT_OBJECT = the project tube with its rolled connection-study drawing and label (m07). The page-30 card is
  the staff access card of m08 in three colourways.
- Fonts: the only brand face is Neue Haas Unica W1G (commercial, Monotype), Regular named; the word-mark reads as
  Medium. Closest free Google fonts: **Inter** (a neo-grotesk with the same Swiss proportions, a large x-height,
  tabular figures for the MW numerals and an optical-size axis like the "Optical size" note on m03) for body and
  headlines, and **Inter Tight** for display and the tightly spaced word-mark setting; fallback candidates
  **Hanken Grotesk** and **Schibsted Grotesk**. Final choice in step 4, named in `BRIEF.md` and the report, with
  "Neue Haas Unica W1G" first in the CSS stack and a system fallback last. The word-mark and mark are traced as SVG
  paths, never typed.
- No other company's name on any page (standing orders, point 4). Here it affects: the client label "RedLink
  Systems" on the tubes (left out); the typeface's product name on the type page (only in the CSS stack and the
  report); the PMS rows of the palette slide (left out, HEX/RGB/CMYK kept); browser chrome, laptop, phones and the
  vehicle (drawn as neutral frames without maker details or badges); the publishing platform, the tools, the
  social networks and the designer's other projects (never named). The designer is credited as "Pablo Aeme".
- Misprints are corrected and listed in the report: "nfo@" and "ingo@" become "info@bestgrid.com"; Light Blue's
  RGB is 228, 231, 239 (from its HEX); "Esteribar" becomes "Esteríbar".
- The case study has no prices, testimonials, team, tables, forms or desktop dashboard. Product and landing pages
  are extensions: they use the case study's own lines, labels, figures, contacts and palette; everything else is a
  quiet placeholder.

## Dev server

http://localhost:3105 (start with `npx next dev -p 3105`; stop it before `npm run build`)

## Log

- Step 1 done: baseline build passed; tools from spec section 16, config, gitignore, playwright.
- Step 2 done: 23 images in reference/ (headed Chrome), tall images sliced.
- Step 3 done: five still frames (`m10_1.png` to `m10_5.png`) cut from `m10.gif` (8 frames, 100 ms each); enlarged crops
  (`reference/crop_*.png`) and `reference/logo_zoom.png`; mark measured on m21; SOURCE.md written.
