import {Pool} from 'pg';
import dotenv from 'dotenv';
dotenv.config();

console.log({
    "Connection string":process.env.DB_STRING
})

export const pool = new Pool({
    connectionString: process.env.DB_STRING,
});

export async function dbconnect() {
    try {
        const client = await pool.connect();
        const res = await client.query('SELECT version()');
        console.log("Connected to:", res.rows[0].version); // This will tell you the answer!
        client.release();
    } catch (err) {
        console.error("Database connection error:", err);
    }
}
