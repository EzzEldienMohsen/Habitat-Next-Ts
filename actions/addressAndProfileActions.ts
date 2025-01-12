'use server';
import { ClientAddress, ClientUser } from '@/assets/types';
import sql from 'better-sqlite3';
import { cookies } from 'next/headers';
import { verifyAuth } from './authActions';
import {
  ClientAddressSchema,
  ClientUserSchema,
} from '@/assets/zodValidationSchemas';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

const db = sql('habitat.db');

// Create A new Address
export const createAddress = async (
  prevState: {
    error?: { field: string; message: string }[];
    success?: boolean;
  },
  formData: FormData
) => {
  const address_name = formData.get('address_name') as string;
  const address_details = formData.get('address_details') as string;

  const validationResult = ClientAddressSchema.safeParse({
    address_name,
    address_details,
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
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) {
    return {
      error: [{ field: 'general', message: 'User not signed in' }],
    };
  }

  // Call your `verifyAuth` function
  const theResult = await verifyAuth(token);
  const clientId = theResult.user?.id;
  const result = db
    .prepare(
      ` INSERT INTO client_address (address_name, address_details, client_id) VALUES (?, ?, ?) `
    )
    .run(address_name, address_details, clientId);
  return { success: true };
};

// get a specific client address
export const getAddressById = async (
  id?: string
): Promise<{
  address?: ClientAddress;
  error?: { field: string; message: string }[];
}> => {
  if (!id) {
    return {
      error: [
        {
          field: 'id',
          message: 'Address ID is required and must be an integer',
        },
      ],
    };
  }
  const parsedId = parseInt(id, 10);
  if (isNaN(parsedId)) {
    return {
      error: [
        {
          field: 'id',
          message: 'Address ID is required and must be an integer',
        },
      ],
    };
  }
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) {
    return {
      error: [{ field: 'general', message: 'User not signed in' }],
    };
  }

  // Call your `verifyAuth` function
  const result = await verifyAuth(token);
  const clientId = result.user?.id;
  const address = db
    .prepare(`SELECT * FROM client_address WHERE id = ? AND client_id = ?`)
    .get(parsedId, clientId) as ClientAddress | undefined;

  if (!address)
    return { error: [{ field: 'address', message: 'Address not found' }] };

  return { address };
};

// updating the address
export const updateAddress = async (
  prevState: {
    error?: { field: string; message: string }[];
    success?: boolean;
  },
  formData: FormData
) => {
  const id = Number(formData.get('id'));
  if (isNaN(id)) {
    return { error: [{ field: 'id', message: 'Invalid address ID' }] };
  }
  const address_name = formData.get('address_name') as string;
  const address_details = formData.get('address_details') as string;

  const validationResult = ClientAddressSchema.safeParse({
    address_name,
    address_details,
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
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) {
    redirect('/');
  }

  // Call your `verifyAuth` function
  const result = await verifyAuth(token);
  const clientId = result.user?.id;

  try {
    const result = db
      .prepare(
        `UPDATE client_address SET address_name = ?, address_details = ? WHERE id = ? AND client_id = ?`
      )
      .run(address_name, address_details, id, clientId);

    if (result.changes === 0)
      return { error: [{ field: 'id', message: 'Update failed' }] };
    const success = result.changes > 0;

    if (success) {
      revalidatePath('/address');
    }

    return { success };
  } catch (error) {
    return { error: [{ field: 'general', message: 'Database error' }] };
  }
};

// removing an address

export const deleteAddress = async (
  prevState: { success?: boolean },
  formData: FormData
) => {
  const id = Number(formData.get('id'));
  if (!id) return { success: false };

  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) {
    return { success: false };
  }

  const theResult = await verifyAuth(token);
  const clientId = theResult.user?.id;

  if (!clientId) {
    return { success: false };
  }

  const result = db
    .prepare(`DELETE FROM client_address WHERE id = ? AND client_id = ?`)
    .run(id, clientId);

  const success = result.changes > 0;

  if (success) {
    revalidatePath('/address');
  }

  return { success };
};

//  getting all the addresses

export const getAllAddresses = async (): Promise<ClientAddress[]> => {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  // Call your `verifyAuth` function
  const result = await verifyAuth(token);
  const clientId = result.user?.id;
  return db
    .prepare(`SELECT * FROM client_address WHERE client_id = ?`)
    .all(clientId) as ClientAddress[];
};
//  USER SECTION

// Get profile
export const getProfile = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  const authResult = await verifyAuth(token);
  const clientId = authResult.user?.id;
  if (!clientId) return { error: { message: 'Invalid user ID' } };
  const user = db
    .prepare(`SELECT * FROM clientUser WHERE id = ?`)
    .get(clientId) as ClientUser;

  if (!user) return { error: { message: 'User not found' } };

  return { user };
};

// update user profile
export const updateProfile = async (
  prevState: {
    error?: { field: string; message: string }[];
    success?: boolean;
  },
  formData: FormData
) => {
  const data = Object.fromEntries(formData.entries());

  const validationResult = ClientUserSchema.safeParse(data);
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

  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) {
    return { error: [{ field: 'general', message: 'User not signed in' }] };
  }

  const authResult = await verifyAuth(token);
  const clientId = authResult.user?.id;

  try {
    const result = db
      .prepare(
        `UPDATE clientUser 
         SET f_name = ?, l_name = ?, email = ?, phone = ?, 
             main_address = ?, gender = ?, date_of_birth = ?, 
             nationality = ?, avatar_url = ?, bio = ? 
         WHERE id = ?`
      )
      .run(
        data.f_name,
        data.l_name,
        data.email,
        data.phone,
        data.main_address || null,
        data.gender || null,
        data.date_of_birth || null,
        data.nationality || null,
        data.avatar_url || null,
        data.bio || null,
        clientId
      );

    if (result.changes === 0) {
      return {
        error: [{ field: 'id', message: 'Update failed' }],
        success: false,
      };
    }

    const success = result.changes > 0;

    if (success) {
      revalidatePath('/profile');
    }

    return { success };
  } catch (error) {
    return { error: [{ field: 'general', message: 'Database error' }] };
  }
};

// Delete user Profile

export const deleteProfile = async (
  prevState: { success?: boolean },
  formData: FormData
) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) return { success: false };

  const authResult = await verifyAuth(token);
  const clientId = authResult.user?.id;

  const result = db
    .prepare(`DELETE FROM clientUser WHERE id = ?`)
    .run(clientId);

  const success = result.changes > 0;

  if (success) {
    cookieStore.set('auth_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 0, // Expire immediately
    });
    revalidatePath('/');
  }

  return { success };
};
