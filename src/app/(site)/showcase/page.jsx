import { pageMeta } from '@/lib/pages';
import Reveal from '@/components/site/Reveal';
import { SpecTable } from '@/components/ui/Spec';
import ScenePhone from '@/components/pages/showcase/ScenePhone';
import SceneLineup from '@/components/pages/showcase/SceneLineup';
import SceneLaptop from '@/components/pages/showcase/SceneLaptop';
import SceneStage from '@/components/pages/showcase/SceneStage';
import PlateKey from '@/components/pages/showcase/PlateKey';
import s from '@/components/pages/showcase/showcase.module.css';

export const metadata = pageMeta('showcase');

const PLATES = [
  {
    no: '01',
    title: 'Phone with data cards',
    Scene: ScenePhone,
    caption: 'Plate 01. The phone stands on the left 60%; the printed total, KPI cells and treemap float out on leader lines.',
    notes: [
      ['Light', 'One spot, top left. Highlights face it on the frame and glass; the shadow falls to the lower right.'],
      ['Materials', 'Dark anodised frame with a lit left edge, glass over the screen, paper cards that cast their own shadow.'],
      ['Brand content', 'Only what the phone of the case study prints: Total anual, the three KPI cells, the 2025 treemap.'],
    ],
  },
  {
    no: '02',
    title: 'Line-up of eight phones',
    Scene: SceneLineup,
    caption: 'Plate 02. Eight screens on one shelf, one callout per screen in a ruled row below.',
    notes: [
      ['Light', 'One spot, top centre. Phones left of it are shaded on the left, phones right of it on the right.'],
      ['Screens', 'Capacity 2025, the node grid, the empty year 2024, the four technology tiles and the mark with the web address.'],
      ['Order', 'The callout row repeats the grid of the brand: cells between hairlines, a node at every crossing.'],
    ],
  },
  {
    no: '03',
    title: 'Laptop on a plinth',
    Scene: SceneLaptop,
    caption: 'Plate 03. The laptop, turned 30 degrees, shows the website; callouts on the left, dimensions down the plinth.',
    notes: [
      ['Light', 'One spot, top right. The plinth top is lit, its right face brighter than its front, its cast shadow runs left.'],
      ['Materials', 'Active Blue aluminium body, Dark Blue anodised plinth, glass sheen across the display.'],
      ['Brand content', 'The website of the case study: navigation cells, headline, buttons and the four technology tiles.'],
    ],
  },
  {
    no: '04',
    title: 'Event stage',
    Scene: SceneStage,
    caption: 'Plate 04. The LED wall seen straight on, the stage edge below, a spec column beneath.',
    notes: [
      ['Light', 'One spot overhead. Every top edge is lit; the wall spills Active Blue onto the deck.'],
      ['Brand content', 'The event screen lines of the case study, the mark, the contacts and the word-mark. Photographs are flat Dark Blue blocks.'],
      ['Truss', 'The lighting truss is drawn as bars and a zigzag web, the lattice of the mark at rest.'],
    ],
  },
];

const ORDER = [
  ['1. The spot comes up', 'The stage lights first. Its position is the one light of the plate, and it differs on every plate.'],
  ['2. The object turns to the light', 'The hero object eases from a slight turn to its finished pose. Nothing overshoots.'],
  ['3. Lines draw, nodes snap, labels fill', 'Leader lines draw on from the object, their nodes snap in, then the labels fill, one after another.'],
];

const LIGHT = [
  { key: 'p1', head: '01 Phone with data cards', cells: ['Top left', 'Lower right', 'Object left, cards right, 60 : 40'] },
  { key: 'p2', head: '02 Line-up of eight phones', cells: ['Top centre', 'Outwards, both ways', 'Row of phones above a ruled row of callouts'] },
  { key: 'p3', head: '03 Laptop on a plinth', cells: ['Top right', 'Left', 'Callouts left, object right, 55 : 45'] },
  { key: 'p4', head: '04 Event stage', cells: ['Overhead', 'Straight down', 'Wall above, deck below, spec column beneath'] },
];

// the names on each plate's callouts, in plain English (brand words keep their language on the plate itself)
const PARTS = {
  '01': ['Total card', 'KPI cells card', 'Treemap card', 'Height', 'Width'],
  '02': ['Capacity 2025', 'Node grid', 'Empty year', 'Four technology tiles', 'Mark and address'],
  '03': ['Display', 'Hinge', 'Aluminium body', 'Top face', 'Dark Blue plinth'],
  '04': ['LED wall', 'Side screen', 'Stage deck', 'Stage edge', 'Wall width and height'],
};

const VALUES = [
  { key: 'phone', head: 'Phone', cells: ['Height 150 mm', 'Width 72 mm', 'Depth 8 mm'] },
  { key: 'laptop', head: 'Laptop', cells: ['Width 310 mm', 'Closed 14 mm', ''] },
  { key: 'plinth', head: 'Plinth', cells: ['300 × 300 mm', 'Height 120 mm', ''] },
  { key: 'stage', head: 'Stage', cells: ['Wall 12 000 × 2 200 mm', 'Deck depth 6 000 mm', ''] },
];

export default function Page() {
  return (
    <section className="page" id="p-showcase" aria-label="Showcase">
      <div className="wrap">
        <div className={s.sheet}>
          <header className={s.head}>
            <div className={s.headTitle}>
              <p className="t-label">Campaign and the physical brand</p>
              <h1 tabIndex={-1} className="t-h1 t-balance">Showcase</h1>
            </div>
            <p className={`${s.headText} t-lead`}>
              Four catalogue plates on a dark stage with one soft spotlight. Each object turns slowly to the light, then the leader lines draw on, one after another.
            </p>
          </header>

          {PLATES.map(({ no, title, Scene, caption, notes }) => (
            <Reveal key={no} className={s.plateSec}>
              <div className={s.plateHead}>
                <h2 className="t-h2"><span className={s.no}>{no}</span>{title}</h2>
                <p className="t-small muted">Exportable as SVG</p>
              </div>
              <figure className={s.plate}>
                <div className="mock">
                  <Scene />
                </div>
                <figcaption className="mock-cap"><span>{caption}</span></figcaption>
              </figure>
              <p className="t-small muted">
                Callouts: {PARTS[no].join(', ')}.
              </p>
              <ul className={s.notes}>
                {notes.map(([h, d]) => (
                  <li key={h}>
                    <h3>{h}</h3>
                    <p className="t-small muted">{d}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}

          <Reveal className={s.plateSec}>
            <div className={s.plateHead}>
              <h2 className="t-h2">Anatomy of a plate</h2>
              <p className="t-small muted">Exportable as SVG</p>
            </div>
            <figure className={s.plate}>
              <div className="mock">
                <PlateKey />
              </div>
              <figcaption className="mock-cap"><span>Every plate is one SVG: stage, shadows, object, materials, shading, brand artwork and callouts.</span></figcaption>
            </figure>
            <ul className={s.notes}>
              {ORDER.map(([h, d]) => (
                <li key={h}>
                  <h3>{h}</h3>
                  <p className="t-small muted">{d}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className={s.values}>
            <div className={s.plateHead}>
              <h2 className="t-h2">Light and arrangement</h2>
              <p className="t-small muted">No two plates share a spotlight position or an arrangement.</p>
            </div>
            <SpecTable caption="Spotlight and arrangement of each plate" columns={['Plate', 'Spotlight', 'Shadows fall', 'Arrangement']} rows={LIGHT} />
          </Reveal>

          <Reveal className={s.values}>
            <div className={s.plateHead}>
              <h2 className="t-h2">Production values</h2>
              <p className="t-small muted">Our own plain-mm values for the objects drawn here. The case study publishes none.</p>
            </div>
            <SpecTable caption="Dimensions on the plates" columns={['Object', 'Value', 'Value', 'Value']} rows={VALUES} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
