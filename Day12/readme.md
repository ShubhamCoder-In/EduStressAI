# To-Do App (React + Node.js + Express + MongoDB)

## Overview

This project is a simple **To-Do application** built with the MERN stack (MongoDB, Express.js, React, Node.js). It allows users to **create**, **view**, and **delete** tasks. The frontend is built using React with Vite, and the backend is powered by Node.js and Express, connected to a MongoDB database.

---

## Features

* Add new tasks
* View all tasks
* Delete tasks
* REST API integration

---

## Project Structure

```
todo_app/
├── backend/
│   ├── models/
│   │   └── Todo.js
│   ├── routes/
│   │   └── todos.js
│   ├── server.js
│   └── .env
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── AddTodo.jsx
    │   │   ├── TodoList.jsx
    │   │   └── TodoItem.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── vite.config.js
    └── package.json
```

---

## Backend Setup

### 1. Install dependencies

```bash
cd backend
npm install express mongoose cors dotenv nodemon
```

### 2. Configure environment variables (`.env`)

```
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/todo_app
PORT=5000
```

### 3. Start backend

```bash
npm run dev
```

The backend will run at: **[http://localhost:5000](http://localhost:5000)**

---

## Frontend Setup

### 1. Install dependencies

```bash
cd frontend
npm install
```

### 2. Start frontend

```bash
npm run dev
```

The frontend will run at: **[http://localhost:5173](http://localhost:5173)**

---

## API Endpoints

* **GET** `/api/todos` – Fetch all todos
* **POST** `/api/todos` – Add a new todo
* **DELETE** `/api/todos/:id` – Delete a todo

---

## Usage

1. Start MongoDB (local or Atlas)
2. Start the backend (`npm run dev` inside `/backend`)
3. Start the frontend (`npm run dev` inside `/frontend`)
4. Open **[http://localhost:5173](http://localhost:5173)** in your browser

---

## Future Enhancements

* Add update/edit functionality
* Add user authentication
* Mark tasks as completed
* Deploy to Vercel/Render/Netlify

---

## License

This project is open-source and free to use.
