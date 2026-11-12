// Overview data: the principles (the case study's own lines, quoted) and the index of every mockup and product.
// Brand lines come from @/lib/brand and are never retyped here. The English words are plain deliverable names.
import { LINES } from '@/lib/brand';

// Four principles. Each is a line the designer printed, with the piece it is printed on (plain English).
export const PRINCIPLES = [
  { n: '01', rows: LINES.hero.rows.slice(0, 1), source: 'Printed on the hero photograph' },
  { n: '02', rows: LINES.clarity.rows, source: 'Printed on the Active Blue poster' },
  { n: '03', rows: LINES.posterLeft.rows, source: 'Printed on the data-centre poster' },
  { n: '04', rows: LINES.connect.rows, tone: true, source: 'Printed on the event screen' },
];

// Every mockup and product of the site, in the order of the chapters that show them.
// page: the chapter id it lives on (a link to /<page>/). Names are plain English deliverable names.
export const MOCKUPS = [
  { page: 'showcase', name: 'Phone with data cards' },
  { page: 'showcase', name: 'Line-up of 8 phones' },
  { page: 'showcase', name: 'Laptop on a plinth' },
  { page: 'showcase', name: 'Event stage' },
  { page: 'campaign', name: 'Posters in frames' },
  { page: 'use-apparel', name: 'Collection' },
  { page: 'use-apparel', name: 'T-shirts' },
  { page: 'use-apparel', name: 'Hoodies' },
  { page: 'use-apparel', name: 'Caps' },
  { page: 'use-apparel', name: 'Print-spec sheet' },
  { page: 'use-accessories', name: 'Tote bags' },
  { page: 'use-accessories', name: 'Mugs' },
  { page: 'use-accessories', name: 'Bottles' },
  { page: 'use-accessories', name: 'Sticker sheet and pin card' },
  { page: 'use-accessories', name: 'Patches and keychain' },
  { page: 'use-accessories', name: 'Cup, sleeve, coasters' },
  { page: 'use-accessories', name: 'Desk mat and mouse pad' },
  { page: 'use-accessories', name: 'Umbrella and socks' },
  { page: 'use-accessories', name: 'Gift card and carrier' },
  { page: 'use-stationery', name: 'Flat lay' },
  { page: 'use-stationery', name: 'Letterhead and envelope' },
  { page: 'use-stationery', name: 'Business cards' },
  { page: 'use-stationery', name: 'Pen and notebooks' },
  { page: 'use-stationery', name: 'Tri-fold brochure' },
  { page: 'use-stationery', name: 'Report cover with spine' },
  { page: 'use-stationery', name: 'Slide deck' },
  { page: 'use-packaging', name: 'Tape' },
  { page: 'use-packaging', name: 'Shipping boxes' },
  { page: 'use-packaging', name: 'Product boxes' },
  { page: 'use-packaging', name: 'Shopping bags' },
  { page: 'use-packaging', name: 'Tissue, seal, label' },
  { page: 'use-event', name: 'Lanyard with badge' },
  { page: 'use-event', name: 'Staff IDs in a holder' },
  { page: 'use-event', name: 'Wristbands' },
  { page: 'use-event', name: 'Tickets and VIP pass' },
  { page: 'use-event', name: 'Exhibition booth' },
  { page: 'use-event', name: 'Flags and hanging banner' },
  { page: 'use-world', name: 'Billboard' },
  { page: 'use-world', name: 'Citylight and roll-ups' },
  { page: 'use-world', name: 'Reception signage' },
  { page: 'use-world', name: 'Vehicle wrap' },
  { page: 'use-world', name: 'Room plaque' },
  { page: 'use-product', name: 'Project tube' },
  { page: 'use-product', name: 'Tube, drawing and label' },
  { page: 'use-product', name: 'Access card colourways' },
  { page: 'use-product', name: 'Tablet, phone and watch' },
  { page: 'use-product', name: 'App icon sizes' },
];

// Plate numbers: P01, P02, ...
export const plate = (i) => `P${String(i + 1).padStart(2, '0')}`;
