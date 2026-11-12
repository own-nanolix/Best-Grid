# STATE: Best Grid brand site

Spec: `rule/Brand-site.md` (master spec) and `rule/10-best-grid.md` (this project's link and layout direction).
Owner's later instructions: `STANDING-ORDERS.md` (they override the rule files where they conflict).
The same pipeline was run first on three sibling projects (`../project-2`, `../project-3`, `../project-4`);
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
- [x] 4. `LAYOUTS.md`, `pages.json`, shared system, 30 stub routes, `BRIEF.md` (dev server: address below; start it before wave 1)
- [x] 5. Build team, two waves; check reports 30 of 30 `ok`
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
- Fonts (final, step 4): **Inter** (text; loaded with its optical-size axis) and **Inter Tight** (display sizes and
  the word-mark), both through next/font/google as `--font-inter` / `--font-inter-tight`, with "Neue Haas Unica W1G"
  first in both CSS stacks and Helvetica Neue / Arial / system-ui last. Why: rendered beside the type slide (m03) and
  the word-mark crops, Inter has the same neo-grotesk construction (flat-sided "G" with a vertical stem, straight
  "t", round "e"/"s" apertures), a large x-height and tabular figures; Hanken Grotesk reads rounder and geometric,
  Schibsted Grotesk wider and softer. The typeface's product name is never printed on a page ("the brand typeface").
- The mark is traced as SVG paths built from its own construction (Mark.jsx: bar B 5.23, pitch P 12.85, star edge
  y = 0.45x - 1.6, chamfer x + y = 3.2, waist 20.9, diagonal half-width 3.71, corner radii 1.5 / 1.55 / 0.4 / 0.85);
  the parameters were fitted to reference/logo_zoom.png by overlay: 97.4% pixel overlap (IoU), the rest is raster
  anti-aliasing. SOURCE.md's first measurements (P 12.83, slope 0.4535, waist 21.2) are superseded by these.
- The word-mark is set in the brand typeface, so it is SVG <text> in the display stack (WordmarkG), not traced:
  Inter Tight weight 540, tracking -0.045 em, word gap set as dx 0.15 em, horizontal scale 1.1 so the footprint
  matches the reference within 1% (letters touch as printed); "Grid" is slightly narrower than the brand cut's.
- Lockups: the case study shows the mark and word-mark in separate grid cells only. Built: card-back corners
  (m05), the nav cell (m16), the three-cell poster footer (m11) as rebuilds; row and stacked lockups as extensions.
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

- Landing ids: lp-home (m16 rebuilt and continued), lp-solar, lp-wind, lp-storage, lp-data-centers (the four
  technology tiles of m16), lp-field ("Análisis · Criterio · Validación", m11), lp-annual-report ("Informe de
  actividad anual", m02). Nav words of m16 link: Servicios -> lp-field, Clientes -> lp-data-centers, Nosotros ->
  lp-annual-report, Únete -> lp-storage; the footer lists the tile words and the tube services.
- Icons: 32 core icons plus utilities on one 24 grid, drawn as filled one-unit bars in the manner of m14 / m15
  (square ends, stepped corners, open four-way crossings, 1-unit diagonals and arcs); the four case-study icons are
  rebuilt separately on their own 32 grid (PIXEL32). No platform or social-network icons.
- Accessibility inks: --blue-ink #3352c2 (small blue text on every light ground, 4.7:1 or more), --muted #4b5174,
  --muted-on-dark #a9b2d6. Failing pairs kept only for 24 px and up: Active Blue on Light Blue (2.8:1), periwinkle
  (2.4:1), paper (3.3:1), white (3.4:1); light type on Active Blue (2.8 to 3.4:1). Changes that alter the look: the
  active year chip label is Dark Blue (printed white); small website body text uses the blue ink.
- Mockup kit: dark stage #0c0e1f with one radial spotlight (StageG), light direction from the spot, contact and cast
  shadows, materials (board, paper, card, fabric, metal, glass, ceramic, rubber, plastic), catalogue-plate parts
  (CalloutG, DimensionG, SpecColumnG, PlateFrameG). Plate dimensions are our own production values in mm.
- Device frames are neutral (round camera hole, plain window bar). Ready screens rebuilt from m16 and m17.
- Starter files removed: src/app/layout.js and src/app/page.js (replaced by layout.jsx and (site)/page.jsx).
  src/app/favicon.ico overwritten with the mark (16, 32, 48 px); src/app/icon.svg drawn from the mark.
- SOURCE.md copy re-read against the full-size crops (cards, envelope, tube label, event screen, billboard, box,
  badge): no differences found.

## Dev server

http://localhost:3105 (start with `npx next dev -p 3105`; stop it before `npm run build`)

## Log

- Step 1 done: baseline build passed; tools from spec section 16, config, gitignore, playwright.
- Step 2 done: 23 images in reference/ (headed Chrome), tall images sliced.
- Step 3 done: five still frames (`m10_1.png` to `m10_5.png`) cut from `m10.gif` (8 frames, 100 ms each); enlarged crops
  (`reference/crop_*.png`) and `reference/logo_zoom.png`; mark measured on m21; SOURCE.md written.
- Step 4 done: LAYOUTS.md, pages.json, shared system, 30 stub routes, BRIEF.md. Lint clean; build passes; check
  lists 30 stubs and "/". Plumbing (dock, index, reveal, toast, tools, device-frame structure) adapted from the sibling project ../project-3;
  tokens, type, mark, lockups, icons, key art, mockup kit, screens, nav and footer are Best Grid's own.
- Step 4 committed. Step 5 started: wave 1 launched (B1 to B12, Sonnet). If a session ends here, trust only `npm run build` and `node tools/check.mjs`.
- Wave 1 done: 12 builders, 17 pages, each committed locally; lint clean, build passes, check 17 of 30 ok; no page under 650 lines. Shared fix: the dark landing nav's current-page link keeps light text. Wave 2 launched (B13 to B24, Sonnet).

## Notes for the review round

- campaign: the builder made the four posters 1080 x 1440 (the case-study sheets are 3:4); the spec asks for 3 posters at 1080 x 1350. The reviewer must make at least three posters 1080 x 1350 (the faithful 3:4 rebuilds may stay as extra plates).
- mobile-a: screens 1 and 2 were not compared with their references; screen 1's active chip label is white as printed (the shared system decided Dark Blue for contrast).
- gradients: a brand line crosses the dark band on the bands plate; the stop-1 node and label are clipped on the Sunset anatomy drawing; the four "faithful" fields were not checked against the references.
- lp-solar, lp-wind: figures were read from m16 at normal size, not from a crop.
- overview: the contents list shows 9 chapters; confirm the index of all 30 pages exists and is linked.
- strategy: English labels "Complexity" and "Structure" on the tangle drawing.
- motion: frames 2, 4 and 6 of the m10 cycle are assumed, not read from stills.
- logo: the word-mark's letters touch less than in the reference.
- showcase: plate 3's callout lines cross the laptop. use-apparel: confirm 3 hoodies (the vest is counted as one of the three hoodie-class pieces). use-world: the vehicle was not re-compared with m20 after the last tweak.
- Wave 2 done: 12 builders, 13 pages, each committed locally. Lint clean, build passes, check --strict 30 of 30 ok; every page is over 600 lines, so no page was sent back. Step 6 started: 8 reviewers launched (Opus).

## Pending shared fixes from the review round (lead applies once all 8 reviewers are back)

- R3, `src/lib/brand.js`: the treemap's unlabelled remainder must carry `pct: null`, not the computed 16 (the case study prints no figure for it).
- R3 (for the report): every printed figure was re-read from enlarged crops and matches (tiles 12.157 / 2.794 / 3.433 / 2.083 MW; quarters 3.200 / 4.100 / 5.200 / 2.920 MW; Total anual 15.420 MW; axis 1.000 to 7.000 MW; KPIs 128, 46, 72; treemap 68% and 16%). The quarters sum to the printed annual total exactly; the four technology tiles sum to 20.467 MW, which is not the annual total: the pages show both as printed and say so.
- R2, `src/components/site/icons.js`: (a) turbine ring ends: `A(cx,cy,6k,7k,…)` with inner span ±29.5° and outer ±33.5°; (b) `wind: turbinePath(12, 12.75, 1)` (it now draws 0.9-unit bars); (c) `user` draws a person: replace with a badge shape `F(3,5,18,15)+R(10,3,4,2)+R(6,9,4,4)+H(12,9,6)+H(12,12,4)+H(6,16,12)`.
- R2: private hexes remain in shared art (`BrandDefs`, `BaselineFieldG`, `NodeGridG`) and in the `.btn` hover rules in globals.css: switch to tokens.
- R2 (SOURCE.md correction): the baseline field (m10) is a line pair every 0.63% in blocks of 18, not 0.55%; the animation's 8 frames run A|B, C|B, C|D, B|D, B|A, D|A, D|C, A|C.
- R6, shared `Segmented` control (src/components/ui): it ignores arrow keys; add Left / Right (and Home / End) handling with roving focus.
- R4, globals.css: the `fill-in` / `fade-in` / `snap` keyframes end at `opacity: 1` and override opacity attributes on SVG elements; write them as `from { opacity: 0 }` with no `to`. R4, `src/components/art/Devices.jsx`: `ScreenCapacityG` sits 3 to 4 units low with oversized 68 / 16 / % numerals and a white active chip; `ScreenNodesG` and `StatusBarG` (clock) must match the measured versions now in `src/components/pages/mobile-a/Faithful.jsx` and `grid.js` (node grid 20 x 41, read cell by cell; no clock).
- R5, shared `LandingNav` against the website image (m16): 57 px tall, link cells about 150 px wide centred on 50%; the button's crosshair glyph should be chunkier.
- R1, `src/components/art/Mark.jsx` word-mark: tracking -0.015, gap 0.09, width 4.1 (only "s" and "t" touch in the reference; ours touch more). R1, `CrossingBandsG` defaults: a1 -72, a2 21 (the bands were mirrored). R1: add a token for `#7c9cff` and use it. R1 (SOURCE.md correction): the cover's right guide is at 95.7%, not 97.5%.
- Accessibility changes that altered the look (R1, R5): the overview cover's band is darker (text 2.6 to 5.1:1); swatch-card small text and treemap labels are Dark Blue; small poster, tube and tile text uses the blue ink; the lp-wind hero line and mark are back to the printed light grey at 24 px or larger.
