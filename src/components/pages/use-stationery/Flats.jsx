// The flat print artwork of each piece, one exportable SVG each, on its own (no stage). Same groups as the plates.
import { HEX } from '@/lib/brand';
import { MaterialDefs } from '@/components/art/Mockup';
import { ID } from './kit';
import { LetterheadG, EnvelopeG, CardFrontG, CardBackG, LETTER, ENVELOPE, CARD } from './Print';
import { NotebookG, PenG, PanelG, ReportSpineG, NOTE, PEN, PANEL } from './Objects';

const pen = `${ID}-pen-flat`;

// key, caption, viewBox, the artwork. Captions are plain names.
export const FLATS = [
  { key: 'letterhead', title: 'Letterhead', vb: `0 0 ${LETTER.w} ${LETTER.h}`, art: <LetterheadG /> },
  { key: 'envelope', title: 'DL envelope', vb: `0 0 ${ENVELOPE.w} ${ENVELOPE.h}`, art: <EnvelopeG /> },
  { key: 'card-front-paper', title: 'Business card front', vb: `0 0 ${CARD.w} ${CARD.h}`, art: <CardFrontG idp={`${ID}-flat-cf1`} /> },
  { key: 'card-front-active', title: 'Business card front, Active Blue', vb: `0 0 ${CARD.w} ${CARD.h}`, art: <CardFrontG idp={`${ID}-flat-cf2`} tone="active" /> },
  { key: 'card-back', title: 'Business card back', vb: `0 0 ${CARD.w} ${CARD.h}`, art: <CardBackG idp={`${ID}-flat-cb`} /> },
  { key: 'notebook-dark', title: 'Notebook, Dark Blue', vb: `0 0 ${NOTE.w} ${NOTE.h}`, art: <NotebookG tone="dark" /> },
  { key: 'notebook-active', title: 'Notebook, Active Blue', vb: `0 0 ${NOTE.w} ${NOTE.h}`, art: <NotebookG tone="active" /> },
  {
    key: 'pen', title: 'Pen', vb: `-16 -20 ${PEN.w + 32} ${PEN.h + 40}`,
    art: (<><MaterialDefs idp={pen} /><PenG idp={pen} /></>),
  },
  {
    key: 'brochure-panels', title: 'Tri-fold panels, open', vb: `0 0 ${PANEL.w * 3} ${PANEL.h}`,
    art: ['cover', 'inside', 'back'].map((k, i) => (
      <g key={k} transform={`translate(${i * PANEL.w} 0)`}><PanelG kind={k} /><rect x="0" width="0.8" height={PANEL.h} fill={HEX.darkBlue} opacity="0.3" /></g>
    )),
  },
  // The report spines flat (m02): the covers are shown only as the case study crops them, on the report plate.
  {
    key: 'report-spines', title: 'Report spines', vb: '0 0 590 224',
    art: ['active', 'dark', 'active'].map((tone, i) => <g key={i} transform={`translate(0 ${i * 80})`}><ReportSpineG tone={tone} /></g>),
  },
];
