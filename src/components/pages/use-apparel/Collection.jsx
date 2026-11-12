// The collection plate: a rail of seven garments seen front on (left 65%: three hoodies, three t-shirts and the
// hi-vis vest), three caps and the hard hat on a shelf below, one callout
// per garment on the right with its own leader and one height dimension. Spot upper left; the hero row turns to it.
import { DimensionG, LitG, PLATE, ShadowG, SpecColumnG } from '@/components/art/Mockup';
import { HEX } from '@/lib/brand';
import { at, HangerG } from './fabric';
import Plate from './Plate';
import { Hoodie, Vest, hoodieArt, Tee, teeArt } from './Tops';
import { Cap, HardHat } from './Caps';

const W = 1440, H = 700, S = 0.33, RAIL = 120, STEP = 128;
const TEE = (k, body, ink, ink2, tone) => ({ w: 400, hem: 350, top: 34, draw: (p) => <Tee {...p} body={body} art={teeArt(k, ink, ink2)} tone={tone} />, name: 'T-shirt' });

const LINEUP = [
  { w: 400, hem: 436, top: 14, name: 'Hi-vis vest', draw: (p) => <Vest {...p} /> },
  { w: 400, hem: 442, top: 52, name: 'Hoodie, Dark Blue', draw: (p) => <Hoodie {...p} body={HEX.darkBlue} art={hoodieArt('mark', HEX.activeBlue, HEX.activeBlue)} /> },
  { w: 400, hem: 442, top: 52, name: 'Hoodie, Light Blue', draw: (p) => <Hoodie {...p} body={HEX.lightBlue} tone={HEX.darkBlue} cord={HEX.darkBlue} art={hoodieArt('lattice', HEX.darkBlue, HEX.activeBlue)} /> },
  { w: 400, hem: 442, top: 52, name: 'Hoodie, Active Blue', draw: (p) => <Hoodie {...p} body={HEX.activeBlue} tone={HEX.darkBlue} cord={HEX.darkBlue} art={hoodieArt('word', HEX.lightBlue, HEX.lightBlue)} /> },
  { ...TEE('a', HEX.darkBlue, HEX.activeBlue, HEX.activeBlue, '#ffffff'), name: 'T-shirt, Dark Blue' },
  { ...TEE('b', HEX.activeBlue, HEX.lightBlue, HEX.darkBlue, '#ffffff'), name: 'T-shirt, Active Blue' },
  { ...TEE('c', HEX.lightBlue, HEX.darkBlue, HEX.activeBlue, HEX.darkBlue), name: 'T-shirt, Light Blue' },
];

// the three caps of the cap plates: body, print, stitching
const CAP_TONES = [[HEX.darkBlue, HEX.activeBlue, HEX.white], [HEX.lightBlue, HEX.darkBlue, HEX.darkBlue], [HEX.activeBlue, HEX.darkBlue, HEX.white]];

export default function Collection({ idp = 'use-apparel-collection' }) {
  return (
    <Plate idp={idp} name="collection" title="The full collection on a rail: the vest, three hoodies and three t-shirts, with three caps and the hard hat on a shelf" w={W} h={H} spot={{ x: 0.3, y: 0.1 }} split={0.68} no="00" label="Collection" r={0.7}>
      {(spot, cast) => {
        const ts = LINEUP.map((g, i) => ({ x: 140 + i * STEP - 200 * S, y: RAIL + 32 - g.top * S, s: S, rot: 0 }));
        const vest = ts[0];
        const d0 = at(vest, 80, 14), d1 = at(vest, 80, 436);
        return (
          <>
            <rect x="44" y={RAIL - 4} width="920" height="8" fill={`url(#${idp}-metal)`} />
            <rect x="44" y={RAIL - 4} width="920" height="2" fill="#ffffff" opacity="0.5" />
            {[44, 964].map((x) => (
              <rect key={x} x={x - 3} y={RAIL - 26} width="6" height="46" fill={`url(#${idp}-metal-dark)`} />
            ))}
            <LitG>
              {LINEUP.map((g, i) => (
                <g key={g.name}>
                  {g.draw({ idp, id: `${idp}-g${i}`, t: ts[i], spot, cast: cast(ts[i].x + 70, ts[i].y + 60, 12) })}
                  <HangerG idp={idp} x={140 + i * STEP} y={RAIL} w={g.top > 40 ? 70 : 64} drop={30} />
                </g>
              ))}
            </LitG>
            {LINEUP.map((g, i) => {
              const p = at(ts[i], 200, g.hem), y = 500 - i * 30;
              const d = `M${p.x} ${p.y}V${y}H1000`;
              return (
                <g key={`c${g.name}`}>
                  <path d={d} fill="none" stroke={PLATE.line} strokeWidth="1" className="callout-line" style={{ '--len': Math.round(y - p.y + 1000 - p.x), '--i': i + 1 }} />
                  <rect x={p.x - 4} y={p.y - 4} width="8" height="8" fill={PLATE.accent} className="callout-node" style={{ '--i': i + 1 }} />
                  <rect x="997" y={y - 3} width="6" height="6" fill={PLATE.line} className="callout-node" style={{ '--i': i + 1 }} />
                  <text x="1014" y={y + 6} fontSize="20" fill={PLATE.text} className="callout-text" style={{ '--i': i + 1 }}>{g.name}</text>
                </g>
              );
            })}
            <DimensionG x1={d0.x} y1={d0.y} x2={d1.x} y2={d1.y} value="740 mm" offset={36} i={8} size={15} />
            <rect x="60" y="626" width="880" height="14" fill={`url(#${idp}-metal-dark)`} />
            <rect x="60" y="626" width="880" height="2" fill="#ffffff" opacity="0.35" />
            {[0, 1, 2, 3].map((i) => {
              const t = { x: 100 + i * 212, y: 626 - 290 * 0.3, s: 0.3, rot: 0 };
              const common = { idp, id: `${idp}-k${i}`, t, spot, cast: cast(t.x + 70, t.y + 80, 8) };
              return (
                <g key={i}>
                  <ShadowG idp={`${idp}-k${i}`} cx={t.x + 70} cy={628} rx={80} ry={7} dir={cast(t.x + 70, 628).dir} blur={5} />
                  {i === 3 ? <HardHat {...common} /> : <Cap {...common} body={CAP_TONES[i][0]} ink={CAP_TONES[i][1]} tone={CAP_TONES[i][2]} />}
                </g>
              );
            })}
            <SpecColumnG x={1000} y={520} w={380} rows={[{ k: 'Garments on the rail', v: '7' }, { k: 'Headwear on the shelf', v: '4' }, { k: 'T-shirt length', v: '720 mm' }]} rowH={38} size={16} />
          </>
        );
      }}
    </Plate>
  );
}
