import { Router, Request, Response } from 'express';

export const usersRouter = Router();

export type AlternativePaymentMethod = 'usdt_trc20' | 'binance' | 'paypal';

export type AlternativePaymentStatus =
  | 'pending'
  | 'approved'
  | 'paid'
  | 'rejected';

export interface AlternativePayment {
  method: AlternativePaymentMethod;
  address: string;
  contactEmail: string;
  country?: string;
  requestedAt: string;
  status: AlternativePaymentStatus;
}

export interface User {
  id: string;
  username: string;
  email: string;
  country?: string;
  algoraSupported?: boolean;
  alternativePayment?: AlternativePayment;
}

// In-memory store placeholder. Replace with the project's real persistence layer.
const users: Map<string, User> = new Map();

const VALID_METHODS: readonly AlternativePaymentMethod[] = [
  'usdt_trc20',
  'binance',
  'paypal',
] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isAlternativePaymentMethod(
  value: unknown,
): value is AlternativePaymentMethod {
  return typeof value === 'string' &&
    (VALID_METHODS as readonly string[]).includes(value);
}

// GET /users/me — current user profile
usersRouter.get('/me', async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });
  const user = users.get(userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  return res.status(200).json(sanitize(user));
});

// POST /users/:id/alternative-payment
// Allows a contributor whose country is unsupported by Algora to request
// an alternative payout (USDT TRC20, Binance, or PayPal). Issue #1812.
usersRouter.post(
  '/:id/alternative-payment',
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { method, address, contactEmail, country } = req.body ?? {};

    if (!isAlternativePaymentMethod(method)) {
      return res.status(400).json({
        error: `Invalid payment method. Must be one of: ${VALID_METHODS.join(', ')}`,
      });
    }
    if (!address || typeof address !== 'string' || address.trim().length === 0) {
      return res.status(400).json({ error: 'Payment address is required' });
    }
    if (!contactEmail || !EMAIL_RE.test(String(contactEmail))) {
      return res.status(400).json({ error: 'Valid contact email is required' });
    }

    const user = users.get(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.country = typeof country === 'string' ? country : user.country;
    user.alternativePayment = {
      method,
      address: address.trim(),
      contactEmail: contactEmail.trim(),
      country: user.country,
      requestedAt: new Date().toISOString(),
      status: 'pending',
    };
    users.set(id, user);

    return res.status(202).json({
      message:
        'Alternative payment request submitted. A maintainer will contact you at the provided email.',
      user: sanitize(user),
    });
  },
);

// GET /users/alternative-payment/pending — maintainer-only queue
usersRouter.get(
  '/alternative-payment/pending',
  async (req: Request, res: Response) => {
    const isMaintainer = (req as any).user?.role === 'maintainer';
    if (!isMaintainer) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const pending = Array.from(users.values())
      .filter((u) => u.alternativePayment?.status === 'pending')
      .map((u) => ({ id: u.id, username: u.username, ...sanitize(u) }));
    return res.status(200).json({ pending });
  },
);

function sanitize(user: User) {
  const { alternativePayment, ...rest } = user;
  if (!alternativePayment) return rest;
  return {
    ...rest,
    alternativePayment: { ...alternativePayment, address: '[redacted]' },
  };
}

export default usersRouter;
import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

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
