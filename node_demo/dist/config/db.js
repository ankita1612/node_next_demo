import pkg from 'pg';
const { Pool } = pkg;
import { env } from './env.js';
export const pool = new Pool({
    host: env.DB_HOST,
    port: env.DB_PORT,
    database: env.DB_NAME,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
});
pool.on('error', (err) => {
    console.error('❌ Unexpected PostgreSQL pool error:', err.message);
});
export const connectDB = async () => {
    try {
        const client = await pool.connect();
        console.log(`✅ Connected to PostgreSQL database: ${env.DB_NAME} at ${env.DB_HOST}:${env.DB_PORT}`);
        client.release();
    }
    catch (error) {
        const err = error;
        console.error(`❌ PostgreSQL Connection Failed: ${err.message}`);
        console.warn('⚠️ Please verify your PostgreSQL server is running and database credentials in .env are correct.');
    }
};
export const disconnectDB = async () => {
    try {
        await pool.end();
        console.log('🔌 PostgreSQL pool connection closed gracefully.');
    }
    catch (error) {
        const err = error;
        console.error(`❌ Error closing PostgreSQL pool: ${err.message}`);
    }
};
