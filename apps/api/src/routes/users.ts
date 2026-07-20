import { Router } from 'express';

const router = Router();

type UserPayload = {
  name: string;
  email: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function validateUserPayload(body: unknown): { valid: true; data: UserPayload } | { valid: false; error: string } {
  if (!isRecord(body)) {
    return {
      valid: false,
      error: 'Request body must be an object with string fields: name and email.',
    };
  }

  const { name, email } = body;

  if (typeof name !== 'string' || name.trim() === '') {
    return {
      valid: false,
      error: 'Field "name" is required and must be a non-empty string.',
    };
  }

  if (typeof email !== 'string' || email.trim() === '') {
    return {
      valid: false,
      error: 'Field "email" is required and must be a non-empty string.',
    };
  }

  return {
    valid: true,
    data: {
      name: name.trim(),
      email: email.trim(),
    },
  };
}

function validateUserId(id: unknown): { valid: true; data: string } | { valid: false; error: string } {
  if (typeof id !== 'string' || id.trim() === '') {
    return {
      valid: false,
      error: 'Route parameter "id" is required and must be a non-empty string.',
    };
  }

  return {
    valid: true,
    data: id.trim(),
  };
}

router.get('/:id', (req, res) => {
  const idResult = validateUserId(req.params.id);

  if (!idResult.valid) {
    return res.status(400).json({ error: idResult.error });
  }

  return res.status(200).json({
    message: 'User route stub',
    userId: idResult.data,
  });
});

router.post('/', (req, res) => {
  const payloadResult = validateUserPayload(req.body);

  if (!payloadResult.valid) {
    return res.status(400).json({ error: payloadResult.error });
  }

  return res.status(201).json({
    message: 'Create user route stub',
    user: payloadResult.data,
  });
});

router.put('/:id', (req, res) => {
  const idResult = validateUserId(req.params.id);

  if (!idResult.valid) {
    return res.status(400).json({ error: idResult.error });
  }

  const payloadResult = validateUserPayload(req.body);

  if (!payloadResult.valid) {
    return res.status(400).json({ error: payloadResult.error });
  }

  return res.status(200).json({
    message: 'Update user route stub',
    userId: idResult.data,
    user: payloadResult.data,
  });
});

export default router;
