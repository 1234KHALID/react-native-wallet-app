import { sql } from "../config/db.js";

export async function initDB() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS transactions(
      id SERIAL PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL,
      title VARCHAR(255) NOT NULL,
      category VARCHAR(255) NOT NULL,
      amount DECIMAL(10,2) NOT NULL,
      created_at DATE NOT NULL DEFAULT CURRENT_DATE
    )`;

    console.log("Database initializing successfully");
  } catch (error) {
    console.log("Error initializing DB", error);
    process.exit(1);
  }
}
