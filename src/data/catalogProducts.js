export const CATALOG_PRODUCTS = [
  {
    id: 'boxes',
    number: '01',
    category: 'Boxes',
    title: 'Custom Boxes',
    subtitle: 'Tuck-in Type • 250 GSM Only',
    image: '/images/products/boxes.jpg',
    description:
      'Tuck-in type packaging boxes manufactured in 250 GSM paperboard. Min. 50 units (Plain) / 100 units (With Logo).',
    specs: {
      material: '250 GSM Paperboard (Tuck-in Type Only)',
      finishes: ['Tuck-in Flaps', 'Matte / Gloss Coating', 'Custom Logo Printing'],
      moq: '50 units (Plain) / 100 units (With Logo)',
      designCharge: '₹1,000 (One-time charge)',
      dieCharge: 'First-time die charge required for custom/new sizes',
      leadTime: '5–7 Business Days'
    }
  },
  {
    id: 'cards',
    number: '02',
    category: 'Cards',
    title: 'Premium Cards',
    subtitle: '350 GSM • Square • Circle • Rectangle',
    image: '/images/products/cards.jpg',
    description:
      'Premium cards on 350 GSM heavy board. Available in Square, Circle, and Rectangle with Lamination, Matte, and Gloss finishes.',
    specs: {
      material: '350 GSM Heavyweight Premium Board',
      shapes: 'Square • Circle • Rectangle',
      finishes: ['Lamination', 'Matte Finish', 'Gloss Finish'],
      moq: '100 cards',
      designCharge: '₹1,000 (One-time charge)',
      dieCharge: 'First-time die charge required for custom/new sizes',
      leadTime: '3–5 Business Days'
    }
  },
  {
    id: 'tags',
    number: '03',
    category: 'Tags',
    title: 'Custom Hang Tags',
    subtitle: 'Apparel • Retail • Gifting',
    image: '/images/products/tags.jpg',
    description:
      'Bespoke swing tags with custom die-cut contours, metallic brass eyelets, and natural jute or wax cord attachment.',
    specs: {
      material: '350–500 GSM Kraft & Uncoated Ivory Board',
      finishes: ['Gold / Copper Foil', 'Reinforced Metal Eyelet', 'Custom Die-cut'],
      moq: '250 tags',
      designCharge: '₹1,000 (One-time charge)',
      dieCharge: 'First-time die charge required for custom/new sizes',
      leadTime: '4–6 Business Days'
    }
  },
  {
    id: 'stickers',
    number: '04',
    category: 'Stickers',
    title: 'Custom Stickers & Seals',
    subtitle: 'Waterproof • Rolls • Die-Cut',
    image: '/images/products/stickers.jpg',
    description:
      'Weatherproof matte vinyl kiss-cut sticker rolls and individual die-cut seals for package closures and brand merchandising.',
    specs: {
      material: 'Durable Matte Waterproof Vinyl (Oil & UV resistant)',
      finishes: ['Matte Lamination', 'Contour Die-cut', 'Perforated Roll'],
      moq: '500 stickers',
      designCharge: '₹1,000 (One-time charge)',
      dieCharge: 'First-time die charge required for custom/new sizes',
      leadTime: '3–5 Business Days'
    }
  },
  {
    id: 'stamps',
    number: '05',
    category: 'Stamps',
    title: 'Artisanal Wooden Stamps',
    subtitle: 'Turned Wood • Bespoke Die',
    image: '/images/products/stamps.jpg',
    description:
      'Heirloom handcrafted hardwood rubber stamps with precision micro-engraved die for on-demand organic packaging branding.',
    specs: {
      material: 'Turned Solid Rosewood Handle + Natural Vulcanized Rubber',
      finishes: ['Precision Laser Engraving', 'Water-based Ink Pad Included'],
      moq: '1 piece',
      designCharge: '₹1,000 (One-time charge)',
      dieCharge: 'First-time die charge required for custom/new sizes',
      leadTime: '2–4 Business Days'
    }
  },
  {
    id: 'paper-bags',
    number: '06',
    category: 'Paper Bags',
    title: 'Premium Paper Bags',
    subtitle: '140 GSM Kraft • 120 GSM White • 250–300 GSM Superior',
    image: '/images/products/paper-bags.jpg',
    description:
      'Heavyweight retail shopping bags in 140 GSM Kraft, 120 GSM White Paper, and 250–300 GSM Superior Paperboard. Plain starts from 250 units; Custom logo & full customization starts from 500 units.',
    specs: {
      material: 'Kraft: 140 GSM • White Paper: 120 GSM • Superior: 250–300 GSM',
      finishes: ['Twisted Cotton Handles', 'Card-reinforced Base', 'Full-color Print / Foil'],
      moq: '250 units (Plain) / 500 units (Customized)',
      designCharge: '₹1,000 (One-time charge)',
      dieCharge: 'First-time die charge required for custom/new sizes',
      leadTime: '5–8 Business Days'
    }
  }
];

export const CATALOG_CATEGORIES = [
  { id: 'all', label: 'All', count: 6 },
  { id: 'Boxes', label: 'Boxes', count: 1 },
  { id: 'Cards', label: 'Cards', count: 1 },
  { id: 'Tags', label: 'Tags', count: 1 },
  { id: 'Stickers', label: 'Stickers', count: 1 },
  { id: 'Stamps', label: 'Stamps', count: 1 },
  { id: 'Paper Bags', label: 'Paper Bags', count: 1 }
];
