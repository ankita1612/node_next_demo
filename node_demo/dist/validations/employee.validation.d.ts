import { z } from 'zod';
import { SalaryType } from '../types/employee.types.js';
export declare const createEmployeeSchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodString;
        email: z.ZodString;
        doj: z.ZodString;
        salary: z.ZodNumber;
        skills: z.ZodArray<z.ZodString>;
        isActive: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        salaryType: z.ZodEnum<typeof SalaryType>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateEmployeeSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>;
    }, z.core.$strip>;
    body: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        doj: z.ZodOptional<z.ZodString>;
        salary: z.ZodOptional<z.ZodNumber>;
        skills: z.ZodOptional<z.ZodArray<z.ZodString>>;
        isActive: z.ZodOptional<z.ZodBoolean>;
        salaryType: z.ZodOptional<z.ZodEnum<typeof SalaryType>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const getEmployeeByIdSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const getEmployeesQuerySchema: z.ZodObject<{
    query: z.ZodObject<{
        page: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<number, string | undefined>>;
        limit: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<number, string | undefined>>;
        search: z.ZodOptional<z.ZodString>;
        sortBy: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
            createdAt: "createdAt";
            doj: "doj";
            name: "name";
            salary: "salary";
        }>>>;
        sortOrder: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
            ASC: "ASC";
            DESC: "DESC";
        }>>>;
        isActive: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<boolean | undefined, string | undefined>>;
    }, z.core.$strip>;
}, z.core.$strip>;
