import { z } from 'zod';

// Messages Form Validation
export const messageSchema = z.object({
  name: z
    .string()
    .min(4, 'Name must be at least 4 characters long')
    .trim()
    .nonempty('Name field is required'),
  phone: z
    .string()
    .regex(/^01[0-2,5][0-9]{8}$/, 'Phone must be a valid Egyptian number')
    .nonempty('Phone field is required'),
  email: z
    .string()
    .email('Invalid email address')
    .nonempty('Email field is required'),
  message: z
    .string()
    .min(15, 'Message must be at least 15 characters long')
    .trim()
    .nonempty('Message field is required'),
});
