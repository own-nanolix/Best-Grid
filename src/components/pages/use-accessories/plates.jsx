// The nine large catalogue plates (760 x 700). Object side, callouts, dimensions and spec columns differ on each.
// Callout labels are plain part names; dimensions are our own production values in plain mm.
import { CalloutG, DimensionG, SpecColumnG, ShadowG, LitG, castDir, CalloutsG } from '@/components/art/Mockup';
import { HEX } from '@/lib/brand';
import { Plate, At, url, NEUTRAL, Stitch } from './kit';
import { Tote, Sock, UmbrellaBelow, Patch, Keychain } from './soft';
import { Mug, Bottle, Cup, CoasterStack } from './hard';
import { StickerSheet, PinCard, DeskMat, isoP, GiftFront, GiftBack, Carrier } from './flat';

const W = 760, H = 700, S = 16;
const Co = (p) => <CalloutG size={S} {...p} />;
const Dim = (p) => <DimensionG size={14} {...p} />;

// 01 Tote bags: two totes hanging from one bar, on the left. Spot top left.
export function TotesPlate() {
  const spot = { x: 0.2, y: 0.1 };
  return (
    <Plate name="totes" title="Two tote bags hanging from one bar" w={W} h={H} spot={spot} split={0.66} no="01">
      {({ idp, sh }) => (
        <>
          <rect x="52" y="104" width="6" height="52" fill={url(idp, 'metal')} />
          <rect x="452" y="104" width="6" height="52" fill={url(idp, 'metal')} />
          <rect x="48" y="150" width="414" height="9" fill={url(idp, 'metal')} />
          <rect x="48" y="150" width="414" height="2" fill={HEX.white} opacity="0.5" />
          <ShadowG idp={`${idp}-a`} cx={190} cy={520} rx={110} dir={castDir(spot, W, H, 190, 520)} opacity={0.35} />
          <ShadowG idp={`${idp}-b`} cx={350} cy={520} rx={110} dir={castDir(spot, W, H, 350, 520)} opacity={0.35} />
          <At x={350} y={243} k={0.8}>
            <Tote id={`${idp}-t2`} m={idp} sh={sh(350)} fab="active" drop={120} />
          </At>
          <At x={190} y={255} k={0.82}>
            <LitG>
              <Tote id={`${idp}-t1`} m={idp} sh={sh(190)} fab="dark" drop={122} />
            </LitG>
          </At>
          {/* every node on the right-hand tote's right side, in the order of the labels, so no leader crosses another */}
          <CalloutsG>
            <Co x={452} y={154} tx={560} ty={150} label="Hanging bar" i={0} />
            <Co x={400} y={196} tx={560} ty={230} label="Handle" sub="Stitched box, 4 points" i={1} />
            <Co x={424} y={262} tx={560} ty={310} label="Hem" sub="Double-folded, stitched" i={2} />
            <Co x={424} y={370} tx={560} ty={390} label="Canvas body" sub="Woven, natural weave" i={3} />
          </CalloutsG>
          <Dim x1={100} y1={155} x2={100} y2={255} value="250 mm" offset={26} i={4} />
          <Dim x1={108} y1={458} x2={272} y2={458} value="380 mm" offset={30} i={5} />
          <SpecColumnG x={520} y={455} w={190} title="Tote bag" size={14} rowH={36} rows={[{ k: 'Canvas', v: '280 g/m²' }, { k: 'Handles', v: '25 × 600 mm' }, { k: 'Print', v: '1 colour' }, { k: 'Size', v: '380 × 420 mm' }]} />
        </>
      )}
    </Plate>
  );
}

// 02 Mugs: two mugs at eye level, handles facing opposite ways, centre-left; diameter and height on the right.
export function MugsPlate() {
  const spot = { x: 0.3, y: 0.08 };
  return (
    <Plate name="mugs" title="Two mugs with opposite handles" w={W} h={H} spot={spot} split={0.68} no="02">
      {({ idp }) => (
        <>
          <ShadowG idp={`${idp}-a`} cx={160} cy={506} rx={105} dir={castDir(spot, W, H, 160, 506)} />
          <ShadowG idp={`${idp}-b`} cx={350} cy={506} rx={105} dir={castDir(spot, W, H, 350, 506)} />
          <At x={350} y={500} k={1.05}>
            <Mug id={`${idp}-m2`} m={idp} hl={0.3} base={HEX.activeBlue} ink={HEX.darkBlue} band={HEX.darkBlue} hand={1} />
          </At>
          <At x={160} y={500} k={1.05}>
            <LitG>
              <Mug id={`${idp}-m1`} m={idp} hl={0.3} hand={-1} />
            </LitG>
          </At>
          {/* nodes on the right-hand mug's right side, around its handle, top to bottom like the labels */}
          <CalloutsG>
            <Co x={429} y={319} tx={575} ty={150} label="Rim" sub="Rolled, glazed" i={0} />
            <Co x={415} y={334} tx={575} ty={230} label="Wrap print" sub="Wraps the body" i={1} />
            <Co x={476} y={405} tx={575} ty={320} label="Handle" i={2} />
            <Co x={426} y={465} tx={575} ty={482} label="Pattern band" i={3} />
          </CalloutsG>
          <Dim x1={255} y1={500} x2={255} y2={322} value="90 mm" offset={-4} i={4} />
          <Dim x1={81} y1={322} x2={239} y2={322} value="Ø 80 mm" offset={-24} i={5} />
          <SpecColumnG x={535} y={508} w={180} title="Mug" size={14} rowH={30} rows={[{ k: 'Body', v: 'Ceramic' }, { k: 'Volume', v: '300 ml' }, { k: 'Print', v: 'Wrap' }, { k: 'Handle', v: 'Left / right' }]} />
        </>
      )}
    </Plate>
  );
}

// 03 Bottles: two bottles standing, one leaning on its base, on the right. Spot top right; callouts left.
export function BottlesPlate() {
  const spot = { x: 0.78, y: 0.1 };
  return (
    <Plate name="bottles" title="Two bottles, one tilted on its base" w={W} h={H} spot={spot} split={0.4} no="03">
      {({ idp }) => (
        <>
          <ShadowG idp={`${idp}-a`} cx={470} cy={520} rx={70} dir={castDir(spot, W, H, 470, 520)} />
          <ShadowG idp={`${idp}-b`} cx={620} cy={524} rx={80} dir={castDir(spot, W, H, 620, 524)} />
          <At x={640} y={522} k={1} rot={-14}>
            <Bottle id={`${idp}-b2`} m={idp} hl={0.75} base={HEX.activeBlue} ink={HEX.darkBlue} cap={HEX.darkBlue} word={HEX.darkBlue} />
          </At>
          <At x={470} y={520} k={1}>
            <LitG>
              <Bottle id={`${idp}-b1`} m={idp} hl={0.75} />
            </LitG>
          </At>
          {/* nodes on the standing bottle's left edge; the height is dimensioned along the leaning bottle, on the
              far side, so no leader crosses it */}
          <CalloutsG>
            <Co x={452} y={230} tx={240} ty={130} label="Cap" sub="Matt Dark Blue" side="left" i={0} />
            <Co x={452} y={252} tx={240} ty={210} label="Neck" side="left" i={1} />
            <Co x={430} y={330} tx={240} ty={300} label="Steel body" sub="Brushed finish" side="left" i={2} />
            <Co x={430} y={470} tx={240} ty={390} label="Wrap print" side="left" i={3} />
            <Co x={432} y={522} tx={240} ty={470} label="Base" side="left" i={4} />
          </CalloutsG>
          <Dim x1={681} y1={512} x2={608} y2={221} value="260 mm" offset={22} i={5} />
          <SpecColumnG x={40} y={540} w={190} size={14} rowH={34} rows={[{ k: 'Volume', v: '500 ml' }, { k: 'Diameter', v: '70 mm' }]} />
        </>
      )}
    </Plate>
  );
}

// 04 Sticker sheet and pin card: the sheet flat from above, the card leaning on it; die-cut callouts all round.
export function StickersPlate() {
  const spot = { x: 0.35, y: 0.16 };
  return (
    <Plate name="stickers-pin" title="Sticker sheet with a leaning pin card" w={W} h={H} spot={spot} floor={null} no="04">
      {({ idp, sh }) => (
        <>
          <At x={300} y={360}>
            <LitG>
              <StickerSheet id={`${idp}-s`} m={idp} />
            </LitG>
          </At>
          <At x={480} y={375} k={0.92} rot={9}>
            <PinCard id={`${idp}-p`} m={idp} sh={sh(480)} />
          </At>
          <CalloutsG>
            <Co x={200} y={222} tx={150} ty={150} label="Die-cut mark" side="left" i={0} />
            <Co x={230} y={382} tx={150} ty={330} label="Lattice sticker" side="left" i={1} />
            <Co x={180} y={512} tx={150} ty={560} label="Backing sheet" side="left" i={2} />
            <Co x={372} y={246} tx={600} ty={150} label="Word-mark sticker" i={3} />
            <Co x={478} y={338} tx={600} ty={240} label="Enamel pin" sub="Hard enamel" i={4} />
            <Co x={528} y={452} tx={600} ty={340} label="Backing card" i={5} />
            <Co x={416} y={504} tx={600} ty={560} label="Peel corner" i={6} />
          </CalloutsG>
          <Dim x1={170} y1={545} x2={430} y2={545} value="140 mm" offset={30} i={7} />
        </>
      )}
    </Plate>
  );
}

// 05 Patches and keychain: four patches in a square from above, the keychain hanging beside; each patch dimensioned.
export function PatchesPlate() {
  const spot = { x: 0.3, y: 0.14 };
  const kinds = ['mark', 'word', 'lattice', 'nodes'];
  const pos = [[250, 250], [370, 250], [250, 370], [370, 370]];
  return (
    <Plate name="patches-keychain" title="Four patches and a keychain" w={W} h={H} spot={spot} floor={null} no="05">
      {({ idp, sh }) => (
        <>
          {kinds.map((k, i) => (
            <At key={k} x={pos[i][0]} y={pos[i][1]}>
              {i === 0 ? (
                <LitG>
                  <Patch id={`${idp}-p${i}`} m={idp} sh={sh(pos[i][0])} s={100} kind={k} />
                </LitG>
              ) : (
                <Patch id={`${idp}-p${i}`} m={idp} sh={sh(pos[i][0])} s={100} kind={k} />
              )}
            </At>
          ))}
          <rect x="498" y="84" width="44" height="8" fill={url(idp, 'metal')} />
          <rect x="517" y="84" width="6" height="40" fill={NEUTRAL.steelDark} />
          <ShadowG idp={`${idp}-k`} cx={520} cy={500} rx={44} opacity={0.3} />
          <At x={520} y={122} k={1.3}>
            <Keychain id={`${idp}-k`} m={idp} sh={sh(520)} />
          </At>
          <CalloutsG>
            <Co x={200} y={250} tx={155} ty={160} label="Merrowed edge" side="left" i={0} />
            <Co x={200} y={370} tx={155} ty={470} label="Woven twill" side="left" i={1} />
            <Co x={520} y={142} tx={610} ty={170} label="Split ring" i={2} />
            <Co x={520} y={206} tx={610} ty={260} label="Chain" i={3} />
            <Co x={545} y={290} tx={610} ty={350} label="Tag" sub="Matt plastic" i={4} />
          </CalloutsG>
          <Dim x1={300} y1={190} x2={200} y2={190} value="70 mm" offset={16} i={5} />
          <Dim x1={420} y1={190} x2={320} y2={190} value="70 mm" offset={16} i={6} />
          <Dim x1={200} y1={432} x2={300} y2={432} value="70 mm" offset={16} i={7} />
          <Dim x1={320} y1={432} x2={420} y2={432} value="70 mm" offset={16} i={8} />
        </>
      )}
    </Plate>
  );
}

// 06 Cup, sleeve, coasters: the cup 15 degrees above eye level on a coaster stack, on the left.
export function CupPlate() {
  const spot = { x: 0.26, y: 0.1 };
  return (
    <Plate name="cup-coasters" title="Paper cup with sleeve on a coaster stack" w={W} h={H} spot={spot} split={0.62} no="06">
      {({ idp }) => (
        <>
          <ShadowG idp={`${idp}-a`} cx={190} cy={530} rx={140} dir={castDir(spot, W, H, 190, 530)} />
          <ShadowG idp={`${idp}-b`} cx={385} cy={540} rx={90} dir={castDir(spot, W, H, 385, 540)} />
          <At x={385} y={530} k={1.2}>
            <CoasterStack id={`${idp}-c2`} m={idp} hw={56} n={4} top={HEX.lightBlue} ink={HEX.darkBlue} />
          </At>
          <At x={190} y={518} k={1.7}>
            <CoasterStack id={`${idp}-c1`} m={idp} hw={56} n={3} />
          </At>
          <At x={190} y={482} k={1.7}>
            <LitG>
              <Cup id={`${idp}-cup`} m={idp} hl={0.3} />
            </LitG>
          </At>
          {/* nodes on the right-hand edges, top to bottom like the labels; the coaster's leader passes above the stack */}
          <CalloutsG>
            <Co x={196} y={262} tx={560} ty={160} label="Lid" sub="Sip hole, dark plastic" i={0} />
            <Co x={262} y={370} tx={560} ty={250} label="Printed sleeve" i={1} />
            <Co x={255} y={447} tx={560} ty={340} label="Paper cup" i={2} />
            <Co x={284} y={456} tx={560} ty={430} label="Coaster" sub="Cork back" i={3} />
            <Co x={451} y={522} tx={560} ty={522} label="Coaster stack" i={4} />
          </CalloutsG>
          <Dim x1={112} y1={244} x2={112} y2={482} value="112 mm" offset={24} i={5} />
          <Dim x1={95} y1={540} x2={285} y2={540} value="100 mm" offset={18} i={6} />
          <SpecColumnG x={520} y={560} w={190} size={14} rowH={32} rows={[{ k: 'Cup', v: '240 ml' }, { k: 'Coaster', v: '100 × 100 mm' }]} />
        </>
      )}
    </Plate>
  );
}

// 07 Desk mat and mouse pad: isometric from the top right, the mat across the plate, the pad on it.
export function DeskPlate() {
  const spot = { x: 0.82, y: 0.08 };
  const ox = 250, oy = 200, P = isoP(ox, oy);
  return (
    <Plate name="desk-mat-pad" title="Desk mat with a mouse pad on it" w={W} h={H} spot={spot} floor={null} no="07">
      {({ idp }) => (
        <>
          <LitG>
            <DeskMat id={`${idp}-d`} m={idp} ox={ox} oy={oy} />
          </LitG>
          {/* left: nodes by the upper-left edge; right: nodes by the upper-right edge, in label order (no crossings) */}
          <CalloutsG>
            <Co x={P(10, 72)[0]} y={P(10, 72)[1]} tx={210} ty={190} label="Crossing bands" side="left" i={0} />
            <Co x={P(40, 268)[0]} y={P(40, 268)[1]} tx={130} ty={262} label="Word-mark" side="left" i={1} />
            <Co x={P(450, 118, 12)[0]} y={P(450, 118, 12)[1]} tx={600} ty={150} label="Mouse pad" sub="220 × 190 mm" i={2} />
            <Co x={P(400, 8)[0]} y={P(400, 8)[1]} tx={600} ty={250} label="Stitched edge" i={3} />
            <Co x={P(600, 40)[0]} y={P(600, 40)[1]} tx={600} ty={350} label="Woven top" i={4} />
          </CalloutsG>
          <Dim x1={P(0, 320)[0]} y1={P(0, 320)[1] + 5} x2={P(720, 320)[0]} y2={P(720, 320)[1] + 5} value="900 mm" offset={34} i={5} />
          <Dim x1={P(720, 320)[0]} y1={P(720, 320)[1] + 5} x2={P(720, 0)[0]} y2={P(720, 0)[1] + 5} value="400 mm" offset={34} i={6} />
        </>
      )}
    </Plate>
  );
}

// 08 Umbrella and socks: the umbrella open seen from below on the left, socks flat on the right, callouts between.
export function UmbrellaPlate() {
  const spot = { x: 0.3, y: 0.12 };
  return (
    <Plate name="umbrella-socks" title="Umbrella seen from below and a pair of socks" w={W} h={H} spot={spot} floor={null} no="08">
      {({ idp }) => (
        <>
          <ShadowG idp={`${idp}-u`} cx={190} cy={560} rx={150} ry={22} opacity={0.35} />
          <At x={175} y={350}>
            <LitG>
              <UmbrellaBelow id={`${idp}-u`} m={idp} R={150} lx={-0.3} ly={-0.4} />
            </LitG>
          </At>
          <At x={610} y={250} k={0.85}>
            <Sock id={`${idp}-s2`} m={idp} body={HEX.activeBlue} accent={HEX.darkBlue} ink={HEX.darkBlue} />
          </At>
          <At x={540} y={200} k={0.85}>
            <Sock id={`${idp}-s1`} m={idp} />
          </At>
          {/* umbrella nodes on its right rim (the hub's leader runs out along the horizontal rib); sock nodes on the
              front sock's left edge, running down to labels below the height dimension */}
          <CalloutsG>
            <Co x={281} y={244} tx={345} ty={200} label="Rib" sub="Steel tip" i={0} />
            <Co x={175} y={350} tx={345} ty={350} label="Hub" i={1} />
            <Co x={295} y={400} tx={345} ty={408} label="Canvas panel" sub="Printed inside" i={2} />
            <Co x={512} y={222} tx={470} ty={470} label="Ribbed cuff" side="left" i={3} />
            <Co x={521} y={273} tx={470} ty={540} label="Jacquard mark" side="left" i={4} />
            <Co x={510} y={406} tx={470} ty={610} label="Heel" side="left" i={5} />
          </CalloutsG>
          <Dim x1={25} y1={520} x2={325} y2={520} value="1 050 mm" offset={20} i={6} />
          <Dim x1={513} y1={200} x2={513} y2={440} value="240 mm" offset={40} i={7} />
        </>
      )}
    </Plate>
  );
}

// 09 Gift card and carrier: the carrier open flat, the front and back cards beside it from above.
export function GiftPlate() {
  const spot = { x: 0.5, y: 0.08 };
  return (
    <Plate name="gift-card-carrier" title="Gift card, front and back, with its carrier" w={W} h={H} spot={spot} floor={null} no="09">
      {({ idp, sh }) => (
        <>
          <At x={300} y={200} k={0.95}>
            <LitG>
              <Carrier id={`${idp}-car`} m={idp} sh={sh(300)} />
            </LitG>
          </At>
          <At x={200} y={440} k={0.85}>
            <GiftFront id={`${idp}-f`} m={idp} sh={sh(200)} />
          </At>
          <At x={450} y={450} k={0.85} rot={-2}>
            <GiftBack id={`${idp}-b`} m={idp} sh={sh(450)} />
          </At>
          {/* carrier callouts above it (each node just inside its top edge), the front's label between carrier and
              card, the back's fields to the right in their own order; the carrier width is dimensioned below it */}
          <CalloutsG>
            <Co x={104} y={162} tx={110} ty={78} label="Card slots" i={0} />
            <Co x={300} y={124} tx={320} ty={78} label="Fold" i={1} />
            <Co x={444} y={124} tx={470} ty={78} label="Crossing bands" i={2} />
            <Co x={110} y={374} tx={110} ty={340} label="Front" i={3} />
            <Co x={427} y={442} tx={600} ty={400} label="Value field" i={4} />
            <Co x={528} y={465} tx={600} ty={470} label="Number field" i={5} />
            <Co x={415} y={483} tx={600} ty={540} label="Code field" i={6} />
          </CalloutsG>
          <Dim x1={92} y1={510} x2={308} y2={510} value="85 mm" offset={22} i={7} />
          <Dim x1={92} y1={370} x2={92} y2={510} value="55 mm" offset={24} i={8} />
          <Dim x1={62} y1={282} x2={538} y2={282} value="220 mm" offset={18} i={9} />
        </>
      )}
    </Plate>
  );
}

export { Stitch };
