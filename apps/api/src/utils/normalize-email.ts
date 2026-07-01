const normalizeEmail = (email: string): string | null => {
  if (!email || typeof email !== 'string') return null;
  const trimmed = email.trim().toLowerCase();
  return trimmed.length > 0 ? trimmed : null;
};

export { normalizeEmail };
