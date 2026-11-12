// Brand facts read from the case study. Every name, line and figure on the site comes from here or from SOURCE.md.
// Brand copy is Spanish (Spain), exactly as the designer wrote it, with its accents: put lang="es" on the element
// that shows it. Line breaks are kept as printed (`rows`). Never translate a line and never write new Spanish.
// Image numbers (m01 ... m23) refer to the reference images listed in SOURCE.md.
//
// Other companies' names never appear on a page (see NEUTRAL below): the client on the tube label, the typeface's
// product name, the colour-matching system codes, and every platform, tool, device-maker or car-maker name.

export const BRAND = 'Best Grid';
export const BRAND_FULL = 'Best Grid Solutions';     // m02 report cover
export const BRAND_SHORT = 'BGS';                    // m02 spine
export const BRAND_TAB = 'Best grid solutions';      // m16 browser tab, as printed
export const DESIGNER = 'Pablo Aeme';
export const DESIGNER_HANDLE = '@pabloaeme';         // project footer
export const PROJECT_TITLE = 'Best Grid | Structuring Complexity';
// The designer's own description of the project (English on the project page).
export const DESCRIPTION =
  'Best Grid is a consultancy specialized in grid access and connection for energy projects. The project is built around a clear idea: technical complexity is not the problem—lack of structure is. From this premise, a visual system is developed based on the logic of the grid, designed to organize complex information and make it legible.';

// ---------------------------------------------------------------------------------------------------------------
// Colour (m04 "Color system"). Names and hex exactly as published (hex in lower case, as printed).
// rgb: the values to use; rgbPrinted / cmyk: as printed (Light Blue's printed RGB repeats Active Blue's: a
// misprint; its real RGB comes from its hex). The PMS row is left out (another company's system).
export const PALETTE = [
  { name: 'Dark Blue', token: 'dark-blue', hex: '#1b2043', rgb: [27, 32, 67], rgbPrinted: '27 | 32 | 67', cmyk: '55  | 68 | 0 | 72' },
  { name: 'Active Blue', token: 'active-blue', hex: '#5983ff', rgb: [89, 131, 255], rgbPrinted: '89 | 131 | 255', cmyk: '58 | 38 | 0 | 15' },
  { name: 'Light Blue', token: 'light-blue', hex: '#e4e7ef', rgb: [228, 231, 239], rgbPrinted: '89 | 131 | 255', cmyk: '7 | 3 | 0 | 7' },
];

// Hex values for SVG attributes. "sampled" = read from the images, not published (SOURCE.md, Palette).
export const HEX = {
  darkBlue: '#1b2043',
  activeBlue: '#5983ff',
  lightBlue: '#e4e7ef',
  white: '#ffffff',
  black: '#000000',
  periwinkle: '#cad8ff',     // sampled: ground of every slide
  periwinkleMock: '#c5d9ff', // sampled: ground of the mockups
  paper: '#f6f9ff',          // sampled: letterhead, cards, poster sheets
  cardGrey: '#eef2f7',       // sampled: business card, badge card
  statCell: '#cddaff',       // sampled: the highlighted stats cell (m16)
  btnFill: '#eef2ff',        // sampled: primary button fill (m16)
  onBlue: '#e6e8ee',         // sampled: light grey-white type on blue grounds
  warmGrey: '#a49c93',       // sampled: warm grey ink on the box (m12)
  labelGrey: '#c7ccd6',      // sampled: the grey tube label (m07)
  fog: '#d9b8a6',            // sampled photo tone (m01), for gradients standing in for photos
  plum: '#4a2e2e',           // sampled photo tone (m01)
  sunset: '#e0763a',         // sampled photo tone (m16, m19)
  trail: '#5fd8ff',          // sampled photo tone: light trails (m16, m19)
  // accessible inks (rule 9), defined in globals.css
  blueInk: '#3352c2',        // Active Blue deepened for small text on light grounds (4.7:1 or more)
  muted: '#4b5174',          // small secondary text on light grounds
  mutedOnDark: '#a9b2d6',    // small secondary text on Dark Blue
  rule: '#1b2043',           // hairlines on light grounds (Dark Blue)
};

// ---------------------------------------------------------------------------------------------------------------
// Lines (verbatim). `rows` keep the printed line breaks; `tone` marks the two-tone habit (first part light,
// rest Dark Blue on Active Blue grounds).
export const LINES = {
  // m01 hero photo
  hero: { text: 'Convertimos complejidad en avance. Dando estructura a lo que hoy bloquea los proyectos.', rows: ['Convertimos complejidad en avance.', 'Dando estructura a lo que hoy bloquea los proyectos.'] },
  // m05 envelope (no final full stop, as printed)
  envelope: { text: 'Convertimos complejidad en avance. Dando estructura a lo que hoy bloquea los proyectos', rows: ['Convertimos complejidad en avance.', 'Dando estructura a lo que hoy', 'bloquea los proyectos'], tone: 'Convertimos complejidad en avance.' },
  // m12 box and m19 billboard (two-tone: the first row light, the rest Dark Blue)
  box: { text: 'Convertimos complejidad en avance. Dando estructura a lo que hoy bloquea los proyectos', rows: ['Convertimos complejidad', 'en avance. Dando estructura', 'a lo que hoy bloquea los proyectos'], tone: 'Convertimos complejidad' },
  // m05 card back, m06 (no full stop)
  card: 'Convertimos la complejidad en avance',
  // m05 mailer card (no full stop)
  mailer: 'Convertimos complejidad en avance',
  // m16 website hero
  web: { text: 'Convertimos la complejidad técnica en avance.', rows: ['Convertimos la', 'complejidad técnica', 'en avance.'] },
  // m09 right poster, m10
  posterRight: { text: 'Convertimos la complejidad técnica en proyectos que avanzan.', rows: ['Convertimos la', 'complejidad técnica', 'en proyectos que avanzan.'] },
  posterRightBody: { text: 'Intervenimos en la conexión a red de proyectos energéticos, estructurando decisiones en puntos donde la viabilidad no es evidente.', rows: ['Intervenimos en la conexión a red de proyectos', 'energéticos, estructurando decisiones en puntos', 'donde la viabilidad no es evidente.'] },
  posterRightTag: { text: 'Acceso y conexión a red en generación eólica y solar', rows: ['Acceso y conexión a red', 'en generación eólica y solar'] },
  // m09 left poster, m10
  posterLeft: { text: 'Donde el sistema es más exigente, aportamos claridad.', rows: ['Donde el sistema', 'es más exigente,', 'aportamos claridad.'] },
  posterLeftBody: { text: 'Estructuramos la conexión a red de centros de datos en entornos de máxima complejidad.', rows: ['Estructuramos la conexión a red', 'de centros de datos en entornos', 'de máxima complejidad.'] },
  posterLeftTag: 'Acceso y conexión a red en infraestructuras digitales',
  // m11 left poster, m10
  field: 'Análisis · Criterio · Validación',
  fieldWords: ['Análisis', 'Criterio', 'Validación'],
  fieldBody: { text: 'Intervenimos en campo para evaluar, validar y estructurar la conexión a red en proyectos eólicos, aportando criterio técnico en cada fase del desarrollo.', rows: ['Intervenimos en campo para evaluar, validar y estructurar', 'la conexión a red en proyectos eólicos, aportando criterio', 'técnico en cada fase del desarrollo.'] },
  // m11 right poster, m10
  clarity: { text: 'Los proyectos avanzan cuando la estructura es clara.', rows: ['Los proyectos', 'avanzan cuando la', 'estructura es clara.'] },
  clarityBody: { text: 'Aportamos claridad en la conexión a red, estructurando decisiones en puntos donde el sistema deja de ser evidente.', rows: ['Aportamos claridad en la conexión a red,', 'estructurando decisiones en puntos donde', 'el sistema deja de ser evidente.'] },
  // m19 billboard (two-tone: first row light, second Dark Blue)
  billboard: { text: 'Acceso y conexión a red eléctrica en contextos de alta complejidad', rows: ['Acceso y conexión a red eléctrica', 'en contextos de alta complejidad'], tone: 'Acceso y conexión a red eléctrica' },
  // m22 event screen (two-tone pairs)
  connect: { rows: ['No se trata de producir más.', 'Se trata de poder conectar.'], tone: 'No se trata de producir más.' },
  viable: { rows: ['Generar energía ya no es el reto.', 'Hacer viable su conexión a red sí lo es.'], tone: 'Generar energía ya no es el reto.' },
  // m07 tube label
  tube: { text: 'Trabajamos en los puntos donde la red define la viabilidad del proyecto.', rows: ['Trabajamos en los puntos donde la red', 'define la viabilidad del proyecto.'] },
  // m02 report cover
  report: { text: 'Detrás de cada acción hay tiempo, compromiso y personas.', rows: ['Detrás de cada acción hay tiempo,', 'compromiso y personas.'] },
};

// ---------------------------------------------------------------------------------------------------------------
// Contact (m05, m06, m10, m11, m16, m19, m22). The e-mail is printed "info@" on the letterhead and misprinted
// "nfo@" (envelope) and "ingo@" (posters): always use the correct form.
export const CONTACT = {
  phone: '[+34] 665 079 645',
  email: 'info@bestgrid.com',
  web: 'bestgrid.com',
  webAlt: 'bestgridsolutions.com',  // m08 badge
  webTab: 'Bestgridsolutions.com',  // m16 address bar, as printed
  handle: '@bestgrid',              // m19, m22
  address: ['Valle de Esteríbar, Nº2 local 61.', '28692 Villanueva de la Cañada', '[Madrid] España'],
  addressEnvelope: ['Valle de Esteríbar, Nº2 local 61.', '28692. Villanueva de la Cañada', '[Madrid] España'], // m05 envelope and mailer, as printed
  contactLabel: 'Contactanos',      // m05 envelope, no accent as printed
};

// People printed on the case study's own pieces. They appear only as printed text on the rebuilt card and badge;
// never as portraits, never in new roles or quotes.
export const PEOPLE = {
  lorena: {
    name: 'Lorena Sánchez González',
    nameRows: ['Lorena Sánchez', 'González'],
    role: 'Gestora de acceso y conexión',
    roleRows: ['Gestora de acceso', 'y conexión'],
    email: 'lorenasanchez@bestgrid.com',
  },
  elena: {
    name: 'Elena Torres',
    role: 'Ingeniera de sistemas eléctricos',
    roleRows: ['Ingeniera de', 'sistemas eléctricos'],
    dept: 'Dpto. Ingeniería',
    id: 'ID : BG356945',
    numeral: '25',
  },
};

// ---------------------------------------------------------------------------------------------------------------
// The website (m16, m13).
export const NAV = ['Servicios', 'Clientes', 'Nosotros'];
export const NAV_CTA = 'Únete';
export const BUTTONS = { evaluate: 'Evaluar proyecto', services: 'Ver servicios' };
export const WEB_HERO = {
  rows: LINES.web.rows,
  body: 'Acompañamos proyectos de energía, almacenamiento, autoconsumo, data centers y nuevas demandas eléctricas en los puntos donde acceso, conexión y viabilidad se vuelven decisivos. Identificamos nudos críticos, ordenamos condicionantes técnicos y regulatorios y coordinamos la interlocución necesaria para que los proyectos puedan avanzar.',
};

// The four technology tiles (m16): label, icon, managed capacity in MW. The Data Centers tile is the highlighted one.
export const TECH = [
  { key: 'solar', label: 'Fotovoltaico', mw: 12157, value: '12.157 MW', icon: 'solar' },
  { key: 'wind', label: 'Eólico', mw: 2794, value: '2.794 MW', icon: 'wind' },
  { key: 'storage', label: 'Almacenamiento', mw: 3433, value: '3.433 MW', icon: 'battery' },
  { key: 'dc', label: 'Data Centers', mw: 2083, value: '2.083 MW', icon: 'datacenter', highlight: true },
];

// ---------------------------------------------------------------------------------------------------------------
// The phone dashboard (m17). Only 2025 has figures; 2023 and 2024 are chips with no published values.
export const CAPACITY = {
  title: 'Capacidad gestionada en puntos críticos de la red',
  titleRows: ['Capacidad gestionada', 'en puntos críticos de la red'],
  quarters: [
    { q: 'Q1', mw: 3200, value: '3.200 MW' },
    { q: 'Q2', mw: 4100, value: '4.100 MW' },
    { q: 'Q3', mw: 5200, value: '5.200 MW', peak: true },
    { q: 'Q4', mw: 2920, value: '2.920 MW' },
  ],
  axis: ['7.000 MW', '6.000 MW', '5.000 MW', '4.000 MW', '3.000 MW', '2.000 MW', '1.000 MW'],
  axisMax: 7000,
  totalLabel: 'Total anual',
  total: 15420,           // = the four quarters
  totalValue: '15.420 MW',
  years: ['2023', '2024', '2025'],
  year: '2025',           // the active chip; the only year with figures
  kpis: [
    { label: 'Proyectos gestionados', value: 128 },
    { label: 'Nudos analizados', value: 46 },
    { label: 'Accesos concedidos', value: 72 },
  ],
  treemap: {
    year: '2025',
    title: 'Capacidad gestionada',
    parts: [
      { key: 'dev', labelRows: ['Desarrollo', 'durante el año'], pct: 68 },
      { key: 'cons', labelRows: ['Capacidad', 'consolidada'], pct: 16 },
      { key: 'rest', labelRows: [], pct: 16, unlabelled: true }, // the Dark Blue remainder: no label, no figure printed
    ],
  },
  nodesTitle: 'Distribución de actividad en nudos de red',
  nodesTitleRows: ['Distribución de actividad', 'en nudos de red'],
  status: '9:41',
};

// ---------------------------------------------------------------------------------------------------------------
// Print pieces.
// m02 annual report
export const REPORT = {
  titleRows: ['Informe', 'de actividad', 'anual'], // the cover cuts "activida[d]": completed
  lineRows: LINES.report.rows,
  signature: BRAND_FULL,
  years: ['2024', '2025'], // "202[5]" completed from the spine
  spine: 'IDAA',
  range: '[24 – 25]',
  short: BRAND_SHORT,
};
// m07 project tube label. The label's client company name is replaced by a neutral placeholder.
export const TUBE = {
  project: 'Proyecto Nº 35',
  client: 'Client name', // placeholder: the printed client is another company
  services: ['Acceso a red · Conexión', 'Estudios de evacuación', 'Gestión de nudos'],
  lineRows: LINES.tube.rows,
  date: '02.05.2025',
  web: 'bestgrid.com',
};
// m08 badge
export const BADGE = { ...PEOPLE.elena, web: CONTACT.webAlt };

// Posters (m09, m10, m11) as printed, for campaign pages.
export const POSTERS = {
  dataCentre: { head: LINES.posterLeft.rows, body: LINES.posterLeftBody.rows, tag: LINES.posterLeftTag, web: CONTACT.web },
  generation: { head: LINES.posterRight.rows, body: LINES.posterRightBody.rows, tag: LINES.posterRightTag.rows, web: CONTACT.web },
  field: { head: LINES.field, body: LINES.fieldBody.rows, email: CONTACT.email, web: CONTACT.web },
  clarity: { head: LINES.clarity.rows, body: LINES.clarityBody.rows, web: CONTACT.web },
};

// Specification slides (English labels as printed). The typeface's product name is not shown on pages.
export const SPECS = {
  type: { title: 'Typographic system', name: 'The brand typeface', set: 'Character set', weight: 'Regular', optical: 'Optical size: 600 pt', specimen: 'AaBb', glyphs: '[€0.9]' },
  color: { title: 'Color system', rows: ['RGB', 'CMYK', 'HEX'] },
  icon: { grid: '32 x 32' },
};

// Square brackets and middle dots are the designer's typographic devices.
export const DEVICES = { brackets: ['[+34]', '[Madrid]', '[24 – 25]', '[€0.9]'], dot: ' · ' };

// ---------------------------------------------------------------------------------------------------------------
// Every real figure in the case study, in one place (where it is printed).
export const FIGURES = {
  tech: TECH.map(({ label, value }) => ({ label, value })),                 // m16 stats row
  quarters: CAPACITY.quarters.map(({ q, value }) => ({ q, value })),        // m17 area chart
  total: CAPACITY.totalValue,                                               // m17 "Total anual"
  axis: CAPACITY.axis,                                                      // m17 y labels
  kpis: CAPACITY.kpis,                                                      // m17 KPI cells
  treemap: [{ label: 'Desarrollo durante el año', value: '68%' }, { label: 'Capacidad consolidada', value: '16%' }], // m17
  years: CAPACITY.years,                                                    // m17 chips (only 2025 has figures)
  status: CAPACITY.status,                                                  // m17 status bar
  project: TUBE.project, date: TUBE.date,                                   // m07 tube label
  report: { years: REPORT.years, range: REPORT.range, spine: REPORT.spine }, // m02
  badge: { id: PEOPLE.elena.id, numeral: PEOPLE.elena.numeral },            // m08
  phone: CONTACT.phone,                                                     // m05, m06
  specs: { iconGrid: '32 x 32', optical: 'Optical size: 600 pt', glyphs: '[€0.9]' }, // m14, m03
};

// What the case study does NOT contain: never invent these (BRIEF.md, rule 3).
export const NOT_PUBLISHED = [
  'prices, plans or fees', 'statistics beyond FIGURES', 'testimonials or quotes', 'client names', 'team lists or other job titles',
  'opening hours', 'a map', 'services pages', 'a website footer', 'tables', 'form fields', 'a desktop dashboard',
  'figures for 2023 or 2024', 'per-node values', 'clear-space, minimum-size or misuse rules', 'a horizontal lockup',
  'gradients', 'a secondary typeface', 'any English brand line', 'dates other than 02.05.2025 and the report years',
];

// Neutral placeholders for other companies' names (STANDING-ORDERS point 4; SOURCE.md "Other companies' names").
export const NEUTRAL = {
  client: 'Client name',          // replaces the client printed on the tube label (m07)
  typeface: 'The brand typeface', // the typeface's product name stays only in the CSS font stack
  // Colour-system codes are omitted. Browser, laptop, phone and vehicle frames are drawn without makers' features.
};
