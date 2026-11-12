// Three close-up plates built from the same garment functions at a larger scale and cropped to the plate:
// the chest print on the t-shirt, the reflective tape of the vest and the drawcord and eyelets of the hoodie.
import { CalloutG, CalloutsG, DimensionG } from '@/components/art/Mockup';
import { HEX } from '@/lib/brand';
import { at, mm } from './fabric';
import Plate, { dimsOf, mmH } from './Plate';
import { Hoodie, Tee, Vest, hoodieArt, teeArt } from './Tops';

const W = 860, H = 620;

// Clip the zoomed garment to the object side of the plate.
function Crop({ id, children }) {
  return (
    <>
      <clipPath id={`${id}-crop`}>
        <rect x="30" y="30" width="536" height={H - 60} />
      </clipPath>
      <g clipPath={`url(#${id}-crop)`}>{children}</g>
    </>
  );
}

function Calls({ t, list, i0 = 1 }) {
  return <CalloutsG>{list.map((c, j) => {
    const p = at(t, c.lx, c.ly);
    return <CalloutG key={c.label} x={p.x} y={p.y} tx={600} ty={150 + j * 108} label={c.label} sub={c.sub} i={i0 + j} size={19} />;
  })}</CalloutsG>;
}

export function ChestDetail({ idp }) {
  const art = teeArt('a', HEX.activeBlue, HEX.activeBlue);
  const t = { x: -352, y: 105, s: 2.5, rot: 0 };
  const a = at(t, 242, 58), b = at(t, 281, 58);
  return (
    <Plate idp={idp} name="detail-chest-print" title="Close-up of the t-shirt chest print, collar and shoulder seam" w={W} h={H} spot={{ x: 0.8, y: 0.1 }} split={0.66} no="D1" label="Chest print">
      {(spot) => (
        <>
          <Crop id={idp}>
            <Tee idp={idp} id={`${idp}-t`} t={t} spot={spot} view="front" body={HEX.darkBlue} art={art} />
          </Crop>
          <Calls
            t={t}
            list={[
              { lx: 262, ly: 70, label: 'Printed mark', sub: dimsOf(art.front[0]) },
              { lx: 236, ly: 44, label: 'Ribbed collar', sub: `${mm(14)} mm band` },
              { lx: 318, ly: 96, label: 'Shoulder seam', sub: 'Stitched' },
              { lx: 330, ly: 170, label: 'Jersey weave', sub: 'Fabric texture' },
            ]}
          />
          <DimensionG x1={a.x} y1={a.y} x2={b.x} y2={b.y} value={`${mm(39)} mm`} offset={-30} i={6} size={15} />
        </>
      )}
    </Plate>
  );
}

export function TapeDetail({ idp }) {
  const t = { x: 15, y: -198, s: 1.9, rot: 0 };
  const a = at(t, 82, 262), b = at(t, 82, 294);
  return (
    <Plate idp={idp} name="detail-reflective-tape" title="Close-up of the vest: reflective tape bands, braces and binding" w={W} h={H} spot={{ x: 0.3, y: 0.12 }} split={0.66} no="D2" label="Reflective tape">
      {(spot) => (
        <>
          <Crop id={idp}>
            <Vest idp={idp} id={`${idp}-v`} t={t} spot={spot} />
          </Crop>
          <Calls
            t={t}
            list={[
              { lx: 136, ly: 200, label: 'Reflective brace', sub: `${mmH(28)} mm tape` },
              { lx: 250, ly: 278, label: 'Reflective band', sub: `${mmH(32)} mm tape` },
              { lx: 84, ly: 300, label: 'Binding', sub: `${mmH(8)} mm` },
              { lx: 232, ly: 340, label: 'Prism texture', sub: 'Light Blue tape' },
            ]}
          />
          <DimensionG x1={a.x} y1={a.y} x2={b.x} y2={b.y} value={`${mmH(32)} mm`} offset={30} i={6} size={15} />
        </>
      )}
    </Plate>
  );
}

export function CordDetail({ idp }) {
  const t = { x: -110, y: 120, s: 2, rot: 0 };
  const a = at(t, 184, 92), b = at(t, 216, 92);
  return (
    <Plate idp={idp} name="detail-drawcord" title="Close-up of the hoodie neck: lined hood, drawcords and metal eyelets" w={W} h={H} spot={{ x: 0.2, y: 0.1 }} split={0.66} no="D3" label="Drawcord">
      {(spot) => (
        <>
          <Crop id={idp}>
            <Hoodie idp={idp} id={`${idp}-h`} t={t} spot={spot} body={HEX.darkBlue} art={hoodieArt('mark', HEX.activeBlue, HEX.activeBlue)} />
          </Crop>
          <Calls
            t={t}
            list={[
              { lx: 200, ly: 28, label: 'Lined hood', sub: `${mmH(32)} mm collar band` },
              { lx: 217, ly: 92, label: 'Metal eyelet', sub: `${mmH(8)} mm` },
              { lx: 221, ly: 150, label: 'Drawcord', sub: `${mmH(3.4)} mm cord` },
              { lx: 200, ly: 180, label: 'Chest mark', sub: `${mmH(62)} × ${mmH(62)} mm` },
            ]}
          />
          <DimensionG x1={a.x} y1={a.y} x2={b.x} y2={b.y} value={`${mmH(32)} mm`} offset={-28} i={6} size={15} />
        </>
      )}
    </Plate>
  );
}
