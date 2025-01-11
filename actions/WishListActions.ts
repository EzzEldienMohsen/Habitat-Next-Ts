'use server';
import sql from 'better-sqlite3';
import { cookies } from 'next/headers';
import { verifyAuth } from './authActions';
import {
  GetWishlistData,
  Product,
  Wishlist,
  WishlistItem,
} from '@/assets/types';

const db = sql('habitat.db');

//  Get All the wishlist data
export const getAllWishlistItems = async (): Promise<GetWishlistData> => {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) {
    return {
      items: [],
      totalItems: 0,
      error: [{ field: 'general', message: 'User not signed in' }],
    };
  }

  const authResult = await verifyAuth(token);
  const clientId = authResult.user?.id;

  const wishlist = db
    .prepare(`SELECT * FROM wishlist WHERE client_id = ?`)
    .get(clientId) as Wishlist;

  if (!wishlist) {
    return { items: [], totalItems: 0 };
  }

  const wishlistItems = db
    .prepare(`SELECT * FROM wishlist_items WHERE wishlist_id = ?`)
    .all(wishlist.id) as WishlistItem[];

  return { items: wishlistItems, totalItems: wishlistItems.length };
};

// Add To WishList

export const addToWishlist = async (wishlistData: Product) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) {
    return {
      success: false,
      error: [{ field: 'general', message: 'User not signed in' }],
    };
  }

  const authResult = await verifyAuth(token);
  const clientId = authResult.user?.id;

  let wishlist = db
    .prepare(`SELECT * FROM wishlist WHERE client_id = ?`)
    .get(clientId) as Wishlist;
  if (!wishlist) {
    wishlist = db
      .prepare(`INSERT INTO wishlist (client_id) VALUES (?) RETURNING *`)
      .get(clientId) as Wishlist;
  }

  db.prepare(
    `
    INSERT INTO wishlist_items (img, name, type, price, cat, wishlist_id, product_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `
  ).run(
    wishlistData.img,
    wishlistData.name,
    wishlistData.type,
    wishlistData.price,
    wishlistData.cat,
    wishlist.id,
    wishlistData.id
  );

  return { success: true };
};

// remove From WishList

export const removeFromWishlist = async (wishId: number) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) {
    return {
      success: false,
      error: [{ field: 'general', message: 'User not signed in' }],
    };
  }

  const authResult = await verifyAuth(token);
  const clientId = authResult.user?.id;

  const wishlist = db
    .prepare(`SELECT * FROM wishlist WHERE client_id = ?`)
    .get(clientId) as Wishlist;

  if (!wishlist) {
    return {
      success: false,
      error: [{ field: 'general', message: 'Wishlist not found' }],
    };
  }

  db.prepare(`DELETE FROM wishlist_items WHERE id = ? AND wishlist_id = ?`).run(
    wishId,
    wishlist.id
  );

  return { success: true };
};

// Clear all the wish List

export const clearWishlist = async (wishlistId: number) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) {
    return {
      success: false,
      error: [{ field: 'general', message: 'User not signed in' }],
    };
  }

  const authResult = await verifyAuth(token);
  const clientId = authResult.user?.id;

  db.prepare(`DELETE FROM wishlist WHERE client_id = ? AND id = ?`).run(
    clientId,
    wishlistId
  );

  return { success: true };
};
