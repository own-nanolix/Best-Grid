# REPORT: Best Grid brand site

A 30-page brand site built from the Behance case study "Best Grid | Structuring Complexity" by Pablo Aeme (Alicante, Spain), published 15 April 2026 (https://www.behance.net/gallery/247652913/Best-Grid). Best Grid is a consultancy for grid access and connection for energy projects. The case study is branding only: it shows a mark, a palette slide, a type slide, icons, print, a tube, a badge, posters, a box, a website, a phone dashboard, a billboard, a vehicle and an event screen. It has no desktop dashboard, no prices, no testimonials, no team and no forms. Its only real data is the capacity figures on the phone dashboard and the four technology tiles on the website.

## Where the site is

- **Routes:** `/` shows the overview. Every page is `/<id>/`: overview, logo, color, gradients, typography, icons, dataviz, motion, strategy, web-system, lp-home, lp-solar, lp-wind, lp-storage, lp-data-centers, lp-field, lp-annual-report, dashboard, mobile-a, mobile-b, feature, showcase, campaign, use-apparel, use-accessories, use-stationery, use-packaging, use-event, use-world, use-product.
- **Static export:** `npm run build` writes the site to `out/`. It needs no server features.
- **Local dev server:** http://localhost:3105 (`npx next dev -p 3105`).
- **GitHub:** https://github.com/own-nanolix/Best-Grid (branch `main`). Pushed once, after the final review, because the owner's repositories are connected to Vercel and every push goes live (the owner's standing orders).
- **Live link:** needs a Vercel import by the owner (no Vercel project is known for this repo yet).

## Deliverables: minimum and delivered

Exportable SVGs per page, as counted by `node tools/check.mjs` on the built site (30 of 30 pages `ok`). The export count is the only deliverable count that a tool re-checked.

| # | Page | Minimum | Delivered |
|---|---|---|---|
| 1 | overview | 2 | 4 |
| 2 | logo | 18 | 33 |
| 3 | color | 5 | 11 |
| 4 | gradients | 20 | 26 |
| 5 | typography | 6 | 11 |
| 6 | icons | 40 | 47 |
| 7 | dataviz | 20 | 25 |
| 8 | motion | 6 | 13 |
| 9 | strategy | 3 | 7 |
| 10 | web-system | 3 | 8 |
| 11 | lp-home | 2 | 12 |
| 12 | lp-solar | 2 | 7 |
| 13 | lp-wind | 2 | 7 |
| 14 | lp-storage | 2 | 7 |
| 15 | lp-data-centers | 2 | 9 |
| 16 | lp-field | 2 | 8 |
| 17 | lp-annual-report | 2 | 7 |
| 18 | dashboard | 8 | 12 |
| 19 | mobile-a | 2 | 7 |
| 20 | mobile-b | 2 | 8 |
| 21 | feature | 2 | 5 |
| 22 | showcase | 4 | 5 |
| 23 | campaign | 7 | 21 |
| 24 | use-apparel | 12 | 16 |
| 25 | use-accessories | 20 | 22 |
| 26 | use-stationery | 14 | 22 |
| 27 | use-packaging | 12 | 14 |
| 28 | use-event | 19 | 20 |
| 29 | use-world | 6 | 7 |
| 30 | use-product | 12 | 18 |

The delivered column adds up to 419, the same as the number of files in `export/svg/`.

The other items each row of section 9 asks for were counted by reading the page code (page files, data files and component lists) after the review round:

| Page | Item | Minimum | Delivered |
|---|---|---|---|
| overview | Cover / principle cards / chapter index / mockup-and-product index | 1 / 4 / 1 / 1 | 1 / 4 / 1 (30 pages in 4 groups) / 1 (45 plates, two columns) |
| overview | About this brand with a contents list | present | present (9 contents entries, the nine foundation chapters) |
| logo | Primary lockup / construction diagram with measurements / clear space diagram | 1 / 1 / 1 | 1 / 1 / 2 (the mark, and the primary lockup) |
| logo | Minimum sizes / colour versions / lockup family / misuse examples | 4 / 4 / 4 / 6 | 4 (24, 40, 64, 96 px) / 6 (4 printed pairings and 2 from the palette) / 4 (cell, stack, corners, footer; plus the primary lockup) / 6 |
| logo | Secondary graphic built from the mark / animated draw-on | 1 / 1 | 4 (lattice field, lattice pattern, crossing bands, star echo) / 1 |
| color | Spec tables (primary, neutral) / proportion bar / accessible pairings / semantic tokens | 2 / 1 / 6 / light and dark | 2 (plus 3 tint ladders) / 1 / 6 (plus a pairing sheet, a full matrix and a live tester) / light and dark, 8 tokens each |
| gradients | Named gradients / anatomy / grain levels with comparison / key art / motion studies | 6 / 2 / 4 + 1 / 6 / 4 | 6 / 2 / 4 + 1 / 6 / 4 |
| typography | Primary weights / secondary weights / scale rows / character set / hierarchy layouts / metrics study | all / all / full / 1 / 1 / 1 | 3 shown (Regular as published, Medium, the word-mark cut) / none: the case study names one face, shown as a text voice and a display voice / 10 rows (11 to 160 px) / 1 (about 110 glyphs in rows of 12) / 1 (the Active Blue poster, 4 tiers) / 1 (plus a leading study) |
| icons | Icons / constructions with 4 sizes / in-use examples / illustrations on light and dark | 32 / 2 / 4 / 3 | 32 (plus 18 interface icons, not confirmed one by one) / 2 (substation, battery) / 4 / 3 (6 exports) |
| dataviz | Chart types / stat cards / KPI tiles / table rows / live counters / chart rules / states | 16 / 4 / 3 / 6 / 2 / 6 / 3 | 16 (plus the full-width lead area chart) / 4 / 3 / 6 (4 tiles, the annual total, Q3) / 2 / 6 / 3 (loading, empty, error) |
| dataviz | Sparklines; legend, tooltip and tab components | present | 1 sparkline figure; tooltips and components present (legend and tab parts not counted one by one) |
| motion | Easing demos / duration demos / logo animations / transition demos / micro-interaction groups / do and don't | present | 5 / 6 / 2 (draw-on, and the eight-frame cycle with a storyboard) / 6 (page enter, table row, tile, card, sheet, tabs) / 5 (buttons, toggles, inputs, loaders, toasts) / 4 pairs |
| strategy | Story sections | present | 6 (opening, problem, research, solution, impact, closing band) |
| web-system | Button variants with states / navigation bar / mega menu / footer | 6 / 1 / 1 / 1 | 6 (5 states each) / 1 (shown light and dark) / 1 / 1 |
| web-system | Links, tags, feature cards, content block, list rows | present | links in 5 states; tags in 4 groups; 3 feature-card structures; 1 content block; 7 list rows (3 disclosure, 4 data); 3 anatomy drawings |
| lp-home | Sections | 8 | 13 (15 with the nav bar and footer) |
| lp-solar | Sections | 7 | 11 (13 with nav and footer) |
| lp-wind | Sections | 7 | 12 (14 with nav and footer) |
| lp-storage | Sections | 7 | 8 (10 with nav and footer) |
| lp-data-centers | Sections | 7 | 8 (10 with nav and footer) |
| lp-field | Sections | 7 | 7 (9 with nav and footer) |
| lp-annual-report | Sections | 7 | 7 (9 with nav and footer) |
| dashboard | Home options / options overview / inner screens / components | 5 / 1 / 2 / 9 | 5 / 1 / 2 (node detail, technology detail) / 10 (table header and table row counted apart) |
| mobile-a | Screens / row of all nine | 9 / 1 | 9 / 1 |
| mobile-b | Screens / components / interaction patterns | 9 / 10 / 7 | 9 / 10 / 7 |
| feature | Working demo | 1 | 1 (node explorer with a guided tour) |
| showcase | Hero scenes / phones in the line-up | 4 / 8 | 4 (plus 1 extra plate, the plate anatomy) / 8 |
| campaign | Social posts / posters at 1080 x 1350 / stories / profile grid | 4 / 3 / present / 1 | 4 / 3 (data-centre, generation, clarity; the four 3:4 poster rebuilds and a live poster cycle come on top) / 5 / 1 (9 tiles) |
| use-apparel | Collection scene / t-shirts front and back / hoodies / caps / print-spec sheet | 1 / 3 / 3 / 3 / 1 | 1 / 3 / 3 (the vest is an extra) / 3 (the hard hat is an extra) / 1 (plus 3 close-up details) |
| use-accessories | Totes / mugs / bottles / sticker sheet / pin card / patches / keychain | 2 / 2 / 2 / 1 / 1 / 4 / 1 | 2 / 2 / 2 / 1 / 1 / 4 / 1 (22 plates in all, including single-object plates) |
| use-accessories | Cup with sleeve / coasters / desk mat / mouse pad / umbrella / socks / gift card front, back and carrier | 1 each / 3 | 1 / 3 / 1 / 1 / 1 / 1 pair / 1 front, 1 back, 1 carrier |
| use-stationery | Letterhead / envelope / card fronts / card back / pen / notebooks / brochure / report cover / slides | 1 / 1 / 2 / 1 / 1 / 2 / 1 / 1 / 5 | 1 / 1 / 2 / 1 / 1 / 2 / 1 / 1 (the plate shows three, with spines) / 5 |
| use-packaging | Tape rolls / strips / shipping boxes / product boxes / shopping bags / tissue / seal / label | 2 / 1 / 2 / 2 / 3 / 1 / 1 / 1 | 2 / 1 / 2 plates (a large and small carton, and a mailer; 3 boxes drawn) / 2 plates (the Active Blue rigid box with a Dark Blue box behind, and the tube carton) / 3 / 1 / 1 / 1 (plus the tube label laid flat) |
| use-event | Lanyard with badge / staff IDs / fabric wristbands / silicone wristbands / tickets / VIP pass / booth / feather flags / banner | 1 / 2 / 4 / 3 / 3 / 1 / 1 / 3 / 1 | 1 / 2 plates (2 cards each) / 4 / 3 (plus a fan of all seven) / 3 / 1 / 1 / 3 / 1 |
| use-world | Billboard / citylight with roll-ups / reception signage with wayfinding and room plaque / vehicle wrap | 1 / 1 / 1 / 1 | 1 / 1 (2 roll-ups) / 1 reception scene (plus a wayfinding plate with 2 plaques and a room plaque plate) / 1 (plus a site sign as an extra) |
| use-product | Product object views / card colourways front and back / tablet, phone and watch / app icon sizes | present / 3 / 3 / 5 | 6 tube plates (hero, front, side, open, carton, second colourway), plus the drawing and the label / 3 / 3 (one plate) / 5 (16, 32, 64, 128, 256 px, plus the ladder) |

Notes on the counts. Section counts on the landing pages count the sections the page lists in its code; the nav bar and the footer are given separately in brackets. A pinned story counts as one section. The "interface icons" count (18) is the length of the shared utility icon list and was not checked page by page. Items marked "present" were checked as present, not counted member by member. Two things differ from a plain reading of the rule: the dashboard components are ten (table header and table row are counted as two), and the apparel gets the vest and the hard hat as extras beside the required three hoodies and three caps.

## SVG export

`node tools/export-svg.mjs` wrote **419 SVGs** to `export/svg/` with **0 warnings**. The files were checked by the exporter's warnings only; they were not opened one by one. Text in exported files is live SVG text in the brand font stack, so a computer without Inter or Inter Tight shows a system font until the text is outlined in a design tool.

## Faithful rebuilds, and what we added

Faithful to the case study:
- **logo, overview:** the mark (m21, m05), fitted to the artwork at 97.4 % pixel overlap, the rest being edge pixels; the lockup cells of the card back, website and poster footer; the cover guides and hero line over a drawn fog field (m01).
- **color:** the palette slide (m04) with HEX and CMYK as printed.
- **typography:** the type slide (m03) with "AaBb", "[€0.9]" and its footer cells.
- **icons:** the icon construction (m14) and the four pixel icons (m15).
- **motion:** the poster grid animation (m10), rebuilt from all eight frames.
- **lp-home, mobile-a, feature, dataviz, dashboard:** the website hero, nav, buttons and tiles (m16), and the phone dashboard and node grid (m17): the two phone screens were rebuilt from the reference with the node grid read cell by cell.
- **campaign, lp-data-centers, lp-field:** the posters (m09, m11), at 3:4 as the case study has them.
- **use-stationery, use-packaging, use-product:** the flat lay (m05), business cards (m06), the project tubes (m07), the box (m12), the report covers (m02).
- **use-event, use-world:** the badge and lanyard (m08), the billboard (m19), the vehicle livery on a drawn neutral vehicle (m20), the event screen (m22).

Added by us, as partners, in the designer's language: logo clear space, minimum sizes, lockup family, misuse and draw-on; colour ladders, pairings and semantic tokens; the gradients (only two come from the photographs, and they stand in for them), anatomy, grain studies, key art and motion studies; the type scale, character set, hierarchy and metrics; 28 more icons on the 32 grid (the four pixel icons are the case study's), the utility icons, constructions and three illustrations; the charts beyond the area chart, treemap and node grid; the whole motion system beyond the m10 cycle; strategy (from the page description and the poster lines only); the web component bench and mega menu; six landing pages beyond lp-home; the dashboard options and inner screens; 16 more mobile screens, the component set and the patterns; the node explorer; the showcase scenes; social posts, stories, profile grid and the 1080 x 1350 posters; and most apparel, accessories, packaging, stationery, event and world items.

## Wording and values that did not come from the case study

- **Site words are English.** Brand copy is quoted as the designers wrote it, in Spanish, marked `lang="es"`; no new Spanish copy was written. Page headings, control labels and captions that name deliverables are ours.
- **Names we gave things:** the gradients, key-art plates, scale and semantic token names, the dashboard option names.
- **Recommendations and production values of our own:** minimum logo sizes, clear space, chart rules, motion do / don't pairs, callout dimensions and stock weights on the catalogue plates.
- **Computed values (labelled as computed on the pages):** colour ladders mixed in code from the published colours; contrast ratios; sums, means, deltas and shares in the charts; Light Blue's RGB (228, 231, 239) from its HEX. Sampled, not published: the light grey-white, warm grey and the photograph tones.
- **Figures:** only the figures the case study prints are used, each beside what it is printed for. Every one was re-read from enlarged crops in the review round: tiles 12.157 / 2.794 / 3.433 / 2.083 MW; quarters 3.200 / 4.100 / 5.200 / 2.920 MW; Total anual 15.420 MW; axis 1.000 to 7.000 MW; KPIs 128, 46, 72; treemap 68 % and 16 %. The four quarters add up to the printed annual total exactly. The four technology tiles add up to 20.467 MW, which is not the annual total: the pages show both as printed and say so. The years 2023 and 2024 have no printed figures and show an empty state. The treemap's unlabelled part stays unlabelled. Node-grid cells carry no figures.
- **Colour slide:** the slide prints an RGB line for Light Blue that repeats Active Blue's. The site shows the value computed from the published HEX (228, 231, 239) and says so.
- **Report cover:** the title and year run off the image in the case study. They are cropped by the edge in the same way and never completed.
- **E-mail:** printed with typing slips in two places in the case study ("nfo@", "ingo@"); the site uses info@bestgrid.com. "Esteribar" is set as "Esteríbar".
- **Left out or replaced:** the client named on the tube label reads "Client name"; another company's colour-system codes (the PMS rows) are left out; the typeface's product name and foundry and the free substitute fonts are not named on pages (pages say "the brand typeface"); the publishing platform, design tools and social networks are not named; device frames and the vehicle are neutral; phone status bars carry no clock time.
- **Illegible values left as placeholders:** none were left illegible after the review round beyond the report cover's cropped title and year (above).
- **Reviewers corrected:** the animation's cycle was rebuilt after decoding all eight frames; the two phone screens were rebuilt from the reference; the lp-home hero was re-measured one to one; fields wrongly called faithful on the gradients page were re-measured and relabelled as stand-ins for photographs; three posters at 1080 x 1350 were added; hoodies and caps were brought to three each, with the vest and hard hat as extras; crossing callout lines were rerouted across the mockup pages; mirrored crossing bands were fixed; invented labels and stats were removed; status-bar clocks were removed; seven icons were corrected, and the `user` icon is now a badge, not a person.

## Accessibility changes that altered the look

- Small blue text on every light ground uses a deeper blue ink (`#3352c2`, 4.7:1 or more); small grey text uses `#4b5174` (and `#a9b2d6` on dark).
- The active year chip label is Dark Blue (printed white); small website body text uses the blue ink.
- The overview cover's band is darker (text 2.6 to 5.1:1); swatch-card small text and treemap labels are Dark Blue; small poster, tube and tile text uses the blue ink. The lp-wind hero line and mark are back to the printed light grey at 24 px or larger.
- Contrast problems left in place to keep the design, for type of 24 px and up only: Active Blue on Light Blue (2.8:1), periwinkle (2.4:1), paper (3.3:1) and white (3.4:1) grounds; light type on Active Blue (2.8 to 3.4:1). The logo misuse example "Do not use low contrast" shows a failing pair on purpose.

## Font, and what could not be reproduced in code

- **Font:** the case study names the typeface (Neue Haas Unica W1G, a commercial face). The site uses **Inter** (text, with its optical-size axis) and **Inter Tight** (display sizes and the word-mark) through `next/font/google`, with "Neue Haas Unica W1G" first in both CSS stacks and Helvetica Neue, Arial and system-ui last. Why: set beside the type slide and the word-mark crops, Inter has the same neo-grotesk construction (flat-sided "G" with a vertical stem, straight "t", round "e" and "s" apertures), a large x-height and tabular figures; Hanken Grotesk reads rounder and more geometric, Schibsted Grotesk wider and softer. The typeface's product name appears only in the CSS stack and here.
- **Word-mark:** it is set in the free match (SVG text, Inter Tight weight 540, tracking -0.045 em), not traced, so "Grid" is slightly narrower than in the brand typeface. The mark is traced from its own construction.
- **Not reproduced:** photographs and people. They are never reproduced or drawn: the hero photograph is a drawn fog field, the corridor and sky photographs are stand-in gradients, the portrait and the hand on the laptop are left out, and the vest and hard hat seen in a photograph are drawn empty, in the brand's blues. Mockups are drawn objects, not photographic renders.

## What was verified in the browser, and what was not

Verified by the lead on the built site (`out/`, served locally), at the end of the review round:
- eslint is clean; `npm run build` passes; `node tools/check.mjs --strict` reports 30 of 30 `ok`.
- `node tools/audit.mjs`: 30 of 30 pages clean at 1440 and 390 px (overflow, low contrast, unnamed controls, bad links, missing SVG roles, duplicate ids), with no console errors.
- `node tools/export-svg.mjs` wrote 419 SVGs with 0 warnings.

Verified by the reviewers on the dev server: the interactive parts of their own pages.

Not verified:
- Touch input, Safari and Firefox.
- Reduced motion was checked by running on some pages and by reading the code on others.
- Exported SVGs were checked by the exporter's warnings, not opened one by one.
- The word-mark is set in the free match and "Grid" is slightly narrower than in the brand typeface.

## Agents

- **Case study and SOURCE.md:** one agent, on Opus, read the case study and wrote SOURCE.md.
- **Shared system (step 4):** one agent, on Opus.
- **Builders:** 24, on Sonnet. Wave 1: 12 builders, 17 pages. Wave 2: 12 builders, 13 pages. None failed, and no page came back under 600 lines, so none was sent back and no agent was relaunched.
- **Reviewers:** 8, on Opus. Each reviewed and fixed its own pages.
- **Fixer:** 1, on Sonnet, applied the shared fixes the reviewers recommended: the treemap's unlabelled part without a figure, seven icons corrected, shared colours moved to tokens, keyframes that no longer override opacity attributes, a status bar without a clock, measured phone screens, the landing nav re-measured, the word-mark spacing, callout lines sorted so they never cross, arrow keys on the segmented control, and SOURCE.md corrections.
- **Final reviewer:** 1, on Opus, independent, checks the code and every page against both rule files before the push.
- **Problems found along the way:** `cacheComponents` and `partialPrefetching` were removed because they cannot be combined with a static export; the Tailwind loader is limited to non-module CSS so CSS Modules keep their class names; the static export's prefetch files gave 404s on a plain static host and `scripts/flatten-prefetch.mjs` runs as `postbuild`. These fixes came from the earlier projects and were applied from the start.

## Decisions made under the standing orders

1. The two rule files disagree on technology: `rule/10-best-grid.md` describes a single HTML file, `rule/Brand-site.md` describes this Next.js site and says it gives everything beyond the link, site name and layout direction. `Brand-site.md` is followed; from `10-best-grid.md` only the Behance link, the site name and section 2b apply.
2. Commits are local after every builder and fix. One push, after the final review.
3. No other company's name, address, product name, logo or copyright on any page: the client named on the case study's tube label reads "Client name"; another company's colour-system codes are left out; the typeface's product name and foundry and the free substitute fonts are not named on pages (pages say "the brand typeface"); the publishing platform, design tools and social networks are not named; device frames and the vehicle are neutral; phone status bars carry no clock time; the starter template's images in `public/` were replaced with the brand's mark.
4. Site words are English; brand copy stays in Spanish exactly as printed, marked `lang="es"`; no new Spanish copy was written.
5. Figures: only the figures the case study prints are used, each beside what it is printed for; every one was re-read from enlarged crops in the review round (tiles 12.157 / 2.794 / 3.433 / 2.083 MW; quarters 3.200 / 4.100 / 5.200 / 2.920 MW; Total anual 15.420 MW; axis 1.000 to 7.000 MW; KPIs 128, 46, 72; treemap 68 % and 16 %). The quarters sum to the printed annual total exactly; the four technology tiles sum to 20.467 MW, which is not the annual total, and the pages show both as printed and say so. Computed values (sums, means, deltas, shares) are labelled as computed. Years without printed figures show an empty state. The treemap's unlabelled part stays unlabelled.
6. The colour slide prints an RGB line for Light Blue that repeats Active Blue's: the site shows the value computed from the published HEX (228, 231, 239) and says so.
7. The report cover's title and year run off the image in the case study: they are cropped by the edge the same way and never completed.
8. The e-mail is printed with typing slips in two places in the case study; the site uses the correct form info@bestgrid.com.
9. Photographs and people are never reproduced or drawn; the vest and hard hat seen in a photograph are drawn empty, in the brand's blues; the `user` icon is a badge, not a person.
10. HERO_FEATURE is capacity at critical grid nodes (a working node explorer); PRODUCT_OBJECT is the project tube with its rolled drawing.
11. Callout dimensions and stock weights on catalogue plates are production values of our own.
12. Unused or stray files are never deleted. Screenshots and an empty file left in the project root by agents were moved out of the project (some had been committed and stay in the local history, which is never rewritten).

## Final review

Findings and fixes: to be completed
