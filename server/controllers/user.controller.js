import asyncHandler from "../utils/asyncHandler.js";
import { pool } from "../db/db.js";
import AppError from "../utils/appError.js";
import bcrypt from "bcrypt";

export const registerUser = asyncHandler(async (req, res) => {
  const { 
    email, phone_number, first_name, last_name, password, role,
    company_name, vat_number, company_address, company_city
  } = req.body;

  // 1. Basic Validation
  if (!email || !phone_number || !first_name || !last_name || !password || !role) {
    throw new AppError("All common fields are required", 400);
  }

  // 2. Validate Role
  const validRoles = ['customer', 'dealer'];
  if (!validRoles.includes(role)) {
    throw new AppError("Invalid role specified", 400);
  }

  // 3. Dealer Validation (Fail fast before touching DB)
  if (role === "dealer") {
    if (!company_name || !vat_number || !company_address || !company_city) {
      throw new AppError("All dealer fields are required", 400);
    }
  }

  // 4. Start Transaction
  // We need a specific 'client' from the pool to ensure queries run on the same connection
  const client = await pool.connect();

  try {
    await client.query('BEGIN'); // <--- Start Atomic Block

    // A. Check if user exists (Optional, but good for custom error messages)
    const userCheck = await client.query("SELECT id FROM users WHERE email = $1", [email]);
    if (userCheck.rows.length > 0) {
      throw new AppError("Email already registered", 400);
    }

    // B. Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // C. Insert User
    const userQuery = `
      INSERT INTO users (email, phone_number, first_name, last_name, password_hash, role) 
      VALUES ($1, $2, $3, $4, $5, $6) 
      RETURNING id, email, first_name, last_name, role, created_at`; 
      // ^ NOTE: We do NOT return password_hash here
    
    const userValues = [email, phone_number, first_name, last_name, hashedPassword, role];
    const userResult = await client.query(userQuery, userValues);
    const newUser = userResult.rows[0];

    // D. Insert Dealer Profile (if applicable)
    if (role === "dealer") {
      const dealerQuery = `
        INSERT INTO dealers (user_id, company_name, vat_number, company_address, company_city) 
        VALUES ($1, $2, $3, $4, $5) 
        RETURNING *`;
      
      const dealerValues = [newUser.id, company_name, vat_number, company_address, company_city];
      const dealerResult = await client.query(dealerQuery, dealerValues);
      
      // Attach dealer info to response
      newUser.dealer_profile = dealerResult.rows[0];
    }

    await client.query('COMMIT'); // <--- Save everything
    
    // 5. Send Response
    res.status(201).json({
      status: "success",
      data: newUser
    });

  } catch (error) {
    await client.query('ROLLBACK'); // <--- Undo everything if ANY error occurs
    
    // Check for specific DB errors (like duplicate VAT)
    if (error.code === '23505') { // Postgres Unique Violation code
      if (error.detail.includes('email')) throw new AppError("Email already exists", 400);
      if (error.detail.includes('vat_number')) throw new AppError("VAT Number already registered", 400);
    }
    
    throw error; // Let global error handler catch other errors
  } finally {
    client.release();
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError("Email and password are required", 400);
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // A. Check if user exists
    const userCheck = await client.query("SELECT id, password_hash FROM users WHERE email = $1", [email]);
    if (userCheck.rows.length === 0) {
      throw new AppError("User not found", 401);
    }
    const { id, password_hash } = userCheck.rows[0];

    // B. Verify Password
    const isPasswordValid = await bcrypt.compare(password, password_hash);
    if (!isPasswordValid) {
      throw new AppError("Invalid password", 401);
    }

    // C. Fetch User Data
    const userData = await client.query("SELECT * FROM users WHERE id = $1", [id]);
    const user = userData.rows[0];

    // D. Fetch Dealer Profile (if dealer)
    if (user.role === "dealer") {
      const dealerData = await client.query("SELECT * FROM dealers WHERE user_id = $1", [id]);
      user.dealer_profile = dealerData.rows[0];
    }

    await client.query('COMMIT');
    
    res.status(200).json({
      status: "success",
      data: user
    });

  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
});
