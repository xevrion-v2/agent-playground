import { type Response, Router } from "express";

const router = Router();

type ApiErrorResponse = {
    error: {
          code: string;
          message: string;
    };
};

function sendApiError(
    res: Response,
    statusCode: number,
    code: string,
    message: string
  ) {
    const body: ApiErrorResponse = {
          error: {
                  code,
                  message
          }
    };

  return res.status(statusCode).json(body);
}

router.get("/", (_req, res) => {
    res.json({
          data: [],
          message: "User listing is not implemented yet."
    });
});

router.post("/", (req, res) => {
    if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
          return sendApiError(
                  res,
                  400,
                  "INVALID_USER_PAYLOAD",
                  "User payload must be a JSON object."
                );
    }

              res.status(201).json({
                    data: {
                            id: "stub-user-id",
                            ...req.body
                    },
                    message: "User creation is not implemented yet."
              });
});

export default router;
