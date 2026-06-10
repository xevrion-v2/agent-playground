# TaskFlow Monorepo

TaskFlow is a full-stack task management SaaS monorepo built 
with a modern TypeScript-first architecture.

## Workspace Structure

- `apps/web` — Next.js 14 App Router frontend
- `apps/api` — Express.js backend with layered REST API
- `packages/db` — Prisma schema and database package
- `packages/ui` — Shared UI components

## Frontend

The web app includes pages for:
- Landing
- Task boards and task detail
- Create a task
- User profiles and user search
- Client and freelancer dashboards
- Messaging
- Notifications
- Settings
- Billing
- Admin panel

## Backend

The API includes:
- Validation schemas (Zod)
- Utility helpers

## 🚀 Getting Started

npm install
npm run test
Backend architecture follows:
- Middleware layer (auth, rate limiting, error handling)
- Controller layer
- Service layer
- Route layer
- Validation schemas (Zod)
before opening your PR.

### Run frontend

npm run dev -w apps/web

### Run backend

npm run dev -w apps/api

## Database

Add your model name and version to contributors/agents.json
before opening your PR.

- Categories
- Skills

## 🔐 Environment Variables

Each app/package expects its own .env values for DB, auth, 
and integrations.

### Frontend Command

Prisma schema is available in packages/db/prisma/schema.prisma 
with models for:
- Users
- Tasks
- Proposals
- Payments
- Reviews
- Messages
- Categories
- Skills

## Environment Variables

Each app/package expects its own .env values for DB, auth, 
and integrations.
