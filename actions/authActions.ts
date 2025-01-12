'use server';
import sql from 'better-sqlite3';
import { generateToken, verifyToken } from '@/utils/jwtUtils';
import { hashUserPassword, verifyPassword } from '@/utils/hash';
import {
  ClientLoginSchema,
  ClientSignupSchema,
} from '@/assets/zodValidationSchemas';
import { ClientUser } from '@/assets/types';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import path from 'path';

const dbPath = path.join(__dirname, 'habitat.db');
const db = sql(dbPath);
// Client Sign Up

export const clientSignUp = async (
  prevState: {
    error?: { field: string; message: string }[];
    success?: boolean;
    token?: string;
  },
  formData: FormData
) => {
  const f_name = formData.get('f_name') as string;
  const l_name = formData.get('l_name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  const validationResult = ClientSignupSchema.safeParse({
    f_name,
    l_name,
    email,
    phone,
    password,
    confirmPassword,
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
    return { error: errors, success: false }; // Include success flag
  }
  const hashedPassword = hashUserPassword(password);

  try {
    const result = db
      .prepare(
        `
      INSERT INTO clientUser (f_name, l_name, email, phone, password)
      VALUES (?, ?, ?, ?, ?)
    `
      )
      .run(f_name, l_name, email, phone, hashedPassword);

    const userId = result.lastInsertRowid;
    const token = generateToken(Number(userId));

    db.prepare(`UPDATE clientUser SET token = ? WHERE id = ?`).run(
      token,
      userId
    );
    // Set the token in a cookie
    const theCookies = await cookies();
    theCookies.set('auth_token', token, {
      httpOnly: true, // Ensure it's not accessible from the client-side
      secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
      path: '/', // Cookie is available site-wide
      maxAge: 60 * 60 * 24, // Set expiration (e.g., 1 day)
    });
    return { token };
  } catch (error: any) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return {
        error: [{ field: 'email', message: 'Email is already registered' }],
      };
    }
    throw error;
  }
};

// Client user Log in

export const clientLogin = async (
  prevState: {
    error?: { field: string; message: string }[];
    success?: boolean;
    token?: string;
  },
  formData: FormData
) => {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const validationResult = ClientLoginSchema.safeParse({ email, password });

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
    return { error: errors, success: false }; // Include success flag
  }

  const user = db
    .prepare(`SELECT * FROM clientUser WHERE email = ?`)
    .get(email) as ClientUser;

  if (!user || !verifyPassword(user.password, password)) {
    return {
      error: [{ field: 'email', message: 'This Email is Not Registered yet' }],
    };
  }

  const token = generateToken(user.id);
  db.prepare(`UPDATE clientUser SET token = ? WHERE id = ?`).run(
    token,
    user.id
  );
  // Set the token in a cookie
  const theCookies = await cookies();
  theCookies.set('auth_token', token, {
    httpOnly: true, // Ensure it's not accessible from the client-side
    secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
    path: '/', // Cookie is available site-wide
    maxAge: 60 * 60 * 24, // Set expiration (e.g., 1 day)
  });
  return { token };
};

// Verifying Client Auth

export const verifyAuth = async (token: string | null | undefined) => {
  if (!token) return { user: null };

  const decoded = verifyToken(token);
  if (!decoded) return { user: null };

  // Fetch the user from the database
  const user = db
    .prepare(`SELECT * FROM clientUser WHERE id = ?`)
    .get(decoded.userId) as ClientUser;

  return { user: user || null };
};
// Checking Auth
export const checkAuth = async (): Promise<{ isSignedIn: boolean }> => {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) {
    return { isSignedIn: false };
  }

  // Call your `verifyAuth` function
  const result = await verifyAuth(token);
  return { isSignedIn: !!result.user };
};

// Client Log out
export const clientLogout = async (
  prevState: { success?: string },
  formData: FormData
) => {
  const theCookies = await cookies();
  theCookies.set('auth_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0, // Expire immediately
  });
  revalidatePath('/', 'layout');

  return { success: 'logged out successfully' };
};
