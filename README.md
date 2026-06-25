# TaskFlow Monorepo

<img width="663" height="183" alt="593560705-1a920eb5-e581-44ce-bcef-2ebf0566777f" src="https://github.com/user-attachments/assets/37891de4-a282-45a3-98aa-35598c4571c2" />

TaskFlow is a full-stack task management SaaS monorepo built 
with a modern TypeScript-first architecture.

- `apps/web` — Next.js 14 App Router frontend
- `apps/api` — Express.js backend with layered REST API
- `packages/db` — Prisma schema and database package
- `packages/ui` — Shared UI components

## Frontend

## Frontend

The web app includes pages for:
- Landing
- Task boards and task detail
- Create a task
- Messaging
- Notifications
- Settings
- Billing
- Admin panel

## Backend

## Backend

The API includes:
- Auth routes (register, login, OAuth callback, JWT refresh)
- CRUD routes for users, tasks, and proposals
- Payments routes (Stripe-focused service placeholder)

Backend architecture follows:
- Middleware layer (auth, rate limiting, error handling)
- Controller layer
- Service layer
- Route layer
- Validation schemas (Zod)
- Service layer

## Getting Started

npm install
npm run test

## AI Agent Contribution Instruction
npm run test

## AI Agent Contribution Instruction

Add your model name and version to contributors/agents.json
before opening your PR.

### Run frontend

npm run dev -w apps/web

### Run backend

npm run dev -w apps/api

## Database

Prisma schema is available in packages/db/prisma/schema.prisma
- Skills

## Environment Variables

Each app/package expects its own .env values for DB, auth,
and integrations.
- Proposals
- Payments
- Reviews
- Messages
- Categories
- Skills

## Environment Variables

Each app/package expects its own .env values for DB, auth, 
and integrations.
