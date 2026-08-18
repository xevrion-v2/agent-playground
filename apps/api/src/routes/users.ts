import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  // TODO: Replace stub response with paginated user lookup once persistence is wired.
  // TODO: Validate query filters (role, search, page, pageSize) before passing them to the service layer.
  // TODO: Return a typed empty-state envelope when no users match the requested filters.
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  // TODO: Validate required user fields and reject malformed payloads before creating records.
  // TODO: Move creation logic into a user service so route handlers stay thin and testable.
  // TODO: Replace the generated stub id with the persisted user id from the database layer.
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
