import { Client } from 'pg';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const client = new Client({
    connectionString: process.env.DB_STRING,
});

async function buildDatabase() {
  try {
    await client.connect();
    console.log('🔌 Connected to Database...');

    // 1. DROP EVERYTHING (Clean Slate)
    // We use CASCADE to delete tables that depend on each other
    console.log('🗑️  Dropping old tables...');
    await client.query(`
      DROP TABLE IF EXISTS product_vehicle_fitment CASCADE;
      DROP TABLE IF EXISTS products CASCADE;
      DROP TABLE IF EXISTS vehicle_variants CASCADE;
      DROP TABLE IF EXISTS vehicle_models CASCADE;
      DROP TABLE IF EXISTS vehicle_makes CASCADE;
      DROP TABLE IF EXISTS categories CASCADE;
    `);

    // 2. READ & EXECUTE SCHEMA
    const sqlPath = path.join(__dirname, 'schema.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    console.log('🏗️  Running Schema Migration...');
    await client.query(sql);
    
    console.log('✅ Database Structure Updated Successfully!');
  } catch (err) {
    console.error('❌ Error:', err);
  } finally {
    await client.end();
  }
}

buildDatabase();