# Deployment

## Prerequisites
- Node.js 20+
- PostgreSQL
- npm workspaces

## Steps
1. Install: `npm ci`
2. Build: `npm run build` (if available)
3. Migrate: `npx prisma migrate deploy`
4. Start: `npm run dev`
