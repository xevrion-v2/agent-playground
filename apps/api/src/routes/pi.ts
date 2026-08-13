import { Router } from "express";
import { calculatePi } from "../utils/pi";

const router = Router();

router.get("/", (req, res) => {
  const digits = parseInt(req.query.digits as string, 10) || 100;
  // Limit digits to avoid overwhelming the server
  const safeDigits = Math.min(Math.max(digits, 1), 10000);
  
  try {
    const pi = calculatePi(safeDigits);
    res.json({ pi, digits: safeDigits, algorithm: "Gibbons Spigot Algorithm (BigInt)" });
  } catch (error) {
    res.status(500).json({ error: "Failed to calculate PI" });
  }
});

export default router;
