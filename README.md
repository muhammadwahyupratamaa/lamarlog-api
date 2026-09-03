# ApplyFlow API

Node 26 / Express 5 API for the private ApplyFlow job tracker.

## Setup

```sh
cp .env.example .env
docker compose up -d
npm install
npm run db:migrate
npm run dev
```

`GET /api/health` confirms the API is running. PostgreSQL is exposed at `${POSTGRES_PORT:-5435}`.

## Environment

`DATABASE_URL`, `TEST_DATABASE_URL`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `CORS_ORIGIN`, and `PORT` are documented in `.env.example`. Use a long random `JWT_SECRET` outside local development.

## Commands

```sh
docker compose up -d
docker compose down
npm run db:migrate
npm run db:migrate:undo
npm run db:migrate:status
npm test
```

## API

- `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`
- `POST|GET /api/applications`, `GET|PATCH|DELETE /api/applications/:id`
- `POST /api/applications/:id/status`, `GET /api/applications/:id/history`
- `GET /api/dashboard/summary`, `GET /api/dashboard/follow-ups`

All application and dashboard endpoints require `Authorization: Bearer <token>`.
