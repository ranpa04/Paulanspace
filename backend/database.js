const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = path.join(__dirname, 'inventory.db');

const db = new Database(DB_PATH);

db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price REAL NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 0,
    sku TEXT UNIQUE NOT NULL,
    description TEXT
  )
`);

const count = db.prepare('SELECT COUNT(*) as count FROM products').get();

if (count.count === 0) {
  const insert = db.prepare(`
    INSERT INTO products (name, category, price, quantity, sku, description)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const products = [
    ['All-Mountain Snowboard 158cm', 'Snowboards', 549.99, 12, 'SB-001', 'Versatile all-mountain board for intermediate to advanced riders. Directional twin shape, poplar wood core.'],
    ['Freestyle Snowboard 152cm', 'Snowboards', 449.99, 18, 'SB-002', 'Park and pipe specialist with true-twin shape and a soft flex for butters, jumps, and rail tricks.'],
    ['Powder Snowboard 163cm', 'Snowboards', 649.99, 8, 'SB-003', 'Wide nose, tapered tail, and setback stance for effortless float in deep powder conditions.'],
    ['Beginner Snowboard 150cm', 'Snowboards', 299.99, 25, 'SB-004', 'Forgiving flex and catch-free base design make learning to ride easy and fun.'],
    ["Kids Snowboard 130cm", 'Snowboards', 199.99, 15, 'SB-005', 'Lightweight and durable board designed for young riders aged 8–12. Easy-flex construction.'],
    ['Step-On Bindings', 'Bindings', 249.99, 30, 'BD-001', 'Tool-free step-in convenience compatible with Step-On boots. Responsive feel for all-mountain riding.'],
    ['All-Mountain Bindings', 'Bindings', 179.99, 40, 'BD-002', 'Medium-stiff flex bindings with highback support and ankle strap padding for all-day comfort.'],
    ['Freestyle Bindings', 'Bindings', 159.99, 22, 'BD-003', 'Soft and playful bindings built for park riders. Lightweight frame with tool-less strap adjustment.'],
    ['Beginner Binding Set', 'Bindings', 99.99, 35, 'BD-004', 'Entry-level bindings with forgiving flex and easy buckle system. Fits most beginner boards.'],
    ["Men's Snowboard Boots", 'Boots', 229.99, 28, 'BT-001', "Men's all-mountain boot with Boa lacing system, heat-moldable liner, and cushioned footbed."],
    ["Women's Snowboard Boots", 'Boots', 219.99, 20, 'BT-002', "Women's specific fit with soft flex, Boa closure, and lightweight construction for responsive riding."],
    ["Kids Snowboard Boots", 'Boots', 129.99, 14, 'BT-003', 'Easy-entry kids boot with BOA closure and extra-warm liner. Sizes youth 2–6.'],
    ['Snowboard Helmet', 'Helmets & Goggles', 149.99, 45, 'HG-001', 'ASTM-certified helmet with in-mold construction, adjustable ventilation, and audio-compatible ear pads.'],
    ['OTG Ski Goggles', 'Helmets & Goggles', 89.99, 60, 'HG-002', 'Over-the-glasses compatible goggles with spherical lens, anti-fog coating, and UV400 protection.'],
    ['Mirrored Lens Goggles', 'Helmets & Goggles', 119.99, 38, 'HG-003', 'Wide-angle cylindrical mirror lens with triple-layer foam and anti-slip silicone strap.'],
    ["Kids Helmet & Goggle Set", 'Helmets & Goggles', 129.99, 18, 'HG-004', 'Matching youth helmet and goggle combo. Helmet adjustable 50–56cm, goggles fit ages 6–12.'],
    ['Insulated Snow Jacket', 'Outerwear', 299.99, 22, 'OW-001', '20K waterproofing, fully taped seams, powder skirt, and 3-in-1 zip-out fleece liner. Unisex.'],
    ['Snow Pants Waterproof', 'Outerwear', 199.99, 28, 'OW-002', 'Reinforced knees and seat, 15K waterproofing, boot gaiters, and multiple cargo pockets.'],
    ['Thermal Base Layer Set', 'Outerwear', 89.99, 55, 'OW-003', 'Merino wool blend top and bottom. Moisture-wicking, odor-resistant, and temperature-regulating.'],
    ['Snowboard Travel Bag', 'Accessories', 79.99, 30, 'ACC-001', 'Padded wheeled bag fits boards up to 165cm. External boot compartment and lockable zippers.'],
  ];

  const insertMany = db.transaction((items) => {
    for (const item of items) {
      insert.run(...item);
    }
  });

  insertMany(products);
  console.log('Database seeded with 20 products.');
}

module.exports = db;
