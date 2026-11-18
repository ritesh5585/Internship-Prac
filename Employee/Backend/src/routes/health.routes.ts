import { Router } from "express";
import { pool } from "../config/db.js";

const router = Router();

router.get("/", async (req, res) => {
  const result = await pool.query("SELECT NOW()");
  res.status(200).json({
    status: "success",
    message: "API is healthy",
    data: {
      timestamp: result.rows[0].now,
    },
  });
});

export default router;