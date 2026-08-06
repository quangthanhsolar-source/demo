# demo

A small full-stack demo application used to exercise the Cloud Agent development environment end to end.

## Stack

- **server/** — Express JSON API (Node.js, ES modules) with an in-memory task store.
- **web/** — Vite + React single-page app that talks to the API.
- npm **workspaces** tie the two together from the repository root.

## Prerequisites

- Node.js 22+ and npm 10+

## Getting started

```bash
npm ci        # install all workspace dependencies (uses package-lock.json)
npm run dev   # start the API (:3001) and the web dev server (:5173) together
```

Then open http://localhost:5173. The Vite dev server proxies `/api/*` to the
API server on port 3001.

## Common commands

| Command | Description |
| --- | --- |
| `npm run dev` | Run API + web dev servers concurrently |
| `npm run dev:server` | Run only the API server (port 3001) |
| `npm run dev:web` | Run only the web dev server (port 5173) |
| `npm run build` | Build the production web bundle to `web/dist` |
| `npm run lint` | Lint the web app with ESLint |
| `npm start` | Run the API server; also serves `web/dist` when built |

## API

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/health` | Health check |
| `GET` | `/api/tasks` | List tasks |
| `POST` | `/api/tasks` | Create a task (`{ "title": "…" }`) |
| `PATCH` | `/api/tasks/:id` | Toggle `done` (`{ "done": true }`) |
| `DELETE` | `/api/tasks/:id` | Delete a task |
