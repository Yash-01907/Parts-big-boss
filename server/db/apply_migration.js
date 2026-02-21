import dotenv from "dotenv";
dotenv.config();
import { pool } from "./db.js"; // db.js exports pool, let's use it
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const runMigrations = async () => {
  try {
    const sqlPath = path.join(
      __dirname,
      "../migrations/001_add_razorpay_cols.sql",
    );
    const sql = fs.readFileSync(sqlPath, "utf8");

    console.log("Applying migration...");
    await pool.query(sql);
    console.log("Migration applied successfully.");
  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    // process.exit();
    // Wait for pool... or just let it close
  }
};

runMigrations();
