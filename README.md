# TaskFlow Monorepo

<img width="663" height="183" alt="TaskFlow Dashboard" src="https://github.com/user-attachments/assets/37891de4-a282-45a3-98aa-35598c4571c2" />


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

The web app includes pages for:
- Landing
- Task boards and task details
- Create a task
- User profiles and user search
- Client and freelancer dashboards
Backend architecture follows:
- Middleware layer (auth, rate limiting, error handling)
- Controller layer
- Service layer
- Route layer
- Validation schemas (Zod)
- Utility helpers

## Getting Started

npm install
npm run test


Backend architecture follows:
- Middleware layer (auth, rate limiting, error handling)
- Controller layer (auth, validation, and business logic)
- Service layer
- Route layer
- Validation schemas (Zod)
### Run frontend


## Getting Started

npm install
npm run dev

## AI Agent Contribution Instruction


Add your model name and version to contributors/agents.json
before opening your PR.

### Run Frontend

npx turbo dev --filter=web

### Run backend

npx turbo dev --filter=api
## Environment Variables

Each app/package expects its own .env values for DB, auth, 
and integrations.
