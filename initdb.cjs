const sql = require('better-sqlite3');
const { products } = require('./assets/products');
const db = sql('habitat.db');

// Initialize Foreign Keys
db.pragma('foreign_keys = ON');

// PRODUCTS TABLE
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY NOT NULL UNIQUE,
    img TEXT NOT NULL,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    price INTEGER NOT NULL,
    cat TEXT NOT NULL
  )
`
).run();

// CLIENT USER TABLE
db.prepare(
  `
 CREATE TABLE IF NOT EXISTS clientUser (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  token TEXT,
  f_name TEXT NOT NULL,
  l_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  main_address TEXT,
  password TEXT NOT NULL,
  gender TEXT,
  date_of_birth DATE,
  nationality TEXT,
  avatar_url TEXT,
  bio TEXT
);
`
).run();

// CART TABLE
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS cart (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_id INTEGER NOT NULL,
    total_price REAL NOT NULL DEFAULT 0,
    taxes REAL NOT NULL DEFAULT 0.05,
    sub_total REAL NOT NULL DEFAULT 0,
    FOREIGN KEY (client_id) REFERENCES clientUser(id) ON DELETE CASCADE
  )
`
).run();

// CART PRODUCTS TABLE
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS cart_products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    img TEXT NOT NULL,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    price INTEGER NOT NULL,
    cat TEXT NOT NULL,
    cart_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    amount INTEGER NOT NULL DEFAULT 1,
    FOREIGN KEY (cart_id) REFERENCES cart(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
  )
`
).run();
// WISHLIST TABLE
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS wishlist (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_id INTEGER NOT NULL,
    FOREIGN KEY (client_id) REFERENCES clientUser(id) ON DELETE CASCADE
  )
`
).run();

// WISHLIST ITEMS TABLE
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS wishlist_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    img TEXT NOT NULL,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    price INTEGER NOT NULL,
    cat TEXT NOT NULL,
    wishlist_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    FOREIGN KEY (wishlist_id) REFERENCES wishlist(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
  )
`
).run();

// CLIENT ADDRESS TABLE
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS client_address (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    address_name TEXT NOT NULL,
    address_details TEXT NOT NULL,
    client_id INTEGER NOT NULL,
    FOREIGN KEY (client_id) REFERENCES clientUser(id) ON DELETE CASCADE
  )
`
).run();

// ADMIN USER TABLE
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS adminUser (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  )
`
).run();

// ORDERS TABLE
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_id INTEGER NOT NULL,
    cart_products_id INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'Pending',
    address TEXT NOT NULL,
    total_price REAL NOT NULL,
    FOREIGN KEY (client_id) REFERENCES clientUser(id) ON DELETE CASCADE,
    FOREIGN KEY (cart_products_id) REFERENCES cart_products(id) ON DELETE CASCADE
  )
`
).run();

// BRANCH ADDRESS TABLE
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS branchAddress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    address_name TEXT NOT NULL,
    address_details TEXT NOT NULL,
    working_hours TEXT NOT NULL,
    holidays TEXT NOT NULL,
    admin_id INTEGER NOT NULL,
    FOREIGN KEY (admin_id) REFERENCES adminUser(id) ON DELETE CASCADE
  )
`
).run();

// MESSAGES TABLE

db.prepare(
  `
CREATE TABLE IF NOT EXISTS contact (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL
)
`
).run();

// PRODUCTS INITIAL DATA
const initData = async () => {
  const stmt = db.prepare(`
    INSERT INTO products VALUES (
      @id,
      @img,
      @name,
      @type,
      @price,
      @cat
    )
  `);
  for (const product of products) {
    stmt.run(product);
  }
};

initData();
