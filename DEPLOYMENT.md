# Vercel Deployment

Deploy the frontend and backend as separate Vercel projects from this repository.

## Frontend

- Root directory: `frontend`
- Framework preset: Vite
- Build command: `npm run build`
- Environment variable: `VITE_API_BASE_URL=https://<backend-domain>/api`

The frontend Vercel rewrite serves the SPA for direct visits to nested routes.

## Backend

- Root directory: `backend`
- Build command: `npm run build`
- Environment variables: `MONGODB_URI`, `JWT_SECRET`, `RESEND_API_KEY`, and `FRONTEND_ORIGINS`
- Set `FRONTEND_ORIGINS` to a comma-separated list of exact frontend origins, including the production domain and any Vercel preview domains you intend to use.

The backend is exposed as a Vercel function under `/api/*`. The health check is `/api/health`.

## Authentication Cookies

Production cookies use `SameSite=None; Secure` for credentialed frontend-to-backend requests. Configure explicit frontend origins in `FRONTEND_ORIGINS`; do not use `*` with credentials. A custom frontend and API domain under the same site is preferable because browsers may block third-party cookies between unrelated Vercel domains.

The frontend sends cookies with requests. Verify sign-in, page refresh, token refresh, and sign-out on both the production domain and any preview domain you allow.

## Local Development

Run the backend from `backend` and the Vite app from `frontend`. The backend allows `http://localhost:5173` by default. Local environment variables should be stored in untracked `.env` files.
