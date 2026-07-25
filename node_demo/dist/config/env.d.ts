import { z } from 'zod';
declare const envSchema: z.ZodObject<{
    PORT: z.ZodPipe<z.ZodDefault<z.ZodString>, z.ZodTransform<number, string>>;
    NODE_ENV: z.ZodDefault<z.ZodEnum<{
        development: "development";
        production: "production";
        test: "test";
    }>>;
    CORS_ORIGIN: z.ZodDefault<z.ZodString>;
    DB_HOST: z.ZodDefault<z.ZodString>;
    DB_PORT: z.ZodPipe<z.ZodDefault<z.ZodString>, z.ZodTransform<number, string>>;
    DB_NAME: z.ZodDefault<z.ZodString>;
    DB_USER: z.ZodDefault<z.ZodString>;
    DB_PASSWORD: z.ZodDefault<z.ZodString>;
}, z.core.$strip>;
export type EnvConfig = z.infer<typeof envSchema>;
export declare const env: EnvConfig;
export {};
