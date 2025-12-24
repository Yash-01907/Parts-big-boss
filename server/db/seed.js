// server/db/seed_vehicles.js
import { pool } from "./db.js"; // Importing YOUR pool

async function seedVehicles() {
  try {
    console.log("🌱 Starting Vehicle Seed...");

    // 1. CREATE CATEGORIES
    console.log("... Inserting Categories");
    const catResult = await pool.query(`
      INSERT INTO categories (name, slug) VALUES 
      ('Brake Systems', 'brake-systems'),
      ('Engine Components', 'engine-components'),
      ('Filters', 'filters')
      ON CONFLICT (name) DO NOTHING -- Prevent errors if run twice
      RETURNING id, name;
    `);

    // Fetch categories if they already existed
    const allCats = await pool.query("SELECT id, name FROM categories");
    const cats = {};
    allCats.rows.forEach((r) => (cats[r.name] = r.id));

    // 2. CREATE MAKES
    console.log("... Inserting Makes");
    // Helper function to insert if not exists
    const insertMake = async (name) => {
      await pool.query(
        "INSERT INTO vehicle_makes (name) VALUES ($1) ON CONFLICT (name) DO NOTHING",
        [name]
      );
      return (
        await pool.query("SELECT id FROM vehicle_makes WHERE name = $1", [name])
      ).rows[0].id;
    };

    const hondaId = await insertMake("Honda");
    const toyotaId = await insertMake("Toyota");

    // 3. CREATE MODELS
    console.log("... Inserting Models");
    const insertModel = async (makeId, name) => {
      await pool.query(
        "INSERT INTO vehicle_models (make_id, name) VALUES ($1, $2) ON CONFLICT (make_id, name) DO NOTHING",
        [makeId, name]
      );
      return (
        await pool.query(
          "SELECT id FROM vehicle_models WHERE make_id = $1 AND name = $2",
          [makeId, name]
        )
      ).rows[0].id;
    };

    const civicId = await insertModel(hondaId, "Civic");
    const accordId = await insertModel(hondaId, "Accord");
    const camryId = await insertModel(toyotaId, "Camry");

    // 4. CREATE VARIANTS
    console.log("... Inserting Variants");

    // 10th Gen Civic
    const civic10 = await pool.query(
      `
      INSERT INTO vehicle_variants (model_id, year_from, year_to, submodel) 
      VALUES ($1, 2016, 2021, '10th Gen') RETURNING id
    `,
      [civicId]
    );

    const civic10Id = civic10.rows[0].id;

    // 5. CREATE PRODUCTS
    console.log("... Inserting Real Products");

    // Check if product exists to avoid duplicates
    const prodCheck = await pool.query(
      "SELECT id FROM products WHERE slug = 'bosch-ceramic-brake-pads-front'"
    );

    let prodId;
    if (prodCheck.rows.length === 0) {
      const prod1 = await pool.query(
        `
          INSERT INTO products (title, slug, legacy_url_key, price, stock_count, category_id, part_number, attributes)
          VALUES (
            'BOSCH Ceramic Brake Pads (Front)', 
            'bosch-ceramic-brake-pads-front', 
            'bosch-pads-civic.html',
            4500, 
            100, 
            $1, 
            'BCP-5521',
            '{"position": "Front", "material": "Ceramic"}'
          ) RETURNING id
        `,
        [cats["Brake Systems"]]
      );
      prodId = prod1.rows[0].id;
    } else {
      prodId = prodCheck.rows[0].id;
    }

    // 6. LINK PRODUCT
    console.log("... Linking Products to Cars");
    await pool.query(
      `
      INSERT INTO product_vehicle_fitment (product_id, vehicle_variant_id)
      VALUES ($1, $2)
      ON CONFLICT (product_id, vehicle_variant_id) DO NOTHING
    `,
      [prodId, civic10Id]
    );

    console.log("🎉 Vehicle Data Seeded Successfully!");
  } catch (err) {
    console.error("❌ Error seeding vehicles:", err);
  } finally {
    await pool.end(); // CRITICAL: Close the connection so the script exits
  }
}

seedVehicles();
