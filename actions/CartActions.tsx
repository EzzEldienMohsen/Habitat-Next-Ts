'use server';
import sql from 'better-sqlite3';
import { cookies } from 'next/headers';
import { verifyAuth } from './authActions';
import { Cart, CartProduct } from '@/assets/types';
const db = sql('habitat.db');

// Get the Cart
export const getAllCartItems = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) {
    return {
      items: [],
      total: 0,
      error: [{ field: 'general', message: 'User not signed in' }],
    };
  }

  const authResult = await verifyAuth(token);
  const clientId = authResult.user?.id;

  const cart = db
    .prepare(`SELECT * FROM cart WHERE client_id = ?`)
    .get(clientId) as Cart;

  if (!cart) {
    return { items: [], total: 0 };
  }

  const cartItems = db
    .prepare(`SELECT * FROM cart_products WHERE cart_id = ? And `)
    .all(cart.id) as CartProduct[];
  const subTotal = cartItems.reduce(
    (total, item) => total + item.price * item.amount,
    0
  );
  const taxes = subTotal * cart.taxes;
  const totalPrice = subTotal + taxes;

  return { items: cartItems, total: totalPrice };
};

// Add ITem to cart
export const addToCart = async (
  prevState: { success?: boolean },
  cartData: CartProduct
) => {
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

  let cart = db
    .prepare(`SELECT * FROM cart WHERE client_id = ?`)
    .get(clientId) as Cart;
  if (!cart) {
    cart = db
      .prepare(`INSERT INTO cart (client_id) VALUES (?) RETURNING *`)
      .get(clientId) as Cart;
  }

  db.prepare(
    `
    INSERT INTO cart_products (img, name, type, price, cat, cart_id, product_id, amount)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `
  ).run(
    cartData.img,
    cartData.name,
    cartData.type,
    cartData.price,
    cartData.cat,
    cart.id,
    cartData.id,
    cartData.amount
  );

  const cartItems = db
    .prepare(`SELECT * FROM cart_products WHERE cart_id = ?`)
    .all(cart.id) as CartProduct[];
  const subTotal = cartItems.reduce(
    (total, item) => total + item.price * item.amount,
    0
  );
  const taxes = subTotal * cart.taxes;
  const totalPrice = subTotal + taxes;

  db.prepare(
    `UPDATE cart SET sub_total = ?, total_price = ?, taxes = ? WHERE id = ?`
  ).run(subTotal, totalPrice, taxes, cart.id);

  return { success: true };
};

// Update Item Quantity in Cart
export const updateCartItem = async (productId: number, newAmount: number) => {
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

  const cart = db
    .prepare(`SELECT * FROM cart WHERE client_id = ?`)
    .get(clientId) as Cart;

  if (!cart) {
    return {
      success: false,
      error: [{ field: 'general', message: 'Cart not found' }],
    };
  }

  if (newAmount <= 0) {
    // If the new amount is less than or equal to 0, remove the item
    return removeFromCart(productId);
  }

  db.prepare(
    `UPDATE cart_products SET amount = ? WHERE product_id = ? AND cart_id = ?`
  ).run(newAmount, productId, cart.id);

  const cartItems = db
    .prepare(`SELECT * FROM cart_products WHERE cart_id = ?`)
    .all(cart.id) as CartProduct[];

  const subTotal = cartItems.reduce(
    (total, item) => total + item.price * item.amount,
    0
  );
  const taxes = subTotal * cart.taxes;
  const totalPrice = subTotal + taxes;

  db.prepare(
    `UPDATE cart SET sub_total = ?, total_price = ?, taxes = ? WHERE id = ?`
  ).run(subTotal, totalPrice, taxes, cart.id);

  return { success: true };
};

// Remove Item from Cart
export const removeFromCart = async (productId: number) => {
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

  const cart = db
    .prepare(`SELECT * FROM cart WHERE client_id = ?`)
    .get(clientId) as Cart;

  if (!cart) {
    return {
      success: false,
      error: [{ field: 'general', message: 'Cart not found' }],
    };
  }

  db.prepare(
    `DELETE FROM cart_products WHERE product_id = ? AND cart_id = ?`
  ).run(productId, cart.id);

  const cartItems = db
    .prepare(`SELECT * FROM cart_products WHERE cart_id = ?`)
    .all(cart.id) as CartProduct[];

  const subTotal = cartItems.reduce(
    (total, item) => total + item.price * item.amount,
    0
  );
  const taxes = subTotal * cart.taxes;
  const totalPrice = subTotal + taxes;

  db.prepare(
    `UPDATE cart SET sub_total = ?, total_price = ?, taxes = ? WHERE id = ?`
  ).run(subTotal, totalPrice, taxes, cart.id);

  return { success: true };
};
