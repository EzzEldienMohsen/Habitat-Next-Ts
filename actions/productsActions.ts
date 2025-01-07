'use server';
import { Product, Products } from '@/assets/types';
import { messageSchema } from '@/assets/zodValidationSchemas';
import sql from 'better-sqlite3';
import { revalidatePath } from 'next/cache';

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

export const getProductById = async (id: string): Promise<Product> => {
  const query = `SELECT * FROM products WHERE id = @id`;
  const stmt = db.prepare(query);
  const product = stmt.get({ id }) as Product;

  return product;
};

//  Saving the contact message functionality

export const sendMessages = async (
  prevState: { error?: { field: string; message: string }[] },
  formData: FormData
): Promise<{ error?: { field: string; message: string }[] }> => {
  const name = formData.get('name')?.toString() || '';
  const phone = formData.get('phone')?.toString() || '';
  const email = formData.get('email')?.toString() || '';
  const message = formData.get('message')?.toString() || '';

  // Validate with Zod Schema
  const validationResult = messageSchema.safeParse({
    name,
    phone,
    email,
    message,
  });
  if (!validationResult.success) {
    const errorMap = validationResult.error.format();
    const errors = Object.entries(errorMap).flatMap(([key, value]) => {
      if (Array.isArray(value)) {
        // If it's a string array, map directly
        return value.map((message) => ({
          field: key,
          message,
        }));
      } else if (value && '_errors' in value) {
        // If it's an object with _errors, map those
        return value._errors.map((message) => ({
          field: key,
          message,
        }));
      }
      return []; // No errors for this field
    });
    return { error: errors };
  }

  try {
    // Store the message in the database
    const stmt = db.prepare(`
      INSERT INTO contact (name, phone, email, message)
      VALUES (?, ?, ?, ?)
    `);
    stmt.run(name, phone, email, message);

    revalidatePath('/', 'layout');
    return {};
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Message could not be stored. Please try again later.');
  }
};
