# Hello World Venture

Minimal mono-repo app: React/Vite frontend + NestJS backend + Prisma ORM.

## Structure

```
frontend/    → React 19 + Vite + TailwindCSS + TanStack Query
backend/     → NestJS 11 + Prisma + PostgreSQL
public/      → Frontend build output (served by backend)
Dockerfile   → Multi-stage production build
```

## Quick Start

```bash
# Frontend
cd frontend && npm install && npm run dev

# Backend (needs DATABASE_URL)
cd backend && npm install && npx prisma generate && npm run start:dev

# Full stack via Docker
docker compose up --build
```

## Coding Standards

- **TypeScript** everywhere, strict mode
- **No auth** — this is a hello world app
- API routes prefixed with `/api/`
- Frontend proxies `/api/*` to backend in dev mode
- Backend serves frontend static files in production
- Prisma schema lives in `backend/prisma/schema.prisma`
- Run `npx prisma migrate dev` after schema changes
- Run `npx prisma generate` after pulling

## Key Commands

```bash
# Lint
cd frontend && npm run lint
cd backend && npm run lint

# Test
cd backend && npm run test

# Build
cd frontend && npm run build
cd backend && npm run build

# Prisma
cd backend && npx prisma migrate dev --name <name>
cd backend && npx prisma generate
cd backend && npx prisma studio
```

## Environment Variables

| Variable       | Description            | Default                                      |
| -------------- | ---------------------- | -------------------------------------------- |
| `DATABASE_URL` | PostgreSQL connection  | `postgresql://hello:hello@localhost:5432/hello_world` |
| `PORT`         | Backend listen port    | `3000`                                       |
