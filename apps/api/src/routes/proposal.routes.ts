// TODO: GET /proposals - retrieve proposals for authenticated user (as freelancer or client); return 200 with empty array if none, 500 on DB error
import { Router } from 'express';
import {
  getProposals,
const router = Router();

// TODO: GET /proposals - list proposals for the authenticated user
// TODO: Support filtering by status (pending, accepted, rejected, withdrawn)
router.get('/', authenticate, getProposals);

// TODO: POST /proposals - submit a new proposal (requires auth, freelancer only)
// TODO: Validate task exists and is open for proposals; return 404 if task not found, 409 if already proposed or task closed
// TODO: Return 201 on success; 400 for invalid proposal data (budget, cover letter length); 500 on DB failure
router.post('/', authenticate, createProposal);

// TODO: GET /proposals/:id - get a single proposal by ID
// TODO: Return 404 if proposal not found; 403 if user not authorized to view; 500 on unexpected errors
router.get('/:id', authenticate, getProposalById);

// TODO: PATCH /proposals/:id/status - accept/reject/withdraw a proposal
// TODO: Validate status transition (e.g., cannot accept after reject); return 400 for invalid transition
// TODO: Return 404 if proposal not found, 403 if user not authorized to change status, 500 on DB failure
// TODO: Trigger notification to affected user on status change

export default router;