import { Router } from "express";

/**
 * Router for the `/users` resource.
 *
 * Both handlers are stubs: they return the documented response envelope with an
 * explanatory `message` so that clients can be built against the final contract
 * before the persistence layer lands.
 */
const router = Router();

/**
 * Lists users.
 *
 * @route GET /users
 * @returns {object} 200 - Response envelope.
 * @returns {object[]} 200.data - The users. Always empty while unimplemented.
 * @returns {string} 200.message - Why `data` is empty.
 *
 * @example
 * // GET /users
 * { "data": [], "message": "User listing is not implemented yet." }
 */
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * Creates a user.
 *
 * The request body is echoed back with a stub identifier so callers can
 * exercise the endpoint; nothing is persisted and the body is not validated.
 *
 * @route POST /users
 * @param {object} req.body - Attributes of the user to create.
 * @returns {object} 201 - Response envelope.
 * @returns {object} 201.data - The submitted body plus a stub `id`.
 * @returns {string} 201.message - Why the user was not persisted.
 *
 * @example
 * // POST /users  { "name": "Ada" }
 * { "data": { "id": "stub-user-id", "name": "Ada" },
 *   "message": "User creation is not implemented yet." }
 */
router.post("/", (req, res) => {
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
