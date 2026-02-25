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
    ['Wireless Bluetooth Headphones', 'Electronics', 79.99, 45, 'ELEC-001', 'Premium over-ear headphones with noise cancellation and 30hr battery life.'],
    ['Laptop Stand', 'Electronics', 34.99, 120, 'ELEC-002', 'Adjustable aluminum laptop stand for improved ergonomics and airflow.'],
    ['USB-C Hub', 'Electronics', 49.99, 75, 'ELEC-003', '7-in-1 USB-C hub with HDMI, USB 3.0, SD card reader, and PD charging.'],
    ['Mechanical Keyboard', 'Electronics', 129.99, 30, 'ELEC-004', 'Compact TKL mechanical keyboard with Cherry MX switches and RGB backlight.'],
    ['Webcam HD 1080p', 'Electronics', 59.99, 55, 'ELEC-005', 'Full HD webcam with built-in microphone and auto light correction.'],
    ["Men's Running Shoes", 'Clothing', 89.99, 200, 'CLTH-001', 'Lightweight and breathable running shoes with cushioned sole.'],
    ["Women's Yoga Pants", 'Clothing', 45.99, 150, 'CLTH-002', 'High-waist yoga pants with moisture-wicking fabric and side pockets.'],
    ['Classic Cotton T-Shirt', 'Clothing', 19.99, 300, 'CLTH-003', '100% organic cotton crew-neck t-shirt available in multiple colors.'],
    ['Winter Jacket', 'Clothing', 149.99, 80, 'CLTH-004', 'Insulated waterproof winter jacket with detachable hood.'],
    ['Baseball Cap', 'Clothing', 24.99, 100, 'CLTH-005', 'Adjustable structured baseball cap with embroidered logo.'],
    ['Organic Coffee Beans', 'Food', 16.99, 250, 'FOOD-001', 'Single-origin fair trade organic coffee beans, medium roast 500g.'],
    ['Green Tea Pack', 'Food', 12.99, 180, 'FOOD-002', 'Premium Japanese green tea, 50 individually wrapped bags.'],
    ['Protein Powder Chocolate', 'Food', 49.99, 90, 'FOOD-003', 'Whey protein powder, chocolate flavor, 2kg. 25g protein per serving.'],
    ['Mixed Nuts 500g', 'Food', 18.99, 140, 'FOOD-004', 'Premium roasted mixed nuts including almonds, cashews, walnuts, and pecans.'],
    ['Olive Oil Extra Virgin', 'Food', 22.99, 160, 'FOOD-005', 'Cold-pressed extra virgin olive oil from Spanish olives, 750ml bottle.'],
    ['Ceramic Plant Pot', 'Home & Garden', 28.99, 70, 'HOME-001', 'Handcrafted ceramic plant pot with drainage hole and bamboo tray, 6 inch.'],
    ['Garden Tool Set', 'Home & Garden', 54.99, 45, 'HOME-002', '5-piece stainless steel garden tool set with ergonomic handles and carry bag.'],
    ['LED Desk Lamp', 'Home & Garden', 39.99, 110, 'HOME-003', 'Eye-care LED desk lamp with adjustable color temperature and brightness, USB charging port.'],
    ['Yoga Mat', 'Sports', 35.99, 95, 'SPRT-001', 'Non-slip TPE yoga mat, 6mm thick with alignment lines, includes carry strap.'],
    ['Water Bottle 1L', 'Sports', 24.99, 220, 'SPRT-002', 'BPA-free stainless steel insulated water bottle, keeps cold 24hrs / hot 12hrs.'],
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
