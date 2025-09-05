# Day 19 – Social Media Dashboard (P4)

A minimal full‑stack social platform with **user profiles**, **posts & comments**, and a **like system**.

## Tech
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT auth
- **Frontend**: React (Vite), Axios, React Router
- **No Tailwind** to keep setup simple (pure CSS included).

## Features
- Register / Login (JWT)
- Create posts (max 500 chars)
- Like / Unlike posts
- Comment on posts
- Public profile pages with recent posts
- Simple modern UI

## Quick Start

### 0) Prereqs
- Node 18+ and npm
- MongoDB running locally (or Atlas connection string)

### 1) Backend
```bash
cd server
cp .env.example .env   # edit if needed
npm install
npm run dev            # http://localhost:5000
```

### 2) Frontend
```bash
cd ../client
npm install
# point to your API base if not default
# Create .env file (optional):
# VITE_API_BASE=http://localhost:5000
npm run dev            # http://localhost:5173
```

Login / Register in the UI, then create a post, like/unlike, and comment.

## API Summary
- `POST /api/auth/register` → {token, user}
- `POST /api/auth/login` → {token, user}
- `GET  /api/auth/me` (auth) → user
- `GET  /api/posts` → list of posts (with users & comments)
- `POST /api/posts` (auth) → create post
- `POST /api/posts/:id/like` (auth) → like count
- `POST /api/posts/:id/unlike` (auth) → like count
- `POST /api/posts/:id/comments` (auth) → comment
- `GET  /api/users/:id` → public profile + posts
- `PUT  /api/users/me` (auth) → update profile

## Notes
- JWT stored in `localStorage` for simplicity.
- CORS is enabled for local dev.
- Production: add HTTPS, cookie‑based auth, rate limiting, and input sanitization.
