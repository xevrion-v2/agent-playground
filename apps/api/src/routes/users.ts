import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  // Extract only expected fields to prevent mass assignment/prototype pollution
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

This fix:
- Removes the dangerous `...req.body` spread operator
- Uses explicit destructuring to extract only expected fields (`name`, `email`)
- Prevents attackers from injecting arbitrary keys like `__proto__`, `constructor`, or internal fields
- Maintains the stub functionality while eliminating the security risk

export default router;
