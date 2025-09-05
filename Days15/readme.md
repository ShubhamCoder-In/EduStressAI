# 🔑 React + Auth – Full-Stack Mini Task

A **basic full-stack authentication project** built with **React (frontend) + Node.js/Express + MongoDB (backend)**.
This serves as a **mini task** to understand login, registration, protected routes, and token-based authentication.

---

## 🚀 Features

* User **registration & login** with hashed passwords (bcrypt)
* **JWT authentication** for protected routes
* **React Router v6** for navigation
* Local storage token management
* Simple **Dashboard page** only visible to authenticated users

---

## 📂 Project Structure

```
auth-app/
│── backend/            # Node.js + Express API
│   ├── models/         # Mongoose models
│   ├── routes/         # Auth routes (login/register/protected)
│   ├── server.js       # Main server entry
│   └── package.json    # Backend dependencies
│
│── frontend/           # React App
│   ├── src/
│   │   ├── pages/      # Login, Register, Dashboard
│   │   ├── components/ # ProtectedRoute
│   │   ├── App.js      # React Router setup
│   │   └── api.js      # Axios instance
│   └── package.json    # Frontend dependencies
```

---

## ⚙️ Setup & Run

### 1️⃣ Backend

```bash
cd auth-app/backend
npm install
node server.js
```

Backend runs on **[http://localhost:5000](http://localhost:5000)**

### 2️⃣ Frontend

```bash
cd auth-app/frontend
npm install
npm start
```

Frontend runs on **[http://localhost:3000](http://localhost:3000)**

---

## 🔐 Authentication Flow

1. User registers → credentials stored with **hashed password**
2. User logs in → server issues **JWT token**
3. Token stored in **localStorage**
4. Protected pages check for token before rendering

---

## 📌 Mini Task Goal

This project demonstrates:

* 🔑 **Auth basics** (register, login, logout)
* 🛡 **Secure API routes** with JWT
* ⚛️ **React protected routes**

> ✅ A simple, complete full-stack authentication example
