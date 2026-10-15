export const CATALOG_PRODUCTS = [
  {
    id: 'boxes',
    number: '01',
    category: 'Boxes',
    title: 'Custom Boxes',
    subtitle: 'Tuck-in Corrugated & Paperboard • Plain or Logo Printed',
    image: '/images/products/boxes.jpg?v=3',
    description:
      'Tuck-in type corrugated packaging boxes available in Plain Kraft Brown, Crisp White, Pastel Pink, Teal Green, and Matte Black — or fully customized with your brand logo printing and bespoke sizing.',
    specs: {
      material: '250 GSM Premium Paperboard & Corrugated Board',
      colors: 'Plain Brown, White, Pink, Teal Green, Black',
      finishes: ['Tuck-in Flaps', 'Plain or Logo Printing', 'Matte / Gloss Coating', 'Bespoke Custom Sizes'],
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
    subtitle: '350 GSM Board • Circle, Square, Rectangle & Oval',
    image: '/images/products/cards.jpg?v=3',
    description:
      'Custom-crafted cards on heavyweight 350 GSM board with premium lamination tailored to your branding. Available in Circle, Square, Rectangle, and Oval die-cut shapes.',
    specs: {
      material: '350 GSM Heavyweight Premium Board',
      shapes: 'Circle • Square • Rectangle • Oval',
      finishes: ['Thermal Lamination', 'Matte Finish', 'Gloss Finish', 'Velvet Touch'],
      moq: '200, 300, 1,000, 2,000 cards',
      designCharge: '₹1,000 (One-time charge)',
      dieCharge: 'First-time die charge required for custom/new sizes',
      leadTime: '3–5 Business Days'
    }
  },
  {
    id: 'tags',
    number: '03',
    category: 'Tags',
    title: 'Custom Tags',
    subtitle: 'Pre-Punched Hole • Circle, Square, Rectangle & Oval',
    image: '/images/products/tags.jpg?v=3',
    description:
      'Bespoke merchandise tags pre-punched with a clean hole (supplied ready without rope). Precision die-cut in Circle, Square, Rectangle, and Oval shapes with luxury foil and debossed logo printing.',
    specs: {
      material: '350–500 GSM Kraft & Uncoated Ivory Board',
      hole: 'Pre-punched clean hole (without rope)',
      shapes: 'Circle • Square • Rectangle • Oval • Custom Shape',
      finishes: ['Clean Hole Punch', 'Gold / Copper Foil', 'Debossed / Screen Print'],
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
    title: 'Custom Stickers & Labels',
    subtitle: 'Sheet Format • Waterproof, Silver & Transparent',
    image: '/images/products/stickers.jpg?v=3',
    description:
      'Precision kiss-cut sticker sheets in premium finishes: White Base Waterproof, Silver Metallic Base, Transparent Clear Base, and Standard Paper. Die-cut to your brand logo shape or geometric contours.',
    specs: {
      material: 'Waterproof Vinyl & Specialty Film Sheets',
      format: 'Flat Rectangle Sheet Format (Not rolls)',
      finishes: ['White Base Waterproof', 'Silver Metallic Base', 'Transparent Clear Base', 'Standard Paper'],
      shapes: 'Circle • Square • Rectangle • Oval • Custom Logo Contour',
      moq: '5 Sheets, 10 Sheets, 25 Sheets, 50 Sheets, 100+ Sheets',
      note: 'Sticker yield per sheet depends on your brand logo size and shape.',
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
    subtitle: 'Flat Wood Mount • 5 Sizes • Black, Red & Green Ink',
    image: '/images/products/stamps.jpg?v=3',
    description:
      'Laser-engraved custom rubber stamps mounted on minimalist flat hardwood blocks (modern design without tall handles). Available in 5 versatile sizes with optional Black, Red, or Green ink pads.',
    specs: {
      material: 'Flat Hardwood Block Mount + Vulcanized Rubber (No handle)',
      sizes: '2"×2", 3"×3", 4"×4", 3"×6", 6"×7"',
      inkPad: 'Black, Red, Green (Optional)',
      finishes: ['Precision Laser Engraving', 'Flat Hardwood Mount', 'Optional Ink Pad'],
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
    image: '/images/products/paper-bags.jpg?v=3',
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
