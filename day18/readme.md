# 📌 Trello Clone – Secure Project Management Tool

A **Trello-like project management tool** with **drag & drop tasks, team collaboration, progress tracking, and strong security**. Built as a mini-project using the **MERN** stack (MongoDB, Express, React, Node.js) and intended as a secure, extensible starting point for a production-ready app.

---

## 🚀 Highlights

* Secure authentication with **bcrypt** for password hashing and **JWT** for session tokens.
* **HttpOnly refresh token cookie** + short-lived access tokens for safer session handling.
* **Boards** and **Tasks** data models with members and role-based access control basics.
* Frontend drag-and-drop using **react-beautiful-dnd** for intuitive UX.
* Security best practices included: **Helmet**, **rate limiting**, **CORS restrictions**, and environment-based configuration.
* Optional **Docker** + **docker-compose** for easy local development and deployment.

---

## 📂 Repository Structure

```
project-management-tool/
├─ backend/
│  ├─ models/            # Mongoose models (User, Board, Task)
│  ├─ routes/            # Express routes (auth, boards, tasks)
│  ├─ middleware/        # auth middleware, etc.
│  ├─ seed.js            # development seed script
│  ├─ server.js          # main express server
│  ├─ package.json
│  └─ .env.example
├─ frontend/
│  ├─ public/
│  ├─ src/
│  │  ├─ components/     # React components (Board, AuthForm...)
│  │  ├─ api/            # axios wrapper and auth functions
│  │  └─ App.js
│  └─ package.json
├─ docker-compose.yml
└─ README.md
```

---

## ✅ Quickstart (Local Development)

> These commands assume you have Node.js and MongoDB installed locally. To use Docker, see the Docker section below.

1. Clone repository and open terminal:

```bash
git clone <repo-url>
cd project-management-tool
```

2. Backend setup:

```bash
cd backend
cp .env.example .env
# edit .env to set JWT secrets and MONGO_URI if needed
npm install
node seed.js   # optional: creates demo user + board + tasks
node server.js # or nodemon server.js for development
```

3. Frontend setup (in a new terminal):

```bash
cd frontend
npm install
npm start
```

4. Visit frontend: `http://localhost:3000` (default CRA dev server). Backend runs on `http://localhost:5000` by default.

---

## 🔒 Security Recommendations (Included)

* **Passwords** hashed with bcrypt (12 salt rounds in scaffold). Never store plaintext passwords.
* **JWT** access tokens (short expiry) and **refresh tokens** stored in HttpOnly cookies.
* **Helmet.js** enabled to set secure HTTP headers.
* **Express-rate-limit** to reduce brute-force attempts.
* **CORS** restricted to configured frontend origin.
* Keep secrets in environment variables or a secrets manager (do not commit `.env`).

**Extra hardening for production:** use HTTPS with HSTS, enable CSP (Content Security Policy), deploy DB with authentication (MongoDB Atlas recommended), run dependency vulnerability scans, and use a secrets manager (AWS Secrets Manager, HashiCorp Vault, etc.).

---

## 🧩 Core Endpoints (Backend)

* `POST /api/auth/register` — register new user (returns access token and sets refresh cookie)
* `POST /api/auth/login` — login (returns access token and sets refresh cookie)
* `POST /api/auth/refresh` — exchange refresh cookie for new access token
* `POST /api/auth/logout` — clear refresh cookie
* `POST /api/boards` — create board (auth required)
* `GET /api/boards` — list boards for authenticated user
* `POST /api/tasks` — create task (auth + membership required)
* `GET /api/tasks/board/:boardId` — list tasks by board (auth + membership required)
* `PATCH /api/tasks/:id` — update task (auth + membership required)

---

## 🧪 Testing

* Use Postman / Insomnia to test API endpoints. Remember the refresh token is set in an HttpOnly cookie — for end-to-end testing, log in via the API first and allow cookies.
* Seed script (`node seed.js`) creates a demo user (`demo` / `password123`) and a demo board with tasks.

---

## 🐳 Docker (Optional)

A `docker-compose.yml` is provided to run `mongo` and the backend. Example:

```bash
# create a root .env with JWT secrets FIRST
docker-compose up --build
```

Note: The frontend is typically run using the CRA dev server locally for live reloading; you can also dockerize and serve it with nginx.

---

## 📌 Next Steps / Features to Add

* Real-time updates with **WebSockets** (Socket.io) for live collaboration.
* Notifications & email invites for team members.
* Activity feed / audit logs.
* Role-based permissions (owner, admin, member, guest).
* Two-factor authentication (2FA) for higher security.
* Improved UI/UX, mobile responsiveness, and accessibility improvements.

---

## 📝 License

This project skeleton is for educational purposes. Choose a license when publishing.

---

If you want, I can now:

* Update the Python generator to create this README automatically, or
* Export the project as a downloadable ZIP, or
* Walk you through running the project step-by-step.

Tell me which you prefer.
