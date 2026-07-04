import { z } from 'zod'

/**
 * Email validation schema
 */
export const emailSchema = z.string().email('Email tidak valid')

/**
 * Password validation schema
 * - Minimum 8 characters
 * - At least 1 uppercase letter
 * - At least 1 lowercase letter
 * - At least 1 number
 */
export const passwordSchema = z
  .string()
  .min(8, 'Password minimal 8 karakter')
  .regex(/[A-Z]/, 'Password harus mengandung huruf besar')
  .regex(/[a-z]/, 'Password harus mengandung huruf kecil')
  .regex(/[0-9]/, 'Password harus mengandung angka')

/**
 * Phone number validation schema (Indonesian)
 */
export const phoneSchema = z
  .string()
  .regex(/^(\+62|62|0)[0-9]{9,12}$/, 'Nomor telepon tidak valid')

/**
 * Login form validation schema
 */
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password diperlukan'),
})

export type LoginFormData = z.infer<typeof loginSchema>

/**
 * Register form validation schema
 */
export const registerSchema = z
  .object({
    name: z.string().min(2, 'Nama minimal 2 karakter').max(100, 'Nama maksimal 100 karakter'),
    email: emailSchema,
    phone: phoneSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    role: z.string().min(1, 'Peran harus dipilih'),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: 'Anda harus menyetujui syarat dan ketentuan',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password tidak cocok',
    path: ['confirmPassword'],
  })

export type RegisterFormData = z.infer<typeof registerSchema>

/**
 * Property creation/edit validation schema
 */
export const propertySchema = z.object({
  title: z.string().min(5, 'Judul minimal 5 karakter').max(200, 'Judul maksimal 200 karakter'),
  description: z.string().min(20, 'Deskripsi minimal 20 karakter'),
  price: z.number().min(0, 'Harga harus lebih dari 0'),
  type: z.string().min(1, 'Tipe properti harus dipilih'),
  bedrooms: z.number().min(0, 'Kamar tidur harus lebih dari 0'),
  bathrooms: z.number().min(0, 'Kamar mandi harus lebih dari 0'),
  squareMeters: z.number().min(0, 'Luas harus lebih dari 0'),
  address: z.string().min(10, 'Alamat minimal 10 karakter'),
  city: z.string().min(1, 'Kota harus dipilih'),
  province: z.string().min(1, 'Provinsi harus dipilih'),
  district: z.string().min(1, 'Kecamatan harus dipilih'),
  latitude: z.number(),
  longitude: z.number(),
})

export type PropertyFormData = z.infer<typeof propertySchema>
