// Strategy data. The story follows the case study in its own order and words: the problem it states, the figures it
// prints, the solution it describes and the results its dashboard shows. Brand lines are never retyped: they come
// from @/lib/brand. The English labels (station names, captions saying where a line is printed) are ours.
import { CAPACITY, TECH, TUBE } from '@/lib/brand';

export const STATIONS = [
  { id: 'strategy-problem', no: '01', title: 'Problem', note: 'What the case study says stands in the way.' },
  { id: 'strategy-research', no: '02', title: 'Research figures', note: 'Every figure is printed in the case study, beside what it measures.' },
  { id: 'strategy-solution', no: '03', title: 'Solution', note: 'A visual system built on the logic of the grid.' },
  { id: 'strategy-impact', no: '04', title: 'Impact', note: 'What the phone dashboard of the case study shows.' },
];

// The designer's description, split into the sentences the page quotes (English, as published).
export const DESIGNER_WORDS = {
  premise: 'technical complexity is not the problem—lack of structure is',
  solution: 'From this premise, a visual system is developed based on the logic of the grid, designed to organize complex information and make it legible.',
};

// The brand idea, in our words, drawn only from the case study (SOURCE.md, "Brand idea").
export const BRAND_IDEA =
  'Best Grid makes grid access legible: it lays every tangled technical and regulatory question onto a visible structure of lines, cells and nodes so that a project can be seen, decided and moved forward. Its mark is a lattice star, a grid gathered into one node reaching in four directions, and the whole identity speaks in calm Spanish engineering sentences in two blues.';

// Figures re-used from the shared constants (never retyped).
export const QUARTERS = CAPACITY.quarters;
export const TILES = TECH;
export const KPIS = CAPACITY.kpis;
export const SERVICES = TUBE.services;
