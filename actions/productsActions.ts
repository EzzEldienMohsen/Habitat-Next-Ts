'use server';
import { Products } from '@/assets/types';
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
