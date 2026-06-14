import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
    // TODO: Replace this stub with paginated user lookup backed by the database.
             // TODO: Add query validation for search, pagination, and sorting parameters.
             res.json({
                   data: [],
                   message: "User listing is not implemented yet."
             });
});

router.post("/", (req, res) => {
    // TODO: Validate required user creation fields before accepting the payload.
              // TODO: Return explicit 400 responses for malformed bodies and duplicate emails.
              // TODO: Persist the user through the service layer instead of echoing request data.
              res.status(201).json({
                    data: {
                            id: "stub-user-id",
                            ...req.body
                    },
                    message: "User creation is not implemented yet."
              });
});

export default router;
