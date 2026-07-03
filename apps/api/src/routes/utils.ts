import { Router } from "express";

import { isCharacterPresent } from "../utils/characters";

const router = Router();

router.post("/is-null-character-present", (req, res) => {
  const value = req.body?.value;
  const character = req.body?.character ?? "null";

  if (typeof value !== "string") {
    res.status(400).json({
      error: "value must be a string"
    });
    return;
  }

  if (typeof character !== "string") {
    res.status(400).json({
      error: "character must be a string"
    });
    return;
  }

  try {
    res.json({
      data: isCharacterPresent(value, character)
    });
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : "invalid character"
    });
  }
});

export default router;
