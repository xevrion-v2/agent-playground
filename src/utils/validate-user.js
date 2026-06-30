// POST /users input validation - fixes #2207
// Bounty:  from xevrion-v2/agent-playground

const crypto = require('crypto');

/** Validates and sanitizes user creation payload */
function validateUserPayload(body) {
  // Reject non-object JSON
  if (typeof body !== 'object' || body === null || Array.isArray(body)) {
    throw new Error('Invalid body: expected JSON object');
  }

  // Require valid email
  const email = (body.email || '').trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error('Invalid email: required and must be valid format');
  }

  // Generate server-side ID (ignore client-controlled id)
  const id = crypto.randomUUID();

  // Normalize optional name
  const name = (body.name || '').trim();
  
  // Only return sanitized fields
  return { id, email, ...(name && { name }) };
}

module.exports = { validateUserPayload };
