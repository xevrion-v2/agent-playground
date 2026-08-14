
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { validateEmail } from '@/lib/validation';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id, email, name } = req.body;

  // Reject non-object JSON bodies
  if (typeof req.body !== 'object' || req.body === null) {
    return res.status(400).json({ error: 'Invalid JSON body' });
  }

  // Require a valid email
  if (!validateEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  // Normalize email and name values
  const normalizedEmail = email.toLowerCase();
  const normalizedName = name ? name.trim() : null;

  // Ignore client-controlled id and unrelated fields
  const safeId = id || prisma.util.generateId();
  const safeEmail = normalizedEmail;
  const safeName = normalizedName;

  try {
    const user = await prisma.user.create({
      data: {
        id: safeId,
        email: safeEmail,
        name: safeName,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}