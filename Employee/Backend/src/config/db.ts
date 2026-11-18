import { Pool } from "pg";

export const pool = new Pool({
  connectionString: "postgresql://admin:admin@localhost:5432/employee_db",
});

pool.on("connect", () => {
  console.log("Connected to the database");
});

pool.on("error", (err) => {
  console.error("Database error:", err);
  process.exit(-1);
});

export async function connectDB() {
  const result = await pool.query("SELECT NOW()");
  console.log("✅ DB connected at:", result.rows[0].now);
}