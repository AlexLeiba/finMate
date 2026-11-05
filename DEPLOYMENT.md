# Vercel Deployment

Deploy this repository as one Vercel project with the frontend and backend defined as services in the root `vercel.json`.

## Frontend

- Service name: `frontend`
- Root directory: `frontend`
- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`

API requests default to the same deployment's `/api` path. The frontend service's fallback serves the SPA for direct visits to nested routes.

## Backend

- Service name: `backend`
- Root directory: `backend`
- Framework: Express
- Entrypoint: `api/[...path].ts`
- Environment variables: `MONGODB_URI`, `JWT_SECRET`, `RESEND_API_KEY`, and optionally `FRONTEND_ORIGINS`
- Vercel deployment and production origins are allowed automatically. Set `FRONTEND_ORIGINS` to a comma-separated list of exact custom frontend origins if needed; same-origin production traffic uses `/api`.

The root rewrite publicly exposes the backend only under `/api/*`; `/api/health` is the health check. The frontend is public on all other paths.

## Authentication Cookies

Production cookies use `SameSite=Lax; Secure`. Since the services share one public domain, browser requests use same-origin `/api` URLs. Configure explicit frontend origins if cross-origin requests are needed; do not use `*` with credentials.

The frontend sends cookies with requests. Verify sign-in, page refresh, token refresh, and sign-out on both the production domain and any preview domain you allow.

## Local Development

Use `vercel dev` from the repository root to run the services together locally. For standalone local development, run the backend from `backend` and Vite from `frontend`; local environment variables should be stored in untracked `.env` files.
