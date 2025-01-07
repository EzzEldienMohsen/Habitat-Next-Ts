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

// Client sign up zod schema
export const ClientSignupSchema = z
  .object({
    f_name: z.string().min(3, 'First name must be at least 3 characters long'),
    l_name: z.string().min(3, 'Last name must be at least 3 characters long'),
    email: z.string().email('Invalid email address'),
    phone: z
      .string()
      .regex(/^01[0-2,5][0-9]{8}$/, 'Invalid Egyptian phone number'),
    password: z
      .string()
      .min(8)
      .regex(/[@#$%^&*]/, 'Password must include @, #, $, %, ^, or &'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords must match',
  });

// Client Login Schema
export const ClientLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8),
});
