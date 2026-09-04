# ApplyFlow API

Node 26 / Express 5 API for the private ApplyFlow job tracker.

## Prerequisites

- Node.js 26 and npm
- Docker and Docker Compose for local PostgreSQL

## Fresh clone / local setup

```sh
cp .env.example .env
docker compose up -d
npm ci
npm run db:migrate
npm run dev
```

`GET /api/health` confirms the API is running. PostgreSQL is exposed at `${POSTGRES_PORT:-5435}`.

Docker exposes PostgreSQL at `${POSTGRES_PORT:-5435}` and creates the dedicated `applyflow_test` database.

## Environment

| Variable | Purpose |
| --- | --- |
| `NODE_ENV` | `development`, `test`, or `production` |
| `PORT` | API port (default `3000`) |
| `DATABASE_URL` | Development/production PostgreSQL connection URL |
| `TEST_DATABASE_URL` | Separate PostgreSQL URL ending in `_test`; tests refuse other database names |
| `JWT_SECRET` | Long random production secret |
| `CORS_ORIGIN` | Comma-separated allowed frontend origins; required in production |
| `JWT_EXPIRES_IN` | JWT lifetime (default `7d`) |

## Commands

```sh
docker compose up -d
docker compose down
npm run db:migrate
npm run db:migrate:undo
npm run db:migrate:status
npm test
```

Tests undo and reapply migrations against `TEST_DATABASE_URL`; never point it at a development or production database.

## Production deployment

1. Provision PostgreSQL and set `DATABASE_URL`.
2. Set `NODE_ENV=production`, `JWT_SECRET`, `CORS_ORIGIN`, and optionally `PORT` / `JWT_EXPIRES_IN`.
3. Run `npm ci` and `npm run db:migrate`.
4. Start the backend with `npm start`.
5. Confirm `GET /api/health` returns `200`.

## API

- `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`
- `POST|GET /api/applications`, `GET|PATCH|DELETE /api/applications/:id`
- `POST /api/applications/:id/status`, `GET /api/applications/:id/history`
- `GET /api/dashboard/summary`, `GET /api/dashboard/follow-ups`

All application and dashboard endpoints require `Authorization: Bearer <token>`.

`POST /api/auth/logout` is stateless for this MVP: clients delete their token, and an already-issued JWT remains valid until its normal expiry.
