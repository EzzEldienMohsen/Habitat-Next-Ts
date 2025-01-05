const sql = require('better-sqlite3');
const { products } = require('./assets/products');
const db = sql('habitat.db');

db.prepare(
  `CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY NOT NULL UNIQUE,
        img TEXT NOT NULL,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        price INTEGER NOT NULL,
        cat TEXT NOT NULL 
    )`
).run();

const initData = async () => {
  const stmt = db.prepare(
    `INSERT INTO products VALUES (
        @id,
        @img,
        @name,
        @type,
        @price,
        @cat
    )`
  );
  for (const product of products) {
    stmt.run(product);
  }
};

initData();
