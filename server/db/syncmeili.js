import { index } from "../utils/meiliClient.js";
import { pool } from "./db.js";

async function syncMeili() {
  const { rows } = await pool.query(`
   SELECT
    p.*,
    MIN(vv.year_from) AS year_start,
    MAX(vv.year_to)   AS year_end,
    ARRAY_AGG(DISTINCT vmk.name) AS fits_makes,
    ARRAY_AGG(DISTINCT vm.name)  AS fits_models
FROM products p
LEFT JOIN product_vehicle_fitment pvf ON pvf.product_id = p.id
LEFT JOIN vehicle_variants vv ON pvf.vehicle_variant_id = vv.id
LEFT JOIN vehicle_models vm ON vv.model_id = vm.id
LEFT JOIN vehicle_makes vmk ON vm.make_id = vmk.id
GROUP BY p.id;

  `);

  if (rows.length > 0) {
    console.log(`Sending ${rows.length} documents to Meilisearch...`);
    console.log("Sample doc keys:", Object.keys(rows[0]));
    if (!rows[0].id) {
      console.error("CRITICAL: 'id' IS MISSING IN ROW DATA");
    }
  } else {
    console.warn("⚠️  No products found to sync!");
  }

  await index.addDocuments(rows);
  console.log("✅ Meilisearch Sync Complete");
}

export default syncMeili;
