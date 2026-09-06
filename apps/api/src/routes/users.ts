import { Router } from "express";
import { randomUUID } from 'crypto';

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  const { name, email } = req.body ?? {};

  if (typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ error: 'Valid name is required' });
  }

  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Valid email is required' });
  res.status(201).json({
    data: {
  // Reject any extra fields not in the whitelist
  const allowedKeys = ['name', 'email'];
  const extraKeys = Object.keys(req.body).filter((k) => !allowedKeys.includes(k));
  if (extraKeys.length > 0) {
    return res.status(400).json({ error: `Unexpected fields: ${extraKeys.join(', ')}` });
  }

  const user = { id: randomUUID(), name: name.trim(), email: email.trim() };
      ...req.body

  return res.status(201).json(user);
    message: "User creation is not implemented yet."
  });
});

export default router;
