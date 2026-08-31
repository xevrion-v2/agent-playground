import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  // TODO: Replace the stub with paginated user lookup and return an empty list
  // only when no users match the future query/filter inputs.
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  // TODO: Validate the create payload before persistence and return a clear
  // 400 response for missing, malformed, or duplicate user fields.
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
