'use server';
import { Product, Products } from '@/assets/types';
import sql from 'better-sqlite3';
const db = sql('habitat.db');
export const getMainProducts = async (
  limit: number = 8,
  offset: number = 0,
  category?: string
): Promise<Products> => {
  let query = `
    SELECT * FROM products
    ${category ? 'WHERE cat = @category' : ''}
    LIMIT @limit OFFSET @offset
  `;

  const stmt = db.prepare(query);
  const params = {
    limit,
    offset,
    ...(category && { category }),
  };

  return stmt.all(params) as Products;
};

export const getSpecialProducts = async (): Promise<Products> => {
  return db
    .prepare(
      `
SELECT * FROM products
ORDER BY id DESC
LIMIT 4 
`
    )
    .all() as Products;
};

// get the paginated filter products
export const getPaginatedProducts = async (
  limit: number = 8,
  offset: number = 0,
  category?: string
): Promise<{ products: Products; totalPages: number; currentPage: number }> => {
  // Get total count of products
  const totalCountQuery = `
    SELECT COUNT(*) as count 
    FROM products 
    ${category ? 'WHERE cat = @category' : ''}
  `;
  const totalCountStmt = db.prepare(totalCountQuery);
  const totalCountResult = totalCountStmt.get({ category }) as {
    count: number;
  };
  const totalCount = totalCountResult.count;

  // Fetch paginated products
  const productQuery = `
    SELECT * FROM products 
    ${category ? 'WHERE cat = @category' : ''} 
    LIMIT @limit OFFSET @offset
  `;
  const productStmt = db.prepare(productQuery);
  const products = productStmt.all({ limit, offset, category }) as Products;

  const totalPages = Math.ceil(totalCount / limit);
  const currentPage = Math.floor(offset / limit) + 1;

  return {
    products,
    totalPages,
    currentPage,
  };
};

//  get single product by id

export const getProductById = async (id: number): Promise<Product | null> => {
  const query = `SELECT * FROM products WHERE id = @id`;
  const stmt = db.prepare(query);
  const product = stmt.get({ id }) as Product | undefined;

  return product || null;
};
