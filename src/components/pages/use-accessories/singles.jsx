// Thirteen small single-object plates (400 x 400): one object each, a different side and spotlight every time.
import { CalloutG, DimensionG, ShadowG, LitG, castDir } from '@/components/art/Mockup';
import { HEX } from '@/lib/brand';
import { Plate, At, NEUTRAL, url } from './kit';
import { Tote, Patch, Keychain, UmbrellaSide } from './soft';
import { Mug, Bottle } from './hard';
import { StickerSheet, PinCard, Coaster, MousePad, GiftFront, GiftBack, Carrier } from './flat';

const Z = 400, S = 13;
const Co = (p) => <CalloutG size={S} {...p} />;
const Dim = (p) => <DimensionG size={12} {...p} />;
const shadow = (idp, spot, x, y, rx) => <ShadowG idp={`${idp}-sh`} cx={x} cy={y} rx={rx} dir={castDir(spot, Z, Z, x, y)} blur={7} />;

export function ToteSingle() {
  const spot = { x: 0.7, y: 0.12 };
  return (
    <Plate name="tote-light" title="Tote bag in Light Blue canvas" w={Z} h={Z} spot={spot} split={0.4} no="10">
      {({ idp, sh }) => (
        <>
          <rect x="266" y="56" width="10" height="64" fill={url(idp, 'metal')} />
          {shadow(idp, spot, 270, 372, 90)}
          <At x={271} y={190} k={0.66}>
            <LitG>
              <Tote id={`${idp}-t`} m={idp} sh={sh(271)} fab="light" drop={110} />
            </LitG>
          </At>
          <Co x={238} y={130} tx={110} ty={90} label="Handle" side="left" i={0} />
          <Co x={230} y={250} tx={110} ty={190} label="Light canvas" side="left" i={1} />
          <Co x={271} y={246} tx={110} ty={280} label="Printed mark" side="left" i={2} />
          <Dim x1={202} y1={348} x2={340} y2={348} value="380 mm" offset={16} i={3} />
        </>
      )}
    </Plate>
  );
}

export function MugSingle() {
  const spot = { x: 0.25, y: 0.1 };
  return (
    <Plate name="mug-light" title="Mug in Light Blue ceramic, handle left" w={Z} h={Z} spot={spot} split={0.45} no="11">
      {({ idp }) => (
        <>
          {shadow(idp, spot, 250, 330, 100)}
          <At x={250} y={326} k={1.05}>
            <LitG>
              <Mug id={`${idp}-m`} m={idp} hl={0.3} base={HEX.lightBlue} ink={HEX.darkBlue} band={HEX.activeBlue} hand={-1} />
            </LitG>
          </At>
          <Co x={122} y={226} tx={90} ty={90} label="Handle" side="left" i={0} />
          <Co x={250} y={198} tx={90} ty={160} label="Wrap print" side="left" i={1} />
          <Co x={290} y={275} tx={90} ty={230} label="Band" side="left" i={2} />
          <Dim x1={329} y1={148} x2={329} y2={326} value="90 mm" offset={-20} i={3} />
        </>
      )}
    </Plate>
  );
}

export function BottleSingle() {
  const spot = { x: 0.3, y: 0.1 };
  return (
    <Plate name="bottle-dark" title="Bottle in Dark Blue powder coat" w={Z} h={Z} spot={spot} split={0.5} no="12">
      {({ idp }) => (
        <>
          {shadow(idp, spot, 130, 352, 60)}
          <At x={130} y={348} k={1}>
            <LitG>
              <Bottle id={`${idp}-b`} m={idp} hl={0.3} base={HEX.darkBlue} ink={HEX.activeBlue} cap={NEUTRAL.steel} word={HEX.onBlue} />
            </LitG>
          </At>
          <Co x={130} y={52} tx={270} ty={50} label="Steel cap" i={0} />
          <Co x={160} y={150} tx={270} ty={140} label="Powder coat" i={1} />
          <Co x={140} y={300} tx={270} ty={230} label="Wrap print" i={2} />
          <Dim x1={200} y1={42} x2={200} y2={348} value="260 mm" offset={-20} i={3} />
        </>
      )}
    </Plate>
  );
}

export function StickerSingle() {
  const spot = { x: 0.2, y: 0.2 };
  return (
    <Plate name="sticker-sheet" title="Sticker sheet" w={Z} h={Z} spot={spot} floor={null} split={0.55} no="13">
      {({ idp }) => (
        <>
          <At x={125} y={205} k={0.8}>
            <LitG>
              <StickerSheet id={`${idp}-s`} m={idp} />
            </LitG>
          </At>
          <Co x={72} y={92} tx={290} ty={70} label="Die-cut mark" i={0} />
          <Co x={190} y={130} tx={290} ty={150} label="Word-mark" i={1} />
          <Co x={134} y={330} tx={280} ty={260} label="Backing sheet" i={2} />
          <Dim x1={21} y1={366} x2={229} y2={366} value="140 mm" offset={12} i={3} />
        </>
      )}
    </Plate>
  );
}

export function PinSingle() {
  const spot = { x: 0.8, y: 0.15 };
  return (
    <Plate name="pin-card" title="Enamel pin on its backing card" w={Z} h={Z} spot={spot} floor={null} split={0.45} no="14">
      {({ idp, sh }) => (
        <>
          <At x={270} y={200} k={1.15} rot={-4}>
            <LitG>
              <PinCard id={`${idp}-p`} m={idp} sh={sh(270)} cd={{ x: -0.5, y: 0.4 }} />
            </LitG>
          </At>
          <Co x={273} y={178} tx={90} ty={110} label="Enamel pin" side="left" i={0} />
          <Co x={276} y={98} tx={90} ty={190} label="Hang slot" side="left" i={1} />
          <Co x={318} y={300} tx={90} ty={280} label="Backing card" side="left" i={2} />
          <Dim x1={188} y1={346} x2={352} y2={346} value="55 mm" offset={14} i={3} />
        </>
      )}
    </Plate>
  );
}

export function PatchSingle() {
  const spot = { x: 0.4, y: 0.1 };
  return (
    <Plate name="patch-detail" title="Woven patch, close view" w={Z} h={Z} spot={spot} floor={null} no="15">
      {({ idp, sh }) => (
        <>
          <At x={150} y={190} k={1.5}>
            <LitG>
              <Patch id={`${idp}-p`} m={idp} sh={sh(150)} s={100} kind="lattice" />
            </LitG>
          </At>
          <Co x={225} y={150} tx={285} ty={80} label="Merrowed edge" i={0} />
          <Co x={150} y={190} tx={285} ty={190} label="Lattice weave" i={1} />
          <Dim x1={75} y1={340} x2={225} y2={340} value="70 mm" offset={14} i={2} />
        </>
      )}
    </Plate>
  );
}

export function KeychainSingle() {
  const spot = { x: 0.6, y: 0.1 };
  return (
    <Plate name="keychain" title="Keychain with a Dark Blue tag" w={Z} h={Z} spot={spot} floor={null} split={0.5} no="16">
      {({ idp, sh }) => (
        <>
          <rect x="136" y="40" width="48" height="8" fill={url(idp, 'metal')} />
          <At x={160} y={52} k={1.5}>
            <LitG>
              <Keychain id={`${idp}-k`} m={idp} sh={sh(160)} tag={HEX.activeBlue} ink={HEX.darkBlue} />
            </LitG>
          </At>
          <Co x={160} y={85} tx={290} ty={80} label="Split ring" i={0} />
          <Co x={160} y={190} tx={290} ty={170} label="Chain" i={1} />
          <Co x={190} y={290} tx={290} ty={270} label="Tag" i={2} />
          <Dim x1={100} y1={203} x2={100} y2={340} value="45 mm" offset={-14} i={3} />
        </>
      )}
    </Plate>
  );
}

export function CoastersSingle() {
  const spot = { x: 0.3, y: 0.15 };
  return (
    <Plate name="coasters" title="Three coasters, one turned to show the cork" w={Z} h={Z} spot={spot} floor={null} no="17">
      {({ idp }) => (
        <>
          <At x={115} y={150} rot={-8}>
            <Coaster id={`${idp}-a`} m={idp} kind="lattice" />
          </At>
          <At x={230} y={120} rot={6}>
            <Coaster id={`${idp}-b`} m={idp} kind="cork" />
          </At>
          <At x={180} y={250} rot={-3}>
            <LitG>
              <Coaster id={`${idp}-c`} m={idp} kind="mark" />
            </LitG>
          </At>
          <Co x={230} y={120} tx={295} ty={60} label="Cork back" i={0} />
          <Co x={180} y={250} tx={295} ty={250} label="Printed top" i={1} />
          <Dim x1={130} y1={316} x2={230} y2={316} value="100 mm" offset={14} i={2} />
        </>
      )}
    </Plate>
  );
}

export function PadSingle() {
  const spot = { x: 0.8, y: 0.12 };
  return (
    <Plate name="mouse-pad" title="Mouse pad" w={Z} h={Z} spot={spot} floor={null} no="18">
      {({ idp, sh }) => (
        <>
          <At x={140} y={200}>
            <LitG>
              <MousePad id={`${idp}-p`} m={idp} sh={sh(140)} cd={{ x: -0.5, y: 0.4 }} />
            </LitG>
          </At>
          <Co x={170} y={290} tx={290} ty={330} label="Rubber base" i={0} />
          <Co x={200} y={150} tx={290} ty={120} label="Woven top" i={1} />
          <Dim x1={40} y1={315} x2={240} y2={315} value="220 mm" offset={14} i={2} />
        </>
      )}
    </Plate>
  );
}

export function UmbrellaSingle() {
  const spot = { x: 0.2, y: 0.1 };
  return (
    <Plate name="umbrella-open" title="Umbrella open, side view" w={Z} h={Z} spot={spot} split={0.5} no="19">
      {({ idp, sh }) => (
        <>
          {shadow(idp, spot, 160, 380, 100)}
          <At x={165} y={170} k={0.8}>
            <LitG>
              <UmbrellaSide id={`${idp}-u`} m={idp} sh={sh(165)} />
            </LitG>
          </At>
          <Co x={165} y={34} tx={300} ty={40} label="Tip" i={0} />
          <Co x={235} y={130} tx={300} ty={140} label="Panel" i={1} />
          <Co x={165} y={330} tx={300} ty={280} label="Shaft" i={2} />
          <Dim x1={29} y1={170} x2={301} y2={170} value="1,050 mm" offset={36} i={3} />
        </>
      )}
    </Plate>
  );
}

export function GiftFrontSingle() {
  const spot = { x: 0.3, y: 0.1 };
  return (
    <Plate name="gift-card-front" title="Gift card, front" w={Z} h={Z} spot={spot} floor={null} no="20">
      {({ idp, sh }) => (
        <>
          <At x={200} y={170} k={1.2} rot={-3}>
            <LitG>
              <GiftFront id={`${idp}-f`} m={idp} sh={sh(200)} />
            </LitG>
          </At>
          <Co x={290} y={110} tx={350} ty={50} label="Word-mark" side="left" i={0} />
          <Co x={120} y={225} tx={50} ty={330} label="Embossed mark" side="right" i={1} />
          <Dim x1={55} y1={270} x2={345} y2={270} value="85 mm" offset={30} i={2} />
        </>
      )}
    </Plate>
  );
}

export function GiftBackSingle() {
  const spot = { x: 0.75, y: 0.1 };
  return (
    <Plate name="gift-card-back" title="Gift card, back" w={Z} h={Z} spot={spot} floor={null} no="21">
      {({ idp, sh }) => (
        <>
          <At x={200} y={170} k={1.2} rot={2}>
            <LitG>
              <GiftBack id={`${idp}-b`} m={idp} sh={sh(200)} cd={{ x: -0.5, y: 0.4 }} />
            </LitG>
          </At>
          <Co x={95} y={150} tx={50} ty={330} label="Value field" side="right" i={0} />
          <Co x={200} y={190} tx={350} ty={50} label="Number field" side="left" i={1} />
          <Dim x1={345} y1={100} x2={345} y2={240} value="55 mm" offset={-16} i={2} />
        </>
      )}
    </Plate>
  );
}

export function CarrierSingle() {
  const spot = { x: 0.5, y: 0.08 };
  return (
    <Plate name="carrier" title="Card carrier, open flat" w={Z} h={Z} spot={spot} floor={null} no="22">
      {({ idp, sh }) => (
        <>
          <At x={200} y={170} k={0.72}>
            <LitG>
              <Carrier id={`${idp}-c`} m={idp} sh={sh(200)} card={false} />
            </LitG>
          </At>
          <Co x={120} y={225} tx={80} ty={310} label="Card slots" side="right" i={0} />
          <Co x={290} y={200} tx={330} ty={330} label="Printed panel" side="left" i={1} />
          <Dim x1={380} y1={106} x2={20} y2={106} value="220 mm" offset={18} i={2} />
        </>
      )}
    </Plate>
  );
}
