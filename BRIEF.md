# BRIEF: how to build a page of the Best Grid brand site

You are building pages of a 30-page brand site for **Best Grid**, a consultancy for grid access and connection of
energy projects (Spain), from a Behance case study by **Pablo Aeme**. The designer is the audience: they must
recognise their own work on every page and see what a partner adds. **Reproduce what they made; do not redesign
it. Then extend it generously, in their language.**

Read first, in this order: this file, `SOURCE.md` (all copy, palette, shapes, figures), your lines in
`LAYOUTS.md`, then `src/app/globals.css`, `src/lib/*.js` and the files in `src/components/site`,
`src/components/ui`, `src/components/art`. Do not read `out/`, `.next/` or `node_modules/`.

The project is Next.js 16 (App Router), React 19, **JavaScript only** (`.jsx`, no TypeScript), Tailwind v4 plus
plain CSS and CSS Modules, framer-motion 14, static export. The app lives in `src/`. Import alias: `@/` = `src/`.

## Language

The case study is in Spanish (Spain). **The site's own words (headings that name deliverables, labels, captions,
controls) are English. Brand copy stays exactly as the designer wrote it, in Spanish**, with its accents,
brackets, middle dots and spellings ("Contactanos" without accent on the envelope; "Nº"), and every element that
shows it gets `lang="es"`. Never translate a brand line, and never write new Spanish copy (no invented Spanish
labels, buttons or aria-labels). Spanish number formats stay as printed: "15.420 MW", "12.157 MW", "68%".

## The brand in one paragraph

Best Grid makes grid access legible: it lays every tangled technical and regulatory question onto a visible
structure of lines, cells and nodes so that a project can be seen, decided and moved forward. Its mark is a
lattice star, a grid gathered into one node reaching in four directions, and the whole identity speaks in calm
Spanish engineering sentences in two blues. Every extension must be explainable from this.

Look and feel: hairlines that run edge to edge, with small solid square **nodes** at every crossing and at the
corners of the live area; everything sits in **ruled cells** between them. Flat fields of Dark Blue `#1b2043`,
Active Blue `#5983ff`, Light Blue `#e4e7ef` and a sampled periwinkle; no published gradient. One grotesk, sentence
case, headlines in two or three short lines ending in a full stop; the two-tone line on Active Blue (first part
light grey, the rest Dark Blue); oversized numerals for data. Square corners everywhere; the only round element is
the year chip. Buttons carry a crosshair (four bars around an empty centre). Icons are pixel bars with stepped
corners and open crossings. The secondary graphic is the **crossing bands** of the folder: two straight Active Blue
bands meeting with large fillets. Motion is engineered and calm: lines extend first, nodes snap in, cells fill;
nothing bounces. The only published motion is a hard-cut cycle at 100 ms per frame (m10).

## Rules that cannot be broken

1. **Do not redesign.** Where the case study shows something, reproduce it exactly: copy verbatim, figures,
   colours, layout, proportions and shapes. Measure from the reference images (the screens of m16 / m17 are
   already measured and rebuilt in `components/art/Devices.jsx`; reuse them).
2. **Extend generously, only in the designer's language.** Same palette, one grotesk, hairlines and nodes, ruled
   cells, square corners, pixel-bar icons, the lattice, the crossing bands. Mark nothing as "new" in the interface.
3. **Invent no facts.** The case study contains **no prices, plans, fees, testimonials, quotes, client names, team
   lists, opening hours, maps, form fields, tables, desktop dashboard, services pages, website footer, figures for
   2023 or 2024, per-node values, clear-space / minimum-size / misuse rules, horizontal lockup, gradients, second
   typeface, English brand lines or dates** other than those below. Never invent any. Where a deliverable needs such
   facts use the brand's own words and figures (below) or a **quiet placeholder** (`<Placeholder />`, class `ph`,
   or a pale bar in SVG). Plain English labels that only name a deliverable or a control are allowed ("Clear
   space", "Front", "Back", "Search", "Sort", "Format"). Report every word or value that is your own.
   - **The real figures, and where they may be used** (all in `FIGURES` / `CAPACITY` / `TECH` in `@/lib/brand`):
     technology tiles Fotovoltaico 12.157 MW, Eólico 2.794 MW, Almacenamiento 3.433 MW, Data Centers 2.083 MW
     (m16); quarters Q1 3.200, Q2 4.100, Q3 5.200, Q4 2.920 MW, "Total anual" 15.420 MW, axis 1.000 to 7.000 MW,
     year chips 2023 / 2024 / 2025 with figures for **2025 only**; KPI cells Proyectos gestionados 128, Nudos
     analizados 46, Accesos concedidos 72; treemap 2025 "Capacidad gestionada": Desarrollo durante el año 68%,
     Capacidad consolidada 16% (the Dark Blue remainder has no label and no figure); (the status-bar clock of m17 is never drawn); Proyecto
     Nº 35, 02.05.2025 (m07); IDAA, [24 – 25], 2024 / 2025 (m02); ID : BG356945 and the badge numeral 25 (m08);
     the contacts. They may be used on any page (dashboards, charts, feature, campaign) as long as each figure keeps
     its own meaning and reads the same everywhere. Charts of other kinds may re-plot these figures; they may never
     add series, years or nodes with values. 2023 and 2024 always show an empty state.
   - **Catalogue-plate dimensions** (mockup callouts such as "220 × 310 mm", "350 g/m²", "85 × 55 mm") are our own
     production values in plain mm and are allowed: they describe the object we draw, not the brand. Keep them
     believable standard formats (A4 210 × 297, DL 220 × 110, card 85 × 55) and never present them as published.
4. **The deliverable list is a checklist, not a design.** How things look and are named comes from this brand's
   case study only. Do not borrow concepts, compositions, headings or copy from other brand systems.
5. **All assets are code.** Inline SVG (JSX) and CSS only. No `<img>`, no `next/image`, no raster files, no base64,
   no external URLs, no icon or chart libraries, no new packages. **Photographs and people are never reproduced
   and never drawn**: the turbine in fog, the data-centre corridor, the solar tree, the nacelle, the field engineer,
   the hand on the laptop, the woman of m18, the pylon, the vehicle photo, the audience and the speaker. Stand-ins:
   flat Dark Blue photo blocks at 75% (`PhotoBlockG`, `.photo-block`, as m10), the fog and sunset fields
   (`FogFieldG`, `BrandDefs`), light trails (`TrailsG`), line art from the icons (`IconArtG`), the baseline field.
   People appear only as the names printed on the rebuilt card and badge (Lorena Sánchez González, Elena Torres).
6. **One site, 30 routes.** Your page is `/<id>/`. Links to other pages are `<Link href="/<id>/">` from `next/link`
   (with the trailing slash). Never use plain `#anchor` links; scroll with `scrollToId()` from `@/lib/site`. No
   server features.
7. **One system.** Use the shared tokens, classes and components listed below. Never redefine or edit them.
   Anything missing is built inside your own folder and reported.
8. **Motion is a headline feature.** framer-motion and CSS with the shared tokens from `@/lib/motion` (JS) or
   `--ease-*` / `--dur-*` (CSS). Never default easings. Every page has a designed entrance, scroll reveals (the
   shared `Reveal`: opacity and transform only) and at least one signature animated moment (the lattice drawing
   on, guide lines extending and nodes snapping, cells of the node grid filling, the area chart growing, the m10
   hard-cut cycle, a tube turning to the light). Every interactive element has hover, focus-visible and active
   states. Animate `transform` and `opacity` where possible. Animations always land on their final value, also when
   interrupted or when the page is left and re-entered. `prefers-reduced-motion` is honoured (the shared CSS
   shortens CSS animations; in JS use `still()`). No overshoot, no bounce, no spring with overshoot.
9. **Minor accessibility fixes only.** Small text (under 24 px) must reach 4.5:1. Pairs that pass: Dark Blue on
   Light Blue / periwinkle / paper / white (11 to 16:1), Light Blue on Dark Blue (12.7:1), Active Blue on Dark Blue
   and Dark Blue on Active Blue (4.6:1), `--blue-ink` on every light ground (4.7:1 or more), `--muted` on light
   (5.4 to 7.7:1), `--muted-on-dark` on Dark Blue (7.5:1). **Pairs that fail for small text** (keep them only for
   type 24 px and up): Active Blue on Light Blue (2.8:1), on periwinkle (2.4:1), on paper (3.3:1), on white
   (3.4:1); white or light grey on Active Blue (3.4 / 2.8:1). So: small blue text on light grounds uses
   `var(--blue-ink)` (class `ink`, `t-label`); small text on Active Blue is Dark Blue; the active year chip's label
   is Dark Blue (printed white). Real `<button>` and `<a>`; keyboard support for every interactive module (use the
   shared `Tabs`, `Toggle`, `Segmented`); meaningful SVG gets `role="img"` and `aria-label`, decorative SVG gets
   `aria-hidden="true"` (the `Art` wrapper does this). No horizontal page scroll from 1920 px down to 390 px: grid
   columns are `minmax(0, 1fr)`, wide SVGs scale with `width: 100%`, wide tables sit in `.spec-wrap`.
10. **Everything graphic exports as SVG.** Every logo variant, swatch sheet, gradient, texture, icon, illustration,
    chart, social post, poster, device frame, product and mockup is its own inline `<svg>`:
    - Use `<Art viewBox title exportName>`: it adds `viewBox`, `<title>` first, the role and `data-export`.
      `exportName` is `<page id>-<name>`: lower-case letters, digits and hyphens, unique across the site.
    - Geometry lives in attributes (`d`, `x`, `width`, `transform`, ...), never in CSS. An SVG `transform`
      attribute and a CSS transform animation must not sit on the same element: put the animated class on an inner
      `<g>` (`LitG` does this). Paint may come from CSS classes and tokens. In JSX use camelCase SVG attributes
      (`strokeWidth`, `stopColor`, `fillRule`) and `href`.
    - The markup is the finished artwork. Inside an exportable SVG animate with **CSS keyframes only**, playing
      *from* a start state *towards* the base style (`animation-fill-mode: both`). The shared classes `draw`,
      `extend-x`, `extend-y`, `snap`, `fill-in`, `rise`, `grow-x`, `fade-in`, `slide-up`, `lattice-line`,
      `lattice-fill`, `cut`, `mock-lit`, `mock-spot`, `mock-sheen`, `callout-line`, `callout-node`, `callout-text`
      are built this way. framer-motion may move a wrapper *around* an SVG, never the artwork inside it.
    - No `<foreignObject>`, no HTML inside the SVG, no CSS `background` or pseudo-element standing in for artwork.
      Gradients, clips, masks, filters and textures are SVG `<defs>`. Inside exportable artwork draw shapes
      directly (`MarkG`, `IconArtG`, the `PIXEL32` / `CORE` paths); `<use href="#site-…">` sprite references are
      for live UI only (they do not survive export).
    - Text inside artwork is SVG `<text>`; it inherits the brand stack. For display sizes add
      `className="display"`; the word-mark is always `WordmarkG` (class `wm`).
    - A mockup is one SVG: stage, shadows, object, materials, shading, the brand artwork and the callouts.
    - Interactive UI (dashboards, mobile screens, landing pages) is built as React components. Inside it every
      icon, chart, illustration and device frame still follows this rule, and each full screen has a fixed-size
      artboard root marked `data-screen="<name>"`.
    - An exportable SVG must not be nested inside another SVG, and must not be inside a `<button>` or `<a>`.
11. **English only** in every file, except brand copy, which stays in Spanish exactly as written.

**Other companies (standing orders, point 4): no other company's name, address, product names or copyright on any
page; neutral placeholders instead.** From `SOURCE.md`: the client on the tube label ("Client name": `TUBE.client`,
`NEUTRAL.client`); the typeface's product name (pages say "the brand typeface"; the name lives only in the CSS
stack); the colour-matching system codes of the colour slide (left out; HEX, RGB, CMYK only); the browser, laptop,
phone and vehicle makers (neutral frames: no pill camera island, no window buttons of a known system, no keyboard
legends, no badges, grille or light signature); the publishing platform, its regional communities, social
networks, the design tools and their maker, commenters, and the designer's other projects (never named; no
platform or social-network icons). Best Grid's own variants are not other companies (Best Grid Solutions, BGS,
bestgrid.com, bestgridsolutions.com, @bestgrid). Use **info@bestgrid.com** always (the "nfo@" and "ingo@" prints
are misprints).

## Page format

You own `src/app/(site)/<id>/` and `src/components/pages/<id>/` for your page ids, and nothing else.

```jsx
// src/app/(site)/<id>/page.jsx  (server component: no 'use client' here, so it can export metadata)
import { pageMeta } from '@/lib/pages';
import Demo from '@/components/pages/<id>/Demo'; // interactive parts are client components
import s from '@/components/pages/<id>/<id>.module.css';

export const metadata = pageMeta('<id>');

export default function Page() {
  return (
    <section className="page" id="p-<id>" aria-label="<Page title>">
      <h1 tabIndex={-1}>…</h1>
      …
    </section>
  );
}
```

- The page root is that `<section>`. **Remove `data-stub`.** Keep `id="p-<id>"` and the `aria-label`.
- Page-only styles live in `src/components/pages/<id>/<id>.module.css` (`import s from './<id>.module.css'`, then
  `s.name`; keyframes named `<id>-xxx`) or in Tailwind classes that use the shared tokens (`bg-dark-blue`,
  `text-active-blue`, `bg-periwinkle`, `text-blue-ink`, `text-muted`, ...). No global CSS from pages. In CSS Modules
  never write a bare element or `:root` selector; start from a class. Never write a private hex: every colour is a
  token (`var(--…)`) or `HEX.*` from `@/lib/brand`.
- **Every id**, including SVG gradient, filter, clip-path, mask and pattern ids, starts with `<id>-` and is unique
  within the page. Shared art that takes `idp` gets a different `idp` each time, starting with `<id>-`. The shared
  `Tabs`, `Field` and `Segmented` take an `id` prop: it must start with `<id>-` too.
- Exactly one `<h1>` per page, then ordered `h2` / `h3`.
- Repetitive SVG (nodes, rows, cells, colourways, repeated objects) is generated with `.map()` and small
  functions, never hand-typed.
- Server and browser must render the same markup: no `Math.random()` or `Date.now()` in render. Use `seeded(n)`
  from `@/lib/charts`. Round computed coordinates (`r2()`).
- **600 to 1,600 lines per page in total across its files; 700 is the working minimum.** Split big pages into
  several component files.
- Create files with the Write tool, not shell heredocs (they break on apostrophes and accents on this machine).
- Do not edit anything outside your folders. Never run `npm run build` / `next build`. Never start a server.
- Check with `npx eslint "src/app/(site)/<id>" "src/components/pages/<id>"` and fix every error. The lint rules
  are strict (React Compiler): do not call `setState` synchronously inside `useEffect` (set it in an event handler,
  a timer, an observer callback or `requestAnimationFrame`); do not read or write `ref.current` during render; do
  not wrap callbacks in `useCallback` / `useMemo` by hand; write `{'//'}` for a literal `//` in JSX text and
  `&apos;` or `{"…"}` for apostrophes and quotes in JSX text.
- Look at your page on the shared dev server **http://localhost:3105** : run
  `node tools/audit.mjs --base=http://localhost:3105 <id>` (fix overflow at 390 px, low contrast, unnamed
  controls, SVGs without role, duplicate ids, console errors) and
  `node tools/export-svg.mjs --dry --base=http://localhost:3105 <id>` (zero warnings wanted).
- **Screenshots:** load the page, **wait 1.5 s** (so scroll reveals are ready), then **scroll slowly** to the
  bottom (steps of about 600 px with a pause of about 120 ms each), and only then take a full-page capture;
  **measure sideways scroll after the slow scroll** (`document.documentElement.scrollWidth - clientWidth` must be
  0 at 1440 and at 390 px).

## Tokens (CSS variables in `globals.css`; the same names work as Tailwind colours: `bg-dark-blue`)

| Token | Value | Use |
|---|---|---|
| `--dark-blue` | `#1b2043` | Dark Blue (published): type on light, fields, icon slides, nodes and rules on light |
| `--active-blue` | `#5983ff` | Active Blue (published): fields, the mark on dark, chart fills, large blue type |
| `--light-blue` | `#e4e7ef` | Light Blue (published): the page ground, the website ground |
| `--periwinkle` `--periwinkle-mock` | `#cad8ff` `#c5d9ff` | Sampled: slide ground; mockup ground in the case study |
| `--paper` `--card-grey` `--stat-cell` `--btn-fill` `--on-blue` | `#f6f9ff` `#eef2f7` `#cddaff` `#eef2ff` `#e6e8ee` | Sampled: paper, card, highlighted stats cell, button fill, light type on blue |
| `--warm-grey` `--label-grey` `--chip-off` `--screen` | `#a49c93` `#c7ccd6` `#e9ecf2` `#dcdfe6` | Sampled: box ink (m12), tube label, inactive chip, phone screen ground |
| `--fog` `--plum` `--sunset` `--trail` | `#d9b8a6` `#4a2e2e` `#e0763a` `#5fd8ff` | Sampled photo tones: only inside stand-in gradients |
| `--stage` `--stage-light` | `#0c0e1f` `#2a3266` | The mockup stage, from Dark Blue |
| `--blue-ink` `--muted` `--muted-on-dark` `--red-ink` | `#3352c2` `#4b5174` `#a9b2d6` `#b3261e` | Small-text inks (rule 9); red for errors only |
| `--rule` `--rule-soft` `--rule-on-dark` `--rule-blue` `--grid-line` `--cell-line` | | Hairlines (set `--line` on a container to recolour its rules and nodes) |
| `--grad-fog` `--grad-sunset` `--grad-stage` `--grad-blue` | | Stand-in gradients for HTML (SVG uses `BrandDefs`) |
| `--hair` `--node` `--r-0` `--r-pill` `--r-holder` | 1 px, 6 px, 0, pill, 9% | Line weight, node side, square corners, chips, ID holder |
| `--ease-out` `--ease-move` `--ease-line` `--ease-linear` `--ease-cut` | see `globals.css` | Entering; moves; lines drawing; loaders only; the m10 hard cut |
| `--dur-snap` `--dur-xs` `--dur-s` `--dur-m` `--dur-l` `--dur-draw` `--stagger` | 100, 160, 240, 420, 700, 1200, 40 ms | Frame; nodes and chips; hover; cell fills; page enter; lines and lattice; stagger |

Hex values for SVG attributes are in `HEX` and `PALETTE` from `@/lib/brand`.

## Classes (`globals.css`)

- Type (one grotesk, sentence case): `t-display`, `t-h1`, `t-h2`, `t-h3`, `t-lead`, `t-body`, `t-small`, `t-micro`
  (addresses), `t-label` (slide labels, blue ink), oversized numerals `t-num` with `t-num-s|m|l|xl`, `t-sup` (the
  superscript %), `t-wordmark` (HTML word-mark; prefer `WordmarkG`), `t-rows` (one block per printed row),
  `t-center`, `t-right`, `t-balance`; colours `muted`, `ink`, `blue` (large only), `dark`, `tone-light` /
  `tone-dark` (two-tone line), `on-dark`, `on-active`.
- Layout: `page`, `wrap`, `wrap-narrow`, `band`, `stack`, `stack-lg`, `row`, `grid` with `cols-2|3|4|6|12`
  (`minmax(0, 1fr)`), `sr-only`.
- The guide system: `hair`, `hair-v`, `guide-t|b|l|r`, `node` (absolute square placed by its centre), `node-lg`,
  `corners` (nodes on two corners), `cells` (ruled cells, a node at every crossing; set `--cols`), `cells-open`,
  `cells-quiet`, `cell-fill` (the highlighted stats cell), `cell-dark`.
- Spec sheets: `spec` (table; `spec-num` big figure cell, `spec-num-s`, `spec-unit`, `spec-r`), `spec-dark`,
  `spec-active`, `spec-compact`, `spec-wrap`; `specs` (definition-list grid, set `--cols`).
- Split rows (landing pages): `split-row` with `split-text` / `split-art`, `split-flip`, `split-ruled`,
  `split-rows` (a stack of rows with rules between); ratio via `--a` / `--b`.
- Surfaces: `field-light`, `field-periwinkle`, `field-paper`, `field-dark`, `field-active`, `field-black`,
  `field-stage`, `field-fog`, `field-sunset`, `photo-block`; cards `card`, `card-dark`, `card-active`, `card-cell`,
  `card-line`, `card-head`.
- Chips (the only pills): `chip`, `chip-sm`, `chip-active`, `chip-dark`, `chip-line`.
- Buttons: `btn` (pale fill, crosshair `btn-x`), `btn-outline`, `btn-dark` (the "Únete" cell), `btn-active`,
  `btn-ghost`, `btn-lg`, `btn-sm`, `btn-block`, `btn-icon`; links: `link`.
- Controls: `tabs` / `tab` / `tabpanel` (`tabs-pill` = year chips), `toggle`, `fieldset`, `input`.
- Devices (HTML): `device device-phone|tablet|laptop|monitor|window|watch`, `device-screen`, `screen-fit`,
  `artboard` (set `--w`, `--k`).
- Landing: `lp-nav` (`lp-nav-dark`), `lp-brand`, `lp-links`, `lp-actions`, `lp-cta`, `lp-footer` and its parts.
- Mockups: `mock` (the stage frame), `mock-cap`, `mock-lit`, `mock-spot`, `mock-sheen`, `callout-line`,
  `callout-node`, `callout-text`.
- Motion: `draw` (set `--len`, `--i`), `extend-x`, `extend-y` (a guide line extending), `snap` (a node), `fill-in`
  (a cell), `rise`, `grow-x`, `fade-in`, `slide-up`, `lattice-line`, `lattice-fill`, `cut` (the m10 cycle: eight
  stacked children, `--f` 0 to 7), `loader-bar`, `loader-node`, `tick-cursor`, `skeleton`; placeholder `ph`. Set
  order with `style={{ '--i': n }}`.

## Components

`@/components/site`
- `Icon` : `<Icon name="pylon" size={24} />`; add `label="..."` when it carries meaning. `IconUse` places a
  sprite icon inside a larger live SVG. `PixelIcon` / `PixelIconUse` draw the case study's four 32-grid icons
  (`solar`, `wind`, `battery`, `datacenter`).
- `icons.js` : `CORE` (the 32 icons: grid, node, line, pylon, substation, wind, solar, sun, battery, datacenter,
  bolt, plug, permit, study, document, folder, pin, map, calendar, mail, phone, user, search, chart, crosshair,
  arrow-right, arrow-up-right, download, plus, check, close, menu), `UTIL` (chevrons, arrows, minus, copy, play,
  pause, sort, filter, alert, clock, layers, external, index), `PIXEL32` (the four of m15 on their 32 grid),
  `PIXEL32_LABELS`, `ICONS`, `CORE_NAMES`, `turbinePath(cx, cy, k)`. One filled path each: one-unit bars, square
  ends, stepped corners, open crossings (the manner of m14 / m15). In exportable art draw the path itself
  (`<path d={CORE.pylon} />` or `IconArtG`).
- `Reveal` : `<Reveal delay={120} from="left">…</Reveal>` (`from`: `left` | `right` | `scale` | `none`; `as`).
- `CountUp` (`<CountUp value="15.420 MW" lang="es" />`, Spanish format by default), `Typewriter`, `CopyValue`
  (`<CopyValue value="#5983ff" label="Active Blue hex" />`), and `toast('…')` from `@/components/site/Toast`.

`@/components/ui`
- `Button` : `<Button href="/lp-field/" lang="es">Evaluar proyecto</Button>`; variants fill (default), outline,
  dark, active, ghost; `size="sm|lg"`, `block`, `icon`, `iconRight`, `cross={false}`. Icon-only needs `label`.
- `Chip` : `<Chip>2023</Chip>`, `<Chip tone="active">2025</Chip>`, `<Chip pressed={on} onClick={fn}>`.
- `Card` (variant paper | dark | active | cell | line, `title`, `icon`, `level`), `Rows`
  (`<Rows rows={LINES.web.rows} as="h2" lang="es" />`), `TwoTone`
  (`<TwoTone rows={LINES.box.rows} tone={LINES.box.tone} lang="es" />`), `Placeholder` (`<Placeholder width={8} />`).
- `Spec.jsx` : `Numeral` (`<Numeral value="15.420" unit="MW" size="xl" />`, `sup="%"`), `SpecTable`
  (`caption columns rows={[{ key, head, num, cells }]} tone compact right numFirst`), `Cells`
  (`<Cells cols={4} open quiet line>…</Cells>`).
- `SplitRow` : `<SplitRow art={<Art …/>} flip ratio={[5, 7]} ruled tone="dark">…</SplitRow>`.
- `Tabs` : `<Tabs id="<id>-x" label="…" tabs={[{ id, label, content }]} tone="pill" />` (client component).
- `Toggle` (default) and `Segmented` : `<Toggle label="Guides" checked={v} onChange={setV} />`;
  `<Segmented id="<id>-year" label="Year" options={CAPACITY.years} value={y} onChange={setY} />` (year chips).
- `Field` : `<Field id="<id>-email" label="Email" type="email" />`.
- `LandingNav` : `<LandingNav current="lp-field" tone="light|dark" />` (m16: Servicios -> lp-field, Clientes ->
  lp-data-centers, Nosotros -> lp-annual-report, Únete -> lp-storage). `LandingFooter` : `<LandingFooter />`.
- `Devices` (named exports `Phone`, `Tablet`, `Laptop`, `Monitor`, `Window`, `Watch`): live HTML screens in neutral
  SVG frames. `<Phone screen="<id>-home" exportName="<id>-phone-frame">…</Phone>`;
  `<Window tab={BRAND_TAB} address={CONTACT.webTab}>`. Screen sizes: phone 390 x 844, tablet 1180 x 820, laptop
  1440 x 900, monitor 1600 x 1000, window 1600 wide, watch 184 x 224.

`@/components/art` (all return SVG groups; wrap in `Art`)
- `Art` : `<Art viewBox="0 0 800 600" title="Primary lockup" exportName="<id>-primary">…</Art>`; `decorative`.
- `Mark.jsx` : `MarkG` (`x y size fill className pathClass`), `MARK` (the construction: B 5.23, P 12.85, slope
  0.45, chamfer 3.2, waist 20.9, diag 3.71, radii), `MARK_D` (the path, evenodd), `markPath(m)`, `markOutline()`,
  `markHolesTL()`, `markConstruction()` (centre lines for construction drawings), `roundedPolygon`,
  `MarkEmbossG` (blind emboss, `idp`), `WordmarkG` (`x y size fill anchor`; baseline at y; cap = 0.73 x size),
  `WordmarkFitG` (`w`), `WordmarkVerticalG` (the tube bodies), `WORDMARK`, lockups `LockupCornersG` (card back:
  word top right, mark bottom left; `w h`), `LockupCellG` (the nav cell lockup, box 640 x 160), `LockupRowG`
  (520 x 100), `LockupStackG` (400 x 300), `LockupFooterG` (the m11 three-cell footer), `AppIconG`, `MarkCropG`.
- `KeyArt.jsx` : `NodeG`, `GuidesG` (`w h xs ys nodes stroke weight node animate`), `LiveAreaG` (the poster frame),
  `BaselineFieldG` (m10; `idp w h cols gutter step`), `CrossingBandsG` (m05 folder; `idp w h cx cy a1 a2 band r`)
  and `crossingPath()`, `LatticeDefs` (pattern `url(#<idp>-lattice)`), `LatticeFieldG` (`cx cy k rings`),
  `StarOutlineG`, `StarEchoG`, `MARK_OUTLINE_D`, `MarkTileG`, `NodeGridG` / `nodeCells()` (m17 node grid; no
  data), `BrandDefs` (`idp`; `url(#<idp>-grain|-board)` filters, `url(#<idp>-fog|-sunset|-bubble)` fills),
  `FogFieldG`, `TrailsG`, `PhotoBlockG`, `IconArtG` (`name px x y size`), `TurbineConstructionG` (m14).
- `Mockup.jsx` : `StageG` (`idp w h spot={{x,y}} r floor intensity`; put it first), `STAGE`, `lightDir`,
  `castDir`, `ShadowG` (`idp cx cy rx dir`), `CastG` (`idp d dir depth`), `MaterialDefs` (`idp`; fills
  `board`, `board-dark`, `paper`, `card`, `metal`, `metal-dark`, `glass`, `ceramic`, `rubber`, `plastic`,
  `fabric-blue`, `fabric-dark`, `shade`, `shade-r`, `shade-v`; filters `weave`, `fibre`, `grit`, `soft`),
  `SheenG`, `LitG` (the hero object turning to the light), plate parts `CalloutG`
  (`x y tx ty label sub side i`), `DimensionG` (`x1 y1 x2 y2 value offset i`), `SpecColumnG`
  (`x y w title rows`), `PlateFrameG` (`w h split no label`), `PLATE`, `lineup()`.
- `Devices.jsx` : SVG frames `PhoneG`, `TabletG`, `LaptopG`, `MonitorG`, `WindowG` (`tab address`), `WatchG`
  (`band`), each `idp x y w`, children drawn in the screen's own space (`SCREEN`); `StatusBarG`; ready screens
  `ScreenCapacityG` (`idp year marker`; m17 front, 2023 / 2024 empty), `ScreenNodesG` (m17 back), `ScreenWebG`
  (`idp active`; m16), `ScreenWatchG`.

`@/lib`
- `pages.js` : `pageMeta(id)`, `pages`, `groups`, `pageById`, `pageIndex`, `previous`, `next`, `href(id)`,
  `idFromPath`, `landings`.
- `motion.js` : `ease` (`out`, `move`, `line`, `linear`), `dur` (`snap`, `xs`, `s`, `m`, `l`, `draw`, seconds),
  `stagger`, `frame`, transitions `tEnter`, `tPage`, `tMove`, `tNode`, `tFill`, `tDraw`, `tChart`, variants
  `listV`, `itemV`, `fadeV`, `lineV`, `nodeV`.
- `charts.js` : `scale`, `r2`, `linePath`, `stepPath`, `areaPath`, `jagged` (the m17 wiggle between published
  anchors; drawing, not data), `bands` (the soft vertical stripes), `polar`, `arcPath`, `bandPath`, `treemap`,
  `cellGrid`, `ticks`, `es` / `mw` (Spanish number format), `shares`, `segments`, `seeded`.
- `site.js` : `copy()`, `fmt()` (Spanish by default), `uid()`, `clamp`, `lerp`, `range`, `hexToRgb`, `contrast`,
  `still()`, `scrollToId()`.
- `brand.js` : everything the case study prints, as constants: `BRAND`, `BRAND_FULL`, `BRAND_SHORT`, `BRAND_TAB`,
  `DESIGNER`, `DESIGNER_HANDLE`, `PROJECT_TITLE`, `DESCRIPTION`, `PALETTE`, `HEX`, `LINES` (hero, envelope, box,
  card, mailer, web, posterRight / Body / Tag, posterLeft / Body / Tag, field, fieldWords, fieldBody, clarity,
  clarityBody, billboard, connect, viable, tube, report; `rows` as printed, `tone` for two-tone lines), `CONTACT`,
  `PEOPLE`, `NAV`, `NAV_CTA`, `BUTTONS`, `WEB_HERO`, `TECH`, `CAPACITY`, `REPORT`, `TUBE`, `BADGE`, `POSTERS`,
  `SPECS`, `DEVICES`, `FIGURES`, `NOT_PUBLISHED`, `NEUTRAL`. Import from here instead of retyping text.

## Brand facts

- BRAND Best Grid (also printed Best Grid Solutions, BGS, bestgrid.com, bestgridsolutions.com, @bestgrid);
  DESIGNER Pablo Aeme. Project: "Best Grid | Structuring Complexity", published April 15th 2026.
- HERO_FEATURE: capacity at critical grid nodes (m17 with the m16 tiles); page `feature` is the node explorer.
- PRODUCT_OBJECT: the project tube with its rolled connection-study drawing and label (m07); the card of page 30
  is the staff access card of m08 in three colourways.
- Typeface: one commercial grotesk ("the brand typeface" on pages), shown in Regular; the word-mark in a heavier
  cut. Stand-ins: **Inter** (text, with its optical-size axis) and **Inter Tight** (display and the word-mark).
- Mark: a lattice star (see `MARK`). Secondary graphic: the crossing bands (m05). Icons: pixel bars on a 32 grid.

## Mockups: this project's direction

- **Staging: catalogue plate.** The object on one side, the spec callouts (`CalloutG`) with leader lines,
  dimensions (`DimensionG`) and a spec column (`SpecColumnG`) on the other, on the plate furniture
  (`PlateFrameG`). Which side, the split, the camera and the number of callouts are given in `LAYOUTS.md` and
  differ every time. Callout labels are English deliverable words, brand words from `brand.js` (with `lang`), or
  our own production values in plain mm.
- **Backdrop: a dark stage with one soft spotlight** (`StageG`, inside a `mock` frame).
- **One light, from the spotlight.** Highlights face the spot, shade away from it (`MaterialDefs` shades); every
  object sits on a soft contact shadow (`ShadowG`); flat objects also cast (`CastG` with `castDir`).
- Believable proportions and materials (board with thickness, paper grain, fabric weave, metal, glass); artwork
  follows the surface (clip it to the object, skew it with the face it sits on); nothing looks like a flat sticker.
- Text on mockups is only the logo, "Best Grid", and lines and details that appear in the case study (`LINES`,
  `CONTACT`, `PEOPLE`, `TUBE`, `REPORT`, `BADGE`, `POSTERS`).
- Signature motion: the spot comes up (`mock-spot`), the object turns to the light (`LitG`), then leader lines draw,
  nodes snap and labels fill in, one after another (`--i`).

## Reference images

`reference/mNN_1.png` / `mNN_2.png` are readable copies of the 23 case-study images; `m10_1` to `m10_5` are frames
of the animation; `crop_*.png` are enlarged crops; `logo_zoom.png` is the mark. Open **only** the ones listed in
your task. They are for reading and measuring; they are never used in the site.

- m01 hero photo (fog, turbine) with the hero line between two guides; m02 annual reports; m03 type slide;
  m04 colour slide; m05 stationery flat lay; m06 business cards; m07 project tubes; m08 badge and lanyard;
  m09 posters (data centre, generation); m10 the poster grid animation; m11 posters (field, clarity); m12 blue box;
  m13 laptop with the website; m14 icon construction (turbine, 32 x 32); m15 the four icons; m16 the website;
  m17 phone dashboard and node grid; m18 photograph (not reproduced); m19 billboard; m20 vehicle; m21 the mark;
  m22 event screen; m23 the designer's sign-off (credit only). Full copy per image in `SOURCE.md`.

## Page ids

overview, logo, color, gradients, typography, icons, dataviz, motion, strategy, web-system, lp-home, lp-solar,
lp-wind, lp-storage, lp-data-centers, lp-field, lp-annual-report, dashboard, mobile-a, mobile-b, feature, showcase,
campaign, use-apparel, use-accessories, use-stationery, use-packaging, use-event, use-world, use-product.

## Hand-back (under 150 words)

Files written; a count of each deliverable against its minimum and the number of `data-export` SVGs against
`minExports`; the line count of the page; which parts are faithful rebuilds; which are extensions; every word or
value that is your own (including mm dimensions); what you looked at on screen and what you did not check.
