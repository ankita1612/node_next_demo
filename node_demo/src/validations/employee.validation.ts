import { z } from 'zod';
import { SalaryType } from '../types/employee.types.js';

export const createEmployeeSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(3, 'Name must be at least 3 characters long')
      .trim(),
    email: z
      .string()
      .email('Invalid email address')
      .toLowerCase()
      .trim(),
    doj: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid Date of joining format' }),
    salary: z
      .number()
      .positive('Salary must be a positive number'),
    skills: z
      .array(z.string().trim())
      .min(1, 'At least one skill is required'),
    isActive: z.boolean().optional().default(true),
    salaryType: z.nativeEnum(SalaryType, {
      message: 'salaryType must be either MONTH or YEAR',
    }),
  }),
});

export const updateEmployeeSchema = z.object({
  params: z.object({
    id: z.string().transform((val) => parseInt(val, 10)).refine((val) => val > 0, 'Invalid Employee ID'),
  }),
  body: z.object({
    name: z.string().min(3, 'Name must be at least 3 characters long').trim().optional(),
    email: z.string().email('Invalid email address').toLowerCase().trim().optional(),
    doj: z.string().refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid Date format' }).optional(),
    salary: z.number().positive('Salary must be a positive number').optional(),
    skills: z.array(z.string().trim()).optional(),
    isActive: z.boolean().optional(),
    salaryType: z.nativeEnum(SalaryType, {
      message: 'salaryType must be either MONTH or YEAR',
    }).optional(),
  }),
});

export const getEmployeeByIdSchema = z.object({
  params: z.object({
    id: z.string().transform((val) => parseInt(val, 10)).refine((val) => val > 0, 'Invalid Employee ID'),
  }),
});

export const getEmployeesQuerySchema = z.object({
  query: z.object({
    page: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 1)),
    limit: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 10)),
    search: z.string().optional(),
    sortBy: z.enum(['name', 'salary', 'createdAt', 'doj']).optional().default('createdAt'),
    sortOrder: z.enum(['ASC', 'DESC']).optional().default('DESC'),
    isActive: z
      .string()
      .optional()
      .transform((val) => (val === 'true' ? true : val === 'false' ? false : undefined)),
  }),
});
