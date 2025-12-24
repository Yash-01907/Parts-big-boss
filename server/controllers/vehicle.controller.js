import { pool } from "../db/db.js";
import AppError from "../utils/appError.js";
import asyncHandler from "../utils/asyncHandler.js";


//Controller to get companies
const getCompanies = asyncHandler(async (req, res) => {
  const result = await pool.query(
    "SELECT id,name FROM vehicle_makes ORDER BY name ASC"
  );
  return res.json(result.rows);
});


//Controller to get models
const getModels = asyncHandler(async (req, res) => {
  const { make_id } = req.params;
  if (!make_id) {
    throw new AppError("Make ID is required", 400);
  }
  const result = await pool.query(
    "SELECT * FROM vehicle_models WHERE make_id = $1 ORDER BY name ASC",
    [make_id]
  );
  return res.json(result.rows);
});


//Controller to get years
const getYears = asyncHandler(async (req, res) => {
  const { model_id } = req.params;
  if (!model_id) throw new AppError("Model ID is required", 400);
  const query = `SELECT DISTINCT year
            FROM vehicle_variants, 
                 generate_series(year_from, year_to) as year
            WHERE model_id = $1
            ORDER BY year DESC`;
  const result = await pool.query(query, [model_id]);
  const years = result.rows.map((row) => row.year);
  res.json(years);
});

export { getCompanies, getModels, getYears };
