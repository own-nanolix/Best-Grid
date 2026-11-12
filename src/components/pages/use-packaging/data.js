// Plate metadata: number, plain name and spec rows (our own production values in plain mm). The SVG spec column and
// the HTML list under each plate both read this, so they cannot drift apart.
const r = (...a) => a.map(([k, v]) => ({ k, v }));
export const META = {
  'tape-roll-blue': { no: '01', label: 'Tape roll', rows: r(['Width', '48 mm'], ['Outer diameter', '100 mm'], ['Core', '76 mm'], ['Film', 'Active Blue'], ['Length', '66 m']) },
  'tape-roll-dark': { no: '02', label: 'Tape roll', rows: r(['Width', '48 mm'], ['Outer diameter', '100 mm'], ['Core', '76 mm'], ['Film', 'Dark Blue'], ['Thickness', '0.05 mm']) },
  'tape-strips': { no: '03', label: 'Tape strips', rows: r(['Width', '48 mm'], ['Cut length', '300 mm'], ['Print repeat', '150 mm'], ['Film', 'Three colourways']) },
  'shipping-stack': { no: '04', label: 'Shipping boxes', rows: r(['Large, mm', '500 × 400 × 340'], ['Small, mm', '280 × 220 × 200'], ['Board', 'Single wall, 5 mm'], ['Tape', '48 mm'], ['Print', 'One colour']) },
  'shipping-mailer': { no: '05', label: 'Shipping box', rows: r(['Length', '480 mm'], ['Width', '260 mm'], ['Height', '180 mm'], ['Board', 'Dark Blue, 3 mm'], ['Print', 'Two colours']) },
  'product-lid': { no: '06', label: 'Product box', rows: r(['Lid', '408 × 258 mm'], ['Base height', '140 mm'], ['Lid depth', '28 mm'], ['Board', '2 mm rigid'], ['Finish', 'Uncoated']) },
  'tube-carton': { no: '07', label: 'Product box, tube', rows: r(['Carton', '440 × 280 mm'], ['Carton height', '110 mm'], ['Tube diameter', '90 mm'], ['Tube length', '280 mm'], ['Label', '70 × 74 mm']) },
  'bag-tall': { no: '08', label: 'Shopping bag, tall', rows: r(['Height', '500 mm'], ['Width', '290 mm'], ['Gusset', '140 mm'], ['Paper', '170 g/m²'], ['Handle', 'Rope, 8 mm']) },
  'bag-medium': { no: '09', label: 'Shopping bag, medium', rows: r(['Height', '380 mm'], ['Width', '320 mm'], ['Gusset', '150 mm'], ['Paper', '170 g/m²'], ['Handle', 'Ribbon, 20 mm']) },
  'bag-small': { no: '10', label: 'Shopping bag, small', rows: r(['Height', '280 mm'], ['Width', '250 mm'], ['Gusset', '125 mm'], ['Paper', '150 g/m²'], ['Handle', 'Rope, 6 mm']) },
  'tissue-box': { no: '11', label: 'Tissue paper', rows: r(['Inside, mm', '484 × 364 mm'], ['Sheet, mm', '500 × 700 mm'], ['Paper', '17 g/m²'], ['Print', 'Mark repeat'], ['Fold', 'In three']) },
  'seal-sheet': { no: '12', label: 'Seal sticker', rows: r(['Seal', '36 × 36 mm'], ['Liner', '150 × 100 mm'], ['Stock', 'Matt, 80 µm'], ['Print', 'Two colours']) },
  'shipping-label': { no: '13', label: 'Label', rows: r(['Label', '100 × 70 mm'], ['Stock', 'Matt paper'], ['Print', 'One colour'], ['Barcode', 'Plain bars']) },
  'tube-label': { no: '14', label: 'Tube label', rows: r(['Label', '70 × 74 mm'], ['Stock', 'Matt grey'], ['Print', 'Blue ink'], ['Layout', 'Bottom to top']) },
};
