import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  // Whitelist only safe fields to prevent mass assignment/prototype pollution
  const { name, email } = req.body;
  
  res.status(201).json({
    data: {
      id: "stub-user-id",
      name,
      email
    },
    message: "User creation is not implemented yet."
  });
});

This fix prevents attackers from injecting arbitrary properties into the response object by explicitly whitelisting only the `name` and `email` fields instead of spreading the entire untrusted `req.body`.

export default router;
